import { useTranslation } from 'react-i18next'
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react'
import { useAuth } from '@/lib/hooks/useAuth'
import { useInertiaClient } from '@/lib/hooks'

const UserDropdown = () => {
  const { t } = useTranslation()
  const auth = useAuth<true>()
  const { post } = useInertiaClient()

  const handleLogout = () => {}

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className={'cursor-pointer'} name={auth.name} />
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem
          color={'danger'}
          key={'logout'}
          onPress={handleLogout}
          title={t('layout.navbar.logout')}
        />
      </DropdownMenu>
    </Dropdown>
  )
}

export { UserDropdown }
