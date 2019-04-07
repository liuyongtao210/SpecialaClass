<template>
	<div>
	   <headers :back="true">
	      <div slot="header" class="headerSon cur">弹框</div>
	   </headers>
	   <div class="popwinAll">
	   	  <div @click="showAlert" class="popList">showAlert</div>
	   	  <div @click="showToast" class="popList">showToast</div>
	   	  <div @click="showLodding" class="popList">showLoad</div>
	   	  <div @click="setCookie" class="popList">点我设置个小cookie</div>
	   	  <div @click="getCookie" class="popList">点我获取个小cookie</div>
	   	  <div @click="clearCookie" class="popList">点我清除个小cookie</div>
	   </div>
	</div>
</template>

<script>
import headers from '../base/header.vue';
export default {
	data(){
		return {
			msg:'成功'
		}
	},
	methods:{
		showAlert(){
			this.WeuiModel.showAlert("成功！", "恭喜你"+this.msg+"了", "确定", "取消",(index)=>{
				console.log(index)
			})
		},
		showToast(){
			this.WeuiModel.showToast(this.msg);
		},
		showLodding(){
			this.WeuiModel.showLoad('加载中...');
			setTimeout(()=>{
				this.WeuiModel.hideLoad();
			},2000)
		},
		setCookie(){
			let name = 'Artist';
			this.common.setCookie('name',name,12);
			this.WeuiModel.showToast('设置cookie'+this.msg);
		},
		getCookie(){
		  let name = this.common.getCookie('name');
		  if(name){
		  	this.WeuiModel.showAlert('cookie','设置的cookie中name为'+name,'确定','取消');
		  }else{
		  	this.WeuiModel.showAlert('cookie','请先设置cookie','确定','取消');
		  }
		},
		clearCookie(){
			this.common.clearCookie('name');
			this.WeuiModel.showToast('清除cookie成功');
		}
	},
	created(){
	},
	components:{
	   headers	
	}
}
</script>

<style scoped>
	.popwinAll{
		padding-top: 40px;
	}
	.popList{
		margin: 20px 0 0 0;
		background-color: #ef4454;
		color: #FFF;
		font-size: 16px;
		text-align: center;
		line-height: 40px;
		cursor: pointer;
	}
</style>