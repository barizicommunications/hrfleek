<template>

	<!-- Active Users Card -->
	<a-card :bordered="false" class="dashboard-bar-chart">
		<chart-bar :height="220" :data="barChartData"></chart-bar>
		<div class="card-title">
			<h6>Active Employees</h6>
			<p>than last week <span class="text-success">+23%</span></p>
		</div>
		<a-row class="card-footer" type="flex" justify="center">
			<a-col :span="6">
				<h4>3,600</h4>
				<span>Employees</span>
			</a-col>
			<a-col :span="6">
				<h4>2</h4>
				<span>Calendars</span>
			</a-col>
			<a-col :span="6">
				<h4>772</h4>
				<span>Records</span>
			</a-col>
			<a-col :span="6">
				<h4>82</h4>
				<span>Reports</span>
			</a-col>
		</a-row>
	</a-card>
	<!-- Active Users Card -->

</template>

<script>

	// Bar chart for "Active Users" card.
	import ChartBar from '../Charts/ChartBar' ;

	export default ({
		components: {
			ChartBar,
		},
		data() {
			return {
				// Data for bar chart.
				barChartData: {
					labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09"],
					datasets: [{
						label: "Sales",
						backgroundColor: '#fff',
						borderWidth: 0,
						borderSkipped: false,
						borderRadius: 6,
						data: [850, 600, 500, 620, 900, 500, 900, 630, 900],
						maxBarThickness: 20,
					}, ],
				},
			}
		},
	})

</script>