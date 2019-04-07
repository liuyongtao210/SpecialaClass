<template>
	<div class="login_pad">
		
		<div class="login_frame">
			<div class="login_logo"></div>
			<div class="login_name"></div>
			<div class="login_top">
				<div :class="role == 3 ? 'login_title cur' : 'login_title'" @click="choiceType(3)">学生</div>
				<div :class="role != 3 ? 'login_title cur' : 'login_title'" @click="choiceType(1)">老师</div>
				<div :class="role == 3 ? 'login_topBar' : 'login_topBar cur' "></div>
			</div>
			<div class="login_box">
				<template v-if="role == 3">
					<div class="login_box_name">账号</div>
					<div class="login_box_input">
						<input type="text" v-model="accountInfo.Stuaccount" placeholder="请输入账号" @input="inputTxt(0)" @blur="outPutTxt" />
						<template v-if="accountInfo.Stuaccount.length != 0">
							<div class="login_delete" @click="deleteWord"></div>
						</template>
						<template v-if="animateAccount">
							<div class="login_line"></div>
						</template>
					</div>
					
					<div class="login_box_name">密码</div>
					<div class="login_box_input ">
						<input :type="accountInfo.StuisEyePwd ? 'text' : 'password'" v-model="accountInfo.Stupwd" placeholder="请输入密码" @input="inputTxt(1)" @blur="outPutTxt" />
						<div :class="accountInfo.StuisEyePwd ? 'login_eye cur' : 'login_eye'" @click="eyePwd"></div>
						<template v-if="animatePwd">
							<div class="login_line"></div>
						</template>
					</div>
					<div class="login_box_remember">
						<div :class="accountInfo.StuisRemember ? 'cur' : ''" @click="rememberClick">记住账号</div>
					</div>
				</template>
				<!--学生-->
				<template v-else>
					<div class="login_box_name">账号</div>
					<div class="login_box_input">
						<input type="text" v-model="accountInfo.TEAaccount" placeholder="请输入账号" @input="inputTxt(0)" @blur="outPutTxt" />
						<template v-if="accountInfo.TEAaccount.length != 0">
							<div class="login_delete" @click="deleteWord"></div>
						</template>
						<template v-if="animateAccount">
							<div class="login_line"></div>
						</template>
					</div>
					
					<div class="login_box_name">密码</div>
					<div class="login_box_input">
						<input :type="accountInfo.TEAisEyePwd ? 'text' : 'password'" v-model="accountInfo.TEApwd" placeholder="请输入密码" @input="inputTxt(1)" @blur="outPutTxt" />
						<div :class="accountInfo.TEAisEyePwd ? 'login_eye cur' : 'login_eye'" @click="eyePwd"></div>
						<template v-if="animatePwd">
							<div class="login_line"></div>
						</template>
					</div>
					<div class="login_box_remember">
						<div :class="accountInfo.TEAisRemember ? 'cur' : ''" @click="rememberClick">记住账号</div>
					</div>
				</template>
				<div class="login_btn" @click="login">
					登录
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				accountInfo:{},
				animateAccount:false,
				animatePwd:false,
				role:3,//默认学生
			}
		},
		created(){
			this.accountInfo = {
				StuisEyePwd:false,
				TEAisEyePwd:false,
				Stuaccount :'',
				Stupwd:'',
				StuisRemember:false,
				TEAisRemember:false,
				TEAaccount :'',
				TEApwd:'',
			};
			this.init();
		},
		methods:{
			init(){
				let role = this.common.getCookie('role');
				let stuaccount = this.common.getCookie('phone');
				let stupwd = this.common.getCookie('pwdStu');
				let proaccount = this.common.getCookie('userName_');
				let propwd = this.common.getCookie('pwdTA');
				if(role){
					if(role == 3){
						this.role = 3;
						if(stuaccount && stupwd){
							this.accountInfo.Stuaccount = stuaccount;
							this.accountInfo.Stupwd = stupwd;
							this.accountInfo.TEAisRemember = false;
							this.accountInfo.StuisRemember = true;
						}
					}else{
						this.role = 1;
						if(proaccount && propwd){
							this.accountInfo.TEAaccount = proaccount;
							this.accountInfo.TEApwd = propwd;
							this.accountInfo.TEAisRemember = true;
							this.accountInfo.StuisRemember = false;
						}
					}
				}
			},
			checkInfo(){
				if(this.role == 3){ //学生端登录
					if(this.accountInfo.Stuaccount == ''){
						this.WeuiModel.showAlert('账号不能为空','请填写账号','确定');
						return false;
					}
					if(this.accountInfo.Stupwd == ''){
						this.WeuiModel.showAlert('密码不能为空','请填写密码','确定');
						return false;
					}
				} else {
					if(this.accountInfo.TEAaccount == ''){
						this.WeuiModel.showAlert('账号不能为空','请填写账号','确定');
						return false;
					}
					if(this.accountInfo.TEApwd == ''){
						this.WeuiModel.showAlert('密码不能为空','请填写密码','确定');
						return false;
					}
				}
				return true;
			},
			login(){
			   if(this.checkInfo()){
			      this.loginAjax();
			   }
			},
			loginAjax(){
				let {obj,objSN} = this.hadleAjaxquery();
				this.WeuiModel.showLoad('正在登录...');
				this.common.request(objSN.sn_, objSN.mn, obj, (data)=>{
					this.WeuiModel.hideLoad();
					if(data.code==0){
						this.WeuiModel.showToast('登录成功');
						this.common.setCookie("userId", data.userIds, 24);
						this.common.setCookie("token", data.token, 24);
						this.common.setCookie("role", data.role, 24);
						eventBus.$emit('userInfoFn');
						this.$router.push({path:'/taskPage'});
					}else{
						this.WeuiModel.showAlert('登录失败', data.msg, '确定');
					}
				})
			},
			hadleAjaxquery(){
				let obj = {};
				let objSN = {};
				obj.source = 'CENTER';
				if(this.role == 3){
					objSN.sn_ = 'FrontUser';
					objSN.mn = 'login';
					obj.phone = this.accountInfo.Stuaccount;
					obj.pwd = this.md5(this.accountInfo.Stupwd);
					obj.userAgent = "ClassCenter";
					this.common.clearCookie('userName_');
					this.common.clearCookie('pwdTA');
					if(this.accountInfo.StuisRemember){
						this.common.setCookie('phone',this.accountInfo.Stuaccount,168);
						this.common.setCookie('pwdStu',this.accountInfo.Stupwd,168);
					}else{
						this.common.clearCookie('phone');
					    this.common.clearCookie('pwdStu');
					}
				}else{
					objSN.sn_ = 'Login';
					objSN.mn = 'login';
					obj.userName = this.accountInfo.TEAaccount;
					obj.pwd = this.md5(this.accountInfo.TEApwd);
					this.common.clearCookie('phone');
					this.common.clearCookie('pwdStu');
					if(this.accountInfo.TEAisRemember){
						this.common.setCookie('userName_',this.accountInfo.TEAaccount,168);
					    this.common.setCookie('pwdTA',this.accountInfo.TEApwd,168);
					}else{
						this.common.clearCookie('userName_');
					    this.common.clearCookie('pwdTA');
					}
				}
				return {obj,objSN};
			},
			deleteWord(){
				if(this.role == 3){
					this.accountInfo.Stuaccount = '';
				}else{
					this.accountInfo.TEAaccount = '';
				}
				
			},
			rememberClick(){
				if(this.role == 3){
					this.accountInfo.StuisRemember = !this.accountInfo.StuisRemember;
				}else{
					this.accountInfo.TEAisRemember = !this.accountInfo.TEAisRemember;
				}
			},
			eyePwd(){
				if(this.role == 3){
					this.accountInfo.StuisEyePwd = !this.accountInfo.StuisEyePwd;
				}else{
					this.accountInfo.TEAisEyePwd = !this.accountInfo.TEAisEyePwd;
				}
				
			},
			inputTxt(num){
				if(num == 0){
					this.animatePwd = false;
					this.animateAccount = true;
				}else{
					this.animateAccount = false;
					this.animatePwd = true;
				}
				
			},
			outPutTxt(){
					this.animateAccount = false;
					this.animatePwd = false;
			},
			choiceType(num){
				if(this.role != num){
					this.role = this.role == 3 ? 1 : 3;
				}
				
			}
		}
	}
</script>

<style scoped>
	.login_pad{
		width: 100%;
	    height: 100%;
	    background: url(../assets/img/login/login_pad.png) no-repeat center;
	    background-size: cover;
	    display: flex;
	    flex-direction: column;
	    justify-content: center;
	    align-items: center;
	    position: relative;
	}
	.login_logo{
		background: url(../assets/img/login/login_logo.png) no-repeat top center;
		background-size:97px 81px;
		width: 97px;
		height: 81px;
		margin-bottom: 24px;
	}
	.login_frame{
		width: 400px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.login_name{
		background: url(../assets/img/login/login_name.png) no-repeat center;
		background-size:248px auto;
		width: 248px;
		height: 84px;
		margin-bottom: 56px;
	}
	.login_top{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #ebebeb;
		position: relative;
	}
	.login_title{
		flex: 1;
		text-align: center;
		height: 40px;
		line-height: 30px;
		font-size: 16px;
		color: #666666;
		cursor: pointer;
	}
	.login_title.cur{
		font-size: 18px;
		color: #b8193f;
	}
	.login_topBar{
		background-color: #b8193f;
		left: 0;
		transition: all .6s;
		width: 50%;
		bottom: -1px;
		height: 2px;
		position: absolute;
	}
	.login_topBar.cur{
		left: 50%;
	}
	.login_box{
		padding: 30px 0 40px 0;
		display: flex;
		width: 100%;
		justify-content: flex-start;
		align-items: flex-start;
		flex-direction: column;
	}
	.login_box_name{
		font-size: 14px;
		color: #333333;
		font-weight: 600;
	}
	.login_box_input{
		width: 100%;
		height: 40px;
		line-height: 40px;
		font-size: 24px;
		position: relative;
		margin-bottom: 30px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	
	.login_box_input input{
		width: 100%;
		height: 40px;
		line-height: 40px;
		padding: 0;
		border: 0;
		border-bottom: 1px solid #f2f2f2;
		outline: none;
		background: none;
		font-size: 14px;
	}
	.login_delete{
	   background: url(../assets/img/login/login_delete.png) no-repeat right center;
	   background-size: 18px 18px;
	   width: 30px;
	   height: 40px;
	   position: absolute;
	   top: 0;
	   right:0;	
	   cursor: pointer;
	}
	.login_eye{
	    position: absolute;
	    top: 0;
	    right:0;	
	    cursor: pointer;
		background: url(../assets/img/login/login_eyeclose.png) no-repeat right center;
		background-size:21px 11px;
		width: 30px;
		height: 40px;
	}
	.login_eye.cur{
		background: url(../assets/img/login/login_eyeopen.png) no-repeat right center;
		background-size:23px 17px;
		width: 30px;
		height: 40px;
	}
	.login_line{
		position: absolute;
		bottom: 0;
		z-index: 100;
		left: 0;
		height: 2px;
		background:url(../assets/img/login/login_line.png) no-repeat left bottom;
		background-size:15% 1px;
        animation: rotZ 1s linear forwards;
	}
	@keyframes rotZ {
        50% {
            width: 50%;
            height: 1px;
            background: url(../assets/img/login/login_line.png) no-repeat bottom left;
            background-size:50% 1px;
        }
        100% {
             width: 100%;
             height: 1px;
             background: url(../assets/img/login/login_line.png) no-repeat bottom left;
             background-size:100% 1px;
        }
    }
    .login_box_remember{
    	height: 20px;
    	line-height: 20px;
    	display: flex;
    	justify-content: flex-start;
    	align-items: flex-start;
    	padding-bottom: 38px;
    }
    .login_box_remember>div{
    	cursor: pointer;
    	color: #999;
    	font-size: 13px;
    	background: url(../assets/img/login/login_check.png) no-repeat left center;
    	background-size:13px 13px;
    	padding-left: 20px;
    }
    .login_box_remember>div.cur{
    	background: url(../assets/img/login/login_checkcur.png) no-repeat left center;
    	background-size:13px 13px;
    	font-size: 13px;
    	color: #b8193f;
    }
    .login_btn{
    	height: 40px;
    	line-height: 40px;
    	text-align: center;
    	color: #fff;
    	font-size: 16px;
    	background-color: #b8193f;
    	border: 1px solid #b8193f;
    	border-radius: 5px;
    	width: 100%;
    	cursor: pointer;
    }
    @media screen and (max-height:750px){
	  .login_name{
	  	margin-bottom: 30px;
	  }
	  .login_logo{
	  	margin-bottom: 20px;
	  }		
	  .login_box{
	  	 padding: 10px 0 0 0;
	  }	
	}
	@media screen and (min-height:750px) and (max-height:800px) {
	 .login_name{
	  	margin-bottom: 40px;
	  }
	  .login_logo{
	  	margin-bottom: 30px;
	  }		
	  .login_box{
	  	 padding: 10px 0 0 0;
	  }	
		
	}
	@media screen and (min-height:800px) and (max-height:850px){
	.login_name{
	  	margin-bottom: 40px;
	  }
	  .login_logo{
	  	margin-bottom: 30px;
	  }		
	  .login_box{
	  	 padding: 10px 0 0 0;
	  }		
	}
	
</style>