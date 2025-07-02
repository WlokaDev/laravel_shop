import { NavbarRouteInterface } from '@/types'
import { useTranslation } from 'react-i18next'
import { Link } from '@/components'
import { usePage } from '@inertiajs/react'
import { NavbarItem as BaseNavbarItem } from '@heroui/react'

const NavbarItem = ({
  route,
  content,
  icon: Icon,
}: Readonly<NavbarRouteInterface>) => {
  const { t } = useTranslation()
  const { component } = usePage()

  return (
    <BaseNavbarItem isActive={component.trim() === route.component.trim()}>
      <Link className={'flex gap-1 items-center'} href={route.path}>
        {Icon && <Icon size={16} />}
        <span>{t(content)}</span>
      </Link>
    </BaseNavbarItem>
  )
}

export { NavbarItem }
