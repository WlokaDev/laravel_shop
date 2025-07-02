import { NavbarRouteInterface } from '@/types'
import { rootRoutes } from './rootRoutes'

const adminRoutes = {
  products: {
    list: {
      path: '/admin/products',
      component: 'Admin/Products/List/Page\n',
    },
  },
}

const adminNavbarRoutes: NavbarRouteInterface[] = [
  {
    route: rootRoutes.home,
    content: 'layout.navbar.home',
  },
  {
    route: adminRoutes.products.list,
    content: 'layout.navbar.products',
  },
]

export { adminNavbarRoutes, adminRoutes }
