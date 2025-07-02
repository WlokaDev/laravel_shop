import { ReactNode } from 'react'
import { Navbar } from './partials'

const MainLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div className={'flex flex-col gap-4 min-h-dvh'}>
      <Navbar />
      <main className={'flex-1 app-container'}>{children}</main>
    </div>
  )
}

export { MainLayout }
