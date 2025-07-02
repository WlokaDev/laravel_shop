import { AuthUserInterface } from '@/features/auth'
import { useTranslation } from 'react-i18next'
import {
  addToast,
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react'
import { useInertiaClient } from '@/lib/hooks'

const UserDropdown = ({ auth }: Readonly<{ auth: AuthUserInterface }>) => {
  const { t } = useTranslation()
  const { post } = useInertiaClient()

  const handleLogout = () => {
    post(
      '/logout',
      {},
      {
        onSuccess: (_, isOk) => {
          if (isOk) {
            addToast({
              description: t('auth.logout.success'),
              color: 'success',
            })
          }
        },
      },
    )
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className={'cursor-pointer'} name={auth.name} />
      </DropdownTrigger>
      <DropdownMenu>
        {auth.role === 'admin' ? (
          <DropdownItem
            href={'/admin/products'}
            title={t('layout.navbar.admin_panel')}
            key={'admin_panel'}
          />
        ) : null}
        <DropdownItem
          onPress={handleLogout}
          title={t('layout.navbar.logout')}
          key={'logout'}
          color={'danger'}
        />
      </DropdownMenu>
    </Dropdown>
  )
}

export { UserDropdown }
