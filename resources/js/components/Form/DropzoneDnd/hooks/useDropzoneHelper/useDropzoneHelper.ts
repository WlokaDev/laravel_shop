import { useEffect, useState } from 'react'
import _ from 'lodash'
import {
  DropzoneDnDInterface,
  SortableInterface,
} from '../../DropzoneDnd.types'
import { useDropzone } from 'react-dropzone'
import { useResolveRejectionErrors } from '../useResolveRejectionErrors'
import {
  DragOverEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { Nullable } from '@/types'
import { arrayMove } from '@dnd-kit/sortable'

const useDropzoneHelper = ({
  files = [],
  maxFiles,
  maxSize,
  accept,
  onChange,
  acceptMinFiles,
}: DropzoneDnDInterface) => {
  const [items, setItems] = useState<SortableInterface[]>(
    files
      .map((file) => ({
        ...file,
        itemId: crypto.randomUUID(),
        delete: false,
      }))
      .sort((a, b) => a.order - b.order),
  )
  const visibleItems = _.filter(items, (item) => !item.delete)
  const sortableItems = visibleItems.map((item) => ({
    id: item.itemId,
  }))

  const [activeId, setActiveId] = useState<Nullable<UniqueIdentifier>>(null)
  const activeItem = visibleItems.find((item) => item.itemId === activeId)

  const handleRemoveFile = (id: string) => {
    setItems((prev) => {
      const item = prev.find((item) => item.itemId == id)

      if (!item) return prev

      if (!item.id) {
        return prev.filter((item) => item.itemId !== id)
      }

      const items = prev.map((item) => {
        if (item.itemId === id) {
          return {
            ...item,
            delete: true,
          }
        }
        return item
      })

      return reorderItems(items)
    })
  }

  const reorderItems = (items: SortableInterface[]) => {
    const deletedItems = items.filter((item) => item.delete)
    const visibleItems = items.filter((item) => !item.delete)

    return _(visibleItems)
      .map((item, index) => ({
        ...item,
        order: index,
      }))
      .concat(deletedItems)
      .value()
  }

  const onDropAccepted = (files: File[]) => {
    setItems((prev) => {
      return [
        ...prev,
        ...files.map((file) => ({
          file,
          url: URL.createObjectURL(file),
          itemId: crypto.randomUUID(),
          order: visibleItems.length,
          delete: false,
        })),
      ]
    })
  }

  const resolvedErrors = useResolveRejectionErrors({
    accept,
    maxFiles,
    maxSize,
    acceptMinFiles,
  })

  const dropzone = useDropzone({
    onDropAccepted,
    accept: accept,
    multiple: true,
    maxFiles: maxFiles,
    onDropRejected: (fileRejections) => resolvedErrors(fileRejections),
    maxSize,
  })

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
  )

  const handleDragStart = (event: DragStartEvent) =>
    setActiveId(event.active.id as UniqueIdentifier)

  const handleDragEnd = () => setActiveId(null)

  const handleDrag = (event: DragOverEvent) => {
    if (!onChange || !event.over) return

    const { active, over } = event

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.itemId === active.id)
        const newIndex = items.findIndex((item) => item.itemId === over.id)

        return reorderItems(arrayMove(items, oldIndex, newIndex))
      })
    }
  }

  useEffect(() => {
    if (!onChange) return

    onChange(
      _(items)
        .map((item) => _.omit(item, ['itemId']))
        .value(),
    )
  }, [items])

  return {
    items: visibleItems,
    dropzone: {
      props: dropzone,
      onDropAccepted,
      handleRemoveFile,
    },
    sortable: {
      handleDrag,
      handleDragEnd,
      handleDragStart,
      sensors,
      items: sortableItems,
      activeItem,
    },
  }
}

export { useDropzoneHelper }
