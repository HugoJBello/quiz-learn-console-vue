import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import CoursesMenu from '../views/CoursesMenu.vue'
import QuizzProgress from "@/views/QuizzProgress.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import LessonConsole from "@/views/LessonConsole.vue";
import LessonEdit from "@/views/LessonEdit.vue";
import QuizEdit from "@/views/QuizEdit.vue";
import PartEdit from "@/views/PartEdit.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Console',
    component: CoursesMenu
  },
  {
    path: '/quizz-progress',
    name: 'QuizzProgress',
    component: QuizzProgress
  },
  {
    path: '/lesson_console/:courseId',
    name: 'LessonConsole',
    component: LessonConsole
  },
  {
    path: '/lesson/:action/:courseId/:id',
    name: 'LessonEdit',
    component: LessonEdit
  },
  {
    path: '/quiz/edit/:quizType/:lessonId/:id',
    name: 'QuizEdit',
    component: QuizEdit
  },
  {
    path: '/part/edit/:action/:lessonId/:partNumber/:id',
    name: 'PartEdit',
    component: PartEdit
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
