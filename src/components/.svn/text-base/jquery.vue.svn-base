<template>
	<div>
	    <headers :back="true">
	    	<div slot="header" class="headerSon cur">jquery</div>
	    </headers>
		<p class="text">{{msg}}</p>
	</div>
</template>

<script>
	import headers from '../base/header'
	export default {
		data(){
			return {
				msg:'你的$由我来守护'
			}
		},
		components:{
			headers
		},
		mounted(){
			this.$nextTick(()=>{
				console.log($('.text').text())
			})
		}
	}
</script>

<style scoped>
 .text{
 	padding:60px 0 0 0;
 	margin: 0;
 	
 }
</style>