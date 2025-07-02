import { ValidationInterface } from '@/types'
import { SaveProductRequestInterface } from '../types'
import * as yup from 'yup'
import { ProductStatusEnum } from '@/features/products'

const saveProductValidation: ValidationInterface<SaveProductRequestInterface> =
  {
    schema: (t) =>
      yup.object().shape({
        category_id: yup.number().required(t('validation.required')),
        name: yup
          .string()
          .required(t('validation.required'))
          .max(255, t('validation.max', { max: 255 })),
        description: yup.string().nullable(),
        price: yup
          .number()
          .nullable()
          .min(0, t('validation.min_value', { min: 0 }))
          .when('status', {
            is: (status: ProductStatusEnum) =>
              status === ProductStatusEnum.ACTIVE,
            then: (schema) => schema.required(t('validation.required')),
          })
          .transform((_, rawValue: number | string | null) => {
            if (!rawValue || (typeof rawValue === 'string' && !rawValue.length))
              return undefined

            return rawValue
          }),
        discounted_price: yup
          .number()
          .typeError(t('validation.number'))
          .nullable()
          .min(0, t('validation.min_value', { min: 0 }))
          .transform((_, rawValue: number | string | null) => {
            if (!rawValue || (typeof rawValue === 'string' && !rawValue.length))
              return undefined

            return rawValue
          }),
        sku: yup
          .string()
          .nullable()
          .max(255, t('validation.max', { max: 255 }))
          .when('status', {
            is: (status: ProductStatusEnum) =>
              status === ProductStatusEnum.ACTIVE,
            then: (schema) => schema.required(t('validation.required')),
          }),
        status: yup
          .mixed<ProductStatusEnum>()
          .oneOf(Object.values(ProductStatusEnum))
          .required(),
        media: yup
          .array()
          .of(
            yup
              .object()
              .shape({
                id: yup.number().nullable(),
                file: yup.mixed<File>().nullable(),
                delete: yup.boolean().required(),
                order: yup.number().required(),
              })
              .required(),
          )
          .required(),
      }),

    defaultValues: {
      category_id: 0,
      name: '',
      description: null,
      price: null,
      discounted_price: null,
      status: ProductStatusEnum.DRAFT,
      media: [],
    },
  }

export { saveProductValidation }
