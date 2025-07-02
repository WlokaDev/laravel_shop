import { usePage } from '@inertiajs/react'

const usePathname = () => {
  const { url } = usePage()

  return new URL(`${import.meta.env.VITE_APP_URL}${url}`).pathname
}

export { usePathname }
