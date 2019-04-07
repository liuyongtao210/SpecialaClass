<template>
	<div class="myConfig_wrap">
		<p v-if="state == 3">Student</p>
		<p v-else>Professor / TA</p>		
		<ul v-if="state == 3">			
			<li>
				<span>新密码:</span>
				<input type="password" placeholder="请输入新密码" @blur="_formV(1)" v-model="newpassword" />
				<span v-if="newpassword_tips == 0"><img src="../assets/img/myConfig/code.png"/>密码长度至少六位</span>
				<span v-else-if="newpassword_tips == 2"><img src="../assets/img/myConfig/code.png"/>输入框不能为空</span>
				<span v-else-if="newpassword_tips == 3"><img src="../assets/img/myConfig/code.png"/>新密码不能和原密码相同</span>
				<span v-else-if="newpassword_tips == 1"><img src="../assets/img/myConfig/code1.png"/></span>
			</li>
			<li>
				<span>确认密码:</span>
				<input type="password" placeholder="请确认新密码" @blur="_formV(2)" v-model="newpassword_1" />

				<span v-if="newpassword_1_tips == 0"><img src="../assets/img/myConfig/code.png"/>请与新密码保持一致</span>
				<span v-else-if="newpassword_1_tips == 2"><img src="../assets/img/myConfig/code.png"/>输入框不能为空</span>
				<span v-else-if="newpassword_1_tips == 1"><img src="../assets/img/myConfig/code1.png"/></span>
			</li>
			<li>
				<span>手机号:</span>
				<input type="text" placeholder="请输入手机号" v-model="telphone" @blur="_formV(5)"/>
				<span v-if="telphone_tips == 0"><img src="../assets/img/myConfig/code.png"/>请输入正确的手机号码</span>				
				<span v-else-if="telphone_tips == 2"><img src="../assets/img/myConfig/code.png"/>输入框不能为空</span>
				<span v-else-if="telphone_tips == 1"><img src="../assets/img/myConfig/code1.png"/></span>
				<span></span>
			</li>
			<li>
				<span>图片验证码:</span>
				<div>
					<input type="text" class="input_w" @blur="_formV(3)" placeholder="请输入图片验证码" v-model="code" />
					<span class="img_w"><img :src="codeImg"></span>
				</div>
				<span v-if="code_tips == 2"><img src="../assets/img/myConfig/code.png"/>输入框不能为空</span>
				<span v-else-if="code_tips == 0"><img src="../assets/img/myConfig/code.png"/>验证码输入错误</span>
				<span v-else-if="code_tips == 1"><img src="../assets/img/myConfig/code1.png"/></span>
			</li>
			<li>
				<span>短信验证码:</span>
				<div>
					<input type="text" class="input_w" @blur="_formV(4)" placeholder="请输入短信验证码" v-model="message" />
					<span class="img_w" ><button id="button" @click="_code()">获取验证码 <span v-if="dx">({{runTime}}s)</span></button></span>				
				</div>
				<span v-if="message_tips == 2"><img src="../assets/img/myConfig/code.png"/>输入框不能为空</span>
				<span v-else-if="message_tips == 0"><img src="../assets/img/myConfig/code.png"/>短信验证码输入错误</span>
				<span v-else-if="message_tips == 1"><img src="../assets/img/myConfig/code1.png"/></span>
			</li>
		</ul>
		<ul v-else>
			<li>
				<span>原密码:</span>
				<input type="password" placeholder="请输入原密码" v-model="password" @blur="_formV(0)" />
				<span v-if="password_tips == 0"><img src="../assets/img/myConfig/code.png"/>请与原密码输入一致</span>
				<span v-else-if="password_tips == 2"><img src="../assets/img/myConfig/code.png"/>输入框不能为空</span>
				<span v-else-if="password_tips == 1"><img src="../assets/img/myConfig/code1.png"/></span>

			</li>
			<li>
				<span>新密码:</span>
				<input type="password" placeholder="请输入新密码" @blur="_formV(1)" v-model="newpassword" />
				<span v-if="newpassword_tips == 0"><img src="../assets/img/myConfig/code.png"/>密码长度至少六位</span>
				<span v-else-if="newpassword_tips == 2"><img src="../assets/img/myConfig/code.png"/>输入框不能为空</span>
				<span v-else-if="newpassword_tips == 3"><img src="../assets/img/myConfig/code.png"/>新密码不能和原密码相同</span>
				<span v-else-if="newpassword_tips == 1"><img src="../assets/img/myConfig/code1.png"/></span>

			</li>
			<li>
				<span>确认密码:</span>
				<input type="password" placeholder="请确认新密码" @blur="_formV(2)" v-model="newpassword_1" />
				<span v-if="newpassword_1_tips == 0"><img src="../assets/img/myConfig/code.png"/>请与新密码保持一致</span>
				<span v-else-if="newpassword_1_tips == 2"><img src="../assets/img/myConfig/code.png"/>输入框不能为空</span>
				<span v-else-if="newpassword_1_tips == 1"><img src="../assets/img/myConfig/code1.png"/></span>
			</li>
			
		</ul>
		
		<button @click="upData()" class="submit">保存</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				msg: '人员配置页面',
				password: '',
				telphone:'',
				telphone_tips:4,
				password_tips: 4,
				newpassword: '',
				newpassword_tips: 4,
				newpassword_1: '',
				newpassword_1_tips: 4,
				message: '',
				message_tips: 4,
				code: '',
				code_tips: 4,
				runTime:60,
				dx:false,
				//图片验证码
				codeImg:'',
				//状态控制码
				state:0,
			}
		},
		components: {},
		mounted() {
			//在dom加载完毕之后调用这个 
			this.$nextTick(() => {
//				console.log($('.text').text())
//				console.log(this.$router.push)
//				console.log(this.common)
			});
			//大部分使用获焦和失焦去做
			//获取图片验证码 判断是什么身份
			
			//获取图片验证码
			this.getImgCode()	
			this.state = this.common.role
		},
		methods: {
			_formV: function(num) {

				
				switch(num){
					case 0: if(!(this.password == '' || this.password.length == 0)) {
											
						if(this.newpassword == this.password) {
							this.password_tips = 1;							
							
						} else {
							this.password_tips = 0;
						}

				} else {
					this.password_tips = 2
				}
				
				break;
				case 1: if(!(this.newpassword == '' || this.newpassword.length == 0)) {
					
					if(!(this.newpassword.length < 6)) {

							this.newpassword_tips = 1;


					} else {
						this.newpassword_tips = 0;

					}

				} else {
					this.newpassword_tips = 2
				}
				
				break;
				case 2: if(!(this.newpassword_1 == '' || this.newpassword_1.length == 0)) {
					
						if(this.newpassword == this.newpassword_1) {
							this.newpassword_1_tips = 1;							
							
						} else {
							this.newpassword_1_tips = 0;
						}					

				} else {
					this.newpassword_1_tips = 2
				}
				
				break;
				case 3: if(!(this.code == '' || this.code.length == 0)) {
						this.code_tips = 1;
				} else {
					this.code_tips = 2
				}				
				break;
				case 4: if(!(this.message == '' || this.message.length == 0)) {																				
						this.message_tips = 1;						
				} else {
					this.message_tips = 2
				}
				break;				
				case 5:
					var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if(!(this.telphone == '' || this.telphone.length == 0)) {					
						//判断手机号是否符合格式
						if(myreg.test(this.telphone)){
							console.log(this)
							this.telphone_tips = 1;
						}else{
							this.telphone_tips = 0;							
						}			
				} else {
					this.telphone_tips = 2
				}
				}
				
				
				

				
			},
			_code: function(e) {
				console.log('获取验证码');
				//获取页面节点
				var button = document.getElementById('button');

				button.style.border = '1px solid #ccc';
				button.style.color = '#ccc';
				//点击时在旁边添加个倒计时
				//声明变量
				var time=setInterval(()=>{
					if(this.runTime != 0){
						this.runTime--;
//						console.log(this.runTime)
						this.dx = true;
						button.disabled = 'true'
					}else{
						clearInterval(time);
//					 	this.dx = true;
						button.removeAttribute('disabled');
						this.runTime = 60
						console.log(this.runTime)
						button.style.border = '1px solid #002d5f';
						button.style.color = '#002d5f';
						this.dx = false;						
					}
				
				
					
				},1000)
					this.common.request("Regist", "getPhoneCodeWithPic", {
								phone: this.telphone,
								picCode: this.code.toLocaleUpperCase()
							}, (data) => {
								if(data.code == 0) {
//									this.iserror = false;
									console.log(data)
									this.WeuiModel.showToast('验证码发送成功','验证码发送成功');
							
								} else {
									console.log(data)
//									this.errTxts = data.msg;
//									this.iserror = true;
//									this.weuiModel.showToast('验证码发送失败');
									this.WeuiModel.showAlert(data.msg);
								}
							})
				
			},
			upData:function(){
				console.log('调用接口 判断输入框是否有不符合规则的数据 ',this)
				this.WeuiModel.showLoad('数据提交中')
					let obj = {}
					let sn = '',
						mn = '';
					obj.newPwd = this.md5(this.newpassword);
					if(this.role == 3) { //学生 
						sn = "Login";
						mn = "changePwd";
						obj.pwd = this.md5(this.newpassword);
						obj.userId = this.common.userID;
						obj.token = this.common.token;
					} else {
						sn = "FrontUser";
						mn = "resetPwd";
						obj.phone = this.telphone;
						obj.code = this.code;
						obj.userName = ''
					}
					this.common.request(sn, mn, obj, (data) => {
						if(data.code == 0) {
							this.WeuiModel.hideLoad()
							this.WeuiModel.showToast("修改成功");
							this.message = ''; //短信验证码
							this.code = ''; //图片验证码
							this.telphone = ''; //手机号
							this.password = ''; //老密码
							this.newpassword = ''; //新密码
							this.newpassword_1 = ''; //确认密码
							this.runTime = 0;
							console.log(data)
						} else {
							this.WeuiModel.hideLoad()
							
							console.log(data)
							this.WeuiModel.showAlert(data.msg);
							
//							this.iserror = true;
//							this.errTxts = data.msg;
						}
					})
			
			},
			//获取图片验证码
			getImgCode() {
					this.common.request("PicCode", "getPicCode", {}, (data) => {
//						console.log(data);
							this.codeImg = data.picUrl;						
					})
			},
			//获取当前该显示哪一页
			
		}

	}
</script>

<style scoped>
	.myConfig_wrap {
		padding: 0px 20px 0;
		box-sizing: border-box;
		display: flex;
		flex-direction:column;
		flex: 1;
		flex-basis: auto;
		background: #f6f6f6;
		position:relative;
		margin-left:100px;

	}
	.myConfig_wrap>p{
		box-sizing: border-box;		
		height:50px;
		line-height: 50px;
		font-size: 20px;
		font-weight: 600;
	}
	.submit{
		position:absolute;
		width:110px;
		height:40px;
		font-size: 14px;
		color:#fff;
		font-weight: 600;
		background:#dc4851;
		bottom: 50px;
		left: 50%;
		margin-left: -55px;
		border-radius: 3px;
		transition: all .3s ease;
		cursor: pointer;
	}
	.submit:hover{
		background:#ff2323
	}
	.myConfig_wrap>ul {
		width: 100%;
		height:800px;
		background: #fff;
		border-radius: 8px;
		/*margin:50px 20px 0;*/
	}
	
	.myConfig_wrap>ul>li {
		width: 70%;
		min-width: 950px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin:20px 0  0 0;
	}
	
	.myConfig_wrap>ul>li>span:nth-child(1) {
		/*border:1px solid red;*/
		width: 120px;
		height: 46px;
		/*text-align:right;*/
		font-size: 16px;
		font-weight: 600;
		line-height: 46px;
		text-align: right;
		margin-left: 6px;
		/*text-align-last: justify;*/
	}
	
	.myConfig_wrap>ul>li input {
		box-sizing: border-box;
		border: 1px solid #bebebe;
		width: 462px;
		height: 46px;
		padding-left: 20px;
		font-size: 14px;
		color: #ccc;
		margin-left: 30px;

		
	}
	
	.myConfig_wrap>ul>li>span:nth-child(3) {
		display: block;
		width: 200px;
		height: 46px;
		font-size: 14px;
		line-height: 46px;
		margin-left: 40px;
	}
	
	.myConfig_wrap>ul>li>span:nth-child(3) img {
		width: 14px;
		height: 14px;
		margin-right: 10px;
	}
	
	.myConfig_wrap>ul>li>span {
		margin: 0 20px;
	}
	
	.myConfig_wrap>ul>li div {
		width: 493px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	
	.myConfig_wrap>ul>li div .input_w {
		width: 334px;
	}
	
	.myConfig_wrap>ul>li div .img_w {
		width: 110px;
		height: 46px;
		box-sizing: border-box;
		background: #dbedfb;
		margin-left: 20px;
	}
	.myConfig_wrap>ul>li div .img_w img{
		width: 100%;
		height: 100%;
		
	}
	
	.myConfig_wrap>ul>li div .img_w button {
		width: 100%;
		height: 100%;
		line-height: 46px;
		text-align: center;
		font-size: 14px;
		color: #002d5f;
		background: #fff;
		box-sizing: border-box;
		border: 1px solid #002d5f;
		border-radius: 8px;
		cursor: pointer;
		transition: all .3s ease;
	}
	
</style>