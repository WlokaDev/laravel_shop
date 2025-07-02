import { TFunction } from 'i18next'
import { AnyObject, Maybe, ObjectSchema } from 'yup'

export type SchemaInterface<T extends Maybe<AnyObject>> = ObjectSchema<
  T,
  AnyObject
>

export interface ValidationInterface<T extends Maybe<AnyObject>> {
  schema: (t: TFunction) => SchemaInterface<T>
  defaultValues: T
}
