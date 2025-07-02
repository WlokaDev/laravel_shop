import { ReactNode } from 'react'
import { TFunction } from 'i18next'
import { TableProps } from '@heroui/react'

export interface ColumnInterface<T> {
  id: string
  title: string
  render: (value: T) => ReactNode
  sortable?: boolean
}

export interface UseTableProps<T extends object = {}> {
  columns: (t: TFunction) => ColumnInterface<T>[]
  sortEnabled?: boolean
  selectionMode?: TableProps['selectionMode']
}
