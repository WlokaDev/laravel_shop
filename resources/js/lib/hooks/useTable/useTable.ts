import { ColumnInterface, UseTableProps } from './useTable.types'
import React, { useState } from 'react'
import type { Selection } from '@heroui/react'
import { SortDescriptor } from '@heroui/react'
import { useTranslation } from 'react-i18next'
import { TFunction } from 'i18next'
import { router, usePage } from '@inertiajs/react'
import { Query } from '@/lib/query'
import { usePathname } from '@/lib/hooks'

const useTable = <T extends object = {}>({
  columns,
  sortEnabled = false,
  selectionMode,
}: UseTableProps<T>) => {
  const { t } = useTranslation()
  const [sort, setSort] = useState<SortDescriptor>()
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]))
  const columnDefinition = columns(t)
  const props = usePage<{
    query_params: Record<string, any> | []
  }>()
  const pathname = usePathname()

  const renderValue = (value: T, key: React.Key) => {
    const column = columnDefinition.find((col) => col.id === key)

    if (!column) return null

    return column.render(value)
  }

  const onSortChange = (descriptor: SortDescriptor) => {
    const query = Query.make()

    if (!Array.isArray(props.props.query_params)) {
      query.params(props.props.query_params)
    }

    descriptor ? query.order(descriptor) : query.removeParam('sort')

    setSort(descriptor)

    router.visit(`${pathname}?${query.url()}`, {
      preserveState: true,
      preserveScroll: true,
      replace: true,
    })
  }

  return {
    tableProps: {
      ...(sortEnabled && {
        sortDescriptor: sort,
        onSortChange,
      }),
      ...(selectionMode && {
        selectionMode,
        selectedKeys,
        onSelectionChange: (keys: Selection) => setSelectedKeys(keys),
      }),
    },
    renderValue,
    columnDefinition,
  }
}

const createColumnBuilder =
  <T extends object = {}>() =>
  (columns: (t: TFunction) => ColumnInterface<T>[]) =>
    columns

export { useTable, createColumnBuilder }
