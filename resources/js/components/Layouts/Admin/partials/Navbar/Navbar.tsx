import { Navbar as BaseNavbar, NavbarBrand, NavbarContent } from '@heroui/react'
import { useTranslation } from 'react-i18next'
import { usePage } from '@inertiajs/react'
import { adminNavbarRoutes } from '@/lib/routes'
import { UserDropdown } from './UserDropdown'
import { NavbarItem } from '../../../NavbarItem'

const APP_NAME = import.meta.env.VITE_APP_NAME || 'MyApp'

const Navbar = () => {
  const { t } = useTranslation()
  const { component } = usePage()

  return (
    <BaseNavbar maxWidth={'xl'}>
      <NavbarBrand>{APP_NAME}</NavbarBrand>
      <NavbarContent justify={'start'}>
        {adminNavbarRoutes.map((props, index) => (
          <NavbarItem {...props} key={index} />
        ))}
      </NavbarContent>
      <NavbarContent justify={'end'}>
        <UserDropdown />
      </NavbarContent>
    </BaseNavbar>
  )
}

export { Navbar }
