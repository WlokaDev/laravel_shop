import { InertiaLinkProps } from '@inertiajs/react'
import qs from 'qs'
import {
  CSSProperties,
  HTMLAttributeAnchorTarget,
  HTMLAttributeReferrerPolicy,
  ReactNode,
} from 'react'

export interface LinkTypes extends InertiaLinkProps {
  queryParams?: Record<string, string | number | string[]>
  params?: Record<string, string | number>
  children?: ReactNode
  className?: string
  referrerPolicy?: HTMLAttributeReferrerPolicy
  target?: HTMLAttributeAnchorTarget
  isExternal?: boolean
  style?: CSSProperties
  qsOptions?: qs.IStringifyOptions<qs.BooleanOptional>
  locale?: string
}

export interface LinkHelperPropsInterface {
  href: string
  params?: Record<string, string | number>
  queryParams?: Record<string, string | number | string[]>
  locale?: string
  isExternal?: boolean
  qsOptions?: qs.IStringifyOptions<qs.BooleanOptional>
}
