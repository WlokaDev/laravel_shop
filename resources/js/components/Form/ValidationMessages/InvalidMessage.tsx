import { FC } from 'react'
import { ValidateResult } from 'react-hook-form'
import { IconAlertCircle } from '@tabler/icons-react'

const InvalidMessage: FC<{
  message: string | ValidateResult
}> = ({ message }) => {
  return (
    <div className={'flex items-center gap-1'}>
      <IconAlertCircle size={20} className={'text-danger'} />
      <span className={'text-xs text-danger'}>{message}</span>
    </div>
  )
}

export { InvalidMessage }
