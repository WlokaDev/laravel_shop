import { type ReactNode } from 'react'
import { MediaInterface, MediaRequestInterface } from '@/types'

export interface DropzoneDnDInterface {
  onChange: (value: MediaRequestInterface[]) => void
  accept: Record<string, string[]>
  files?: MediaInterface[]
  onDeleteImageClick?: (index: number) => void
  maxFiles?: number
  maxSize?: number
  onRejected?: (errors: Record<string, string>) => void
  children?: ((open: () => void) => ReactNode) | ReactNode
  classNames?: {
    imageWrapper?: string
    image?: string
    container?: string
  }
  showPlusIcon?: boolean
  acceptMinFiles?: boolean
}

export interface SortableInterface extends MediaRequestInterface {
  itemId: string
}

export interface DropzoneItemInterface {
  item: SortableInterface
  classNames?: {
    imageWrapper?: string
    image?: string
  }
  onDelete?: () => void
}
