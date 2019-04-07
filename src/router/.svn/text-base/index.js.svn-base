import Vue from 'vue'
import Router from 'vue-router'
import demoList from '../components/demoList'
import echarts from '../components/echarts'
import jquery from '../components/jquery'
import swiperdemo from '../components/swiperDemo'
import popwin from '../components/popwin'
import myconfig from '../components/myConfig'
import login from '../components/login'

import creatEditTask from '../components/creatEditTask'
import stuTask from '../components/stuTask'
import stuTaskDetail from '../components/stuTaskDetail'
import stuTaskList from '../components/stuTaskList'
import taskPage from '../components/taskPage'

import calendar from '../components/calendar'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/taskPage'
    },
    {
    	path: '/login',
      component: login,
      name:'login',
      meta:{
      	isShowbar:false,
      }
    },
    {
    	path: '/taskPage',
      component: taskPage,
      name:'taskPage',
      meta:{
      	isShowbar:true,
      }
    },
    {
	    	path: '/creatEditTask',
	      component: creatEditTask,
	      name:'creatEditTask',
	      meta:{
	      	isShowbar:true,
	      }
    },
    {
    	path: '/stuTask',
      component: stuTask,
      meta:{
      	isShowbar:true,
      }
    },
    {
    	path: '/stuTaskDetail',
      component: stuTaskDetail,
      meta:{
      	isShowbar:true,
      }
    },
    {
    	path: '/stuTaskList',
      component: stuTaskList,
      meta:{
      	isShowbar:true,
      }
    },

    {
     path: '/demoList',
     component: demoList,
     meta:{
      	isShowbar:true,
      }
    },
    {
     path: '/echarts',
     component: echarts,
     meta:{
      	isShowbar:true,
      }
    },
    {
     path: '/jquery',
     component: jquery,
     meta:{
      	isShowbar:true,
      }
    },
    {
     path: '/calendar',
     component: calendar,
     meta:{
      	isShowbar:true,
      }
    },
    {
     path: '/myconfig',
     component: myconfig,
     meta:{
      	isShowbar:true,
      }
    },
    {
			path: '*',
			redirect:'/taskPage',
		}
  ],

})
