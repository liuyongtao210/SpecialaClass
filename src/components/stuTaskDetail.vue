<template>
	<div class="task_content">
		<taskhead v-on:closeTask="closeTask">
			<span slot="taskhead">任务详情</span>
		</taskhead>
		<div class="task_content_con">
			<div class="not_through" v-if="role==3&&taskDetailData.taskType==1&&taskDetailData.finishState==3">
				 不通过原因：{{taskDetailData.reason}}
			</div>
			<div class="stu_task_content">
				<div class="stu_task_msg">
					<div class="task_des_title">
	   							<div class="des_t_line des_t_line_red"></div>
	   							【{{taskDetailData.studentName}}】 {{taskDetailData.taskName}}
	   				</div>
	   				<div class="stu_name">
	   					学生:
	   					<div class="stu_n">{{taskDetailData.studentName}}</div>
	   				</div>
	   				<div class="stu_task_des">
	   					{{taskDetailData.descs}}
	   				</div>
	   				<div class="task_item">
	   					<div class="task_list_title">附件:</div>
	   					<div class="task_detail_con">
	   						未返回数据
							<!--<div class="file_list" >
								<img src="../assets/img/task/select_file_icon.png" alt="" class="select_file_icon"/>
								<div class="file_name">filename001.doc</div>
								<div class="select_file_del" title="下载文件">
								<img src="../assets/img/task/send_file_down.png" alt="" class="send_file_down"/>
								</div>
							</div>-->
	   					</div>
	   				</div>
				</div>
				
				<div class="stu_task_msg stu_task_msg_bom">
					<div class="task_item">
	   					<div class="task_list_title">正文:</div>
	   					<div class="task_detail_con">
							{{taskDetailData.answerText}}
	   					</div>
	   				</div>
	   				<div class="task_item">
	   					<div class="task_list_title">附件:</div>
	   					<div class="task_detail_con">
	   						未返回数据
							<!--<div class="file_list">
								<img src="../assets/img/task/select_file_icon.png" alt="" class="select_file_icon"/>
								<div class="file_name">filename001.doc</div>
								<div class="select_file_del" title="下载文件">
								<img src="../assets/img/task/select_file_del.png" alt="" class="send_file_down"/>
								</div>
							</div>-->
	   					</div>
	   				</div>
				</div>
				<div class="teach_comment" v-if="role!=3&&taskDetailData.taskType==1&&taskDetailData.finishState==2">
					<textarea name="" rows="" cols="" class="text_area" placeholder="请填写通过的评语，或不通过的原因" v-model="textareaTxt"></textarea>
				</div>
				<div class="footer_des">
					<div class="teach_operation" v-if="role!=3&&taskDetailData.taskType==1&&taskDetailData.finishState==2">
						<!--taskDetailData.classId==0&&taskDetailData.taskType==1&&taskDetailData.finishState==2-->
						<div class="operatio_btn on_adopt" @click="isAdopt(4)">通过</div>
						<div class="operatio_btn off_adopt" @click="isAdopt(3)">不通过</div>
					</div>
					<div class="teach_operation" v-if="role==3&&taskDetailData.taskType==1&&taskDetailData.finishState==3">
						<div class="stu_operatio"  @click="sbumitTask()">重新提交</div>
					</div>
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import taskhead from '../base/taskHead';
	export default {
		data(){
			return {
				userId:this.common.getCookie("userId"),
				token:this.common.getCookie("token"),
				role:this.common.getCookie("role"),
				taskDetailData:{},
				selFileData:[],
				textareaTxt:'',
				taskFiles:[],
				taskStuFiles:[]
			}
		},
		components:{
			taskhead
		},
		methods:{
			closeTask:function(e){
				this.$router.push({path:'/taskPage',name:'taskPage',query:{save:'success'}})
			},
			sbumitTask:function(){//学生提交任务 做作业
//				JSON
				this.$router.push({path:'/stuTask',name:'stuTask',query:{taskDetailData:JSON.stringify(this.taskDetailData)}})
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
			isAdopt:function(type){
						this.WeuiModel.showLoad('Loading...');
					this.common.request('courseSchedule.ClassCenter','savaCommunication',{
						userId:this.userId,
						token:this.token,
						role:this.role,
						content:this.textareaTxt,
						taskId:this.taskDetailData.taskId,
						type:type,
						studentId:this.taskDetailData.studentId
					},(data)=>{
						this.WeuiModel.hideLoad();
						if(data.code==0){
							this.closeTask()
						}else{
							this.WeuiModel.showAlert('ERROR!',data.msg,'确定');
						}
					})
			},
			
//			mn = savaCommunication 保存留言
//params：
//role、taskId、files、content、userId、token
//type：1:提交留言;2:学生提交任务;3:老师审核不通过;4:老师审核通过;
			
			
			
			initData:function(){
				this.taskDetailData=JSON.parse(this.$route.query.taskDetailData) ;//获取任务ID
				console.log(this.taskDetailData)
			}
		},
		created(){
			this.initData()
		},
		mounted(){
			
		}
	}
</script>

<style scoped>
.stu_task_content{
	padding: 20px 15px;
}
.stu_task_msg{
	min-height: 150px;
	border-radius: 10px;
	background: #f3f7fc;
	padding: 15px;
}
.stu_task_msg_bom{
	margin-top: 20px;
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
	margin-right:8px;
	margin-bottom: -2px;
}
.des_t_line_red{
	background: #fd9f30;
}
.stu_name{
	display: flex;
	align-items: center;
	height: 30px;
}	
.stu_name .stu_n{
	margin-left: 22px;
}	
.task_item{
	display: flex;
	margin-top: 16px;
}
.task_detail_con{
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	flex: 1;
}
.task_list_title{
	font-size: 16px;
	margin-right: 20px;
}
.not_through{
	color: #dc4851;
	min-height: 50px;
	background: #fffbc7;
	align-items: center;
	padding: 0 28px;
	display: flex;
	align-items: center;
}
.teach_comment{
	margin-top: 20px;
}
.text_area{
	resize:none;
	outline: none;
	border: none;
	width: 100%;
	height: 140px;
	border: 1px solid #e1e1e1;
	padding: 16px 18px;
	border-radius: 4px;
}
.footer_des{
	margin-top: 50px;
	display: flex;
}
.teach_operation{
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.operatio_btn{
	width: 110px;
	height: 32px;
	border-radius: 3px;
	font-size: 16px;
	color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}
.stu_operatio{
	width: 110px;
	height: 32px;
	border-radius: 3px;
	color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	background: #dc4851;
}
.on_adopt{
	background: #48b81b;
	margin-right: 95px;
}
.off_adopt{
	background: #dc4851;
}
	/*文件基础样式  可复制复用  根据需求 简单修改即可 start*/
	
	/*<div class="file_list" v-for="item in selFileData">
		<img src="../assets/img/task/select_file_icon.png" alt="" class="select_file_icon"/>
		<div class="file_name">{{item.fileName}}</div>
		<div class="select_file_del" title="删除文件">
		<img src="../assets/img/task/select_file_del.png" alt="" class="select_file_del_icon"/>
		</div>
	</div>*/
	
	.file_list{
		width: 170px;
		color: #002d5f;
		display: flex;
		align-items: center;
		/*height: 30px;*/
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