<template>
	<!--creat_content-->
	<div class="task_content">
		<!--<div class="task_heade">
			<div>
				<span>新建任务</span>
				<span>修改任务</span>
			</div>
			<div class="task_close_btn">
				<img src="../assets/img/task/close_task_icon.png" alt="" class="close_task_icon"/>
			</div>
		</div>-->
		
		<taskhead v-on:closeTask="closeTask">
			<span slot="taskhead" v-if="operationType==0">新建任务</span>
			<span slot="taskhead" v-if="operationType==1">修改任务</span>
		</taskhead>
		<div class="task_content_con">
			<div class="task_con">
				<!--选择对象-->
				<div class="task_msg_list">
					<div class="msg_title">
						<div class="msg_title_con">
							选择对象<span class="xing">*</span>:
							<div class="msg_tip">(单选)</div>
						</div>
					</div>
					
					<div class="msg_content">
						<div class="tab_box">
							<span class="title_btn " :class="{title_btn_cur:btnStyle==0}" style="border-right: none;" @click="tabBtnFn(0)">我的</span>
							<span class="title_btn" :class="{title_btn_cur:btnStyle==1}" @click="tabBtnFn(1)">全部</span>
						</div>
						<div class="sle_con">
							<div class="select_tj" v-if="btnStyle==1">
								
								<div class="sel_input">
									<input type="text"  placeholder="搜索" v-model="searchClaStu"/>
									<div class="search_btn" @click="searchBtnFn()">
										<img src="../assets/img/task/search_btn.png" alt=""/>
									</div>
								</div>
								
								<div class="sel_tj">
									<div class="sel_it" @click="selConditionFn(1)">
										<img src="../assets/img/task/select_off.png" alt="" class="sel_icon" v-if="selCondition==0"/>
										<img src="../assets/img/task/select_on.png" alt="" class="sel_icon" v-if="selCondition==1"/>
										班级
									</div>
									<div class="sel_it" @click="selConditionFn(0)">
										<img src="../assets/img/task/select_off.png" alt="" class="sel_icon" v-if="selCondition==1"/>
										<img src="../assets/img/task/select_on.png" alt="" class="sel_icon" v-if="selCondition==0"/>
										学生
									</div>
								</div>
							</div>
							<div class="sel_item">
								<!--ban_ji stu_ji-->
								<div class="sel_list " v-for=" item in stuListData" :class="{ban_ji:item.type==0,stu_ji:item.type==1}" @click="selStuFn(item)">
									<img src="../assets/img/task/sel_list_on.png" alt="" v-if="item.check" class="sel_list_icon"/>
									<img src="../assets/img/task/sel_list_off.png" alt="" v-if="!item.check" class="sel_list_icon"/>
									{{item.name}}
								</div>
								
							</div>
							
						</div>
					</div>
				</div>
			
			<!--选择对象-->
			<!--任务名称-->
				<div class="task_msg_list">
					<div class="msg_title">
						<div class="msg_title_con">
							任务名称<span class="xing">*</span>:
						</div>
					</div>
					
					<div class="msg_content">
						<div class="name_box">
							<input type="" name="" id="" value=""  class="task_name" v-model="TaskData.taskName"/>
						</div>
					</div>
					
				</div>
				<!--任务名称-->
				
				<!--完成时间-->
				<div class="task_msg_list">
					<div class="msg_title">
						<div class="msg_title_con">
							完成时间<span class="xing">*</span>:
						</div>
					</div>
					
					<div class="msg_content">
						<div class="sel_time">
								<div class="sel_list_time"  @click="selTimeStypeFn(0)">
									<img src="../assets/img/task/sel_list_on.png" alt=""  class="sel_list_icon" v-if="selTime==0"/>
									<img src="../assets/img/task/sel_list_off.png" alt=""  class="sel_list_icon" v-if="selTime==1"/>
									不限
								</div>
								<div class="sel_list_time" @click="selTimeStypeFn(1)">
									<img src="../assets/img/task/sel_list_on.png" alt=""  class="sel_list_icon" v-if="selTime==1"/>
									<img src="../assets/img/task/sel_list_off.png" alt=""  class="sel_list_icon" v-if="selTime==0"/>
									指定完成时间
								</div>
								
								<!--<div class="Dropselect" @click="showSelect()" ref="select" >
									<div class="Dropchecked">{{checkName}}</div>
									<template v-if="type == 'data'">
										<dropdown :top="top" :dropArr="dropArr" @getOption="getOption" v-show="isShowSelect"></dropdown>
									</template>
									
									<div :class="isShowSelect ? 'selectIcon cur' : 'selectIcon'" :style="{height:top-2+'px'}"></div>
								</div>-->
								
								<div class="time_box" v-if="selTime==1">
									<div class="time_in" @click.stop="selCalendarFn($event)">
										{{TaskData.completeTime|formatDate('YY/MM/DD')}}
										<div class="time_sel_icon">
											<img src="../assets/img/task/time_sel_icon.png" alt=""  class="time_sel_icon_img" :class="{time_sel_icon_rotate:timeCalendar}" />
										</div>
									</div>
									<!--<template v-if="type == 'calendar'">
									</template>-->
									<div class="time_calendar" :class="{calendar_opacity:timeCalendar}">
										<!--TaskData.completeTime-->
										<calendar @getcalendarTime="wholeTime" :top="3" :allTime="TaskData.completeTime"></calendar>
									</div>
								</div>
								
						</div>
								
					</div>
					
				</div>
				<!--完成时间-->
				
				
				<!--任务描述-->
				<!--<div class="task_msg_list">
					<div class="msg_title">
						<div class="msg_title_con">
							任务描述:
							<div class="msg_tip">(选填)</div>
						</div>
					</div>
					
					<div class="msg_content">
						<div class="task_des">
							<textarea name="" rows="" cols="" class="task_des_con" placeholder=""></textarea>
						</div>
					</div>
				</div>-->
			
				<!--任务描述-->
				
				<!--说明-->
				<div class="task_msg_list">
					<div class="msg_title">
						<div class="msg_title_con">
							任务描述:
							<div class="msg_tip">(选填)</div>
						</div>
					</div>
					
					<div class="msg_content">
						<div class="task_des">
							<textarea name="" rows="" cols="" class="task_explain" placeholder="将文件拖拽至此区域上传" v-model="TaskData.desc"></textarea>
						</div>
						
					</div>
				</div>
				<!--说明-->
				
				
				<!--附件-->
				<div class="task_msg_list">
					<div class="msg_title">
						<div class="msg_title_con">
							附件:
						</div>
					</div>
					
					<div class="msg_content">
						<div class="file_content">
									<div class="file_list" v-for="(item,index) in selFileData">
		   										<img src="../assets/img/task/select_file_icon.png" alt="" class="select_file_icon"/>
		   										<div class="file_name">{{decodeURIComponent(item.fileName)}}</div>
		   										<div class="select_file_del" title="删除文件" @click="delFile(index)">
		   											<img src="../assets/img/task/select_file_del.png" alt="" class="select_file_del_icon"/>
		   										</div>
		   							</div>
		   							
						</div>
						<div class="add_flie" @click="addFile()">
							添加文件
						</div>
					</div>
				</div>
				<!--附件-->
				<div class="footer_btn">
					<div class="f_btn confirm_btn" @click="saveTask()">确定</div>
					<div class="f_btn cancel_btn">取消</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import taskhead from '../base/taskHead';
	import calendar from '../base/calendarSmall';
	export default {
		data(){
			return {
				userId:this.common.getCookie("userId"),
				token:this.common.getCookie("token"),
				role:this.common.getCookie("role"),
				TaskData:{//任务数据  新增或者编辑 
					studentId:"",
					classId:'',
					taskName:'',
					completeTime:new Date().getTime(),
					desc:'',
					filePath:''
				},
				selFileData:[],
				selectTime:new Date().getTime(),
				btnStyle:0,//我的，全部 ，全部搜框 。显隐状态
				selCondition:1,
				selTime:0,//默认显示 不限完成时间
				timeCalendar:false,
				operationType:0,//操作类型  0： 新增任务 1：编辑任务
				stuListData:[],//展示的班级学生数据
				getStuListData:[],//获取的班级 学生数据
				searchClaStu:'',//搜索的内容
			}
		},
	
		methods:{
			wholeTime:function(time){//选择时间 
				console.log(time)
				this.timeCalendar=false;
				this.TaskData.completeTime=time
			},
			tabBtnFn:function(e){
				this.btnStyle=e;
				if(e==0){//我的
					this.queryClasStu()
				}else{//全部
					this.queryClasStu(1)
				}
			},
			selStuFn:function(e){//列表选中学生 班级
				console.log(e)
				if(e.check==false){
					e.check=true;
				}else{
					e.check=false;
				}
			},
			selConditionFn:function(e){//选择 搜索条件：学生 班级
				this.selCondition=e;
				this.handleData(this.getStuListData,this.selCondition)
			},
			searchBtnFn:function(){//点击搜索
				var searchClaStu=this.searchClaStu.trim();
				var searchArr=[];
				for(var i=0;i<this.stuListData.length;i++){
					if(this.searchClaStu==this.stuListData[i].name){
						var obj={
							id:'',
							name:'',
							type:'',
							check:false
						}
						obj.id=this.stuListData[i].id;
						obj.name=this.stuListData[i].name;
						obj.check=this.stuListData[i].check;
						obj.type=this.stuListData[i].type;
						searchArr.push(obj)
					}
				}
				this.stuListData=searchArr;
			},
			selTimeStypeFn:function(e){//选择时间类型
				this.selTime=e;
				if(e==0){//不限时间；TaskData.completeTime
					this.timeCalendar=false
				}else{
//					this.TaskData.completeTime=this.selectTime
					console.log(this.TaskData.completeTime)
				}
			},
			selCalendarFn:function(e){
				if(this.timeCalendar==false){
					this.timeCalendar=true
				}else{
					this.timeCalendar=false
				}
			},
			closeTask:function(e){
				this.$router.push({path:'/taskPage',name:'taskPage',query:{save:'success'}})
			},
			addFile:function(){//添加文件
				this.common.uploadFile(50,(fileName, url,objName)=>{
					this.WeuiModel.hideLoad();
					this.WeuiModel.showToast('上传成功!')
					var sendObj={
						fileName:encodeURIComponent(objName),
						fileUrl:url
					};
					this.selFileData.push(sendObj)
				},()=>{
					this.WeuiModel.showLoad('上传中...');
				}, "png,jpg,bmp,pdf,doc,docx,ppt,pptx,xls,xlsx")
				console.log(this.selFileData)
			},
			delFile:function(i){//删除文件
				this.selFileData.splice(i,1)
				this.WeuiModel.showToast('删除成功!')
			},
			saveTask:function(){//保存任务  新建 或者编辑
				if(this.selTime==0){//不限时间
						this.TaskData.completeTime=''
					}
				if(this.operationType==0){
					this.createNewTask();
				}else{
					this.editTask();
				}
					
			},
			createNewTask:function(){// 新建任务
				
//					this.TaskData={//任务数据  新增或者编辑 
//						studentId:5433,
//						classId:'',
//						taskName:'',
//						completeTime:new Date().getTime(),
//						desc:'',
//						filePath:''
//					}
					if(this.TaskData.taskName==''||this.TaskData.taskName==undefined||this.TaskData.taskName==null){
						
						this.WeuiModel.showAlert('提示',"未输入任务名称!",'确定');
						return ;
					}
					//选择学生班级
					var studentIdArr=[];
					for(var i=0;i<this.stuListData.length;i++){
						if(this.stuListData[i].check==true){
							studentIdArr.push(this.stuListData[i].id)
						}
					}
					this.TaskData.studentId=studentIdArr.join()
					if(this.TaskData.studentId==""||this.TaskData.studentId==undefined){
						this.WeuiModel.showAlert('提示',"未选择学生或班级!",'确定');
						return ;
					}
						//文件处理
					var fileStr=[];
					for(var i =0;i<this.selFileData.length;i++){
						fileStr.push(this.selFileData[i].fileUrl)
					}
					this.TaskData.filePath=fileStr.join();
					
					
					this.WeuiModel.showLoad('保存中...');
					this.common.request('courseSchedule.ClassCenter','addNewTask',{
					userId:this.userId,
					token:this.token,
					studentId:this.TaskData.studentId,
					classId:'',
					role:this.role,
					taskName:this.TaskData.taskName,
					completeTime:this.TaskData.completeTime,
					desc:this.TaskData.desc,
					filePath:this.TaskData.filePath
				},(data)=>{
					this.WeuiModel.hideLoad();
					if(data.code==0){
						this.WeuiModel.showToast('保存成功!')
						this.$router.push({path:'/taskPage',name:'taskPage',query:{save:'success'}})
						console.log(data)
					}else{
						this.WeuiModel.showAlert('ERROR!',data.msg,'确定');
					}
				})
			},
			editTask:function(){//编辑任务
				
			},
			queryClasStu:function(type,calssName,stuName){//type:我的，全部 。searchCondition：班级(0)，学生(1). calssName：班级名称 stuName：学生名称
				if(type==undefined){type=''}
				if(calssName==undefined){calssName=''}
				if(stuName==undefined){stuName=''}
					this.common.request('courseSchedule.ClassCenter','classStudents',{//查询班级学生列表 
						userId:this.userId,
						token:this.token,
						role:this.role,
						type:type,
						name:calssName,
						stuName:stuName
					},(data)=>{
						if(data.code==0){
							this.getStuListData=data;
//							this.handleData(data,type)
							this.handleData(this.getStuListData,this.selCondition)
						}else{
							this.WeuiModel.showAlert('ERROR!',data.msg,'确定');
						}
					})
			},
			handleData:function(data,type){//这里处理 是为了不再发请求到后台请求数据   只请求一次数据
							var classList=data.classList;
							var studentList=data.studentList;
							var classListArr=[];
							var studentListArr=[];
							for(var i=0;i<classList.length;i++){
									var classObj={
										id:'',
										name:'',
										type:0,//0 班级样式显示
										check:false
									}
									classObj.id=classList[i].id
									classObj.name=classList[i].name
									classListArr.push(classObj)
								}
							for(var i=0;i<studentList.length;i++){
									var stuObj={
										id:'',
										name:'',
										type:1,//1学生样式显示
										check:false
									}
									stuObj.id=studentList[i].studentId
									stuObj.name=studentList[i].studentName
									studentListArr.push(stuObj)
							}
							if(type==1&&type!=''){// 点击全部  其实是请求了全部数据  但是默认展示的只有班级数据    data是全部数据   stuListData 是展示到页面上的数据
								this.stuListData=classListArr;
							}else if(type==0){//点击学生按钮 展示学生数据  
								this.stuListData=studentListArr;
							}else if(type==undefined||type==""){
								this.stuListData=classListArr.concat(studentListArr);
							}
				console.log(this.stuListData)
			},
			initData:function(){
				console.log(this.$route.query.type)
				var that=this;
				document.addEventListener('click',function(e){
			      if (that.$el.contains(e.target)){
			         	that.timeCalendar = false;
				      }
				   })
				this.operationType=this.$route.query.type;//获取操作类型  新增 还是修改编辑
				if(this.operationType==0){//新建任务
					this.TaskData={//任务数据  新增或者编辑 
						studentId:5433,
						classId:'',
						taskName:'',
						completeTime:new Date().getTime(),
						desc:'',
						filePath:''
					}
					this.queryClasStu();
				}else{//修改编辑
					
				}
			}
		},
		created(){
			this.initData()
		},
		mounted(){
			
		},
		components:{
			taskhead,
			calendar
		},
		filters:{
			formatDate:function(timenumber, format){
				if(timenumber==undefined || timenumber==null || timenumber=="" || isNaN(timenumber)){
					return "INVAILED";
				}
				var adate = new Date(timenumber);
				var year = adate.getFullYear().toString();
				var month = (adate.getMonth()+1).toString();
				var thedate = adate.getDate().toString();
				var hour = adate.getHours().toString();
				var minute = adate.getMinutes().toString();
				var second = adate.getSeconds().toString();
				month = month.length==1 ? "0"+month : month;
				thedate = thedate.length==1 ? "0"+thedate : thedate;
				hour = hour.length==1 ? "0"+hour : hour;
				minute = minute.length==1 ? "0"+minute : minute;
				second = second.length==1 ? "0"+second : second;
				var YMD = year+"-"+month+"-"+thedate;
				var HMS = hour+":"+minute+":"+second;
				var HM = hour+":"+minute;
				var YMD2 = year+"/"+month+"/"+thedate;
				var YDHM=month+"/"+thedate+" "+hour+":"+minute
				var YMD_=year+"/"+month+"/"+thedate
				switch(format){
					case "YY/MM/DD":
						return YMD_
						break;
					case "M/D H:M":
						return YDHM
						break;
					case "Y-M-D":
						return YMD;
						break;
					case "Y/M/D":
						return YMD2;
						break;
					case "H:M:S":
						return HMS;
						break;
					case "H:M":
						return HM;
						break;
					case "Y-M-D H:M:S":
						return YMD+" "+HMS;
						break;
					case "Y/M/D H:M:S":
						return YMD2+" "+HMS;
						break;
					case "Y-M-D H:M":
						return YMD+" "+HM;
						break;
					case "Y/M/D H:M":
						return YMD2+" "+HM;
						break;
					case "MM/DD ss:mm":
						return YMD2+" "+HM;
						break;
					default:
						return YMD+" "+HMS;
						break;
				}
			}
		}
	}
</script>

<style scoped>
.creat_content{
	display: flex;
	padding: 0 20px;
	background: #f6f6f6;
	flex-direction: column;
	flex: 1;
}
.task_content_con{
	flex: 1;
	background: #ffffff;
	margin-bottom: 15px;
	border-radius: 10px;
	box-shadow: 0 0 10px rgba(0,0,0,0.1);
	overflow: auto;
}

.task_con{
	padding: 25px 15px;
	padding-bottom: 30px;
}
.task_msg_list{
	display: flex;
	margin-bottom: 38px;
}
.msg_title{
	width: 125px;
	text-align: right;
	margin-right: 32px;
	font-size: 16px;
	position: relative;
	display: flex;
	justify-content: flex-end;
}
.xing{
	color: #fd3131;
}
.msg_content{
	flex: 1;
}
.tab_box{
	display: flex;
	align-items: center;
	position: relative;
	z-index: 10;
}
.title_btn{
	display: flex;
	width: 80px;
	height: 32px;
	align-items: center;
	justify-content: center;
	border: 1px solid #e1e1e1;
	cursor: pointer;
	background: #f6f6f6;
}
.title_btn.title_btn_cur{
	border-bottom: none;
	color: #2c3845;
	background: #ffffff;
}
.sle_con{
	width: 100%;
	padding: 20px 15px;
	border: 1px solid #e1e1e1;
	border-radius: 5px;
	position: relative;
	top:-1px;
	border-top-left-radius: 0;
}
.msg_tip{
	color: #999999;
	font-size: 16px;
	text-align: center;
}
.select_tj{
	display: flex;
}
.sel_input{
	width: 190px;
	height: 32px;
	border: 1px solid #e1e1e1;
	padding: 3px 14px;
	color: #999999;
	position: relative;
	display: flex;
	align-items: center;
}
.search_btn{
	width: 32px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	right: 0;
	top:0px;
	cursor: pointer;
	background: #ffffff;
}
.sel_tj{
	display: flex;
	align-items: center;
}
.sel_it{
	display: flex;
	align-items: center;
	cursor: pointer;
	margin-left: 32px;
}
.sel_icon{
	margin-right: 20px;
}
.sel_item{
	display: flex;
	align-items: center;
	flex-wrap: wrap;
}
.sel_list{
	display: flex;
	align-items: center;
	margin-top: 20px;
	margin-right: 50px;
	cursor: pointer;
}
.sel_list_time{
	display: flex;
	align-items: center;
	margin-right: 45px;
	height: 30px;
	cursor: pointer;
}
.ban_ji{
	color: #fc8302;
}
.stu_ji{
	color: #00a8ff;
} 
.sel_list_icon{
	margin-right: 24px;
}
.task_name{
	height: 30px;
	width: 490px;
	border: 1px solid #bebebe;
	padding: 3px 10px;
}
.sel_time{
	display: flex;
	align-items: center;
}
.time_box{
	position: relative;
}
.time_in{
	width: 208px;
	height: 30px;
	border: 1px solid #bebebe;
	cursor: pointer;
	display: flex;
	align-items: center;
	padding-left: 10px;
	position: relative;
}
.time_sel_icon{
	display: flex;
	width: 30px;
	height: 28px;
	align-items: center;
	justify-content: center;
	position: absolute;
	right: 0px;
	top:0px;
	border-left: 1px solid #bebebe;
}
.time_sel_icon_img{
	transform: rotate(-180deg);
	transition: all .5s; 
}
.time_sel_icon_rotate{
	transform: rotate(0deg);
}
.time_calendar{
	position: absolute;
	width: 208px;
	height:0px;
	border: 1px solid #bebebe;
	border-top: none;
	top:29px;
	left: 0px;
	opacity: 0;
	pointer-events: none;
	transition: all .5s;
}
.calendar_opacity{
	opacity: 1;
	pointer-events: auto;
}
.name_box{
	display: flex;
	align-items: center;
}
.task_des{
	display: flex;
}
.task_des_con{
	resize:none;
	outline: none;
	border: none;
	width: 100%;
	border: 1px solid #bebebe;
	padding: 10px;
	max-height: 60px;
}
.task_explain{
	resize:none;
	outline: none;
	border: none;
	width: 100%;
	border: 1px solid #bebebe;
	padding: 10px;
	height: 125px;
	font-size: 14px;
}
.file_content{
	display: flex;
	flex-wrap: wrap;
}
.add_flie{
	color:#ffffff;
	background: #002d5f;
	width: 90px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}
.footer_btn{
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 100px;
}
.f_btn{
	width: 90px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	border-radius: 3px;
}
.confirm_btn{
	background: #dc4851;
	color: #ffffff;
	margin-right: 65px;
	
}
.cancel_btn{
	color: #333333;
	border: 1px solid #333333;
}
/*
<div class="footer_btn">
					<div class="f_btn confirm_btn">确定</div>
					<div class="f_btn cancel_btn">取消</div>
				</div>*/



	/*文件基础样式  可复制复用 start*/
	
	/*<div class="file_list" v-for="item in selFileData">
		<img src="../assets/img/task/select_file_icon.png" alt="" class="select_file_icon"/>
		<div class="file_name">{{item.fileName}}</div>
		<div class="select_file_del" title="删除文件">
		<img src="../assets/img/task/select_file_del.png" alt="" class="select_file_del_icon"/>
		</div>
	</div>*/
	
	.file_list{
		width: 145px;
		color: #002d5f;
		display: flex;
		align-items: center;
		height: 30px;
		margin-bottom: 25px;
		margin-right: 20px;
	}
	.select_file_del{
		width: 25px;
		height: 25px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}
	.file_name{
		flex: 1px;
		margin-left: 15px;
		margin-right: 8px;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	/*文件基础样式  可复制复用 end*/

</style>