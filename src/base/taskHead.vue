<template>
	<div class="task_heade">
			<div class="task_name">
				<slot name="taskhead"></slot>
			</div>
			<div class="task_close_btn" @click="closeTask($event)">
				<img src="../assets/img/task/close_task_icon.png" alt="" class="close_task_icon"/>
			</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				msg:''
			}
		},
		components:{
			
		},
		methods:{
			closeTask:function(e){
				this.$emit('closeTask',e)
			}
		},
		mounted(){
			
		}
	}
</script>

<style scoped>
.task_heade{
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 50px;
	font-size: 16px;
}
.task_content{
	display: flex;
	padding: 0 20px;
	background: #f6f6f6;
	flex-direction: column;
	flex: 1;
}
.task_close_btn{
	width: 50px;
	height: 50px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>