import { MediaInterface, MediaRequestInterface, Nullable } from '@/types'
import { CategoryInterface } from '@/features/categories'
import { ProductStatusEnum } from './enums'

export interface ProductInterface {
  id: number
  user_id: number
  category_id: number
  category?: CategoryInterface
  name: string
  sku: Nullable<string>
  status: ProductStatusEnum
  description: Nullable<string>
  slug: string
  price: Nullable<number>
  discounted_price: Nullable<number>
  created_at: string
  media?: MediaInterface[]
  main_media?: Nullable<MediaInterface>
}

export interface SaveProductRequestInterface {
  category_id: number
  name: string
  sku?: Nullable<string>
  description?: Nullable<string>
  price?: Nullable<number>
  discounted_price?: Nullable<number>
  status: ProductStatusEnum
  media: MediaRequestInterface[]
}
