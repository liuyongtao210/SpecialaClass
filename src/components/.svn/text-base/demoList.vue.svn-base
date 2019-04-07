<template>
	<div>
		<ul class="ul">
			{{val}}
			<template v-for="(item,index) in names">
				<li @click="goPage(item)">{{item.name}}</li>
			</template>
			<div class="demolist_all">
				<div>
					<!--<dropdown  :type="type" :top="top" @getOption="getOption"></dropdown>-->
					<div class="Dropselect" @click="showSelect()" ref="select" >
						<div class="Dropchecked">{{checkName}}</div>
						<template v-if="type == 'data'">
							<dropdown :top="top" :dropArr="dropArr" @getOption="getOption" v-show="isShowSelect"></dropdown>
						</template>
						<template v-if="type == 'calendar'">
							 <calendar @getcalendarTime="wholeTime" :top="top" :allTime="allTime" v-show="isShowSelect"></calendar>
						</template>
						<div :class="isShowSelect ? 'selectIcon cur' : 'selectIcon'" :style="{height:top-2+'px'}"></div>
					</div>
				</div>
			</div>
		</ul>
	</div>
</template>

<script>
	import dropdown from '../base/dropdown';
	import calendar from '../base/calendarSmall';
	export default {
		data() {
			return {
				val: '',
				allTime:0,
				names: [],
				dropArr: [],
				width: 204,
				top: 32,
				type: 'calendar', //data //calendar
                checkName:'全部',
                isShowSelect:false
			}
		},
		components: {
			dropdown,
			calendar
		},
		methods: {
			wholeTime(wholeTime){
				this.val = wholeTime;
				this.checkName = wholeTime;
				setTimeout(()=>{
					this.isShowSelect = false;
				},200)
			},
			showSelect(){
				this.isShowSelect = !this.isShowSelect;
			},
			documentClick(){
				$(document).off('click.select').on('click.select',(e)=>{
					if(this.$refs.select){
						if(!this.$refs.select.contains(e.target)){
							this.isShowSelect = false;
						}	
					}
                 
					
				})
			},
			getOption(val) {
				this.val = val.value;
				this.checkName = val.value;
			},
			init() {
				this.dropArr = [
				   {
				   	id:1,
				   	value:2
				   },
				   {
				   	id:2,
				   	value:3
				   },
				   {
				   	id:3,
				   	value:4
				   }
				];
				this.names = [{
						path: '/echarts',
						name: 'echart',
					},
					{
						path: '/jquery',
						name: 'jquery',
					},
					{
						path: '/swiper',
						name: 'swiper',
					},
					{
						path: '/popwin',
						name: 'popwin',
					}

				];
				
			},
			goPage(name) {
				this.$router.push({
					path: name.path,
				})

			},
			/*时间转换*/
			timestampToTime() {
				let date = new Date(),
				Y = date.getFullYear() + '-',
				M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
				D = date.getDate()<10?'0'+date.getDate():date.getDate();
				return Y + M + D;
			},

		},
		created() {
			this.init();
			this.documentClick();
			this.allTime = (new Date()).getTime();
			console.log(this.allTime)
		},

	}
</script>

<style scoped>
	.ul {
		padding-top: 40px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.ul>li {
		padding-top: 10px;
		font-size: 18px;
		font-weight: 700;
	}
	
	.demolist_all {
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		height: 100%;
		padding: 0 50px 0 145px;
	}
	
	.demolist_all>div {
		flex: 1;
	}
	.Dropselect{
	    text-align: left;
	    text-indent: 20px;
	    position: relative;
	    vertical-align: middle;
	    border: 1px solid #e1e1e1;
	    margin-top: 20px;
	    width: 100%;
	    height: 32px;
	    line-height: 30px;
	}
	.Dropchecked{
	    z-index: 2;
	    cursor: pointer;
	}
	.selectIcon{
		width: 30px;
	    border-left: 1px solid #e1e1e1;
	    box-sizing: border-box;
	    vertical-align: middle;
	    position: absolute;
	    right: 0px;
	    top: 0px;
	}
	.selectIcon:before{
		content: '';
	    width: 100%;
	    height: 100%;
	    display: inline-block;
	    position: absolute;
	    left: 0px;
	    top: 0px;
	    background: url(../assets/img/bar/task-icon-05.png)no-repeat center center;
	    background-size: 12px 7px;
	    transform: rotate(0deg);
	    transition: all .3s;
	}
	.selectIcon.cur:before{
	    transform: rotate(-180deg);
	}
</style>