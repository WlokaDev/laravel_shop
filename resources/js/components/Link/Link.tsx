import { cn } from '@/lib/helpers'
import { Link as InertiaLink } from '@inertiajs/react'
import qs from 'qs'
import { type FC } from 'react'
import { LinkHelperPropsInterface, type LinkTypes } from './Link.types'

/**
 * Helper function to build a link with params and query params
 */
const linkHelper = ({
  href,
  params,
  queryParams,
  qsOptions,
  isExternal,
  locale,
}: LinkHelperPropsInterface): string => {
  let newHref = href

  if (locale) {
    newHref = `/${locale}${newHref}`
  }

  if (params) {
    Object.keys(params).forEach((key) => {
      newHref = newHref.replace(`:${key}`, params[key].toString())
    })
  }

  if (queryParams) {
    const searchParamsString = qs.stringify(queryParams, qsOptions)

    newHref += newHref.includes('?')
      ? `&${searchParamsString}`
      : `?${searchParamsString}`
  }

  return isExternal ? `${import.meta.env.VITE_APP_URL}${newHref}` : newHref
}

const Link: FC<LinkTypes> = (props) => {
  const {
    queryParams,
    qsOptions,
    isExternal,
    params,
    href,
    locale,
    className,
    ...rest
  } = props

  if (!props || !href) return null

  const newHref = linkHelper({
    href: href as string,
    params,
    queryParams,
    qsOptions,
    isExternal,
    locale,
  })

  const classNames = cn('no-underline hover:text-blue-500', className)

  return (
    <InertiaLink
      className={classNames}
      {...rest}
      href={newHref}
      {...(isExternal
        ? {
            target: '_blank',
            referrerPolicy: 'no-referrer',
          }
        : {})}
    />
  )
}

export { Link, linkHelper }
