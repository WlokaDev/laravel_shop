import { Nullable } from '@/types'

export interface AuthUserInterface {
  id: number
  name: string
  email: string
  role: Nullable<'admin'>
}

export interface LoginRequestInterface {
  email: string
  password: string
}
