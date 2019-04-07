<template>
	<div class="task_content">
		<taskhead v-on:closeTask="closeTask">
			<span slot="taskhead">完成任务</span>
		</taskhead>
		<div class="task_content_con">
		
			<div class="stu_task_content">
				<div class="stu_task_msg">
					<div class="task_des_title">
	   							<div class="des_t_line des_t_line_red"></div>
	   							【{{taskDetailData.studentName}}】 {{taskDetailData.taskName}}
	   				</div>
	   				<div class="stu_name">
	   					<img src="../assets/img/task/stu_user_icon.png" alt="" class="stu_user_icon"/>
	   					<div class="stu_n">{{taskDetailData.studentName}}</div>
	   				</div>
	   				<div class="stu_task_des">
	   					{{taskDetailData.descs}}
	   				</div>
	   				<div class="task_item">
	   					<div class="task_list_title">附件:</div>
	   					<div class="task_detail_con">
							<div class="file_list">
								<img src="../assets/img/task/select_file_icon.png" alt="" class="select_file_icon"/>
								<div class="file_name">filename001.doc</div>
								<div class="select_file_del" title="下载文件">
								<img src="../assets/img/task/send_file_down.png" alt="" class="send_file_down"/>
								</div>
							</div>
	   					</div>
	   				</div>
				</div>
				
				<div class="stu_task_msg_bom">
					<div class="task_item">
	   					<div class="task_list_title_b">正文:</div>
	   					<div class="task_detail_con">
							<textarea name="" rows="" cols="" class="text_area" placeholder="编辑文字或将文件拖拽至此区域上传"  v-model="textareaTxt"></textarea>
	   					</div>
	   				</div>
	   				<div class="task_item up_load_file">
	   					<div class="task_list_title_b">文件上传:</div>
		   				<div class="file_load_box">
		   					<div class="task_detail_con">
								<div class="file_list" v-for="(item,index) in selFileData">
									<img src="../assets/img/task/select_file_icon.png" alt="" class="select_file_icon"/>
									<div class="file_name">{{decodeURIComponent(item.fileName)}}</div>
									<div class="select_file_del" title="删除文件" @click="delFile(index)">
									<img src="../assets/img/task/select_file_del.png" alt="" class="send_file_down"/>
									</div>
								</div>
								
		   					</div>
			   				<div class="add_flie" @click="addFile()">
								添加文件
							</div>
		   				</div>
	   				</div>
				</div>
			
				<div class="footer_des">
					<div class="teach_operation">
						<div class="operatio_btn on_adopt" @click="sbumiTask()">已完成 请老师检查</div>
						<div class="operatio_btn off_adopt" @click="closeTask()">取消</div>
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
				msg:'',
				getTaskId:'',
				textareaTxt:'',
				selFileData:[],
			}
		},
		components:{
			taskhead
		},
		methods:{
			closeTask:function(e){
				this.$router.push({path:'/taskPage',name:'taskPage',query:{save:'success'}})
			},
//			mn = savaCommunication 保存留言
//			params：
//			role、taskId、files、content、userId、token
//			type：1:提交留言;2:学生提交任务;3:老师审核不通过;4:老师审核通过;
			viewDetail:function(taskId,studentId){//查看详情  任务详情
					
	//				this.taskDetailData=e;
					this.WeuiModel.showLoad('数据加载中...');
					this.common.request('courseSchedule.ClassCenter','getTaskDetails',{
						userId:this.userId,
						token:this.token,
						role:this.role,
						taskId:taskId, 
						studentId:studentId,
					},(data)=>{
						this.WeuiModel.hideLoad();
						if(data.code==0){
							this.taskDetailData=data.taskDetail;
						}else{
							this.WeuiModel.showAlert('ERROR!',data.msg,'确定');
						}
					})
					
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
			delFile:function(i){
				this.selFileData.splice(i,1)
			},
			sbumiTask:function(){
					if(this.textareaTxt==''||this.textareaTxt==undefined){
						this.WeuiModel.showAlert('提示',"请输入作业内容!",'确定');
						return ;
					}
					//文件处理
					var fileStr=[];
					for(var i =0;i<this.selFileData.length;i++){
						fileStr.push(this.selFileData[i].fileUrl)
					}
					var upFiles=fileStr.join();
					
				this.WeuiModel.showLoad('Loading...');
				this.common.request('courseSchedule.ClassCenter','savaCommunication',{
					userId:this.userId,
					token:this.token,
					role:this.role,
					content:this.textareaTxt,
					taskId:this.taskDetailData.taskId,
					files:upFiles,
					type:2
				},(data)=>{
					this.WeuiModel.hideLoad();
					if(data.code==0){
						console.log(data)
						this.closeTask()
					}else{
						this.WeuiModel.showAlert('ERROR!',data.msg,'确定');
					}
				})
			},
			initData:function(){
					this.taskDetailData=JSON.parse(this.$route.query.taskDetailData) ;//获取任务ID
					console.log(this.taskDetailData)
			},
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
	min-height: 150px;
	border-radius: 10px;
	padding: 15px;
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
	margin-left: 16px;
}	
.task_item{
	display: flex;
	margin-top: 16px;
}
.up_load_file{
	margin-top: 30px;
}
.task_detail_con{
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	flex: 1;
}
.task_list_title{
	font-size: 16px;
	margin-right: 60px;
}
.task_list_title_b{
	font-size: 16px;
	width: 95px;
}
.file_load_box{
	flex: 1;
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
/*.teach_comment{
	margin-top: 20px;
}*/
.text_area{
	resize:none;
	outline: none;
	border: none;
	width: 100%;
	height: 140px;
	border: 1px solid #e1e1e1;
	padding: 12px 15px;
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
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	background: #dc4851;
}
.on_adopt{
	width: 170px;
	background: #dc4851;
	margin-right: 95px;
	color: #ffffff;
}
.off_adopt{
	border: 1px solid #333333;
	color: #333333;
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
		/*margin-bottom: 25px;*/
		margin-right: 20px;
	}
	.up_load_file .file_list{
		margin-bottom: 25px;
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