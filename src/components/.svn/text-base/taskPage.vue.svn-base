<template>

	   	<div class="task_content_con">
	   		<div class="task_con">
	   			<!--任务头部 start-->
	   			<div class="task_head">
	   				<div class="head_con head_left">
	   					
	   					<div class="condition_item" v-if="role!=3">
	   						<div class="condition_t">班级/学生:</div>
	   						<div class="con_input">全部</div>
	   					</div>
	   					
	   					<div class="condition_item">
	   						<div class="condition_t">任务类型:</div>
	   						<div class="con_input">全部</div>
	   					</div>
	   					
	   					<div class="condition_item">
	   						<div class="condition_t">任务状态:</div>
	   						<div class="con_input">全部</div>
	   					</div>
	   				</div>
	   				<div class="head_con head_right" v-if="role!=3">
	   					
	   					<div class="operation_item op_add" @click='addEditTask(0)'>
	   						<img src="../assets/img/task/task_icon_add.png" alt="" class="task_icon"/>
	   						添加
	   					</div>
	   					
	   					<div class="operation_item op_edit" @click='addEditTask(1)' v-if="taskData.length>0">
	   						<img src="../assets/img/task/task_icon_edit.png" alt="" class="task_icon"/>
	   						编辑
	   					</div>
	   					<!--curTaskData  点击当前任务的数据  -->  
	   					<div class="operation_item op_del" @click='delTask()'  v-if="taskData.length>0&&curTaskData.taskType==1">
	   						<img src="../assets/img/task/task_icon_del.png" alt="" class="task_icon"/>
	   						删除
	   					</div>
	   				</div>
	   			</div>
	   		<!--任务头部 end-->
	   		
	   		<div class="task_body">
	   			<div class="t_body_left">
	   				<div class="t_body_left_content">
	   					
	   					<div class="task_list"  v-for="(item,index) in taskData"  :class="{task_list_cur:index==curIndex}"  @click="viewDetail(item,index)">
	   					
	   					<div class="live_ing">
	   						<img src="../assets/img/task/live_icon.png" alt="" class="live_icon" v-if="item.taskType==2||item.taskType==4"/>
	   						<span v-if="item.taskType==2||item.taskType==4">线上</span>
	   						<span v-if="item.taskType==3||item.taskType==5">线下</span>
	   					</div>
	   					<img src="../assets/img/task/sucs_blue.png" alt="" class="sucs_icon" v-if="item.taskType==1&&item.finish!=0"/>
	   					<img src="../assets/img/task/sucs_red.png" alt="" class="sucs_icon"  v-if="item.taskType!=1&&item.finish!=0"/>
	   					<div class="t_list_title"><span v-if="item.classId!=0&&role!=3">【班课】</span><span v-if="item.classId==0&&role!=3">【{{item.studentName}}】</span>{{item.taskName}}</div>
	   					<div class="t_list_time">
	   						<img src="../assets/img/task/task_icon_time.png" alt="" class="task_icon_time"/>
	   						<template v-if="item.taskTime==-1">
	   							不限时间
	   						</template>
	   						<template v-else>
	   							<template v-if="item.taskType!=1">
	   								{{item.taskTime|formatDate('M/D H:M')}}
		   						</template>
		   						<template v-else="">{{item.taskTime|formatDate('Y/D')}}</template>
	   						</template>
	   						<!--item.taskType==1-->
	   					</div>
	   						<!--2:线上班课;3:线下班课;4:1V1线上任务;5:1V1线下-->
	   					<!--<div class="t_list_reply">{{item.latestState}}</div>
	   					<div class="feedback_succ">发布任务成功</div>
	   					<div class="feedback_succ">排课成功</div>
	   					<div class="feedback_fail">任务未通过</div>-->
	   					<div class="feedback_succ">{{item.latestState}}</div>
	   					<div class="left_line  " :class="{left_line_blue:item.taskType==1,left_line_red:item.taskType!=1}"></div>
	   				</div>
	   				</div>
	   				<!--分页 start-->
	   				<div class="task_pagination">
	   					<template v-if="hasData">
	   						<pagiNation :totalData='newTotalData' :everyPageNum='everyPageNum' @pageChange="pageChange"></pagiNation>
	   					</template>
	   					
	   				</div>
	   				<!--分页 end-->
	   			</div>
	   			<div class="t_body_right">
	   				<div class="task_des">
	   					<!--taskDetailData-->
	   					<div class="task_des_top">
	   						<!--curTaskData-->
	   						<!--1:未提交;2:待审批;3:未通过;4:已通过; finishState==3-->
	   						<div v-if="role==3&&taskDetailData.taskType==1">
	   							<div class="stu_check"  v-if="taskDetailData.finishState==1" @click="sbumitTask()">
	   							提交
	   							</div>
		   						<div class="stu_check"  v-if="taskDetailData.finishState==3"  @click="checkTask()">
		   							查看
		   						</div>
	   						</div>
	   						
	   							<div class="stu_check stu_check_ot"  v-if="taskDetailData.finishState==4||taskDetailData.finishState==2" @click="checkTask()">
		   							查看
		   						</div>
	   							
	   							<div>
	   								<template v-if="role!=3&&taskDetailData.classId==0&&taskDetailData.taskType==1&&taskDetailData.finishState==2">
	   									<div class="stu_check" @click="teachApprovalTask()">去审批</div>
	   								</template>
	   							</div>
	   							
	   						
	   						<!--<div></div>-->
	   						
	   						<div class="into_live_room" v-if="taskDetailData.taskType==2||taskDetailData.taskType==4">
	   							<img src="../assets/img/task/into_live_room_icon.png" alt="" class="into_live_room_icon"/>
	   							进入教室
	   						</div>
	   						<div class="task_des_title">
	   							<!--des_t_line_red-->
	   							<div class="des_t_line" :class="{des_t_line_blue:taskDetailData.taskType==1,des_t_line_red:taskDetailData.taskType!=1}"></div>
	   							<template v-if="taskDetailData.classId!=0&&role!=3">【班课】</template>
	   							<template v-else-if="taskDetailData.classId==0&&role!=3">【学生】</template>
	   							{{taskDetailData.taskName}}
	   						</div>
	   						<div class="task_des_con">
	   							<div class="live_room_msg" v-if="taskDetailData.taskType!=1">
	   								<div class="room_msg_list">
	   									<img src="../assets/img/task/live_teach_icon.png" alt="" class="live_t_icon"/>
	   									{{taskDetailData.teacherName}}
	   								</div>
	   								<div class="room_msg_list">
	   									<img src="../assets/img/task/live_teach_icon.png" alt="" class="live_t_icon"/>
	   									{{taskDetailData.num}}人
	   								</div>
	   								<div class="room_msg_list">
	   									<img src="../assets/img/task/live_teach_icon.png" alt="" class="live_t_icon"/>
	   									<template v-if="taskDetailData.taskType==2||taskDetailData.taskType==4">线上</template>
	   									<template v-if="taskDetailData.taskType==3||taskDetailData.taskType==5">{{taskDetailData.classAddress}}</template>
	   									<!--2:线上班课;3:线下班课;4:1V1线上任务;5:1V1线下
	   									classAddress :教室名-->
	   								</div>
	   								
	   							</div>
	   							<div>{{taskDetailData.descs}}</div>
	   							<!--任务说明任务说明任务说明任务说明任务说明任务说明任务说明任务说明任务说明任务说明任务说明任务说明任务说明任务说明任务说明任务说明-->
	   						</div>   					
	   					</div>
	   					<div class="task_des_bottom" v-if="taskDetailData.taskType==1">
	   						<div class="task_status" v-if="taskDetailData.finishState==1">
	   							<img src="../assets/img/task/task_status_03.png" alt="" class="task_status_icon"/>
	   							任务未提交
	   						</div>
	   						<div class="task_status" v-if="taskDetailData.finishState==2">
	   							<img src="../assets/img/task/task_status_01.png" alt="" class="task_status_icon"/>
	   							任务待审批
	   						</div>
	   						<div class="task_status" v-if="taskDetailData.finishState==3">
	   							<img src="../assets/img/task/task_status_03.png" alt="" class="task_status_icon"/>
	   							提交未通过
	   						</div>
	   						<div class="task_status task_status_crow" v-if="taskDetailData.finishState==4">
	   							<img src="../assets/img/task/task_status_02.png" alt="" class="task_status_icon"/>
	   							任务已审批
	   						</div>
	   						
	   						<div>{{taskDetailData.reason}}</div>
	   					</div>
	   					
	   				</div>
	   				
	   				<!--留言区start-->
	   				<div class="leave_message">
	   					<div class="chat_record">
	   						<div class="no_leave_msg" v-if="chatMessage.result.length==0">暂无留言!</div>
	   						<div class="chat_record_list" v-for="item in chatMessage.result">
	   							
	   							<!--chatMessage-->
	   							<!--别人的留言  start-->
	   							<div class="chat_stype" v-if="item.userIdStr!=userId">
	   								<div class="chat_other">
		   								<img src="../assets/img/task/user_icon.png" alt="" class="user_icon"/>
		   								<span class="user_name">{{item.userName}}</span>
		   								<img src="../assets/img/task/task_icon_time.png" alt="" class="user_icon_time"/>
		   								<span class="reply_time">{{item.createTime|formatDate('Y/M/D S:M')}}</span>
	   								</div>
	   								<div class="chat_con">
	   									<img src="../assets/img/task/arrow_icon.png" alt="" class="arrow_icon_01"/>
	   									<div class="msg_content">
	   										<!--name:'',
											path:''-->
												<div class="txtContent" v-if="item.replyText.txtContent!=''">
	   												{{item.replyText.txtContent}}
	   											</div>
	   											
	   											<div class="send_flie" v-for="fileItem in item.files" @click="downLoadFile(fileItem)">
	   												<!--data.result[i].files=fileArr-->
	   												<img src="../assets/img/task/send_file_icon.png" alt="" class="send_file_icon"/>
	   												<div class="send_file_name">{{fileItem.name}}</div>
	   												<img src="../assets/img/task/send_file_down.png" alt="" class="send_file_down"/>
	   											</div>
	   										<img v-if="item.replyText.imageContent" :src="item.replyText.imageContent.fileUrl" alt="" class="send_img"  />
	   									</div>
	   								</div>
	   							</div>
	   							<!--别人的留言  end-->
	   							<!--我的留言 start-->
	   							<div class="chat_stype"  v-if="item.userIdStr==userId">
	   								<div class="chat_me">
		   								<img src="../assets/img/task/task_icon_time.png" alt="" class="user_icon_time"/>
		   								<span class="reply_time">{{item.createTime|formatDate("Y/M/D S:M")}}</span>
		   								<span class="user_name">{{item.userName}}</span>
		   								<img src="../assets/img/task/user_icon.png" alt="" class="user_icon"/>
	   								</div>
	   								<div class="chat_con_me">
	   									<div class="chat_con">
	   										<img src="../assets/img/task/arrow_icon.png" alt="" class="arrow_icon_02"/>
	   										<div class="msg_content">
	   											<div class="txtContent" v-if="item.replyText.txtContent!=''">
	   												{{item.replyText.txtContent}}
	   											</div>
	   											
	   											<div class="send_flie" v-for="fileItem in item.files" @click="downLoadFile(fileItem)">
	   												<img src="../assets/img/task/send_file_icon.png" alt="" class="send_file_icon"/>
	   												<div class="send_file_name">{{fileItem.name}}</div>
	   												<img src="../assets/img/task/send_file_down.png" alt="" class="send_file_down"/>
	   											</div>
	   											<!--{{}}-->
	   											<img  v-if="item.replyText.imageContent" :src="item.replyText.imageContent.fileUrl" alt="" class="send_img" />
	   										</div>
	   									</div>
	   								</div>
	   							</div>
	   							
	   							<!--我的留言 end-->
	   							
	   						</div>
	   					</div>
	   					<div class="chat_input">
	   						<div class="file_upload">
	   							<!--上传图片-->
	   							<div class="select_file" @click="upLoadFile(0)">
	   								<img src="../assets/img/task/file_up_icon02.png" alt="" class="file_up_icon"/>
	   							</div>
	   							<!--上传文件-->
	   							<div class="select_file" @click="upLoadFile(1)">
	   								<img src="../assets/img/task/file_up_icon01.png" alt="" class="file_up_icon"/>
	   							</div>
	   							<!--选择的文件-->
	   							<!--saveLeaveMsgData.files-->
	   							<div class="select_file file_room_colck" @click="fileShowFn()" v-if="saveLeaveMsgData.files.length>0">
	   								<div class="file_room_name">{{decodeURIComponent(saveLeaveMsgData.files[0].fileName)}}</div>
	   								<span class="total_file_num" v-if="saveLeaveMsgData.files.length>1">{{saveLeaveMsgData.files.length}}</span>
	   							</div>
	   							
	   							<div class="del_single_file" v-if="saveLeaveMsgData.files.length==1" @click="delSelectFile(0)">
	   									<img src="../assets/img/task/select_file_del.png" alt="" class="file_single_del"/>
	   								</div>
	   						</div>
	   						
	   						<textarea name="" rows="" cols="" class="text_area" id="text_area" placeholder="请留言或将要发送的文档拖拽至此处" v-model="saveLeaveMsgData.content.txtContent"></textarea>
	   						
	   						<div class="submit_btn" @click="saveLeaveMsg()">
	   							<img src="../assets/img/task/send_icon.png" alt="" class="send_icon"/>
	   							发送
	   						</div>
	   					</div>
	   				</div>
	   				<!--留言区end-->
	   			</div>
	   		</div>
	   		</div>
	   		<!--选择的文件弹框 start-->
	   		<div class="file_cover" v-if='fileShow'></div>
	   		<div class="file_list_content" v-if='fileShow'>
	   								<div class="file_scroll_content">
	   									<div class="file_close">
	   										<div class="file_close_title">文件列表</div>
	   										<span class="file_close_btn" @click="fileCloseFn()">
	   											<img src="../assets/img/task/file_content_close.png" alt="" class="file_content_close"/>
	   										</span>
	   									</div>
	   								<div class="file_li_con">
	   									<!--saveLeaveMsgData.files.length-->
	   									<!--{{Math.ceil(saveLeaveMsgData.files.length/4)}}-->
	   									<div class="file_item" v-for="i in Math.ceil(saveLeaveMsgData.files.length/4)">
	   											
		   										<div class="file_list" v-for=" (item,index) in saveLeaveMsgData.files.slice(i*4-4,i*4)" >
			   										<img src="../assets/img/task/select_file_icon.png" alt="" class="select_file_icon"/>
			   										<div class="file_name">{{decodeURIComponent(item.fileName)}}</div>
			   										<div class="select_file_del" title="删除文件"  @click="delSelectFile(index+i*4-4)">
			   											<img src="../assets/img/task/select_file_del.png" alt="" class="select_file_del_icon"/>
			   										</div>
		   										</div>
		   										
	   									</div>
	   									
	   								</div>
	   								</div>
	   							</div>
	   		<!--选择的文件弹框 end-->
	   	</div>
</template>

<script>
//	import pagiNation from '../base/pagiNation';
//	<pagiNation :totalData='totalData' :everyPageNum='everyPageNum'></pagiNation>
	export default {
		data(){
			return {
				totalData:20,
				newTotalData:20,
				everyPageNum:20,
				userId:this.common.getCookie("userId"),
				token:this.common.getCookie("token"),
				role:this.common.getCookie("role"),
				curIndex:-1,
				taskData:[],
				fileShow:false,
				taskDetailData:{},//任务详情
				sendTaskDetailData:{},
				hasData:false,
				chatMessage:{
					result:[]
				},//获取聊天数据
				//role、taskId、files、content、userId、token
				saveLeaveMsgData:{//保存的留言数据
					content:{
						txtContent:'',//文本
						imageContent:{//图片
							fileName:"",
							fileUrl:""
						}
					},
					files:[]//文件
				},
				curTaskData:'',//当前任务数据
			}
		},
		components:{
//			pagiNation:pagiNation,
			'pagiNation': () => import('../base/pagiNation')
		},
		methods:{
			sbumitTask:function(){//学生提交任务 做作业
//				JSON
				this.$router.push({path:'/stuTask',name:'stuTask',query:{taskDetailData:JSON.stringify(this.taskDetailData)}})
			},
			checkTask:function(){
				this.$router.push({path:'/stuTaskDetail',name:'stuTaskDetail',query:{taskDetailData:JSON.stringify(this.taskDetailData)}})
			},
			teachApprovalTask:function(){
				this.$router.push({path:'/stuTaskDetail',name:'stuTaskDetail',query:{taskDetailData:JSON.stringify(this.taskDetailData)}})
			},
			fileShowFn:function(){
				if(this.saveLeaveMsgData.files.length>1){
					this.fileShow=true;
				}
			},
			fileCloseFn:function(){
				this.fileShow=false;
			},
			upLoadFile:function(i){//上传文件 图片
				var fileType=""
				if(i==0){
					fileType="png,jpg"
				}else{
					fileType="bmp,pdf,doc,docx,ppt,pptx,xls,xlsx"
				}
				this.common.uploadFile(50,(fileName, url,objName)=>{
					this.WeuiModel.hideLoad();
					this.WeuiModel.showToast('上传成功!')
					var sendObj={
						fileName:encodeURIComponent(objName),
						fileUrl:url
					};
					if(i==0){//上传图片
						this.saveLeaveMsgData.content.imageContent=sendObj
						this.saveLeaveMsg()
					}else{//上传文件
						this.saveLeaveMsgData.files.push(sendObj)			
					}
				},()=>{
					this.WeuiModel.showLoad('上传中...');
				}, fileType)
				
			},
			downLoadFile:function(item){//下载文件
				window.open(item.path,'_blank');
			},
			delSelectFile:function(i){
				this.saveLeaveMsgData.files.splice(i,1)
			},
			addEditTask:function(i){//添加，编辑任务
				this.$router.push({path:'/creatEditTask',name:'creatEditTask',query:{type:i}})
			},
			delTask:function(){//删除任务
				
			},
			getTaslList:function(index){//获取列表数据
				this.WeuiModel.showLoad('数据加载中...');
				this.common.request('courseSchedule.ClassCenter','task',{
					userId:this.userId,
					token:this.token,
					page:index,
					size:20,
					role:this.role
				},(data)=>{
					this.WeuiModel.hideLoad();
					console.log(data)
					if(data.code==0){
						this.taskData=data.list;
						if(this.taskData.length>0){
							this.viewDetail(this.taskData[0],0)
						}
						this.totalData=data.total;
					}else{
						this.WeuiModel.showAlert('ERROR!',data.msg,'确定');
					}
				})
			},
			pageChange:function(i){//点击分页 请求数据
				this.getTaslList(i-1)
			},
			viewDetail:function(e,i){//查看详情  任务详情
				console.log(e)
				console.log(i)
				this.curIndex=i;
//				this.taskDetailData=e;
				this.WeuiModel.showLoad('数据加载中...');
				this.common.request('courseSchedule.ClassCenter','getTaskDetails',{
					userId:this.userId,
					token:this.token,
					role:this.role,
					taskId:e.taskId, 
					studentId:e.studentId
				},(data)=>{
					this.WeuiModel.hideLoad();
					console.log(data)
					if(data.code==0){
						this.sendTaskDetailData=data
						this.taskDetailData=data.taskDetail;
						this.getLeaveMessage(e);
						this.curTaskData=e;
						console.log(this.curTaskData)
					}else{
						this.WeuiModel.showAlert('ERROR!',data.msg,'确定');
					}
				})
		},
		getLeaveMessage:function(e){//获取留言
			this.common.request('courseSchedule.ClassCenter','getChatContent',{
					userId:this.userId,
					token:this.token,
					role:this.role,
					taskId:e.taskId,
					studentId:e.studentId
			},(data)=>{
					if(data.code==0){
						for(var i=0;i<data.result.length;i++){
							try{
								data.result[i].replyText=JSON.parse(data.result[i].replyText)
							}catch(e){
								data.result[i].replyText=data.result[i].replyText
							}
							
//							if(data.result[i].files!=''){
//								var fileArr=[];
//								var curFile =data.result[i].files.split(',')
//								for(var j=0;i<curFile.length;j++){
//										var obj ={
//											name:'',
//											path:''
//										};
//										obj.name=curFile[j].split("##")[0];
//										obj.path=curFile[j].split("##")[1];
//										fileArr.push(obj)
//								}
//								data.result[i].files=fileArr
//							}
							
						}
						this.chatMessage=data
						console.log("chatMessage:::",this.chatMessage)
					}else{
						this.WeuiModel.showAlert('ERROR!',data.msg,'确定');
					}
				})
		},
		saveLeaveMsg:function(){//提交留言
//mn = savaCommunication 保存留言
//params：
//role、taskId、files、content、userId、token
//type：1:提交留言;2:学生提交任务;3:老师审核不通过;4:老师审核通过;
			if(this.saveLeaveMsgData.content.txtContent!=''||this.saveLeaveMsgData.content.imageContent!=""||this.saveLeaveMsgData.files!=""){
				this.WeuiModel.showLoad('提交中...');
				var fileStr=[];
				for(var i=0;i<this.saveLeaveMsgData.files.length;i++){
					
					fileStr.push(this.saveLeaveMsgData.files[i].fileUrl)
					
				}
				this.common.request('courseSchedule.ClassCenter','savaCommunication',{
						userId:this.userId,
						token:this.token,
						role:this.role,
						taskId:this.curTaskData.taskId,
						files:fileStr.toString(),
						content:JSON.stringify(this.saveLeaveMsgData.content),
						type:1
				},(data)=>{
						this.WeuiModel.hideLoad();
						console.log(data)
						if(data.code==0){
							this.WeuiModel.showToast('提交成功!')
							this.getLeaveMessage(this.curTaskData)
							this.saveLeaveMsgData.files.length=0;
							this.saveLeaveMsgData.content.txtContent='';
							this.saveLeaveMsgData.content.imageContent.fileName='';
							this.saveLeaveMsgData.content.imageContent.fileUrl='';
						}else{
							this.WeuiModel.showAlert('ERROR!',data.msg,'确定');
						}
					})
				}else{
					this.WeuiModel.showToast('请输入留言内容或上传文件、图片!')
				}
		},
			
	},
	watch:{
		 totalData: function (val, oldVal) {
		 	 this.newTotalData=val; 
		 	 this.hasData=true;
	    },
	},
		created(){
//			var userId=this.common.getCookie("userId");
//			var token=this.common.getCookie("token");
//			var role=this.common.getCookie("role");
			    console.log('userId:',this.userId)
			    console.log('token:',this.token)
			    console.log('role:',this.role)
			if(this.userId==''||this.userId==null||this.userId==undefined||this.token==''||this.token==null||this.token==undefined){
				this.$router.push({path:'/login'});
				
			}else{
				console.log(this.$route.query)
				var query=this.$route.query;
				if(query.save=='success'){
					console.log('重新拉去数据')
				}
				 this.$nextTick(function(){
				 	this.getTaslList(0);
				 })
			}
			
			
		},
		mounted(){
			 this.$nextTick(function () {
			    document.addEventListener("drop",function(e){  //拖离
		        e.preventDefault();
			    })
			    document.addEventListener("dragleave",function(e){  //拖后放
			        e.preventDefault();
			    })
			    document.addEventListener("dragenter",function(e){  //拖进
			        e.preventDefault();
			    })
			    document.addEventListener("dragover",function(e){  //拖来拖去
			        e.preventDefault();
			    })
			     var box = document.getElementById('text_area'); //拖拽区域
			        if(box != null || box != undefined){
				     	box.addEventListener("drop",function(e){
				        console.log(e)
				        console.log(this)
				        var fileList = e.dataTransfer.files; //获取文件对象
				        //检测是否是拖拽文件到页面的操作
				        if(fileList.length == 0){
				            return false;
				        }
				        //拖拉图片到浏览器，可以实现预览功能
				        //规定视频格式
				        Array.prototype.S=String.fromCharCode(2);
				        Array.prototype.in_array=function(e){
				            var r=new RegExp(this.S+e+this.S);
				            return (r.test(this.S+this.join(this.S)+this.S));
				        };
				        var video_type=["video/mp4","video/ogg"];
				
				        //创建一个url连接,供src属性引用
				        var fileurl = window.URL.createObjectURL(fileList[0]);
				        if(fileList[0].type.indexOf('image') === 0){  //如果是图片
				            var str="<img width='200px' height='200px' src='"+fileurl+"'>";
				            document.getElementById('drop_area').innerHTML=str;
				        }else if(video_type.in_array(fileList[0].type)){   //如果是规定格式内的视频
				            var str="<video width='200px' height='200px' controls='controls' src='"+fileurl+"'></video>";
				            document.getElementById('drop_area').innerHTML=str;
				        }else{ //其他格式，输出文件名
				            var str="文件名字:"+fileList[0].name;
				        }
				     var   resultfile = fileList[0];
				        console.log(resultfile)
				    },false);
			   }
			    
			    
			    
			    
			  })
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
				var YD=month+"/"+thedate
				var YMDSM=year+"/"+month+"/"+thedate+" "+hour+":"+minute
				switch(format){
					case "Y/M/D S:M":
						return YMDSM;
						break;
					case "Y/D":
						return YD;
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
	.task_content_con{
		width: 100%;
		background: #f6f6f6;
		/*height: 800px;*/
		flex: 1;
		padding-left: 90px;
	}
	.task_con{
		margin: 0 18px;
		overflow: hidden;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.task_head{
		width: 100%;
		height: 50px;
		background: #ffffff;
		border-radius: 5px;
		box-shadow: 0 0 10px rgba(0,0,0,0.1);
		display: flex;
		align-items: center;
		padding: 0 15px;
		justify-content: space-between;
		margin-top: 10px;
	}
	.head_con{
		display: flex;
		align-items: center;
	}
	.condition_item{
		display: flex;
		align-items: center;
	}
	.condition_t{
		font-size: 14px;
	}
	.con_input{
		min-width: 125px;
		height: 30px;
		margin-left: 20px;
		display: flex;
		align-items: center;
	}
	.operation_item{
		width: 70px;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		margin-left: 12px;
		cursor: pointer;
	}
	.op_add{
		border: 1px solid #07adbd;
		color: #1abccb;
	}
	.op_add:hover{
		background: #defaff;
	}
	.op_edit{
		border: 1px solid #fd8400;
		color: #fd8402;
	}
	.op_edit:hover{
		background: #ffefdd;
	}
	.op_del{
		border: 1px solid #dc4851;
		color: #dd4c55;
	}
	.op_del:hover{
		background: #fce0e2;
	}
	.task_icon{
		margin-right: 8px;
	}
	
	.task_body{
		display: flex;
		justify-content: space-between;
		margin-top: 10px;
		flex: 1;
	}
	.t_body_left{
		width: 308px;
		margin-right: 10px;
		height: 100%;
		position: relative;
		padding-bottom: 50px;
	}
	.t_body_left_content{
		width: 100%;
		height: 100%;
		overflow: auto;
	}
	.task_pagination{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 40px;
		display: flex;
		align-items: center;
	}
	.t_body_right{
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.task_list{
		cursor: pointer;
		background: #ffffff;
		min-height: 98px;
		border-radius: 5px;
		padding: 12px 15px;
		margin-bottom: 10px;
		box-shadow: 0 0 10px rgba(0,0,0,0.1);
		position: relative;
	}
	.task_list_cur{
		background: #ebf6ff;
	}
	.task_list:hover{
		background: #ebf6ff;
	}
	.live_ing{
		position: absolute;
		right: 10px;
		top:12px;
		display: flex;
		align-items: center;
	}
	.live_ing .live_icon{
		margin-right: 15px;
	}
	.sucs_icon{
		position: absolute;
		bottom: 12px;
		right: 12px;
	}
	.t_list_title{
		font-size: 16px;
		color: #333333;
		font-weight: bold;
	}
	.t_list_time{
		color: #999999;
		font-size: 12px;
		display: flex;
		align-items: center;
		margin-top: 10px;
		margin-bottom: 14px;
	}
	.task_icon_time{
		margin-right: 18px;
	}
	.feedback_succ{
		color: #39c502;
	}
	.feedback_fail{
		color: #dc4851;
	}
	.left_line{
		position: absolute;
		height: 100%;
		width: 6px;
		left: 0;
		top:0;
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
	}
	.left_line_blue{
		background: #02c2b2;
	}
	.left_line_red{
		background: #fd9f30;
	}
	.task_des{
		background: #ffffff;
		border-radius: 5px;
		box-shadow: 0 0 0 rgba(0,0,0,0.1);
	}
	.task_des_top,.task_des_bottom{
		padding: 15px 20px;
	}
	.task_des_top{
		position: relative;
	}
	.stu_check{
		position:absolute;
		right: 15px;
		top:15px;
		width: 65px;
		height: 30px;
		border-radius: 3px;
		background: #dc4851;
		color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}
	.stu_check_ot{
		background: #999999;
	}
	.into_live_room{
		position: absolute;
		right: 15px;
		top:15px;
		color: #ffffff;
		width: 110px;
		height: 30px;
		background: #4aa1eb;
		border-radius: 2px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}
	.into_live_room .into_live_room_icon{
		margin-right: 10px;
	}
	.task_des_bottom{
		background: #fff8dc;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
	}
	.task_des_title{
		display: flex;
		align-items: center;
		font-size: 16px;
		font-weight: bold;
	}
	.des_t_line{
		width: 4px;
		height: 16px;
		border-radius: 4px;
		margin-right: 10px;
		margin-bottom: -2px;
	}
	.des_t_line_blue{
		background: #06c2b3;
	}
	.des_t_line_red{
		background: #fd9f30;
	}
	.task_des_con{
		line-height: 28px;
		margin-top: 12px;
	}
	.live_room_msg{
		display: flex;
	}
	.live_room_msg .room_msg_list{
		display: flex;
		margin-right: 45px;
		align-items: center;
		
	}
	.room_msg_list .live_t_icon{
		margin-right: 12px;
	}
	.task_status{
		margin-bottom: 12px;
		display: flex;
		align-items: center;
		font-size: 16px;
		color: #dc4851;
		font-weight: bold;
	}
	.task_status_crow{
		color: #70be2d;
	}
	.task_status_icon{
		margin-right: 18px;
	}
	
	.leave_message{
		flex: 1;
		margin-top: 10px;
		margin-bottom: 15px;
		background: #ffffff;
		border-radius: 5px;
		box-shadow: 0 0 10px rgba(0,0,0,0.1);
		display: flex;
		flex-direction: column;
	}
	.chat_record{
		flex: 1;
		padding-top: 10px;
		overflow-y: auto;
		padding-bottom: 20px;
	}
	.chat_input{
		height: 145px;
		border-top: 1px solid #ebebeb;
		position: relative;
	}
	.no_leave_msg{
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
	.file_upload{
		display: flex;
		height: 50px;
		align-items: center;
		position: relative;
	}
	.file_upload .select_file{
		padding:8px 20px;
		padding-right: 12px;
		cursor: pointer;
	}
	.file_upload img{
		/*width: 20px;
		height: 18px;*/
	}
	.file_cover{
		position: fixed;
		left: 0px;
		bottom:0px;
		top:0;
		right: 0;
		margin: auto;
		background: rgba(0,0,0,0.3);
	}
	.file_list_content{
		position: fixed;
		width: 860px;
		height: 478px;
		/*border: 1px solid #ebebeb;*/
		box-shadow: 0 0 10px rgba(0,0,0,0.1);
		left: 0px;
		bottom:0px;
		top:0;
		right: 0;
		margin: auto;
		background: #ffffff;
		z-index: 10px;
		display: flex;
		flex-direction: column;
		border-radius: 10px;
	}
	.file_scroll_content{
		width: 100%;
		height: 100%;
		position: relative;
	}
	.file_close{
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		position: absolute;
		left: 0;
		top:0;
		
		border-bottom: 1px solid #ebebeb;
	}
	.file_close_title{
		flex: 1;
		text-align: center;
	}
	.file_close_btn{
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}
	.file_li_con{
		flex: 1;
		display: flex;
		padding-top: 50px;
		flex-direction: column;
	}
	.file_item{
		width: 100%;
		display: flex;
		/*flex-wrap:wrap;*/
		height: 65px;
		align-items: center;
		justify-content:space-around;
		border-bottom: 1px solid #ebebeb;
		padding: 0 15px;
	}
	/*文件样式  可复制复用 start*/
	.file_list{
		color: #002d5f;
		display: flex;
		align-items: center;
		height: 30px;
		width: 145px;
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
	/*文件样式  可复制复用 end*/
	
	.submit_btn{
		cursor: pointer;
		color: #ffffff;
		width: 88px;
		height: 32px;
		position: absolute;
		right: 15px;
		bottom: 12px;
		border-radius: 2px;
		background: #002d5f;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.submit_btn .send_icon{
		margin-right: 12px;
	}
	.text_area{
		resize:none;
		outline: none;
		border: none;
		width: 100%;
		padding-left: 20px;
		padding-right: 125px;
		min-height: 50px;
	}
	
	.chat_record_list{
		padding: 0 20px;
		margin-top: 12px;
	}
	
	.chat_other{
		display: flex;
		align-items: center;
	}
	.chat_me{
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.user_icon{
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
	.reply_time{
		font-size: 12px;
		color: #999999;
	}
	.user_icon_time{
		margin-right: 12px;
	}
	.user_name{
		font-size: 16px;
		margin-left: 25px;
		margin-right: 20px;
	}
	
	.chat_con{
		margin: 0 64px;
		background: #f6f6f6;
		border-radius: 8px;
		padding: 17px 14px;
		margin-top: 10px;
		width: auto;
		display: inline-block;
		position: relative;
	}
	.arrow_icon_01,.arrow_icon_02{
		position: absolute;
		top:-10px
	}
	.arrow_icon_01{
		left: 18px;
	}
	.arrow_icon_02{
		right: 18px;
	}
	.msg_content{
		display: flex;
		flex-wrap: wrap;
	}
	.send_flie{
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #002d5f;
		cursor: pointer;
		margin-right: 25px;
	}
	.send_img{
		width: 80px;
		height: 62px;
		border-radius: 5px;
		cursor: pointer;
	}
	.send_file_name{
		margin-left: 7px;
		margin-right: 14px;
	}
	.chat_con_me{
		display: flex;
		justify-content: flex-end;
	}
	
	.file_room_colck{
		position: relative;
		display: flex;
		align-items: center;
		
	}
	.del_single_file{
		display: flex;
		width: 25px;
		height: 25px;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}
	
	.file_room_name{
		width: 100%;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.total_file_num{
		position: absolute;
		background: #dc4851;
		color: #ffffff;
		border-radius: 8px;
		font-size: 12px;
		padding: 0 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		right: -14px;
		top: 0px;
	}
</style>