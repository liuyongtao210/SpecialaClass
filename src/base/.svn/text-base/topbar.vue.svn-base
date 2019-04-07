<template>
	<div class="topBar_pad">
		<div class="topBar_frame">
			<div class="topBar_frame_left">SACLASS ·特优生课堂</div>
			<div class="topBar_frame_right">
				<img :src="avatar" />
				<div class="topBar_frame_name">{{name}}<span>{{roleType}}</span><div class="bg_border"></div></div>
				<div class="topBar_btn" @click="exit">退出</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			exit(){
				this.common.clearCookie('userId');
				this.common.clearCookie('token');
//				this.common.clearCookie('role');
				localStorage.removeItem('userInfo');
				this.$router.push({
					path:'/login'
				})
			}
		},
		props:{
			avatar:{
			    required:true,
				default:''
			},
			name:{
				required:true,
				default:''
			},
			roleType:{
				required:true,
				default:''
			}
		}
	}
</script>

<style scoped>
	.topBar_pad{
	    width: 100%;
	    height: 67px;
	    min-height: 67px;
	    box-sizing: border-box;
	    background: #ffffff;
	    display: flex;
	    align-items: center;
	    box-shadow: 0 1px 6px rgba(100,100,100,0.1);
	    padding-left: 91px;
	}
	.topBar_frame{
		padding: 0 22px 0 30px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}
	.topBar_frame_left{
		font-size: 16px;
		color: #333;
	}
	.topBar_frame_right{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: 67px;
	}
	.topBar_frame_right img{
		width: 30px;
		height: 30px;
		border-radius: 30px;
	}
	.topBar_frame_name{
		padding: 0px 20px;
		font-size: 18px;
		color: #333;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items:baseline;
	}
	.bg_border{
		width: 1px;
		height: 12px;
		border-right: solid 1px #999999;
		padding-left: 20px;
	}
	.topBar_frame_name span{
		 font-size: 12px;
         color: #999999;
         padding-left: 4px;
	}
	.topBar_btn{
		width: 80px;
	    height: 26px;
	    line-height: 23px;
	    color: #999999;
	    font-size: 14px;
	    border: solid 1px #999999;
	    cursor: pointer;
	    text-align: center;
	    border-radius: 2px;
	    margin: 0;
	    transition: background-color .3s, color .3s;
	}
	.topBar_btn:hover{
		background: #999999;
	    color: #FFFFFF;
	}
</style>