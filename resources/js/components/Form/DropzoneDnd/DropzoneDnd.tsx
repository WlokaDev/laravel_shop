import React, { Fragment, type ReactNode } from 'react'
import _ from 'lodash'
import { type DropzoneDnDInterface } from './DropzoneDnd.types'
import { Sortable } from './partials/Sortable'
import { closestCenter, DndContext, DragOverlay } from '@dnd-kit/core'
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { useDropzoneHelper } from '@/components/Form/DropzoneDnd/hooks'
import { cn } from '@/lib/helpers'

/**
 * @name DropzoneDnd
 * @description Dropzone component for uploading files
 * If preview not displayed correctly, check the file type and handle it accordingly
 */

const DropzoneDnd = (props: Readonly<DropzoneDnDInterface>): ReactNode => {
  const { sortable, items, dropzone } = useDropzoneHelper(props)

  return (
    <div
      {...dropzone.props.getRootProps({
        className: cn('dropzone overflow-x-auto', props.classNames?.container),
      })}
    >
      <input {...dropzone.props.getInputProps()} />
      <ul className={'flex flex-wrap gap-4 w-full list-none'}>
        <DndContext
          sensors={sortable.sensors}
          collisionDetection={closestCenter}
          onDragEnd={sortable.handleDragEnd}
          onDragStart={sortable.handleDragStart}
          onDragOver={sortable.handleDrag}
        >
          <SortableContext
            items={sortable.items}
            strategy={horizontalListSortingStrategy}
          >
            {items.length ? (
              items.map((item, index) => (
                <Sortable
                  key={index}
                  item={item}
                  classNames={_.pick(props?.classNames, [
                    'imageWrapper',
                    'image',
                  ])}
                  onDelete={() => dropzone.handleRemoveFile(item.itemId)}
                />
              ))
            ) : (
              <Fragment>
                {typeof props.children === 'function'
                  ? props.children(dropzone.props.open)
                  : props.children}
              </Fragment>
            )}
          </SortableContext>
          <DragOverlay>
            {sortable.activeItem ? (
              <Sortable item={sortable.activeItem} />
            ) : null}
          </DragOverlay>
        </DndContext>
      </ul>
    </div>
  )
}

export { DropzoneDnd }
