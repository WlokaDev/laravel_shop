import { ResponseCodeEnum } from '@/enums'
import { Errors, Page, VisitOptions } from '@inertiajs/core'
import { UseFormSetError } from 'react-hook-form'

type PostRequestHelperOptions<T extends object> = Omit<
  VisitOptions,
  'onSuccess' | 'onError'
> & {
  onSuccess?: (
    page: Page<PageResponse<T>>,
    isOk: boolean,
    responseCode: ResponseCodeEnum,
  ) => void
  onError?: (
    error: Errors,
    formResolver?: (setError: UseFormSetError<T>, error: Errors) => void,
  ) => void
  disableLoading?: boolean
}

type DeleteRequestHelperOptions = Omit<
  Omit<VisitOptions<{}>, 'method'>,
  'onSuccess'
> & {
  onSuccess: (
    page: Page<PageResponse>,
    isOk: boolean,
    responseCode: ResponseCodeEnum,
  ) => void
}

type ReloadRequestHelperOptions = Omit<VisitOptions, 'onSuccess'> & {
  onSuccess?: (
    page: Page<PageResponse>,
    isOk: boolean,
    responseCode: ResponseCodeEnum,
  ) => void
}

type CustomErrorType = {
  code: ResponseCodeEnum
  [key: string]: any
}

type FlashResponseType = {
  response: CustomErrorType | []
}

type PageResponse<TProps extends object = {}> = {
  errors: Record<string, string>
  flash: FlashResponseType
  locale: string
} & TProps

export type {
  CustomErrorType,
  FlashResponseType,
  PageResponse,
  PostRequestHelperOptions,
  DeleteRequestHelperOptions,
  ReloadRequestHelperOptions,
}
