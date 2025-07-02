import { ProductInterface, SaveProductRequestInterface } from '../../types'
import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { saveProductValidation } from '../../rules'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  NumberInput,
  Select,
  SelectItem,
  Textarea,
} from '@heroui/react'
import { DropzoneDnd, FormControl } from '@/components'
import { ProductStatusEnum } from '../../enums'
import { CategoryInterface } from '@/features/categories'
import { cn } from '@/lib/helpers'
import { IconPlus } from '@tabler/icons-react'
import React, { useEffect } from 'react'

type Props = Readonly<{
  onSubmit: (values: SaveProductRequestInterface) => void
  data?: ProductInterface
  categories: CategoryInterface[]
  isPending: boolean
  backendErrors: Record<string, string>
}>

const transformDataToForm = (
  data: ProductInterface,
): SaveProductRequestInterface => ({
  ...data,
  media: data.media
    ? data.media.map((media) => ({
        ...media,
        delete: false,
      }))
    : [],
  price: data.price ? data.price / 100 : undefined,
  discounted_price: data.discounted_price
    ? data.discounted_price / 100
    : undefined,
})

const Form = ({
  data,
  onSubmit,
  categories,
  isPending,
  backendErrors,
}: Props) => {
  const { t } = useTranslation()
  const { schema, defaultValues } = saveProductValidation
  const {
    control,
    setError,
    formState: { errors },
    handleSubmit,
    trigger,
    setValue,
  } = useForm({
    defaultValues: data ? transformDataToForm(data) : defaultValues,
    resolver: yupResolver(schema(t)),
    criteriaMode: 'all',
    mode: 'onChange',
  })

  useEffect(() => {
    if (Object.keys(backendErrors).length) {
      Object.entries(backendErrors).forEach(([key, value]) => {
        setError(key as keyof typeof defaultValues, {
          types: {
            backend: value,
          },
        })
      })
    }
  }, [backendErrors])

  const handleChangeStatus = async (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value

    if (!value.length) return

    setValue('status', value as ProductStatusEnum)
    await trigger(['price', 'sku'])
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col gap-4'}>
      <div className={'grid lg:grid-cols-[1fr,350px] gap-4'}>
        <div className={'flex flex-col gap-4'}>
          <Card shadow={'none'} radius={'sm'}>
            <CardHeader className={'font-medium'}>
              <span
                className={
                  'after:content-["*"] after:text-sm after:ml-0.5 after:text-red-500'
                }
              >
                {t('products.form.labels.name')}
              </span>
            </CardHeader>
            <CardBody>
              <Controller
                render={({ field, fieldState: { error } }) => (
                  <FormControl
                    className={'max-w-xl'}
                    name={field.name}
                    errors={errors}
                  >
                    <Input
                      placeholder={t('products.form.placeholders.name')}
                      isInvalid={!!error}
                      isRequired
                      radius={'sm'}
                      {...field}
                    />
                  </FormControl>
                )}
                name={'name'}
                control={control}
              />
            </CardBody>
          </Card>
          <Card shadow={'none'} radius={'sm'}>
            <CardHeader className={'font-medium'}>
              {t('form.labels.description')}
            </CardHeader>
            <CardBody>
              <Controller
                render={({ field, fieldState: { error } }) => (
                  <FormControl name={field.name} errors={errors}>
                    <Textarea
                      placeholder={t('form.placeholders.description')}
                      isInvalid={!!error}
                      minRows={10}
                      radius={'sm'}
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                )}
                name={'description'}
                control={control}
              />
            </CardBody>
          </Card>
          <Card shadow={'none'} radius={'sm'}>
            <CardHeader className={'font-medium'}>
              {t('form.labels.images')}
            </CardHeader>
            <CardBody>
              <Controller
                render={({ field, fieldState: { error } }) => (
                  <DropzoneDnd
                    onChange={field.onChange}
                    files={data?.media || []}
                    accept={{
                      'image/jpeg': [],
                      'image/png': [],
                      'image/webp': [],
                      'image/heic': [],
                      'image/jfif': [],
                    }}
                    classNames={{
                      container: cn(
                        '!min-h-[200px] bg-neutral-100 border border-neutral-200 rounded cursor-pointer',
                        'flex items-center p-3 w-full',
                      ),
                      imageWrapper: 'size-[100px]',
                      image: 'object-cover rounded',
                    }}
                  >
                    {(open) => (
                      <div
                        className={
                          'flex w-full flex-col items-center justify-center gap-2'
                        }
                      >
                        <Button
                          size={'lg'}
                          radius={'full'}
                          className={'justify-self-center'}
                          isIconOnly
                          onPress={open}
                          as={'div'}
                        >
                          <IconPlus size={40} className={'text-primary'} />
                        </Button>
                        <span className={'text-lg font-semibold'}>
                          {t('products.form.dropzone.add_images')}
                        </span>
                        <span className={'text-sm text-neutral-700'}>
                          {t('products.form.dropzone.description')}
                        </span>
                      </div>
                    )}
                  </DropzoneDnd>
                )}
                name={'media'}
                control={control}
              />
            </CardBody>
          </Card>
        </div>
        <div className={'flex flex-col'}>
          <Card shadow={'none'} radius={'sm'}>
            <CardBody className={'flex flex-col gap-8'}>
              <Controller
                render={({ field, fieldState: { error } }) => (
                  <FormControl name={field.name} errors={errors}>
                    <Autocomplete
                      isInvalid={!!error}
                      isRequired
                      radius={'sm'}
                      placeholder={t('form.placeholders.category')}
                      labelPlacement={'outside'}
                      listboxProps={{
                        emptyContent: t('form.empty_content.categories'),
                      }}
                      label={t('form.labels.category')}
                      selectedKey={field.value.toString()}
                      items={categories}
                      onSelectionChange={field.onChange}
                    >
                      {(item) => (
                        <AutocompleteItem key={item.id}>
                          {item.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  </FormControl>
                )}
                name={'category_id'}
                control={control}
              />
              <Controller
                render={({ field, fieldState: { error } }) => (
                  <FormControl
                    className={'max-w-xl'}
                    name={field.name}
                    errors={errors}
                  >
                    <Input
                      placeholder={t('form.placeholders.sku')}
                      isInvalid={!!error}
                      labelPlacement={'outside'}
                      label={t('form.labels.sku')}
                      isRequired
                      radius={'sm'}
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                )}
                name={'sku'}
                control={control}
              />
              <Controller
                render={({ field, fieldState: { error } }) => (
                  <FormControl name={field.name} errors={errors}>
                    <Select
                      isInvalid={!!error}
                      isRequired
                      radius={'sm'}
                      labelPlacement={'outside'}
                      label={t('form.labels.status')}
                      selectedKeys={new Set([field.value])}
                      onChange={handleChangeStatus}
                    >
                      {Object.values(ProductStatusEnum).map((item) => (
                        <SelectItem key={item}>
                          {t(`products.statuses.${item}`)}
                        </SelectItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                name={'status'}
                control={control}
              />
              <Controller
                render={({ field, fieldState: { error } }) => (
                  <FormControl name={field.name} errors={errors}>
                    <NumberInput
                      placeholder={t('form.placeholders.price')}
                      isInvalid={!!error}
                      label={t('form.labels.price')}
                      formatOptions={{
                        maximumFractionDigits: 2,
                      }}
                      labelPlacement={'outside'}
                      radius={'sm'}
                      onValueChange={field.onChange}
                      value={field.value ?? undefined}
                    />
                  </FormControl>
                )}
                name={'price'}
                control={control}
              />
              <Controller
                render={({ field, fieldState: { error } }) => (
                  <FormControl name={field.name} errors={errors}>
                    <NumberInput
                      placeholder={t('form.placeholders.discounted_price')}
                      isInvalid={!!error}
                      label={t('form.labels.discounted_price')}
                      minValue={0}
                      formatOptions={{
                        maximumFractionDigits: 2,
                      }}
                      labelPlacement={'outside'}
                      radius={'sm'}
                      onValueChange={field.onChange}
                      value={field.value ?? undefined}
                    />
                  </FormControl>
                )}
                name={'discounted_price'}
                control={control}
              />
            </CardBody>
          </Card>
        </div>
      </div>
      <div className={'py-4 flex flex-col lg:flex-row gap-2'}>
        <Button isLoading={isPending} type={'submit'} color={'primary'}>
          {t('form.buttons.save')}
        </Button>
        <Button onPress={() => window.history.back()}>
          {t('form.buttons.cancel')}
        </Button>
      </div>
    </form>
  )
}

export { Form }
