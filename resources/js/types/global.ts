import { AutocompleteProps, ModalProps as BaseModalProps } from '@heroui/react'

export type Nullable<T> = T | null

export type ModalComponentProps<T extends object = {}> = Omit<
  ModalProps,
  'children'
> &
  T

export type AutocompleteComponentProps = Omit<
  AutocompleteProps,
  | 'items'
  | 'onValueChange'
  | 'isLoading'
  | 'placeholder'
  | 'defaultItems'
  | 'children'
>

export type PaginationInterface<T extends object> = {
  data: T[]
  pagination: {
    count: number
    per_page: number
    current_page: number
    total: number
    total_pages: number
  }
}

export type QueryParams<T extends object | undefined = undefined> =
  T extends object ? T | [] : Record<string, any> | []

export interface MediaRequestInterface {
  id?: Nullable<number>
  order: number
  file?: Nullable<File>
  delete: boolean
  url?: Nullable<string>
}

export interface MediaInterface {
  id: number
  url: string
  order: number
}

export type ModalProps = Omit<BaseModalProps, 'children'>
