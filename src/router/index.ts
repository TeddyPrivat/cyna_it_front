import { createRouter, createWebHistory } from 'vue-router'
import User from "../components/User.vue";

import Login from "@/views/Auth/Login.vue";
import ServiceAndProductDetails from '@/views/Details/ServiceAndProductDetails.vue';
import SignUp from '@/views/Auth/SignUp.vue';
import Logout from '@/views/Auth/Logout.vue';
import CGU from '@/views/FooterViews/CGU.vue';
import LegalsMentions from '@/views/FooterViews/LegalsMentions.vue';
import DashboardProducts from '@/views/Dashboard/DashboardProducts.vue'
import AddProductDialog from '@/components/GenericComponents/AddProductDialog.vue';
import NotFound from '@/views/NotFound.vue';
import Unauthorized from '@/views/Unauthorized.vue'
import Accueil from '@/views/Accueil.vue';
import SupportForm from '@/components/MessageSupport/SupportForm.vue'
import DashboardSupportMessages from '@/views/Dashboard/DashboardSupportMessages.vue';
import FieldsProfile from '@/components/Profile/FieldsProfile.vue'
import DashboardSuperAdmin from '@/views/Dashboard/DashboardSuperAdmin.vue';
import ListItems from "@/components/GenericComponents/ListItems.vue";
import Panier from '@/views/Cart/Index.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: Accueil,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/users',
      component: User,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
    },
    {
      path: '/products',
      name: 'productList',
      component: ListItems,
      props:{
        type: 'product'
      }
    },
    {
      path: '/services',
      name: 'serviceList',
      component: ListItems,
      props:{
        type: 'service'
      }
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
      props: (route) => ({
        id: Number(route.params.id),
        type: 'service',
      }),
    },
    {
      path: '/product/:id',
      name: 'product-details',
      component: ServiceAndProductDetails,
      props: (route) => ({
        id: Number(route.params.id),
        type: 'product',
      }),
    },
    {
      path: '/cgu',
      name: 'cgu',
      component: CGU,
    },
    {
      path: '/mentions-legales',
      name: 'mentions-legales',
      component: LegalsMentions,
    },
    //Panier
    {
      path: '/Cart',
      name: 'Cart',
      component: Panier
    },
    {
      path: '/Dashboard/products',
      name: 'DashboardProducts',
      component: DashboardProducts,
      props: {
        type: 'product'
      },
      meta: { requiresAuth: true, roles: ['ROLE_ADMIN'] }
    },
    {
      path: '/Dashboard/product/add',
      name: 'DashboardAppProduct',
      component: AddProductDialog,
      meta: { requiresAuth: true, roles: ['ROLE_ADMIN'] }
    },
    {
      path: '/Dashboard/services',
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
      path: '/Dashboard/support/message',
      name: 'DashboardMessageSupport',
      component: DashboardSupportMessages,
      meta: { requiresAuth: true, roles: ['ROLE_ADMIN'] }
    },
    {
      path: '/unauthorized',
      name: 'Unauthorized',
      component: Unauthorized
    },
    {
      path: '/profile',
      name: 'Profile',
      component: FieldsProfile,
      meta: { requiresAuth: true}
    },
    {
      path: '/Dashboard/superadmin',
      name: 'DashboardSuperAdmin',
      component: DashboardSuperAdmin,
      meta: { requiresAuth: true, roles: ['ROLE_ADMIN'] }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // Permet d'arriver en haut de chaque page avec le scroll
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})
router.beforeEach((to, from, next) => {
  const jwt = localStorage.getItem('jwt');
  const isLoggedIn = !!jwt;

  const userRoles: string[] = JSON.parse(localStorage.getItem('roles') || '[]');

  // Vérifie si la route nécessite une authentification
  if (to.meta.requiresAuth && !isLoggedIn) {
    return next('/login');
  }

  // Vérifie les rôles requis pour cette route
  if (to.meta.roles && Array.isArray(to.meta.roles)) {
    const hasAccess = to.meta.roles.some((role: string) => userRoles.includes(role));
    if (!hasAccess) {
      console.warn('Accès refusé : rôles insuffisants', userRoles);
      return next('/unauthorized');
    }
  }

  return next();
});


export default router
