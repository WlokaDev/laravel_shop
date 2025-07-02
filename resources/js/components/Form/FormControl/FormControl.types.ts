import { FieldErrors, FieldName, FieldValues } from 'react-hook-form'
import React from 'react'
import { FieldValuesFromFieldErrors } from '@hookform/error-message'

export interface FormControlTypes<T extends FieldValues> {
  errors?: FieldErrors<T>
  classNames?: {
    validationMessages?: string
  }
  className?: string
  name: FieldName<FieldValuesFromFieldErrors<FieldErrors<T>>>
  children: React.ReactNode | React.ReactNode[]
}
