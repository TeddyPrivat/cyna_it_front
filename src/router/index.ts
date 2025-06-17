import { createRouter, createWebHistory } from 'vue-router'
import Test from '../components/Test.vue'
import User from "../components/User.vue";

import SignIn from '@/components/auth/SignIn.vue';

import Login from "@/views/auth/Login.vue";
// import ListItems from '@/components/Products/ListItems.vue';
import ServiceAndProductDetails from '@/views/Details/ServiceAndProductDetails.vue';
import SignUp from '@/views/auth/SignUp.vue';
import Logout from '@/views/auth/Logout.vue'
import CGU from '@/views/FooterViews/CGU.vue';
import LegalsMentions from '@/views/FooterViews/LegalsMentions.vue';
import DashboardProducts from '@/views/dashboard/DashboardProducts.vue'
import AddProductDialog from '@/components/AddProductDialog.vue';
import NotFound from '@/views/NotFound.vue';
import Accueil from '@/views/Accueil.vue';
import SupportForm from '@/components/SupportForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'liste',
    //   component: ListItems
    // },
    {
      path:"/",
      name:'accueil',
      component: Accueil
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },{
      path: '/test',
      component: Test
    },{
      path: '/users',
      component: User
    },{

      path:'/signin',
      component: SignIn,

    },{
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout,
    },
    {
      path: '/service/:id',
      name: 'service-details',
      component: ServiceAndProductDetails,
      props: route => ({
        id: Number(route.params.id),
        type: 'service'
      })
    },
    {
      path: '/product/:id',
      name: 'product-details',
      component: ServiceAndProductDetails,
      props: route => ({
        id: Number(route.params.id),
        type: 'product'
      })
    },
    {
      path: '/cgu',
      name: 'cgu',
      component: CGU
    },
    {
      path: '/mentions-legales',
      name: 'mentions-legales',
      component: LegalsMentions
    },
    {
      path: '/dashboard/products',
      name: 'DashboardProducts',
      component: DashboardProducts,
      props: {
        type: 'product'
      },
      meta: { requiresAuth: true, roles: ['ROLE_ADMIN'] }
    },
    {
      path: '/dashboard/product/add',
      name: 'DashboardAppProduct',
      component: AddProductDialog,
      meta: { requiresAuth: true, roles: ['ROLE_ADMIN'] }
    },
    {
      path: '/dashboard/services',
      name: 'DashboardServices',
      component: DashboardProducts,
      props: {
        type: 'service'
      },
      meta: { requiresAuth: true, roles: ['ROLE_ADMIN'] }
    },
    {
      path: '/support',
      name: 'Support',
      component: SupportForm
    },
    {
      path: "/dashboard/support/message",
      name: 'DashboardMessageSupport',
      component: DashboardSupportMessages,
      meta: { requiresAuth: true, roles: ['ROLE_ADMIN'] }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ],
  scrollBehavior(to, from, savedPosition) { // Permet d'arriver en haut de chaque page avec le scroll
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
})

export default router
