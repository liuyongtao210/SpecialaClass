// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import ECharts from 'vue-echarts/components/ECharts'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css';
import './assets/css/common.css';
import WeuiModel from './model/weuiModel/weuiModel.js';
import common from './model/common/common.js';
import md5 from 'js-md5';
import './model/filters/filters.js'
Vue.prototype.md5 = md5;
Vue.prototype.common = common;
Vue.prototype.WeuiModel = WeuiModel;
Vue.config.productionTip = false;
Vue.use(VueAwesomeSwiper);
window.eventBus = new Vue();
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>',
	created() {
		this.checkLogin();
	},
	methods: {
		checkLogin() {
			//此处可以加个校验是否token过期了 并且有没有token不然的话 就不走这个路由了
			router.beforeEach((to,from,next)=>{
				if(!this.checkInfo()) {
					if(to.path != '/login') {
						let obj = {};
						obj['prepath'] = from.path;
						obj['query'] = from.query;
						obj = JSON.stringify(obj);
						sessionStorage.setItem('prepathInfo', obj);
						next({
							path: '/login'
						});
					} else {
						next();
					}
	
				}else{
					next();
				}
			})
		},
		checkInfo() {
			let userId = this.common.getCookie('userId');
			let token = this.common.getCookie('token');
			if(userId && token && userId != '' && token != '') {
				return true;
			} else {
				return false;
			}
		}
	}
})