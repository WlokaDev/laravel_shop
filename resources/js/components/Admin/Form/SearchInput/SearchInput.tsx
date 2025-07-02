import React, { useEffect, useState } from 'react'
import { router, usePage } from '@inertiajs/react'
import { useDebounce } from '@uidotdev/usehooks'
import { usePathname } from '@/lib/hooks'
import { Query } from '@/lib/query'
import { cn } from '@/lib/helpers'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { Input } from '@heroui/react'

type Props = Readonly<{
  columns: string | string[]
  className?: string
}>

const SearchInput = ({ columns, className }: Props) => {
  const props = usePage<{
    query_params: Record<string, any> | []
  }>()
  const { t } = useTranslation()
  const pathname = usePathname()
  const [searchTerm, setSearchTerm] = useState<string>(() => {
    if (Array.isArray(props.props.query_params)) {
      return ''
    }

    return Array.isArray(columns)
      ? (_.get(props.props.query_params, 'filter.search') ?? '')
      : (_.get(props.props.query_params, `filter.${columns}`) ?? '')
  })
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    const query = new Query()

    if (!Array.isArray(props.props.query_params)) {
      query.params(props.props.query_params)
    }

    if (debouncedSearchTerm.trim().length > 0) {
      if (Array.isArray(columns)) {
        query.removeFilter('search')
        query.whereSearch(columns, debouncedSearchTerm)
      } else {
        query.removeFilter(columns)
        query.where(columns, debouncedSearchTerm)
      }
    } else {
      if (Array.isArray(columns)) {
        query.removeFilter('search')
      } else {
        query.removeFilter(columns)
      }
    }

    router.visit(`${pathname}?${query.url()}`, {
      preserveState: true,
      preserveScroll: true,
    })
  }, [debouncedSearchTerm])

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
  }

  return (
    <Input
      type={'search'}
      placeholder={t('form.placeholders.search')}
      value={searchTerm}
      isClearable
      classNames={{
        inputWrapper: cn(
          'bg-white border border-input-border rounded',
          'group-data-[focus=true]:bg-white data-[focus=true]:ring-1 data-[focus=true]:ring-primary',
        ),
      }}
      onClear={() => setSearchTerm('')}
      onValueChange={handleSearchChange}
      autoComplete={'off'}
      autoCorrect={'off'}
      className={cn('w-full', className)}
    />
  )
}

export { SearchInput }
