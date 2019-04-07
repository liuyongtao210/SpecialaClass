<template>
		<!--<headers :back="true">-->
			<!--<div slot="header" class="headerSon cur">echarts</div>-->
		<!--</headers>-->
		<div class="calendar_box">
			<div class="course_calendar_header">
				<div class="course_calendar_controlPanel">
					<button class="course_calendar_pre" @click="calendarPre"></button>
					<p class="course_calendar_title" v-bind:title="currentYear+'.'+(currentMonth+1)">
						{{currentYear}}年 {{currentMonth+1}}月
					</p>
					<button class="course_calendar_next" @click="calendarNext"></button>
				</div>
				<div class="dataTypeSelect" v-if="role!=3">
					<div class="chooseDepartment jquerySelectBox" v-if="role!=1" @click.stop="showJquerySelectBox($event)" style="top: 10px;">
						<!--<span v-if="chooseDepartment==''">我的</span>
						<span v-if="chooseDepartment!=''">{{chooseDepartment}}</span>-->
						<span>{{chooseDepartmentObj.name}}</span>
						<span class="pull_arrow_leftLine"></span>
						<span class="pull_arrow"><span class="pull_arrow_icon"></span></span>
						<ul class="panelSelect_boxStyle_ul jquerySelect">
							<template v-for="department in departmentList">
								<li style="height: 25px;line-height: 25px;text-align: left;padding: 0;" @click="chooseDep(department)">
									{{department.name}}
								</li>
							</template>
						</ul>
					</div>
					<div class="dataNameBox">
						班课 / 学生:
						<input class="dataNameBoxInput" placeholder="'班课名称'或'学生姓名'" v-model="dataName" />
					</div>
					<button class="searchButton" @click="searchData">搜索</button>
				</div>
				<div class="course_calendar_changeBox">
					<button class="changeBox_button changeBox_button_calendar" v-bind:class="{changeBox_button_active:calendarType==0}" @click="changeCalendar(0)">课表</button>
					<button class="changeBox_button changeBox_button_list" v-bind:class="{changeBox_button_active:calendarType==1}" @click="changeCalendar(1)">任务</button>
				</div>
			</div>
			<div class="course_calendar_content" v-if="calendarType==0">
				<div class="course_calendar_days">
					<div class="course_calendar_weekRow" style="min-height: 56px;line-height: 56px;border-bottom: 1px solid #f8f8f8;">
						<div class="course_calendar_day course_calendar_week" style="font-size: 16px;min-height: 56px;line-height: 56px;padding-top: 0;" v-for="week in weeks">{{week}}</div>
					</div>
				</div>
				<div class="course_calendar_days">
					<div class="course_calendar_weekRow" v-for="(weekRow,wIndex) in weekRows">
						<div class="course_calendar_day course_calendar_day_autoHeight" v-for="(day,index) in weekRow" v-bind:class="{course_calendar_day_canActive:!(wIndex==0&&day.day>20||wIndex>2&&day.day<8)}">
							<p class="course_calendar_day_title" v-if="day.fullDate!=today_fullDateStr">
								{{day.day}}</p>
							<p class="course_calendar_day_title" v-if="day.fullDate==today_fullDateStr" style="color: #ff3e3e;">今</p>
							<div class="course_calendar_day_previewList">
								<template v-for="(preview,listIndex) in day.dataList">
									<div class="course_calendar_day_detailCourse" v-if="preview.classType==1" style="color: #fefefe;">
										<div class="course_calendar_day_detailCourse_bg" style="background-color: #02C2B2;"></div>
										<p class="course_title">{{preview.classTimes}} {{preview.name}}</p>
										<span class="course_studentName">{{preview.studentNames}}</span>
										<span class="course_depName">{{preview.depName}}</span>
									</div>
									<div class="course_calendar_day_detailCourse" v-if="preview.classType==2" style="color: #333333;">
										<div class="course_calendar_day_detailCourse_bg" style="background-color: #e8e8e8;"></div>
										<p class="course_title">{{preview.classTimes}} {{preview.name}}</p>
										<span class="course_studentName">班课</span>
										<span class="course_depName">{{preview.depName}}</span>
									</div>
								</template>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="course_calendar_taskList course_calendar_content" v-if="calendarType==1" v-on:scroll="scrollEvent($event)">
				<p class="taskNone" v-if="taskList.length<1">暂无任务</p>
				<template v-for="task in taskList">
					<div class="taskBox">
						<div class="taskDate">
							{{task.fullDate}}
						</div>
						<div class="task_dataList" v-if="task.dataList.length>0">
							<div class="task_dataList_title"><span class="task_dataList_title_line"></span>课程</div>
							<div class="task_dataList_list" v-for="(myData,index) in task.dataList" >
								<p class="task_dataList_list_name" v-if="myData.classType==1">{{index+1}}<span>{{myData.studentNames}}</span>{{myData.name}}</p>
								<p class="task_dataList_list_name" v-if="myData.classType==2">{{index+1}}<span>【班课】</span>{{myData.name}}</p>
								<div class="task_dataList_list_label task_dataList_list_teacherName">{{myData.teacherName}}</div>
								<div class="task_dataList_list_label task_dataList_list_time">{{myData.classDate|filterFullDateToDate}} {{myData.classTimes}}</div>
								<div class="task_dataList_list_label task_dataList_list_address">{{myData.classAddress}}</div>
							</div>
						</div>
						<div class="task_dataList" v-if="task.taskList.length>0">
							<div class="task_dataList_title"><span class="task_dataList_title_line" style="background-color: #FD9F30;"></span>任务</div>
							<div class="task_dataList_list" v-for="(myTask,index) in task.taskList" >
								<p class="task_dataList_list_name" v-if="myTask.taskType==1">{{index+1}}<span>【学习】</span>{{myTask.taskName}}</p>
								<p class="task_dataList_list_name" v-if="myTask.taskType==2">{{index+1}}<span>【班课线上】</span>{{myTask.taskName}}</p>
								<p class="task_dataList_list_name" v-if="myTask.taskType==3">{{index+1}}<span>【班课线下】</span>{{myTask.taskName}}</p>
								<p class="task_dataList_list_name" v-if="myTask.taskType==4">{{index+1}}<span>【1V1线上】</span>{{myTask.taskName}}</p>
								<p class="task_dataList_list_name" v-if="myTask.taskType==5">{{index+1}}<span>【1V1线下】</span>{{myTask.taskName}}</p>
								<div class="task_dataList_list_label task_dataList_list_time">{{myTask.taskTime|filterTimeToDate}}</div>
								<div class="task_dataList_list_label" style="color: #DC4851;" v-if="myTask.finish==0">未完成</div>
								<div class="task_dataList_list_label" v-if="myTask.finish==1">已完成</div>
							</div>
						</div>
					</div>
				</template>
				<div class="infinite_scroll" v-if="taskList.length>0">{{loadingText}}</div>
				<!--<pagiNation :totalData='pageTotal' :everyPageNum='pageSize' v-on:pageChange="pageActive"></pagiNation>-->
			</div>
		</div>
</template>

<script>
	export default {
		name: 'calendar',
		data() {
			return {	
				userId:"",
				token:"",
				role:0,
				userInfo:{},
				departmentList:[],
                tempLeafNodeArray: [],
                chooseDepartment:"",//选择部门
                chooseDepartmentObj:{},//选择部门的对象数据
                dataName:"",//选择条件：班课名、学生姓名
				/*日历*/
				calendarType:0,
				currentYear: 0, //面板当前年
				currentMonth: 0, //面板当前月
				today_year: 0, //今天的年
				today_month: 0, //今天的月
				today_day: 0, //今天的日
				today_fullDateStr: "", //今天的年月日
				days: [], //月历一个月内展示的天
				weekRows: [], //月历一个月内按星期换行分组
				dayCalendarObj: {}, //日历展示的当日对象
				search_beginTime: "",
				search_endTime: "",
				weeks: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
				/*任务列表*/
				taskList:[],
				beginTime:0,
				endTime:0,
				pageNum:0,
				pageSize:30,
				pageTotal:0,
				isLoaded:false,
				loadingText:""
			}
		},
		methods: {
			scrollEvent:function(ev){
				if(!this.isLoaded){
					var maxScrollHeight = ev.target.scrollHeight - ev.target.offsetHeight;
					if(ev.target.scrollTop>=maxScrollHeight){
						this.scrollLoading();
						if(this.pageNum < Math.ceil(this.pageTotal/this.pageSize)){
							this.loadingText = "正在加载……";
							this.getTaskList(this.beginTime,this.endTime,this.pageNum);
						}else{
							this.scrollLoaded();
							this.loadingText = "没有更多了";
						}
					}
				}
			},
			scrollLoading:function(){
				this.isLoaded = true;
			},
			scrollLoaded:function(ev){
				this.isLoaded = false;
				this.loadingText = "";
				this.WeuiModel.hideLoad();
			},
			setWeekWidth:function() {
				var w = parseInt($(".research_calendar_weekRow").width() / 7);
				$(".research_calendar_week").css("width", w);
				$(".research_calendar_day").css("width", w);
			
			},
			initData:function(){
				this.userId = this.common.getCookie("userId");
				this.token = this.common.getCookie("token");
				this.role = this.common.getCookie("role");
//				this.role = 1;
				this.userInfo = JSON.parse(localStorage.getItem('userInfo')); 
                var myObj = {
                	name:"我的",
                	structure:""
                }
                this.chooseDepartmentObj = myObj;
				this.getDepartment();
			},
			getDepartment:function(){
                this.common.request("courseSchedule.Class", "depAllSearch", {}, (data)=> {
                    if (data.code == 0) {
                        if (data.children.length > 0) {
                            this.tempLeafNodeArray = new Array();
                            this.departmentList = new Array();
                            this.getLeafNode(data.children);
                            this.departmentList = this.tempLeafNodeArray;
                            var myObj = {
                            	name:"我的",
                            	structure:""
                            }
                            this.departmentList.push(myObj);
                        }
                    }else{
						this.WeuiModel.showAlert("获取部门列表失败",data.msg);
					}
                });
			},
            getLeafNode: function (rootNode) {
                for (var i = 0; i < rootNode.length; i++) {
                    if (rootNode[i].leaf) {
                        this.tempLeafNodeArray.push(rootNode[i]);
                    } else {
                        this.tempLeafNodeArray.push(rootNode[i]);
                        this.getLeafNode(rootNode[i].children);
                    }
                }
            },
            chooseDep:function(department){
            	this.chooseDepartmentObj = department;
            },
            searchData:function(){
				this.getSchedule(this.beginTime, this.endTime);
            },
			initCalendar: function() {
				var d = new Date();
				this.today_year = d.getFullYear();
				this.today_month = d.getMonth();
				this.today_day = d.getDate();
				this.today_fullDateStr = this.today_year + "-" + this.formatDateToAddZero(this.today_month + 1) + "-" + this.formatDateToAddZero(this.today_day);
				this.setCalendar(d);
			},
			setCalendar: function(d, dayObj) { //dayObj可选，日历模式控制月历使用
				this.days = new Array();
				var year = d.getFullYear();
				var month = d.getMonth();
				this.currentYear = year;
				this.currentMonth = month;
				//获取当月1日之前的日期
				var d_currentFirst = new Date(year, month, 1);
				var beforMonth = d_currentFirst.getDay();
				for(var i = beforMonth; i > 0; i--) {
					var d_before = new Date(year, month, 1 - i);
					this.days.push({
						year: d_before.getFullYear(),
						month: d_before.getMonth(),
						day: d_before.getDate(),
						time: d_before.getTime(),
						fullDate: d_before.getFullYear() + "-" + this.formatDateToAddZero(d_before.getMonth() + 1) + "-" + this.formatDateToAddZero(d_before.getDate()),
						dataList: [],
						taskList: []
					})
				}
				//获取当月日期
				var d_current = new Date(year, month + 1, 0);
				var currentDaysTotal = d_current.getDate();
				for(var i = 1; i <= currentDaysTotal; i++) {
					this.days.push({
						year: year,
						month: month,
						day: i,
						time: d_current.getTime(),
						fullDate: year + "-" + this.formatDateToAddZero(month + 1) + "-" + this.formatDateToAddZero(i),
						dataList: [],
						taskList: []
					})
				}
				//获取当月之后的日期
				var d_currentAfter = new Date(year, month, currentDaysTotal);
				var afterMonth_day = d_currentAfter.getDay();
				var afterIndex = 6 - afterMonth_day;
				for(var i = 0; i < afterIndex; i++) {
					var d_after = new Date(year, month, currentDaysTotal + i + 1);
					this.days.push({
						year: d_after.getFullYear(),
						month: d_after.getMonth(),
						day: d_after.getDate(),
						time: d_after.getTime(),
						fullDate: d_after.getFullYear() + "-" + this.formatDateToAddZero(d_after.getMonth() + 1) + "-" + this.formatDateToAddZero(d_after.getDate()),
						dataList: [],
						taskList: []
					})
				}
				var beginTime = year + "-" + this.formatDateToAddZero(month + 1) + "-01";
				var endTime = year + "-" + this.formatDateToAddZero(month + 1) + "-" + this.formatDateToAddZero(currentDaysTotal);

				this.searchSchedule();
			},
			searchSchedule: function() {
				var d0 = new Date(this.currentYear, this.currentMonth, 1);
//					var beginTime = this.currentYear + "-" + this.formatDateToAddZero(this.currentMonth + 1) + "-01";
				var d = new Date(this.currentYear, this.currentMonth + 1, 1);
//					var endTime = this.currentYear + "-" + this.formatDateToAddZero(this.currentMonth + 1) + "-" + this.formatDateToAddZero(d.getDate());
				var beginTime = d0.getTime();
				var endTime = d.getTime();
				this.getSchedule(beginTime, endTime);
			},
			getSchedule: function(beginTime, endTime) {
				this.beginTime = beginTime;
				this.endTime = endTime;
				var params = {
					userId:this.userId,
					token:this.token,
					startDate:this.formatTimeToStr(beginTime),
					endDate:this.formatTimeToStr(endTime),
					structure:this.chooseDepartmentObj.structure,
					name:this.role==3?this.userInfo.userName:this.dataName,
					role:this.role
				};
				this.WeuiModel.showLoad("正在获取课表");
				this.common.request("courseSchedule.ClassCenter","schedule",params,(data)=>{
					this.WeuiModel.hideLoad();
					if(data.code == 0){
						for(var i=0;i<this.days.length;i++){
							this.days[i].dataList = new Array();
							for(var j=0;j<data.data.length;j++){
								if(this.days[i].fullDate == data.data[j].classDate){
									this.days[i].dataList = data.data[j].dataList;
								}
							}
						}
						this.pageNum = 0;
						this.getTaskList(beginTime,endTime,0);
					}else{
						this.WeuiModel.showAlert("获取课表失败",data.msg);
					}
					this.setCalendarWeekRows();
				});
			},
			setCalendarWeekRows: function() {
				this.weekRows = new Array();
				var daysLen = this.days.length;
				var j = 0;
				for(var i = 0; i < daysLen; i++) {
					if(i % 7 == 0) {
						j++;
						this.weekRows[j - 1] = new Array();
					}
					this.weekRows[j - 1].push(this.days[i]);
				}
				this.$nextTick(function(){
//					this.hasLoaded = true;
					this.setCalendarHeight();
				})
			},
			pageActive:function(val){
				this.getTaskList(this.beginTime,this.endTime,val-1);
			},
			getTaskList:function(beginTime, endTime,page){
				this.WeuiModel.showLoad("更在获取任务");
				var params = {
					userId:this.userId,
					token:this.token,
					startDate:beginTime,
					endDate:endTime,
					page:page,
					size:this.pageSize,
					sortType:"asc"
				};
				this.common.request("courseSchedule.ClassCenter","task",params,(data)=>{
					this.WeuiModel.hideLoad();
					if(data.code == 0){
						this.pageTotal = data.total;
//						this.taskList = data.list;
						for(var i=0;i<data.list.length;i++){
							data.list[i]["fullDate"] = this.formatTimeToStr(data.list[i].taskTime);
							for(var j=0;j<this.days.length;j++){
								if(this.days[j].fullDate==data.list[i].fullDate){
									this.days[j].taskList.push(data.list[i]);
									break;
								}
							}
						}
						this.taskList = new Array();
						for(var i=0;i<this.days.length;i++){
							if(this.days[i].dataList.length>0||this.days[i].taskList.length>0){
								this.taskList.push(this.days[i]);
							}
						}
						this.$nextTick(()=>{
							this.pageNum++;
							this.scrollLoaded();
						});
					}else{
						this.WeuiModel.showAlert("获取任务列表失败",data.msg);
					}
				});
			},
			changeCalendar: function(type) {
				this.calendarType = type;
				this.$nextTick(function(){
					if(type==0){
						this.setCalendarHeight();
					}
				});
			},
			calendarPre: function() {
				var d_pre = new Date(this.currentYear, this.currentMonth - 1);
				this.setCalendar(d_pre);
			},
			calendarNext: function() {
				var d_next = new Date(this.currentYear, this.currentMonth + 1);
				this.setCalendar(d_next);
			},
			setCalendarHeight:function(){
				var minHeight = parseInt(($(window).height()-219)/this.weekRows.length);
				$(".course_calendar_day_autoHeight").css("minHeight",minHeight+"px");
			},
			formatDateToAddZero: function(num) { //+0
				var formatNum = num < 10 ? ("0" + num) : num;
				return formatNum;
			},
			formatTimeToStr:function(time){
				var d = new Date(time);
				var year = d.getFullYear();
				var month = (d.getMonth()+1)>9?(d.getMonth()+1):"0"+(d.getMonth()+1);
				var day = (d.getDate())>9?(d.getDate()):"0"+(d.getDate());
				return year+"-"+month+"-"+day;
			},
			showJquerySelectBox:function(ev){
			}
		},
		filters:{
			filterFullDateToDate(dateStr){
				var tempArr = dateStr.split("-");
				return tempArr[1]+"/"+tempArr[2];
			},
			filterTimeToDate(times){
				var d = new Date(times);
				return (d.getMonth()+1)+"/"+d.getDate();
			}
		},
		watch:{
//			calendarType:function(){
//				if(this.calendarType==1){
//					this.$nextTick(function(){
//					});
//				}
//			}
		},
		components: {
		},
		mounted() {
			this.initData();
			this.initCalendar();
			addJquerySelectEvent();
		$(window).click(function() {
			closeAllSelect();
		})
//			$(window).resize(function() {
//				this.setWeekWidth();
//			}).bind(this);
		},
	}
	function closeAllSelect(self) {
		$(".pull_arrow").children(".pull_arrow_icon").css("transform", "rotate(0)");
		for(var i = 0; i < $(".jquerySelect").length; i++) {
			if(!$(".jquerySelect").eq(i).is(self)) {
				$(".jquerySelect").eq(i).slideUp(250);
			}
		}
		//		$(".myMiniCalendar").slideUp(200);
		//		$(".calendarInputBox").removeClass("calendarInputBox_active");
	}

	function addJquerySelectEvent() {
		$(".jquerySelectBox").click(function() {
//			events=arguments.callee.caller.arguments[0] || window.event;//获取event属性
//			events.stopPropagation();
			closeAllSelect($(this).children(".jquerySelect").eq(0));
			if($(this).children(".jquerySelect").css("display") == "none") {
				$(this).children(".pull_arrow").children(".pull_arrow_icon").css("transform", "rotate(180deg)");
			} else {
				$(this).children(".pull_arrow").children(".pull_arrow_icon").css("transform", "rotate(0)");
			}
			$(this).children(".jquerySelect").slideToggle(250, function() {

			});
		});
	}
</script>

<style scoped>
	.calendar_box {
		position: relative;
		width: 100%;
		height: 100%;
		padding-left: 91px;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		background-color: #F6F6F6;
		padding: 0 18px 0 109px;
	}
	.course_calendarBox {
		position: relative;
		width: 100%;
		height: auto;
		padding-left: 15px;
		padding-right: 15px;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	
	.course_calendar_header {
		position: relative;
		width: 100%;
		height: 50px;
		background-color: #FFFFFF;
		margin: 15px auto 10px;
		box-shadow: 0 3px 7px rgba(239, 239, 239, 0.35);
		-webkit-box-shadow: 0 3px 7px rgba(239, 239, 239, 0.35);
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	
	.course_calendar_controlPanel {
		position: relative;
		width: 100%;
		height: 50px;
		line-height: 50px;
		font-size: 18px;
		color: #333333;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		/*padding-left:calc(50% - 280px);*/
		display: flex;
		text-align: center;
		-webkit-justify-content: flex-start;
		justify-content: flex-start;
		-webkit-align-items: center;
		align-items: center;
		padding-left: 10px;
	}
	
	.course_calendar_title {
		position: relative;
		width: 160px;
		line-height: 70px;
		display: inline-block;
		/*top: -27px;*/
		/*float: left;*/
	}
	
	.course_calendar_pre {
		position: relative;
		width: 20px;
		height: 20px;
		border: none;
		/*border-radius: 2px;*/
		background: url("../assets/img/calendar/calendar_pre2.png") no-repeat center center;
		background-size: 10px 18px;
		cursor: pointer;
		/*float: left;*/
	}
	
	.course_calendar_next {
		position: relative;
		width: 20px;
		height: 20px;
		border: none;
		/*border-radius: 2px;*/
		background: url("../assets/img/calendar/calendar_next2.png") no-repeat center center;
		background-size: 10px 18px;
		cursor: pointer;
		/*float: left;*/
	}
	.course_calendar_labelStyle {
		text-align: center;
		margin-bottom: 15px;
	}
	
	.course_calendar_label {
		/*position: relative;*/
		display: inline;
		line-height: 28px;
		margin: 0 12px;
	}
	
	.course_calendar_label_icon {
		position: relative;
		display: inline-block;
		width: 8px;
		height: 8px;
		border-radius: 8px;
		top: -2px;
		margin-right: 2px;
	}
	
	.course_calendar_label_text {
		position: relative;
		font-size: 16px;
		color: #333333;
	}
	
	.course_calendar_content {
		position: relative;
		max-height: calc(100vh - 157px);
		overflow: auto;
		/*border-top: 1px solid #666666;
		border-left: 1px solid #666666;*/
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 10px;
		margin-bottom: 10px;
		box-shadow: 0 3px 7px rgba(239, 239, 239, 0.35);
		-webkit-box-shadow: 0 3px 7px rgba(239, 239, 239, 0.35);
	}
	
	::-webkit-scrollbar {
		width: 8px;
	}
	
	 ::-webkit-scrollbar-track {}
	
	 ::-webkit-scrollbar-thumb {
		border-radius: 5px;
		background: rgba(153, 168, 185, 0.5);
	}
	
	 ::-webkit-scrollbar-thumb:hover {
		background: rgba(153, 168, 185, 0.7);
	}
	
	.course_calendar_weeks {
		position: relative;
		width: 100%;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		/*border-left: 1px solid #666666;*/
		border-bottom: 1px solid #666666;
	}
	
	.course_calendar_week {
		position: relative;
		float: left;
		width: 14.28%;
		height: 40px;
		min-height: 40px;
		line-height: 40px;
		padding-left: 10px;
		display: inline-block;
		/*border-bottom: 1px solid #666666;*/
		/*border-top: 1px solid #666666;*/
		border-right: 1px solid #f8f8f8;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		font-size: 14px;
		color: #333333;
	}
	
	.course_calendar_week:last-child {
		border-right: none;
	}
	
	.course_calendar_weekRow {
		position: relative;
		width: 100%;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		min-height: 110px;
		height: auto;
		display: flex;
		/*border-left: 1px solid #666666;*/
		border-bottom: 1px solid #f8f8f8;
		/*border-right: 1px solid #666666;*/
	}
	
	.course_calendar_weekRow:last-child {
		border-bottom: none;
	}
	
	.course_calendar_days {
		/*height: calc(100vh - 219px);*/
		/*overflow: auto;*/
	}
	
	.course_calendar_day {
		position: relative;
		width: 14.28%;
		min-height: 110px;
		height: auto;
		float: left;
		/*display: inline-block;*/
		display: flex;
		border-right: 1px solid #f8f8f8;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		flex-grow: 1;
		padding-top: 40px;
		/*align-items: flex-end;
		align-content:space-between;*/
	}
	
	.course_calendar_day:last-child {
		border-right: none;
	}
	
	.course_calendar_day .course_calendar_day_title {
		color: #999999;
	}
	
	.course_calendar_day_canActive .course_calendar_day_title {
		color: #333333;
	}
	
	.course_calendar_day_canActive {
		color: #333333;
		cursor: pointer;
	}
	
	.course_calendar_day_canActive:hover {
		background-color: #f5f5f5;
	}
	
	.course_calendar_day_title {
		/*position: relative;*/
		position: absolute;
		top: 0;
		left: 0;
		font-size: 16px;
		/*font-size: 14px;*/
		line-height: 32px;
		padding: 0 0 0 18px;
	}
	
	.course_calendar_day_previewList {
		-webkit-align-self: flex-end;
		align-self: flex-end;
		-webkit-flex: 100%;
		flex: 100%;
	}
    .course_calendar_day_detailCourse {
        position: relative;
        width: 100%;
        /*height: 80px;*/
        min-height: 41px;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        padding-left: 10px;
        padding-bottom: 21px;
        margin-top: 2px;
        line-height: 20px;
        font-size: 12px;
    }

    .course_calendar_day_detailCourse .course_title{
    	position: relative;
    	line-height: 20px;
    }
    .course_calendar_day_detailCourse .course_studentName{
    	position: absolute;
    	bottom: 0;
    	left: 10px;
    	line-height: 20px;
    }
    .course_calendar_day_detailCourse .course_depName{
    	position: absolute;
    	bottom: 0;
    	right: 10px;
    	line-height: 20px;
    }
    .course_calendar_day_detailCourse .course_calendar_day_detailCourse_bg {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0.8;
    }

    .course_calendar_day_detailCourse:hover .course_calendar_day_detailCourse_bg {
        opacity: 1;
    }
	/*calendar base END*/
	.course_calendar_changeBox {
		position: absolute;
		top: 9px;
		right: 20px;
		width: 260px;
		background-color: #F1F1F1;
		border-radius: 80px;
	}
	
	.changeBox_button {
		position: relative;
		width: 50%;
		height: 32px;
		font-size: 14px;
		border-radius: 80px;
		padding-left: 33px;
		/*border: 2px solid black;*/
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		display: inline-block;
		float: left;
		cursor: pointer;
	}
	
	.changeBox_button_calendar {
		background: url('../assets/img/calendar/calendar_icon.png')no-repeat 29px center;
		background-size: 18px 16px;
	}
	
	.changeBox_button_list {
		background: url('../assets/img/calendar/task_list.png')no-repeat 29px center;
		background-size: 14px 16px;
	}
	
	.changeBox_button:first-child {
		border-right: none;
	}
	
	.changeBox_button_active {
		color: #FFFFFF;
	}
	
	.changeBox_button_calendar.changeBox_button_active {
		background: url('../assets/img/calendar/calendar_icon_active.png')no-repeat 29px center, #dc4851;
		background-size: 18px 16px;
	}
	
	.changeBox_button_list.changeBox_button_active {
		background: url('../assets/img/calendar/task_list_active.png')no-repeat 29px center, #dc4851;
		background-size: 14px 16px;
	}
	/*task*/
	.taskBox{
		position: relative;
		width: 100%;
		box-sizing: border-box;
		padding: 0 20px;
	}
	.taskDate{
		position: relative;
		width: 100%;
		font-size: 18px;
		color: #333333;
		height: 58px;
		line-height: 58px;
		border-bottom: 1px solid #e6e6e6;
		margin-bottom: 17px;
	}
	.task_dataList{
		position: relative;
	}
	.task_dataList_title{
		position: relative;
		width: 100%;
		height: 16px;
		line-height: 16px;
		font-size: 16px;
		color: #333333;
		box-sizing: border-box;
		padding-left: 14px;
		margin-bottom: 14px;
	}
	.task_dataList_title_line{
		position: absolute;
		width: 4px;
		height: 100%;
		display: inline-block;
		top: 0;
		left: 0;
		background-color: #02c2b2;
		border-radius: 2px;
	}
	.task_dataList_list{
		position: relative;
		width: 100%;
		background-color: #F3F7FC;
		border-radius: 6px;
		padding: 8px 17px;
		margin-bottom: 20px;
		box-sizing: border-box;
	}
	.task_dataList_list_name{
		position: relative;
		color: #333333;
		font-size: 16px;
		line-height: 32px;
	}
	.task_dataList_list_name span{
		margin: 0 10px 0 16px;
	}
	.task_dataList_list_label{
		position: relative;
		line-height: 32px;
		height: 32px;
		display: inline-block;
		margin-right: 40px;
		padding-left: 32px;
		box-sizing: border-box;
		font-size: 14px;
		color: #333333;
		
	}
	.task_dataList_list_teacherName{
		background: url("../assets/img/calendar/user_icon.png")no-repeat left center;
		background-size: 15px 15px;
	}
	.task_dataList_list_time{
		background: url("../assets/img/calendar/clock_icon.png")no-repeat left center;
		background-size: 15px 15px;
	}
	.task_dataList_list_address{
		background: url("../assets/img/calendar/address_icon.png")no-repeat left center;
		background-size: 12px 17px;
	}
	.course_calendar_taskList .infinite_scroll{
		position: relative;
		width: 100%;
		height: 100px;
		text-align: center;
		line-height: 100px;
		font-size: 12px;
		color: #BEBEBE;
	}
	
	.dataTypeSelect{
		position: absolute;
		right: 300px;
		top: 0;
		bottom: 0;
	}
	.searchButton{
		position: relative;
		display: inline-block;
		float: left;
		width: 74px;
		height: 32px;
		top: 11px;
		line-height: 32px;
		box-sizing: border-box;
		cursor: pointer;
		margin-left: 14px;
		background-color: #f5f5f5;
		color: #333333;
		border: 1px solid #bebebe;
		border-radius: 4px;
	}
	.searchButton:hover{
		background-color: #f5f5f5;
		border: 1px solid #dc4851;
		color: #dc4851;
	}
	.dataNameBox{
		position: relative;
		display: inline-block;
		float: left;
		width: auto;
		height: 32px;
		top: 10px;
		line-height: 32px;
		box-sizing: border-box;
		padding-left: 10px;
		cursor: pointer;
	}
	.dataNameBoxInput{
		position: relative;
		width: 160px;
		height: 32px;
		line-height: 30px;
		border: 1px solid #e1e1e1;
		box-sizing: border-box;
		padding-left: 10px;
		margin-left: 10px;
	}
	.chooseDepartment{
		position: relative;
		display: inline-block;
		float: left;
		width: 125px;
		height: 32px;
		border: 1px solid #e1e1e1;
		line-height: 32px;
		box-sizing: border-box;
		padding-left: 10px;
		cursor: pointer;
		margin-right: 25px;
	}
	.panelSelect_boxStyle_ul {
		position: absolute;
		width: calc(100% + 2px );
		top: 30px;
		left: -1px;
		border: 1px solid #e1e1e1;
		background-color: #FFFFFF;
		text-indent: 10px;
		z-index: 1;
	}
	
	.panelSelect_boxStyle_ul li {
		background-color: #FFFFFF;
		cursor: pointer;
	}
	
	.panelSelect_boxStyle_ul li:hover {
		background: #666666;
		color: #FFFFFF;
	}
	.pull_arrow_leftLine {
				position: absolute;
				top: 0;
				right: 30px;
				display: inline-block;
				width: 1px;
				height: 30px;
				background-color: #E1E1E1;
			}
			
			.pull_arrow {
				position: absolute;
				top: 0;
				right: 0;
				display: inline-block;
				width: 30px;
				height: 30px;
			}
			
			.pull_arrow_icon {
				position: absolute;
				top: 0;
				left: 0;
				display: inline-block;
				width: 30px;
				height: 30px;
				background: url("../assets/img/calendar/arrow_pull_down.png") no-repeat center center, transparent;
				background-size: 12px 7px;
				transform: rotate(0);
				transition: transform 0.25s;
			}
			
			.jquerySelect {
				display: none;
			}
			.taskNone{
				position: relative;
				width: 100%;
				line-height: 100px;
				text-align: center;
				color: #BEBEBE;
			}
</style>

						<!--<div class="task_dataList">
							<div class="task_dataList_title">课程</div>
							<div class="task_dataList_list" v-for="myData in task.dataList" >
								{{myData.name}}
							</div>
						</div>-->