import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import PagePosts from '../views/PagePosts.vue'
import PageUser from '../views/PageUser.vue'
import PageUsers from '../views/PageUsers.vue'
import firebase from "@/services/firebaseConnection"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/posts/:id/comments',
      name: 'PagePosts',
      component: PagePosts,
      props: true,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/users',
      name: 'PageUsers',
      component: PageUsers,
      meta: {
        requiresAuth: true,
        title: "Postagem completa"
      }
    },
    {
      path: '/user/:id',
      name: 'PageUser',
      component: PageUser,
      props: true,
      meta: {
        requiresAuth: true,
      }
    },
  ]
})

router.beforeEach((to, from, next)=> {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  if(requiresAuth && !firebase.auth().currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
