import { ProductCardPropsInterface } from './ProductCard.types'
import { Card, CardBody, CardFooter } from '@heroui/react'
import { Image, linkHelper } from '@/components'
import { rootRoutes } from '@/lib/routes'

const ProductCard = ({ product }: Readonly<ProductCardPropsInterface>) => {
  return (
    <Card
      as={'a'}
      href={linkHelper({
        href: rootRoutes.products.details.path,
        params: {
          slug: product.slug,
        },
      })}
      shadow={'sm'}
    >
      <CardBody className={'overflow-visible p-0'}>
        {product.main_media ? (
          <Image
            width={'100%'}
            className={'h-[140px] w-full object-cover'}
            radius={'lg'}
            src={product.main_media.url}
          />
        ) : (
          <div
            className={
              'bg-gray-300 w-full h-[140px] flex items-center justify-center rounded-lg'
            }
          >
            <Image width={100} height={100} src={'/images/no-found-icon.svg'} />
          </div>
        )}
      </CardBody>
      <CardFooter>
        <div className={'flex items-center w-full justify-between'}>
          <span className={'font-medium text-sm'}>{product.name}</span>
          <span className={'text-xs font-semibold'}>
            {new Intl.NumberFormat('pl-PL', {
              style: 'currency',
              currency: 'PLN',
            }).format(product.price! / 100)}
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}

export { ProductCard }
