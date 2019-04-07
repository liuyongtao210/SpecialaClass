<template>
	<div class="pageNation">
		<div class="pagi_content">
			<div class="pago_list" @click="prevFn()" v-if="pageUpDown">
				<img src="../assets/img/task/pagi_prev.png" alt="" class="pagi_point"/>
			</div>
			<div class="pago_list hover_style" :class="{cur_style:curStyle==item,item1:item==1,item0:item==pointIndex-1}" v-for="item in showTotalpage" @click="clickCurPage(item,$event)">
				<!--{{item}}-->
				<template v-if="totalPage>showTotalpage">
					<template v-if="item<=pointIndex-1">{{item+startNum}}</template>
					<template v-if="item==pointIndex">{{ellipsisTxt}}</template>
					<template v-if="item>pointIndex">{{totalPage-showTotalpage+item}}</template>
				</template>
				<template v-else>
					{{item}}
				</template>
			</div>
			<div class="pago_list" @click="nextFn()" v-if="pageUpDown">
				<img src="../assets/img/task/pagi_next.png" alt="" class="pagi_point"/>
			</div>
		</div>
		<div class="page_jump" v-if="showJump">
			<div>跳转至:</div>
			<input type="text" class="jump_num" v-model="curClickNum" />
			<div>页</div>
			<div class="confrim_btn" @click="jumpFn()">确定</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'pagiNation',
		props: {
			totalData: {
				type: Number,
				default: 220
			},
			everyPageNum: {
				type: Number,
				default: 20
			},
			defaultShowTotalpage: {
				type: Number,
				default: 6
			},
			pageUpDown: {
				type: Boolean,
				default: true
			},
			showJump: {
				type: Boolean,
				default: false
			},
			ellipsisTxt: {
				default: '...'
			}
		},
		data() {
			return {
				//    totalData: 52,//共有多少条数据
				//    everyPageNum:10,//每页多少条
				totalPage: '', //共分多少页
				showTotalpage: '', //共显示出来的页码数量  包括省略号 最少显示6个页码 包括省略号    这里比较特俗tailPage 的值增1  showTotalpage的最小值也要在6+1  否则pointIndex显示会不合理
				//    ellipsisTxt:'...',//省略部分显示内容
				pointIndex: -1, //省略号显示的位置
				frontPage: 4, //省略号前面显示多少个页码
				tailPage: 1, //省略号后面显示多少个页码
				curStyle: 1, //点击当前页码的样式
				startNum: 0, //点击每个页码的时候 增量
				totalPageCtl: 0, //显示的页码数量 变化的时候 控制器 
				//    prevClickNum:0,
				jumpNum: 1,
				curClickNum: 1,
				criticalValue: 0,
			}
		},
		methods: {
			jumpFn: function() {
				var x=document.getElementsByClassName('item1')[0]
				var y=document.getElementsByClassName('item1')[0]
				console.log(x.innerText)
				var item1 = x.innerText * 1;
				var item0 = y.innerText * 1;
				if(this.curClickNum < 1 || this.curClickNum > this.totalPage) {
					return
				}
				if(this.curClickNum) {
					if(this.pointIndex != -1) {
						if(this.pointIndex == 2) {
							if(this.curClickNum >= this.criticalValue) {
								this.curStyle = this.showTotalpage - (this.totalPage - this.curClickNum)
							} else {
								this.pointIndex = this.showTotalpage - this.tailPage
								if(this.curClickNum < this.pointIndex - 1) {
									this.startNum = 0
									this.curStyle = this.curClickNum
								} else {
									this.startNum = this.curClickNum - (this.pointIndex - 2)
									this.curStyle = this.pointIndex - 2
								}
							}
						} else {
							if(this.curClickNum < this.criticalValue) {

								//	  				if(this.curClickNum<this.pointIndex-1){
								//	  					this.startNum=0
								//	  					this.curStyle=this.curClickNum
								//	  				
								//	  				}else{
								//	  					
								//	  					console.log(this.curClickNum-(this.pointIndex-2))
								//	  					this.startNum= this.curClickNum-(this.pointIndex-2)
								//	  					this.curStyle=this.pointIndex-2
								//	  					console.log(".curClickNum::",this.curClickNum) 
								//	  				}
								if(this.curClickNum > item1 && this.curClickNum < item0) {
									this.curStyle = this.curClickNum - item1 + 1
								} else {
									if(this.curClickNum < this.pointIndex - 1) {
										this.startNum = 0
										this.curStyle = this.curClickNum
									} else {
										this.startNum = this.curClickNum - (this.pointIndex - 2)
										this.curStyle = this.pointIndex - 2
									}
								}
							} else {
								this.pointIndex = 2
								this.startNum = 0
								this.curStyle = this.showTotalpage - (this.totalPage - this.curClickNum)
							}
						}
					} else {
						this.curStyle = this.curClickNum
					}
					this.$emit('pageChange', this.curClickNum)
				}
			},
			prevFn: function(num) {
				var dom = document.getElementsByClassName('cur_style')[0].innerText * 1 - 1;
				if(num) {
					this.curClickNum = num
				} else {
					this.curClickNum = dom
				}
				if(this.curClickNum == 0) {
					this.curClickNum = 1
					return
				}
				this.$emit('pageChange', this.curClickNum)
				if(this.curClickNum) {
					if(this.pointIndex != -1) { //判断是否存在省略号 
						if(this.pointIndex == 2) {
							if(this.curClickNum >= this.criticalValue) {
								this.curStyle--
							} else {
								this.pointIndex = this.showTotalpage - this.tailPage
								this.startNum = this.curClickNum - (this.pointIndex - 2)
								this.curStyle = this.pointIndex - 2
							}
						} else {
							if(this.curClickNum > 1 && this.curStyle < this.pointIndex - 1) {
								if(this.curStyle > 2) {
									this.curStyle--
								} else if(this.curStyle == 2) {
									this.startNum--
								}
							} else if(this.curClickNum == 1) {
								this.curStyle = 1
								this.startNum = 0
							}
						}
					} else {
						this.curStyle = this.curClickNum
					}
				}
				console.log('prevFndom:curClickNum::', dom)
			},
			nextFn: function(num) {
				var dom = document.getElementsByClassName('cur_style')[0].innerText * 1 + 1;
				console.log('nextFndom:curClickNum::', dom)
				if(num) {
					this.curClickNum = num
				} else {
					this.curClickNum = dom
				}
				if(this.curClickNum > this.totalPage) {
					this.curClickNum = this.totalPage
					return
				}
				if(this.curClickNum) {
					if(this.pointIndex != -1) {
						if(this.pointIndex == 2) {
							this.curStyle++
						} else {
							if(this.curStyle == this.pointIndex - 2) {
								if(this.curClickNum >= this.criticalValue) {
									this.pointIndex = 2;
									this.startNum = 0;
									this.curStyle = this.pointIndex + 2
								} else {
									this.startNum++
								}
							} else {
								this.curStyle++
							}
						}
					} else {
						this.curStyle = this.curClickNum
					}
				}
				this.$emit('pageChange', this.curClickNum)
			},
			clickCurPage: function(item, e) {

				if(item == this.pointIndex) {
					return
				}
				this.curClickNum = e.target.innerText * 1
				console.log(this.curClickNum)
				if(this.curClickNum) {
					if(this.pointIndex != -1) {
						if(this.pointIndex == 2) {
							if(this.curClickNum < this.criticalValue){
								this.pointIndex = this.showTotalpage - this.tailPage
									if(item == 1) {
											this.curStyle = item
											this.startNum = 0
										} else {
											this.startNum = this.curClickNum - (this.pointIndex - 2)
											this.curStyle = this.pointIndex - 2
									};
								
							}else{
//								if(this.curClickNum ==this.criticalValue){
//									this.pointIndex = this.showTotalpage - this.tailPage
//								}
								this.curStyle = this.showTotalpage - (this.totalPage - this.curClickNum)
							}
							
//							if(this.curClickNum < this.criticalValue) {
//								
//							} else {
//								this.pointIndex = 2
//								this.curStyle = this.showTotalpage - (this.totalPage - this.curClickNum)
//								this.startNum = 0
//
//							};
//							this.pointIndex = this.showTotalpage - this.tailPage
//							if(item == 1) {
//								this.curStyle = item
//								this.startNum = 0
//							} else {
//								this.startNum = this.curClickNum - (this.pointIndex - 2)
//								this.curStyle = this.pointIndex - 2
//							};
						} else {
							if(this.curClickNum < this.criticalValue){
								if(item == 1 && this.curClickNum != 1) {
									this.curStyle = 2
									this.startNum--
										console.log(this.startNum)
								} else if(item == 1 && this.curClickNum == 1) {
									this.startNum = 0
									this.curStyle = item
								} else if(item != 1 && item < this.pointIndex - 1) {
									this.curStyle = item
								} else if(item == this.pointIndex - 1) {
									this.startNum++
										this.curStyle = this.pointIndex - 2
								}
							}else{
								this.pointIndex = 2
								this.curStyle = this.showTotalpage - (this.totalPage - this.curClickNum)
								this.startNum = 0
							}
						}

					} else {
						this.curStyle = item
					}

				}

				this.$emit('pageChange', this.curClickNum)
			}
		},
		created() {
			this.totalPage = Math.ceil(this.totalData / this.everyPageNum) //总页码
			this.showTotalpage = this.defaultShowTotalpage
			if(this.totalPage <= this.showTotalpage) { //总页码小于显示的页码
				this.showTotalpage = this.totalPage
				this.frontPage = this.totalPage;
				this.tailPage = 0
			} else {
				this.pointIndex = this.showTotalpage - this.tailPage
				this.frontPage = this.pointIndex - 1
			}
			if(this.showTotalpage >= 6) {
				this.totalPageCtl = 3;
			} else if(this.showTotalpage < 6) {
				this.totalPageCtl = 2;
			}
			this.criticalValue = (this.totalPage - this.showTotalpage * 1 + this.totalPageCtl * 1 + 1) * 1
			console.log("this.totalPagethis.totalPage",this.totalPage)
			console.log("this.totalData",this.totalData)
//			console.log('临界值this.criticalValue', this.criticalValue)
//			console.log(this.totalPage - this.showTotalpage + this.totalPageCtl)
//			console.log('总页码totalPage:', this.totalPage)
//			console.log('显示出来的页码showTotalpage：', this.showTotalpage)
//			console.log('pointIndex', this.pointIndex)
		}
	}
</script>

<style scoped="scoped">
	.pageNation{
		width: 100%;
	}
	.pagi_content {
		width: 100%;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.pago_list {
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid #ebebeb;
		cursor: pointer;
		background: #ffffff;
		border-radius: 3px;
	}
	
	.hover_style:hover {
		background: #ebebeb;
	}
	
	.cur_style {
		border: 1px solid #ca0114;
		color: #ca0114;
	}
	
	.page_jump {
		height: 30px;
		display: flex;
		align-items: center;
	}
	
	.jump_num {
		outline: none;
		border: 1px solid #ebebeb;
		width: 30px;
	}
	
	.confrim_btn {
		cursor: pointer;
		margin-left: 10px;
	}
</style>