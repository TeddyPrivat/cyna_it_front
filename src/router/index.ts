import { createRouter, createWebHistory } from 'vue-router'
import Test from '../components/Test.vue'
import User from "../components/User.vue";
import Login from "@/views/auth/Login.vue";
import ListItems from '@/components/Products/ListItems.vue';
import ServiceDetails from '@/views/Services/ServiceDetails.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'liste',
      component: ListItems
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
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/service/:id',
      name: 'service-details',
      component: ServiceDetails,
      props: true
    },
  ],
})

export default router
