<template>
	<div class="task_content">
		<taskhead v-on:closeTask="closeTask">
			<span slot="taskhead">任务审批</span>
		</taskhead>
		<div class="task_content_con">
			<div class="stu_task_list" v-for="item in taskData">
					<div class="task_msg_left">
						<img src="../assets/img/task/user_icon.png" alt="" class="user_icon"/>
						<span class="stu_name">{{item.stuName}}</span>
						<div class="stu_task_status">
							<span class="stu_crle " :class="{stu_crle_blue:item.taskStatus==3,stu_crle_red:item.taskStatus!=3}"></span>
							<span class="stu_status_txt_red" :class="{stu_status_txt_blue:item.taskStatus==3,stu_status_txt_red:item.taskStatus!=3}">
								{{item.statusTxt}}
							</span>
							<!--<span class="stu_status_txt_blue"></span>-->
						</div>
					</div>
					<div class="check_detail">
						查看详情
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
				taskData:[
					{
						stuName:'特优生',
						taskStatus:'0',
						statusTxt:'待审批'
					},
					{
						stuName:'特优生',
						taskStatus:'1',
						statusTxt:'未通过'
					},
					{
						stuName:'特优生',
						taskStatus:'2',
						statusTxt:'未提交'
					},
					{
						stuName:'特优生',
						taskStatus:'3',
						statusTxt:'已通过'
					},
					
				]
			}
		},
		components:{
			taskhead
		},
		methods:{
		closeTask:function(e){
				console.log(e)
			}
		},
		mounted(){
			
		}
	}
</script>

<style scoped>
.stu_task_list{
	padding: 0 15px;
	height: 79px;
	border-bottom: 1px solid #f6f6f6;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.task_msg_left{
	display: flex;
	align-items: center;
}
.user_icon{
	width: 40px;
	height: 40px;
	border-radius: 50%;
}
.stu_name{
	font-size: 16px;
	margin-left: 22px;
	margin-right: 48px;
}
.stu_task_status{
	display: flex;
	align-items: center;
}
.stu_crle{
	display: block;
	width: 4px;
	height: 4px;
	border-radius: 50%;
	margin-right: 10px;
}
.stu_crle_red{
	background: #dc4851;
}
.stu_crle_blue{
	background: #52c932;
}
.stu_status_txt_red{
	color: #dc4851;
}
.stu_status_txt_blue{
	color: #3fb412;
}
.check_detail{
	width: 90px;
	height: 32px;
	border-radius: 3px;
	background: #5bb4ba;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #ffffff;
	cursor: pointer;
}
</style>