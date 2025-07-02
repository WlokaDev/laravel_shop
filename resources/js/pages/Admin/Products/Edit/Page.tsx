import { useTranslation } from 'react-i18next'
import {
  Form,
  ProductInterface,
  SaveProductRequestInterface,
} from '@/features/products'
import { AdminLayout } from '@/components/Layouts/Admin'
import { CategoryInterface } from '@/features/categories'
import { useInertiaClient } from '@/lib/hooks'
import { addToast } from '@heroui/react'
import { useState } from 'react'

type Props = Readonly<{
  categories: CategoryInterface[]
  product: ProductInterface
}>

const AdminProductCreatePage = ({ categories, product }: Props) => {
  const { t } = useTranslation()
  const { put, isPending } = useInertiaClient()
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (data: SaveProductRequestInterface) => {
    put(`/admin/products/${product.id}`, data, {
      onSuccess: (_, isOk) => {
        if (isOk) {
          addToast({
            description: t('products.edit.success'),
            color: 'success',
          })
        } else {
          addToast({
            description: t('utils.errors.500'),
            color: 'danger',
          })
        }
      },
      onError: (errors) => {
        setErrors(errors)
      },
    })
  }

  return (
    <AdminLayout>
      <div className={'flex flex-col gap-4'}>
        <h5 className={'text-2xl font-medium'}>{t('products.create.title')}</h5>
        <Form
          data={product}
          isPending={isPending}
          categories={categories}
          onSubmit={handleSubmit}
          backendErrors={errors}
        />
      </div>
    </AdminLayout>
  )
}

export default AdminProductCreatePage
