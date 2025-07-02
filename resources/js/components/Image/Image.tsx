import { ImageProps } from './Image.types'
import { Image as BaseImage } from '@heroui/react'
import { cn } from '@/lib/helpers'
import _ from 'lodash'

const Image = ({ fill, classNames, ...rest }: Readonly<ImageProps>) => {
  return (
    <BaseImage
      classNames={{
        img: cn(classNames?.img, {
          'absolute w-full h-full': fill,
        }),
        wrapper: cn(classNames?.wrapper, {
          'absolute w-full h-full !min-w-full': fill,
        }),
        ..._.omit(classNames, ['img', 'wrapper']),
      }}
      loading={'eager'}
      radius={'none'}
      {...rest}
    />
  )
}

export { Image }
