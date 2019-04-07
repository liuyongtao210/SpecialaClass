<template>
	<div id="app" class="course_pad">
		<template v-if="$route.meta.isShowbar">
			<topbar :avatar="avatar" :name="name" :roleType="roleType"></topbar>
		    <tab></tab>
		</template>
		<router-view></router-view>
		
	</div>
</template>

<script>
	import tab from './base/tab';
	import topbar from './base/topbar';
	export default {
		data(){
			return {
				avatar:'',
				name:'',
				roleType:'',
				userId:'',
				token:'',
				role:-1,
				userInfo:{}
			}
			
		},
		components:{
			tab,
			topbar
		},
		methods:{
			getUserInfo(){
				let sn = this.role==3 ? "FrontUser" : "ResCourse";
				this.common.request(sn, "getUserInfo", {userId:this.userId , token:this.token}, (data)=>{
					if(data.code==0){
						this.userInfo = data;
						let userInfo = JSON.stringify(this.userInfo)
						localStorage.setItem("userInfo",userInfo);
						this.getUsers(this.userInfo);
						
					}else{
						this.WeuiModel.showAlert('获取信息失败','','确定');
					}
				})
			},
			getUsers(userInfo){
				if(userInfo.path == '' || userInfo.userImg == '' || !userInfo.userImg){
					this.avatar = require('./assets/img/bar/topbarAvatar.png');
				}else{
					this.avatar = userInfo.path + userInfo.userImg;
				}
				this.roleType = this.common.getCookie("role") == 1 ? '老师' : this.common.getCookie("role") == 2 ? 'TA' : '学生';
				this.name = userInfo.userName;
		  },
		},
		
		created(){
			let userInfo_ = JSON.parse(localStorage.getItem('userInfo')); 
			if(userInfo_ && this.common.getCookie("userId") && this.common.getCookie("token")){
				this.getUsers(userInfo_);
			}
             eventBus.$on('userInfoFn',()=>{
	             this.userId = this.common.getCookie("userId");
				 this.token = this.common.getCookie("token");
				 this.role = this.common.getCookie("role");
             	 this.getUserInfo();
             })
			 
		},
		
	}
</script>

<style>
	.course_pad{
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100vh;
		/*padding-left: 91px;*/
	}
	.headerSon {
		flex: 1;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
	
	.headerSon.cur {
		padding-right: 40px;
	}
	
	.fadeIn-enter {
		opacity: 0;
	}
</style>