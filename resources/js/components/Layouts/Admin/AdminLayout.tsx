import { ReactNode } from 'react'
import { Navbar } from './partials'

const AdminLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div className={'flex flex-col gap-4'}>
      <Navbar />
      <div className={'flex-1 p-4'}>{children}</div>
    </div>
  )
}

export { AdminLayout }
