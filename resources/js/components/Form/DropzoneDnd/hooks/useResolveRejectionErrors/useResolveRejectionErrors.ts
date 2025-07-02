import { ErrorCode, FileRejection } from 'react-dropzone'
import { useTranslation } from 'react-i18next'
import { DropzoneDnDInterface } from '../../DropzoneDnd.types'
import { match } from 'ts-pattern'
import _ from 'lodash'

const useResolveRejectionErrors = ({
  acceptMinFiles,
  maxFiles,
  maxSize,
  accept,
}: Pick<
  DropzoneDnDInterface,
  'maxFiles' | 'maxSize' | 'acceptMinFiles' | 'accept'
>) => {
  const { t } = useTranslation()
  const mapAccept = Object.entries(accept)
    .map(([key, values]) => {
      const ext = values.map((value) => value.replace('.', '')).join(', ')

      return `${ext}, ${key}`
    })
    .join(',')

  return (fileRejections: FileRejection[]) => {
    const errors = fileRejections.map((fileRejection) => {
      return fileRejection.errors.map((error) => {
        const message = match(error.code)
          .with(ErrorCode.TooManyFiles, () => {
            // if (acceptMinFiles) {
            //     onChange([fileRejections[0].file])
            //
            //     return t('form.validations.max_files_post_adding', {
            //         max: maxFiles,
            //     })
            // }
            //
            // onChange(
            //     _.take(
            //         fileRejections.map((file) => file.file),
            //         maxFiles,
            //     ),
            // )

            return t('form.validations.max_files', {
              max: maxFiles,
            })
          })
          .with(ErrorCode.FileTooLarge, () =>
            t('form.validations.file_too_large', {
              max: maxSize! / 1024 / 1024,
            }),
          )
          .with(ErrorCode.FileInvalidType, () =>
            t('form.validations.file_extension', {
              allowedExtensions: mapAccept,
            }),
          )
          .with(ErrorCode.FileTooSmall, () =>
            t('form.validations.file_too_small'),
          )
          .otherwise(() => t('form.validations.unknown_error'))

        return { code: error.code, message }
      })
    })

    const resolvedErrors: Record<string, string> = {}

    _.uniqBy(errors.flat(), 'code').forEach((error) => {
      Object.assign(resolvedErrors, {
        [error.code]: error.message,
      })
    })

    return resolvedErrors
  }
}

export { useResolveRejectionErrors }
