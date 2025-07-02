import { cn } from '@/lib/helpers'
import { DropzoneItemInterface } from '../DropzoneDnd.types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import React from 'react'
import { Image } from '@/components'
import { Button } from '@heroui/react'
import { IconX } from '@tabler/icons-react'

const Sortable = ({ item, classNames, onDelete }: DropzoneItemInterface) => {
  const { attributes, listeners, setNodeRef, transition, transform } =
    useSortable({ id: item.itemId })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  if (!item.url) return null

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn('relative size-24', classNames?.imageWrapper)}
    >
      <Image
        src={item.url}
        id={`image-${item.itemId}`}
        fill
        className={classNames?.image}
      />
      {onDelete && (
        <Button
          className={'absolute right-1 top-1 z-10 size-6 min-h-6 min-w-6'}
          size={'sm'}
          isIconOnly
          radius={'full'}
          onPress={onDelete}
          color={'danger'}
        >
          <IconX size={16} color={'white'} />
        </Button>
      )}
    </li>
  )
}

export { Sortable }
