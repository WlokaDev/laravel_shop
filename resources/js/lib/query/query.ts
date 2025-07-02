import { Parser } from './parser'
import {
  defaultQueryParameters,
  type OptionInterface,
  type QueryParametersInterface,
} from './query.types'
import { SortDescriptor } from '@heroui/react'
import _ from 'lodash'

class Query {
  model: string | null
  base_url: string | null
  queryParameters: QueryParametersInterface
  append: string[]
  include: string[]
  sorts: string[]
  fields: string | Object
  filters: { [key: string]: string | number }
  pageValue: number | null
  limitValue: number | null
  paramsObj: { [key: string]: any } | null
  parser: Parser

  constructor(options: OptionInterface = {}) {
    this.model = null

    // will use base_url if passed in
    this.base_url = options.base_url || null

    // default filter names
    this.queryParameters = options.queryParameters || defaultQueryParameters

    // initialise variables to hold
    // the urls data
    this.include = []
    this.append = []
    this.sorts = []
    this.fields = {}
    this.filters = {}
    this.pageValue = null
    this.limitValue = null
    this.paramsObj = null

    this.parser = new Parser(this)
  }

  static make(options: OptionInterface = {}): Query {
    return new Query(options)
  }

  // set the model for the query
  for(model: string): this {
    this.model = model

    return this
  }

  // return the parsed url
  get(): string {
    // generate the url
    const url = this.base_url
      ? this.base_url + this.parseQuery()
      : this.parseQuery()
    // reset the url so the query object can be re-used
    this.reset()

    return url
  }

  url(): string {
    return this.get()
  }

  reset(): void {
    // reset the uri
    this.parser.uri = ''
  }

  parseQuery(): string {
    return this.parser.parse()
  }

  /**
   * Query builder
   */
  includes(...include: string[]) {
    if (!include.length) {
      throw new Error(
        `The ${this.queryParameters.includes}s() function takes at least one argument.`,
      )
    }

    this.include = include

    return this
  }

  appends(...append: string[]) {
    if (!append.length) {
      throw new Error(
        `The ${this.queryParameters.appends}s() function takes at least one argument.`,
      )
    }

    this.append = append

    return this
  }

  where(key: string, value: string | number | undefined | null): this {
    if (value) {
      this.filters[key] = value
    } else {
      delete this.filters[key]
    }

    return this
  }

  whereBetween(key: string, value: [number?, number?]): this {
    const isBetween = _(value).omitBy(_.isNil).omitBy(_.isNaN).size() === 2

    if (isBetween) {
      return this.where(`${key}_between`, `${value[0]},${value[1]}`)
    } else {
      if (value[0] || typeof value[0] === 'number') {
        return this.where(`${key}`, `>${value[0]}`)
      }

      if (value[1] || typeof value[1] === 'number') {
        return this.where(`${key}`, `<${value[1]}`)
      }
    }

    return this
  }

  order(args: SortDescriptor) {
    if (args.column) {
      this.removeParam('sort')

      if (args.direction === 'ascending') {
        this.sorts = [`${args.column}`]
      } else {
        this.sorts = [`-${args.column}`]
      }
    }

    return this
  }

  whereNull(key: string): this {
    this.filters['isNull'] = key

    return this
  }

  whereNotNull(key: string): this {
    this.filters['isNotNull'] = key

    return this
  }

  whereIn(key: string, array: Array<string | number>): this {
    this.filters[key] = array.join(',')

    return this
  }

  whereNotIn(array: Array<string | number>): this {
    this.filters['exclude_ids'] = array.join(',')

    return this
  }

  sort(...args: string[]) {
    this.sorts = args

    return this
  }

  page(value: number) {
    this.pageValue = value

    return this
  }

  limit(value: number) {
    this.limitValue = value

    return this
  }

  params(params: Object) {
    this.paramsObj = params

    return this
  }

  whereSearch(columns: string[], value: string) {
    this.filters['search'] = columns.join(',') + ':' + value

    return this
  }

  removeParam(key: string) {
    if (this.paramsObj && this.paramsObj[key]) {
      delete this.paramsObj[key]
    }

    if (this.paramsObj && !Object.keys(this.paramsObj).length) {
      this.paramsObj = null
    }

    return this
  }

  removeFilter(key: string) {
    if (this.filters[key]) {
      delete this.filters[key]
    }

    if (!Object.keys(this.filters).length) {
      this.filters = {}
    }

    if (
      this.paramsObj &&
      this.paramsObj['filter'] &&
      this.paramsObj['filter'][key]
    ) {
      delete this.paramsObj['filter'][key]
    }

    return this
  }
}

export { Query }
