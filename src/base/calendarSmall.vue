<template>
	<div class="Small_calendar_pad" :style="{top:top-2+'px'}">
		<div class="Small_calendar_frame">
			<div class="Small_calendar_title">
				<div class="Small_calendar_title_left" @click.stop="goPrevMonth"></div>
				<div class="Small_calendar_title_middle">
					{{nowDate}}
				</div>
				<div class="Small_calendar_title_right" @click.stop="goNextMonth"></div>
			</div>
			<div class="Small_calendar_week">
				<div v-for="(item,index) in weeks">{{item}}</div>
			</div>
			<template v-for="(item,index) in slidesArr">
				<template v-if="index ==1">
					<div class="Small_calendar_month">
						<div v-for="(day,indexSon) in item.date">
							<div class="Small_calendar_slide" @click.stop="sendDay(day.wholeTime,indexSon)" :class="{cur:day.CurrDay == 'cur_',yes:!day.isCurrent,already:day.minToday == 'AlreadyDay'}" :data-whole="day.wholeTime">
								{{day.txt}}
							</div>
						</div>
					</div>
				</template>
				<!--:style="{left:item.index < 0 ? '-'+width+'px' : item.index == 0 ? '0' : width+'px',display:item.index !=0 ? 'none' : 'flex'}"-->

			</template>
			<div class="Small_today_all">
				<div @click.stop="gotoday">今天</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				weeks: [],
				slidesArr: [],
				year: 0,
				month: 0,
				fatherDay: 0,
			}
		},
		props: {
			top: {
				required: true,
				default: 30,
			},
			allTime: {
				required: true,
			}
		},
		methods: {
			gotoday() {
				let obj = this.timestampToTime();
				obj.month = obj.month < 10 ? '0' + obj.month : obj.month;
				obj.day = obj.day < 10 ? '0' + obj.day : obj.day;
				let date_ = `${obj.year}-${obj.month}-${obj.day}`;
				this.$emit('getcalendarTime', this.timestamp_(date_));
				this.month = obj.month;
				this.fatherDay = obj.day;
				this.year = obj.year;
				this.handleSlide(date_);
			},
			//时间戳改成时间
			timestamp_(val) {
				return (new Date(val)).valueOf()
			},
			commonFn(i, wholeTime, nobj) {
				this.slidesArr[1].date.filter((item, index) => {
					item.CurrDay = ''
				});
				this.slidesArr[1].date[i].CurrDay = 'cur_'
				this.$emit('getcalendarTime', this.timestamp_(wholeTime));
				this.month = nobj.month;
				this.fatherDay = nobj.day;
				this.year = nobj.year;
			},
			sendDay(wholeTime, i) {
				let obj = this.timestampToTime();
				let nobj = this.computedMonth(wholeTime);
				if(obj.year == nobj.year && obj.month < nobj.month) {
					this.commonFn(i, wholeTime, nobj);
				} else if(obj.year == nobj.year && obj.month == nobj.month && obj.day <= nobj.day) {
					this.commonFn(i, wholeTime, nobj);
				} else if(obj.year < nobj.year) {
					this.commonFn(i, wholeTime, nobj);
				}

			},
			commonFnNext(z) {
				this.slidesArr[1].date[z].CurrDay = 'cur_';
				let wholeTime = `${this.slidesArr[1].year}-${this.slidesArr[1].month}-01`;
				this.$emit('getcalendarTime', this.timestamp_(wholeTime));
			},
			goNextMonth() {
				let obj_ = this.slidesArr[this.slidesArr.length - 1];
				let obj_month = obj_.month;
				let obj_year = obj_.year;
				let index_ = obj_.index;
				if(obj_month < 12) {
					obj_month += 1
				} else {
					obj_year += 1;
					obj_month = 1;
				}
				let objNext = {}
				objNext['date'] = this.computedDay(obj_year, obj_month);
				objNext['month'] = obj_month;
				objNext['year'] = obj_year;
				objNext['index'] = index_ + 1;
				this.handleTime(objNext['date'], objNext['year'], objNext['month'])
				//this.year = obj_year;
				//this.month = obj_month;
				this.slidesArr.push(objNext);
				this.slidesArr = this.slidesArr.filter((item, _index) => {
					return _index != 0
				});
				this.slidesArr.map((item) => {
					return item.index -= 1;
				});
				this.slidesArr[1].date.filter((item, index) => {
					item.CurrDay = ''
				});
				let obj_nowTime = this.timestampToTime();
				for(let z = 0; z < this.slidesArr[1].date.length; z++) {
					if(this.slidesArr[1].date[z].isCurrent && this.slidesArr[1].date[z].txt == 1) {
						//obj_nowTime.month < this.slidesArr[1].month
						if(obj_nowTime.year < this.slidesArr[1].year) {
							this.commonFnNext(z)
							break;
						} else if(obj_nowTime.year == this.slidesArr[1].year) {
							if(obj_nowTime.month < this.slidesArr[1].month) {
								this.commonFnNext(z)
								break;
							}
						}
					}
				};

			},
			goPrevMonth() {
				let obj_ = this.slidesArr[0];
				let obj_month = obj_.month;
				let obj_year = obj_.year;
				let index_ = obj_.index;
				if(obj_month > 0 && obj_month != 1) {
					obj_month--;
				} else {
					obj_year--;
					obj_month = 12;
				}
				let objNext = {}
				objNext['date'] = this.computedDay(obj_year, obj_month);
				objNext['month'] = obj_month;
				objNext['year'] = obj_year;
				objNext['index'] = index_ - 1;
				this.handleTime(objNext['date'], objNext['year'], objNext['month'])
				this.slidesArr.unshift(objNext);
				this.slidesArr = this.slidesArr.filter((item, _index) => {
					return _index != this.slidesArr.length - 1;
				});
				this.slidesArr.map((item) => {
					return item.index += 1;
				})
				this.slidesArr[1].date.filter((item, index) => {
					item.CurrDay = ''
				});
			},
			init() {
				this.weeks = ['一', '二', '三', '四', '五', '六', '日'];
				let newTimes = this.timestampToTime_new(this.allTime);
				console.log(newTimes)
				this.handleSlide(newTimes);

			},
			timestampToTime_new(timestamp) {
				let date = new Date(timestamp),
					Y = date.getFullYear() + '-',
					M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
					D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
				return Y + M + D;
			},
			timestampToTime(timestamp) {
				let date;
				if(timestamp) {
					date = new Date(timestamp);
				} else {
					date = new Date();
				}
				let Y = date.getFullYear();
				//var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
				let M = date.getMonth() + 1;
				let D = date.getDate();
				let obj = {};
				obj.year = Y;
				obj.month = M;
				obj.day = D;
				return obj;
			},
			/*计算每月天数及上月补全下月补全*/
			computedDay(year_, month_) {
				let _date = new Date();
				let NowYear = _date.getFullYear();
				let NowMonth = _date.getMonth();
				let year = year_; //年
				let month = month_ - 1; //月
				let date = _date.getDate() //日
				let compuArr = [];
				let NowDate = new Date(year, month + 1, 0).getDate(); //这个月一共多少天
				for(let i = 1; i < NowDate + 1; i++) {
					let obj = {};
					obj['data'] = i < 10 ? `0${i}` : i;
					obj['isCurrent'] = true; //当月
					obj['prev'] = false; //上月
					obj['next'] = false; //下月
					obj['minToday'] = i < _date.getDate() && this.year == NowYear && month == NowMonth ? 'AlreadyDay' : ''; //判断是否当前天之前
					obj['CurrDay'] = i == this.fatherDay && this.month == month_ && this.year == year_ ? 'cur_' : ''; //判断是否是当前天
					obj['txt'] = i == _date.getDate() && this.year == NowYear && month == NowMonth ? '今' : i;
					compuArr.push(obj)
				}
				//上个月开始
				let lastCount = new Date(year, month, 0).getDate(); //上个月多少天
				let offDay = new Date(year, month, 1).getDay() == 0 ? 7 : new Date(year, month, 1).getDay();
				let offCount = 7 - (7 - offDay + 1); //有多少个格子
				let lastArr = [];
				for(let i = 1; i < lastCount + 1; i++) { //将数字转成数组形式
					let obj = {};
					obj['data'] = i < 10 ? `0${i}` : i;
					obj['isCurrent'] = false;
					obj['prev'] = true; //上月
					obj['next'] = false; //下月
					obj['minToday'] = '';
					obj['CurrDay'] = '';
					obj['txt'] = i;
					lastArr.push(obj)
				}
				lastArr.reverse(); //反转一下
				lastArr = lastArr.filter((item, index) => {
					return index < offCount
				});
				lastArr.reverse(); //这里需要再反转下
				//上个月结束

				//下个月开始
				let offCountNext;
				if(35 - lastArr.length - compuArr.length >= 0) { //如果能保证35个
					offCountNext = 35 - lastArr.length - compuArr.length; //下个月有多少个格子~
				} else {
					offCountNext = 42 - lastArr.length - compuArr.length;
				}
				let nextArr = [];
				for(let i = 1; i < offCountNext + 1; i++) { //因为下个月不可能都展示所以只需要遍历就成
					let obj = {};
					obj['data'] = i < 10 ? `0${i}` : i;
					obj['isCurrent'] = false;
					obj['prev'] = false;
					obj['next'] = true; //下月
					obj['minToday'] = '';
					obj['CurrDay'] = '';
					obj['txt'] = i;
					nextArr.push(obj);
				}
				compuArr.unshift(...lastArr); //~~把上个月的加上喽
				compuArr.push(...nextArr); //~~把下个月的加上喽
				//下个月结束
				return compuArr;
			},

			/*通过父组件传参来控制当前月份及当前天*/
			computedMonth(allTime) {
				/*拆分数组*/
				let allTimeArr = allTime.split('-');
				let year = allTimeArr[0];
				let month = allTimeArr[1];
				let day = allTimeArr[2];
				month = month[0] == 0 ? month.slice(1, 2) : month;
				day = day[0] == 0 ? day.slice(1, 2) : day;
				let obj = {};
				obj['year'] = year * 1;
				obj['month'] = month * 1;
				obj['day'] = day * 1;
				return obj;
			},
			/*处理滑动块数组函数*/
			handleSlide(allTime_) {
				let fatherObj = this.computedMonth(allTime_);
				this.year = fatherObj.year;
				this.month = fatherObj.month;
				this.fatherDay = fatherObj.day;
				let arr = [];
				for(let i = 0; i < 3; i++) {
					let obj = {};
					if(i == 0) {
						//						let year = this.month > 12 ? this.year - 1 : this.year;
						//						let month = this.month < 12 ? this.month - 1
						obj['date'] = this.computedDay(this.year, this.month - 1);
						obj['year'] = this.year;
						obj['month'] = this.month * 1 - 1;

					} else if(i == 1) {
						obj['date'] = this.computedDay(this.year, this.month);
						obj['year'] = this.year;
						obj['month'] = this.month * 1;
					} else {
						obj['date'] = this.computedDay(this.year, this.month + 1);
						obj['year'] = this.year;
						obj['month'] = this.month * 1 + 1;

					}
					this.handleTime(obj['date'], obj['year'], obj['month'])
					obj['index'] = i - 1;
					arr.push(obj);
				}
				this.slidesArr = arr;

			},
			/*处理滑块数组中的时间*/
			handleTime(arr, year, month) {
				for(let o = 0; o < arr.length; o++) {
					if(arr[o]['prev']) {
						let y = month - 1 <= 0 ? year - 1 : year;
						let m = month - 1 <= 0 ? 12 : month - 1 > 9 ? `${month-1}` : `0${month-1}`;
						arr[o]['wholeTime'] = `${y}-${m}-${arr[o]['data']}`
					} else if(arr[o]['isCurrent']) {
						let m = month < 10 ? `0${month}` : `${month}`;
						arr[o]['wholeTime'] = `${year}-${m}-${arr[o]['data']}`
					} else if(arr[o]['next']) {
						let y = month + 1 > 12 ? year + 1 : year;
						let m = month + 1 > 12 ? `01` : month > 9 ? month + 1 : '0' + (month + 1);
						arr[o]['wholeTime'] = `${y}-${m}-${arr[o]['data']}`
					}

				}
			},
		},
		created() {
			this.init();

		},
		computed: {
			nowDate: {
				get() {
					return `${this.slidesArr[1].year}年${this.slidesArr[1].month}月`;
				}
			}
		}

	}
</script>

<style scoped>
	.Small_today_all {
		height: 30px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;
		border: 1px solid #e1e1e1;
		border-top: none;
	}
	
	.Small_today_all>div {
		height: 20px;
		border: 1px solid #dc4851;
		line-height: 20px;
		width: 45px;
		font-size: 12px;
		text-align: center;
		color: #dc4851;
		border-radius: 2px;
		cursor: pointer;
	}
	
	.Small_calendar_frame {
		position: relative;
		width: 100%;
		height: 100%;
		z-index: 10;
		background: #ffffff;
	}
	
	.Small_calendar_month {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: flex-start;
		flex-direction: row;
		padding: 0 5px;
		width: 100%;
		border: 1px solid #e1e1e1;
		border-top: none;
	}
	
	.Small_calendar_month>div {
		border-radius: 30px;
		height: 30px;
		line-height: 30px;
		width: 14.28571%;
		text-align: center;
		background-color: #fff;
		font-size: 14px;
		color: #333;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.Small_calendar_slide {
		height: 25px;
		line-height: 25px;
		border-radius: 25px;
		width: 25px;
		cursor: pointer;
	}
	
	.Small_calendar_slide.yes {
		color: #dddddd;
	}
	
	.Small_calendar_slide.cur {
		background-color: #dc4851;
		color: #fff;
	}
	
	.Small_calendar_week {
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		height: 30px;
		padding: 0 5px;
		border-left: 1px solid #e1e1e1;
		border-right: 1px solid #e1e1e1;
	}
	
	.Small_calendar_week>div {
		width: 14.28571%;
		font-size: 14px;
		color: #888888;
		text-align: center;
		height: 30px;
		line-height: 30px;
	}
	
	.Small_calendar_pad {
		position: absolute;
		z-index: 2;
		text-indent: 0;
		left: -1px;
		width: calc(100% + 2px);
	}
	
	.Small_calendar_title {
		width: 100%;
		height: 25px;
		border-left: 1px solid #e1e1e1;
		border-right: 1px solid #e1e1e1;
		text-align: center;
		position: relative;
	}
	
	.Small_calendar_title_left {
		background: url(../assets/img/bar/calendar_left.png) no-repeat left center;
		background-size: 7px 9px;
		height: 25px;
		width: 10px;
		cursor: pointer;
		position: absolute;
		left: 12px;
		top: 0;
	}
	
	.Small_calendar_title_middle {
		margin: 0 22px;
		height: 25px;
		line-height: 25px;
		color: #333;
		font-size: 14px;
		text-align: center;
	}
	
	.Small_calendar_title_right {
		background: url(../assets/img/bar/calendar_right.png) no-repeat left center;
		background-size: 7px 9px;
		height: 25px;
		width: 10px;
		cursor: pointer;
		top: 0;
		right: 12px;
		position: absolute;
	}
</style>