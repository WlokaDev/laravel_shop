import { ReactNode } from 'react'
import { Navbar } from '@heroui/react'

const AdminLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div className={'flex flex-col gap-4'}>
      <Navbar maxWidth={'full'} />
      <div className={'flex-1 p-4'}>{children}</div>
    </div>
  )
}

export { AdminLayout }
