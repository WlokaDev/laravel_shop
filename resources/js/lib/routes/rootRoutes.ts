import { NavbarRouteInterface } from '@/types'

const rootRoutes = {
  auth: {
    logout: '/logout',
  },
  home: {
    path: '/',
    component: 'Home/Page',
  },
}

const navbarRoutes: NavbarRouteInterface[] = [
  {
    route: rootRoutes.home,
    content: 'layout.navbar.home',
  },
]

export { rootRoutes, navbarRoutes }
