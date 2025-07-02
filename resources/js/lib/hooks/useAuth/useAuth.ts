import { usePage } from '@inertiajs/react'
import { Nullable } from '@/types'
import { AuthUserInterface } from '@/features/auth'

const useAuth = <T extends boolean = false>() => {
  const {
    props: { auth },
  } = usePage<{
    auth: T extends true ? AuthUserInterface : Nullable<AuthUserInterface>
  }>()

  return auth
}

export { useAuth }
