import { MainLayout } from '@/components/Layouts/Main'
import { PaginationInterface } from '@/types'
import { ProductCard, ProductInterface } from '@/features/products'

type Props = Readonly<{
  data: PaginationInterface<ProductInterface>
}>

const HomePage = ({ data }: Props) => {
  return (
    <MainLayout>
      <div className={'grid lg:grid-cols-6 gap-4 p-8'}>
        {data.data.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </MainLayout>
  )
}

export default HomePage
