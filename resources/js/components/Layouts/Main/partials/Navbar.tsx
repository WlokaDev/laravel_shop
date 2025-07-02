import {
  Button,
  Navbar as BaseNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@heroui/react'
import { useTranslation } from 'react-i18next'
import { Link } from '@/components'
import { useAuth } from '@/lib/hooks/useAuth'
import { UserDropdown } from './UserDropdown'

const APP_NAME = import.meta.env.VITE_APP_NAME || 'MyApp'

const Navbar = () => {
  const { t } = useTranslation()
  const auth = useAuth()

  return (
    <BaseNavbar maxWidth={'xl'}>
      <NavbarBrand>{APP_NAME}</NavbarBrand>
      <NavbarContent justify={'start'}>
        <NavbarItem>
          <Link href={'/'}>{t('layout.navbar.home')}</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify={'end'}>
        {auth ? (
          <UserDropdown auth={auth} />
        ) : (
          <Button href={'/logowanie'} color={'primary'}>
            {t('layout.navbar.login')}
          </Button>
        )}
      </NavbarContent>
    </BaseNavbar>
  )
}

export { Navbar }
