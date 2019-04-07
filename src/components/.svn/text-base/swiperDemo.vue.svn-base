<template>
	<div>
	<headers :back="true">
		<div slot="header" class="headerSon cur">swiperDemo</div>
	</headers>	
	<div class="swiperAll">
		  <swiper :options="swiperOption">
		    <swiper-slide v-for="(slide,index) in sliders" :key="index"><img :src="slide.path" class="img" /></swiper-slide>
		    <div class="swiper-pagination" slot="pagination"></div>
		  </swiper>
	</div>
	</div>
</template>

<script>
	import headers from '../base/header';
	export default {
		data(){
			return {
				sliders:[],
				swiperOption: {},
			}
		},
		components:{
			headers
		},
		methods:{
			init(){
				this.sliders = [
				   {
				   	name:'你在看孤独的风景',
				   	path:require('../assets/img/banner.png')
				   },
				   {
				   	name:'你在看孤独的风景',
				   	path:require('../assets/img/banner.png')
				   },
				   {
				   	name:'你在看孤独的风景',
				   	path:require('../assets/img/banner.png')
				   }
				];
				this.swiperOption = {
				  autoplay:3500,	
		          setWrapperSize:true,
		          loop: true,
		          pagination: {
		            el: '.swiper-pagination'
		          },
		          observeParents:true
				}
			},
		},
		created(){
			this.init();
		}
	}
</script>

<style scoped>
	.swiperAll{
		padding-top: 40px;
	}
	.img{width: 100%;}
</style>