import { AuthUserInterface } from '@/features/auth'
import { useTranslation } from 'react-i18next'
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react'

const UserDropdown = ({ auth }: Readonly<{ auth: AuthUserInterface }>) => {
  const { t } = useTranslation()

  const handleLogout = () => {
    // TODO
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar name={auth.name} />
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem
          onPress={handleLogout}
          title={t('layout.navbar.logout')}
          key={'logout'}
        />
        {auth.role === 'admin' ? (
          <DropdownItem
            href={'/admin/products'}
            title={t('layout.navbar.admin_panel')}
            key={'admin_panel'}
          />
        ) : null}
      </DropdownMenu>
    </Dropdown>
  )
}

export { UserDropdown }
