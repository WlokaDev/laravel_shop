import { AdminLayout } from '@/components/Layouts/Admin'
import { useTranslation } from 'react-i18next'
import { PaginationInterface, QueryParams } from '@/types'
import { ProductInterface } from '@/features/products'
import { SearchInput } from '@/components/Admin'
import {
  Button,
  Pagination,
  PaginationItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react'
import { useTable } from '@/lib/hooks'
import { columns } from './definition'
import { Link } from '@/components'

type Props = Readonly<{
  data: PaginationInterface<ProductInterface>
  query_params: QueryParams
}>

const AdminProductListPage = ({ data, query_params }: Props) => {
  const { t } = useTranslation()
  const { columnDefinition, renderValue, tableProps } = useTable({
    columns,
    sortEnabled: true,
  })

  return (
    <AdminLayout>
      <div className={'flex flex-col gap-4'}>
        <h5 className={'text-2xl font-medium'}>{t('products.list.title')}</h5>
        <div className={'flex justify-end'}>
          <div className={'flex gap-4'}>
            <div className={'flex'}>
              <Button radius={'sm'} as={'a'} href={'/admin/products/create'}>
                {t('products.list.add_product')}
              </Button>
            </div>
            <SearchInput columns={'search'} className={'min-w-64'} />
          </div>
        </div>
        <Table
          bottomContent={
            <Pagination
              total={data.pagination.total_pages}
              showControls
              page={data.pagination.current_page}
              renderItem={({ key, ...item }) => (
                <Link
                  href={'/admin/products'}
                  key={key}
                  queryParams={{
                    ...(Array.isArray(query_params) ? {} : query_params),
                    page: item.page,
                  }}
                >
                  <PaginationItem {...item} key={key} />
                </Link>
              )}
            />
          }
          shadow={'none'}
          {...tableProps}
        >
          <TableHeader columns={columnDefinition}>
            {(column) => (
              <TableColumn allowsSorting={column.sortable}>
                {column.title}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            emptyContent={t('products.list.empty_content')}
            items={data.data}
          >
            {(item) => (
              <TableRow key={item.id}>
                {(key) => <TableCell>{renderValue(item, key)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  )
}

export default AdminProductListPage
