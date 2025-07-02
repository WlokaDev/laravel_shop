import { createColumnBuilder } from '@/lib/hooks'
import { ProductInterface } from '@/features/products'
import { Image, linkHelper } from '@/components'
import { Button } from '@heroui/react'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { router } from '@inertiajs/react'

const columnsBuilder = createColumnBuilder<ProductInterface>()

export const columns = columnsBuilder((t) => [
  {
    id: 'id',
    title: '#',
    render: (item) => item.id,
    sortable: true,
  },
  {
    id: 'image',
    title: t('form.labels.image'),
    render: (item) =>
      item.main_media ? (
        <Image
          classNames={{
            img: 'object-cover',
          }}
          src={item.main_media.url}
          width={50}
          height={50}
        />
      ) : null,
  },
  {
    id: 'name',
    title: t('products.form.labels.name'),
    render: (item) => item.name,
  },
  {
    id: 'status',
    title: t('form.labels.status'),
    render: (item) => t(`products.statuses.${item.status}`),
  },
  {
    id: 'price',
    title: t('form.labels.price'),
    render: (item) =>
      item.price
        ? new Intl.NumberFormat('pl-PL', {
            style: 'currency',
            maximumFractionDigits: 2,
            currency: 'PLN',
          }).format(item.price / 100)
        : '-',
  },
  {
    id: 'discounted_price',
    title: t('form.labels.discounted_price'),
    render: (item) =>
      item.discounted_price
        ? new Intl.NumberFormat('pl-PL', {
            style: 'currency',
            maximumFractionDigits: 2,
            currency: 'PLN',
          }).format(item.discounted_price / 100)
        : '-',
  },
  {
    id: 'action',
    title: t('form.labels.action'),
    render: (item) => (
      <div className={'flex flex-row gap-2'}>
        <Button
          isIconOnly
          as={'a'}
          href={linkHelper({
            href: '/admin/products/:id/edit',
            params: { id: item.id },
          })}
          color={'primary'}
          size={'sm'}
          variant={'faded'}
        >
          <IconEdit size={16} />
        </Button>
        <Button
          isIconOnly
          color={'danger'}
          size={'sm'}
          variant={'faded'}
          onPress={() =>
            router.delete(
              linkHelper({
                href: '/admin/products/:id',
                params: { id: item.id },
              }),
              {
                only: ['data'],
              },
            )
          }
        >
          <IconTrash size={16} />
        </Button>
      </div>
    ),
  },
])
