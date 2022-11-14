<template>

	<!-- Platform Settings Card -->
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{paddingTop: 0, paddingBottom: 0 }">
		<template #title>
			<h6 class="font-semibold m-0">Payroll Reports</h6>
		</template>
		<ul class="list settings-list">
			<li>
				<a-switch v-model="emailForFollows" />
				<span>NHIF REPORT</span>
			</li>
			<li>
				<a-switch v-model="emailForAnswers"/>
				<span>NSSF REPORT</span>
			</li>
			<li>
				<a-switch v-model="emailForMentions" />
				<span>BANK REPORT</span>
			</li>
            <li>
				<a-switch v-model="emailForMentions" />
				<span>MASTER ROLL</span>
				
			</li>
		</ul>
	</a-card>
	<!-- / Platform Settings Card -->

</template>

<script>

	export default ({
		data() {
			return {
				// Binded model property for "Platform Settings" switch button for "Email ... follows me" .
				emailForFollows: true,

				// Binded model property for "Platform Settings" switch button for "Email ... answers me" .
				emailForAnswers: false,

				// Binded model property for "Platform Settings" switch button for "Email ... mentions me" .
				emailForMentions: true,

				// Binded model property for "Platform Settings" switch button for "New launches and projects" .
				emailForNewProjects: true,

				// Binded model property for "Platform Settings" switch button for "Monthly product updates" .
				emailForProductUpdates: false,

				// Binded model property for "Platform Settings" switch button for "Subscribe to newsletter" .
				emailForNewsletter: true,
			}
		},
	})

</script>