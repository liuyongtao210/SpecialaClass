<template>
	 <div class="bar_left_pad">
	 	<div class="bar_left_logo"></div>
	 	<router-link to="/taskPage" tag="div" class="bar_list">
	 		<div class="taskIcon"></div>
	 		<p>任务</p>
	 	</router-link>
	 	<router-link to="/calendar" tag="div" class="bar_list">
	 		<div class="calendarIcon"></div>
	 		<p>日历</p>
	 	</router-link>
	 	<router-link to="/myconfig" tag="div" class="bar_list">
	 		<div class="setIcon"></div>
	 		<p>设置</p>
	 	</router-link>
	 </div>
</template>

<script>
	export default {

	}
</script>

<style scoped>
	.bar_left_pad{
	    position: absolute;
	    top: 0;
	    left: 0;
	    width: 91px;
	    height: 100%;
	    box-sizing: border-box;
	    background: #002d5f;
	    z-index: 100;
	}
	.bar_left_logo {
	    width: 91px;
	    height: 90px;
	    background: url(../assets/img/bar/bar_logo.png) no-repeat center;
	    background-size:auto 58px;
	    border-bottom: solid 1px #4a6584;
}
	.bar_list{
		width: 100%;
		height: 90px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-bottom: solid 1px #4a6584;
		cursor: pointer;
		transition: background-color .3s;
	}
	.bar_list:hover{
		background-color: #0f417a;
	}
	.bar_list:active{
		background-color: #4081d0;
	}
	.bar_list>div{
		width: 100%;
	    margin-bottom: 5px;
	}
	.bar_list>p{
		color: #fff;
	    font-size: 16px;
	    
	}
	.taskIcon{
		background: url(../assets/img/bar/main-tab1.png) no-repeat center;
		background-size:30px 30px;
		height: 36px;
	}
	.calendarIcon{
		background: url(../assets/img/bar/main-tab2.png) no-repeat center;
		background-size:30px 30px;
		height: 36px;
	}
	.setIcon{
		background: url(../assets/img/bar/main-tab4.png) no-repeat center;
		background-size:30px 30px;
		height: 36px;
	}	
	.router-link-active{
		background:url(../assets/img/bar/bar_cur.png) no-repeat center;
		background-size: 92px;
	}

</style>