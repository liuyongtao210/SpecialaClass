<template>
	   	<div class="dropDown_pad" :style="{top:top-2 +'px'}">
				<div v-for="(item,index) in dropArr" class="dropDownlist" :style="{height:top+'px',lineHeight:top-2+'px'}"
				 @click="emitData(item)">{{item.value}}</div>
		</div>
</template>

<script>
	export default {
		data(){
			return {
				isShowSelect:false,
				checkName:'全部',
				//需要向日历组件中传递的属性
				allTime:'',
			    optionList:[1,2,3]
			}
		},
		methods:{
			/*时间转换*/
			timestampToTime() {
				let date = new Date(),
				Y = date.getFullYear() + '-',
				M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
				D = date.getDate()<10?'0'+date.getDate():date.getDate();
				return Y + M + D;
			},
			emitData(item){
				this.checkName = item;
				this.$emit('getOption',item);
			},
			
		},
		components:{
			
		},
		props:{
			dropArr:{
				default:[1,2,3]
			},
			top:{
				required:true,
				default:38
			}
		},
		created(){
		}
	}
</script>

<style scoped>
	
	.dropDown_pad{
		width: calc(100% + 2px);
	    box-sizing: border-box;
	    cursor: pointer;
	    position: absolute;
	    left: 50%;
	    transform: translateX(-50%);
	    transition: all .3s;
	    font-size: 14px;
	    color: #333;
	    background: #fff;
	    vertical-align: middle;
	    overflow: hidden;
	}
	.dropDownlist{
		width: 100%;
	    height: 32px;
	    line-height: 30px;
	    cursor: pointer;
	    box-sizing: border-box;
	    border: 1px solid #e1e1e1;
	    border-bottom: 0;
	}
	.dropDownlist:hover{
		background: #f1f1f1;
	}
	.dropDownlist:last-child{
		border-bottom: 1px solid #e1e1e1;
	}
</style>