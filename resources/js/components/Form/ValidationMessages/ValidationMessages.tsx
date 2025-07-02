import { FC } from 'react'
import { MultipleFieldErrors } from 'react-hook-form'
import { InvalidMessage } from './InvalidMessage'
import { cn } from '@/lib/helpers'

const ValidationMessages: FC<{
  messages: MultipleFieldErrors | undefined
  className?: string
}> = ({ messages, className }) => {
  if (!messages) return null

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {Object.entries(messages).map(([type, message]) => (
        <InvalidMessage message={message} key={type} />
      ))}
    </div>
  )
}

export { ValidationMessages }
