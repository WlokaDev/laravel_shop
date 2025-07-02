import {
  Button,
  Navbar as BaseNavbar,
  NavbarBrand,
  NavbarContent,
} from '@heroui/react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/lib/hooks/useAuth'
import { UserDropdown } from './UserDropdown'
import { NavbarItem } from '../../../NavbarItem'
import { navbarRoutes } from '@/lib/routes'

const APP_NAME = import.meta.env.VITE_APP_NAME || 'MyApp'

const Navbar = () => {
  const { t } = useTranslation()
  const auth = useAuth()

  return (
    <BaseNavbar maxWidth={'xl'}>
      <NavbarBrand>{APP_NAME}</NavbarBrand>
      <NavbarContent justify={'start'}>
        {navbarRoutes.map((props, index) => (
          <NavbarItem key={index} {...props} />
        ))}
      </NavbarContent>
      <NavbarContent justify={'end'}>
        {auth ? (
          <UserDropdown auth={auth} />
        ) : (
          <Button as={'a'} href={'/logowanie'} color={'primary'}>
            {t('layout.navbar.login')}
          </Button>
        )}
      </NavbarContent>
    </BaseNavbar>
  )
}

export { Navbar }
