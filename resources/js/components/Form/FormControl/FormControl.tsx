import { FieldValues } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { ValidationMessages } from '../ValidationMessages'
import { FormControlTypes } from './FormControl.types'
import { cn } from '@/lib/helpers'

/**
 * Component that wraps form inputs and displays validation messages
 */
const FormControl = <T extends FieldValues>({
  errors,
  classNames,
  className,
  children,
  name,
}: FormControlTypes<T>) => {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {children}
      <ErrorMessage
        name={name}
        errors={errors}
        render={({ messages }) => (
          <ValidationMessages
            className={classNames?.validationMessages}
            messages={messages}
          />
        )}
      />
    </div>
  )
}

export { FormControl }
