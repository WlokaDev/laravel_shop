import { useTranslation } from 'react-i18next'
import { MainLayout } from '@/components/Layouts/Main'
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from '@heroui/react'
import { loginValidation } from './rules'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormControl } from '@/components'
import { useInertiaClient } from '@/lib/hooks'

const LoginPage = () => {
  const { t } = useTranslation()
  const { defaultValues, schema } = loginValidation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema(t)),
    mode: 'onChange',
    criteriaMode: 'all',
  })
  const { post, isPending } = useInertiaClient()

  const onSubmit = (data: typeof defaultValues) => {
    post('/login', data, {
      onSuccess: (page, isOk, responseCode) => {
        if (isOk) {
          addToast({
            color: 'success',
            description: t('auth.login.success'),
          })

          return
        }

        addToast({
          color: 'danger',
          description: t('auth.login.error'),
        })
      },
    })
  }

  return (
    <MainLayout>
      <div className={'flex justify-center pt-12'}>
        <Card
          onSubmit={handleSubmit(onSubmit)}
          as={'form'}
          className={'w-full lg:w-96'}
          shadow={'none'}
        >
          <CardHeader className={'justify-center'}>
            <span className={'text-lg font-semibold'}>
              {t('auth.login.title')}
            </span>
          </CardHeader>
          <CardBody className={'p-6 gap-4'}>
            <Controller
              render={({ field, fieldState: { error } }) => (
                <FormControl name={field.name} errors={errors}>
                  <Input
                    isInvalid={!!error}
                    type={'email'}
                    radius={'sm'}
                    label={t('form.labels.email')}
                    placeholder={t('form.placeholders.email')}
                    labelPlacement={'outside'}
                    {...field}
                  />
                </FormControl>
              )}
              name={'email'}
              control={control}
            />
            <Controller
              render={({ field, fieldState: { error } }) => (
                <FormControl name={field.name} errors={errors}>
                  <Input
                    isInvalid={!!error}
                    type={'password'}
                    radius={'sm'}
                    label={t('form.labels.password')}
                    placeholder={t('form.placeholders.password')}
                    labelPlacement={'outside'}
                    {...field}
                  />
                </FormControl>
              )}
              name={'password'}
              control={control}
            />
          </CardBody>
          <CardFooter className={'px-6'}>
            <Button
              isLoading={isPending}
              fullWidth
              type={'submit'}
              color={'primary'}
            >
              {t('auth.login.button')}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  )
}

export default LoginPage
