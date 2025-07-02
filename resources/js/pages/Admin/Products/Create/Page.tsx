import { useTranslation } from 'react-i18next'
import { Form, SaveProductRequestInterface } from '@/features/products'
import { AdminLayout } from '@/components/Layouts/Admin'
import { CategoryInterface } from '@/features/categories'
import { useInertiaClient } from '@/lib/hooks'
import { useState } from 'react'
import { addToast } from '@heroui/react'

type Props = Readonly<{
  categories: CategoryInterface[]
}>

const AdminProductCreatePage = ({ categories }: Props) => {
  const { t } = useTranslation()
  const { post, isPending } = useInertiaClient()
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (data: SaveProductRequestInterface) => {
    post('/admin/products', data, {
      onSuccess: (_, isOk) => {
        if (isOk) {
          addToast({
            description: t('products.create.success'),
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
