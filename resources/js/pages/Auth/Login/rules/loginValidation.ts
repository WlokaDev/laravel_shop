import { ValidationInterface } from '@/types'
import { LoginRequestInterface } from '@/features/auth'
import * as yup from 'yup'

const loginValidation: ValidationInterface<LoginRequestInterface> = {
  schema: (t) =>
    yup.object().shape({
      email: yup
        .string()
        .email(t('validation.email'))
        .required(t('validation.required')),
      password: yup
        .string()
        .min(8, t('validation.min', { min: 8 }))
        .required(t('validation.required')),
    }),

  defaultValues: {
    email: '',
    password: '',
  },
}

export { loginValidation }
