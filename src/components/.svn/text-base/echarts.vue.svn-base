<template>
	<div>
		<headers :back="true">
			<div slot="header" class="headerSon cur">echarts</div>
		</headers>
		<!--<div id="myChart" class="echart_pad"></div>-->
		<div class="echart_pad">
			<ECharts :options="setOption"></ECharts>
		</div>

	</div>
</template>

<script>
	import headers from '../base/header';
	// 引入echarts基本模板
	import ECharts from 'vue-echarts/components/ECharts'
	import 'echarts/lib/chart/pie';//引入类型
	export default {
		name: 'echarts',
		data() {
			return {
				setOption: {},
			}
		},
		methods: {
			drawCharts() {
				// 绘制图表
				this.setOption = {
					aria: {
						show: true
					},
					title: {
						text: '某站点用户访问来源',
						x: 'center',
						y:'center'
					},
					legend:{
						 x: 'center', 
						 y: 'center',
						 
					},
					series: [{
						name: '',
						type: 'pie',
						data: [{
								value: 335,
								name: '我是小红'
							},
							{
								value: 310,
								name: '我是色盲'
							},
							{
								value: 234,
								name: '我是小蓝'
							},
							{
								value: 135,
								name: '我是小菊'
							},
							{
								value: 1548,
								name: '我是抹茶'
							}
						]
					}]
				};
			}
		},
		components: {
			headers,
			ECharts
		},
		mounted() {
			this.$nextTick(() => {
				this.drawCharts();
			})
		},
	}
</script>

<style scoped>
	.echart_pad {
		padding-top: 40px;
		width: 100%;
		height: 400px;
	}
</style>