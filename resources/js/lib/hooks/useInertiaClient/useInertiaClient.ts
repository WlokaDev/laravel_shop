import { useState } from 'react'
import { router } from '@inertiajs/react'
import {
  DeleteRequestHelperOptions,
  FlashResponseType,
  PageResponse,
  PostRequestHelperOptions,
  ReloadRequestHelperOptions,
} from './useInertiaClient.types'
import { ResponseCodeEnum } from '@/enums'
import { Errors, Page } from '@inertiajs/core'
import _ from 'lodash'
import { FieldValues, UseFormSetError, ValidateResult } from 'react-hook-form'

const useInertiaClient = () => {
  const [isPending, setIsPending] = useState<boolean>(false)

  const isOk = (flash: FlashResponseType) =>
    Array.isArray(flash.response) || flash.response.code === ResponseCodeEnum.OK

  const responseCode = (flash: FlashResponseType) =>
    !Array.isArray(flash.response) ? flash.response.code : ResponseCodeEnum.OK

  const errorResolver = <T extends FieldValues>(
    setError: UseFormSetError<T>,
    error: Errors,
  ) => {
    Object.entries(error).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((message) => {
          setError(key as any, {
            type: 'manual',
            types: {
              key: message,
            },
          })
        })
      } else {
        setError(key as any, {
          type: 'manual',
          types: {
            key: value as ValidateResult,
          },
          message: value as string,
        })
      }
    })
  }

  const post = <T extends {} = {}>(
    url: URL | string,
    data?: any,
    options?: PostRequestHelperOptions<T>,
  ) => {
    return router.post(url, data, {
      preserveScroll: options?.preserveScroll ?? true,
      onStart: (params) => {
        if (!options?.disableLoading) {
          setIsPending(true)
        }

        options?.onStart?.(params)
      },
      onFinish: (params) => {
        if (!options?.disableLoading) {
          setIsPending(false)
        }

        options?.onFinish?.(params)
      },
      onError: (error) => {
        options?.onError?.(error, errorResolver)
      },
      onSuccess: (page) => {
        const { flash } = page.props

        options?.onSuccess?.(
          page as Page<PageResponse<T>>,
          isOk(flash as FlashResponseType),
          responseCode(flash as FlashResponseType),
        )
      },
      ..._.omit(options, ['onStart', 'onError', 'onFinish', 'onSuccess']),
    })
  }

  const put = <T extends {} = {}>(
    url: URL | string,
    data?: any,
    options?: PostRequestHelperOptions<T>,
  ) => {
    return router.put(url, data, {
      preserveScroll: options?.preserveScroll ?? true,
      onStart: (params) => {
        if (!options?.disableLoading) {
          setIsPending(true)
        }

        options?.onStart?.(params)
      },
      onFinish: (params) => {
        if (!options?.disableLoading) {
          setIsPending(false)
        }

        options?.onFinish?.(params)
      },
      onSuccess: (page) => {
        const { flash } = page.props

        options?.onSuccess?.(
          page as Page<PageResponse<T>>,
          isOk(flash as FlashResponseType),
          responseCode(flash as FlashResponseType),
        )
      },
      onError: (error) => {
        options?.onError?.(error, errorResolver)
      },
      ..._.omit(options, ['onStart', 'onFinish', 'onSuccess', 'onError']),
    })
  }

  const destroy = (url: URL | string, options: DeleteRequestHelperOptions) => {
    return router.delete(url, {
      onStart: (params) => {
        setIsPending(true)
        options.onStart?.(params)
      },
      onFinish: (params) => {
        setIsPending(false)
        options.onFinish?.(params)
      },
      onSuccess: (page) => {
        const { flash } = page.props

        options.onSuccess(
          page as Page<PageResponse>,
          isOk(flash as FlashResponseType),
          responseCode(flash as FlashResponseType),
        )
      },
      ..._.omit(options, ['onStart', 'onFinish', 'onSuccess']),
    })
  }

  const reload = (options: ReloadRequestHelperOptions) => {
    return router.reload({
      onStart: (params) => {
        setIsPending(true)
        options.onStart?.(params)
      },
      onFinish: (params) => {
        setIsPending(false)
        options.onFinish?.(params)
      },
      onSuccess: (page) => {
        const { flash } = page.props

        options.onSuccess?.(
          page as Page<PageResponse>,
          isOk(flash as FlashResponseType),
          responseCode(flash as FlashResponseType),
        )
      },
      ..._.omit(options, ['onStart', 'onFinish', 'onSuccess']),
    })
  }

  return {
    isPending,
    post,
    put,
    destroy,
  }
}

export { useInertiaClient }
