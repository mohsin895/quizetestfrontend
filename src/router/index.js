import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/mainLayout.vue'
import EmployeeLayout from '../layout/EmployeeLayout.vue'
import Heropage from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import DashboardEmployee from '../views/Employee/Dashboard.vue'

import NotFound from '../views/Notfound.vue'


//Quize
import QuizeList from '../views/Quize/index.vue'
import QuestionList from '../views/Quize/questionList.vue'
import UserQuestionList from '../views/Quize/question.vue'
import Registration from '../views/registration.vue'
import AnswerSheet from '../views/Quize/answerSheet.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
       path:'/',
       name:'login',
       component: Heropage
    },
    {
      path:'/user/registration',
      name:'Registration',
      component: Registration
   },
    {
      path: '/erp',
      name: 'home',
      component: Layout,
      children:[
        {
          path:'',
          name:'Dashboard',
          component: Dashboard
        },
        {
          path:'quize/list',
          name:'QuizeList',
          component: QuizeList
        },

        {
          path:'question/:dataId/edit',
          name:'QuestionList',
          component: QuestionList
        },
       
      ]
    },

    {
      path: '/erp/employee',
      name: 'EmployeeLayout',
      component: EmployeeLayout,
      children:[
        {
          path:'dashboard',
          name:'DashboardEmployee',
          component: DashboardEmployee
        },

        {
          path:'question/:dataId/edit',
          name:'UserQuestionList',
          component: UserQuestionList
        },

        {
          path:'answer/:dataId/sheet',
          name:'AnswerSheet',
          component: AnswerSheet
        },

      ]
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ]
})

export default router
