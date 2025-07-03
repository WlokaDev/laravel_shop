import { Navbar as BaseNavbar, NavbarBrand, NavbarContent } from '@heroui/react'
import { adminNavbarRoutes } from '@/lib/routes'
import { UserDropdown } from './UserDropdown'
import { NavbarItem } from '../../../NavbarItem'

const APP_NAME = import.meta.env.VITE_APP_NAME || 'MyApp'

const Navbar = () => {
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
