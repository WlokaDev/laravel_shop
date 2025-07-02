import { IconProps } from '@tabler/icons-react'
import { FC } from 'react'

export interface NavbarRouteInterface {
  route: {
    path: string
    component: string
  }
  content: string
  icon?: FC<IconProps>
}
