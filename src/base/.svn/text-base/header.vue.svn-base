<template>
	<div class="header"  >
			<div class="back" v-if="back" @click="goback"></div>
		<slot name="header"></slot>
	</div>
</template>

<script>
	export default {
		data(){
			return {

			}
		},
		props:{
			back:{
				type:Boolean,
			    default:false,
			    required:true
			}

		},
		methods:{
			goback(){
				this.$router.go(-1);
			}
		},

	}
</script>

<style scoped>
	.header{
		background: #AFD9EE ;
		height: 40px;
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;
		text-align: center;
		line-height: 40px;
		font-weight: bold;
		display: flex;
		flex-direction: row;
		align-items: center;
		z-index: 200;
	}
	.back{
		background: url(../assets/img/backButton_white.png) no-repeat  center;
		background-size:20px auto;
		width: 44px;
		height: 40px;
	}
</style>
