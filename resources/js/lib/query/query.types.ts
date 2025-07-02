export interface OptionInterface {
  queryParameters?: QueryParametersInterface;
  base_url?: string;
}

export const defaultQueryParameters: QueryParametersInterface = {
  filters: 'filter',
  fields: 'fields',
  includes: 'include',
  appends: 'append',
  page: 'page',
  limit: 'per_page',
  sort: 'sort',
};

export interface QueryParametersInterface {
  filters: string;
  fields: string;
  includes: string;
  appends: string;
  page: string;
  limit: string;
  sort: string;
}
