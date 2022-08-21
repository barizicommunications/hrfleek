
<template>
	<div>

		<!-- Header Background Image -->
		<div class="profile-nav-bg" style="background-image: url('images/bg-profile.jpg')"></div>
		<!-- / Header Background Image -->

		<!-- User Profile Card -->
		<a-card :bordered="false" class="card-profile-head" :bodyStyle="{padding: 0,}">
			<template #title>
				<a-row type="flex" align="middle">
					<a-col :span="24" :md="12" class="col-info">
						<a-avatar :size="74" shape="square" src="images/face-1.jpg" />
						<div class="avatar-info">
							<h4 class="font-semibold m-0">{{profile.full_name}}</h4>
							<p>{{profile.designation}}</p>
						</div>
					</a-col>
					<a-col :span="24" :md="12" style="display: flex; align-items: center; justify-content: flex-end">
						<a-radio-group v-model="profileHeaderBtns" size="small">
							<a-radio-button value="overview">OVERVIEW</a-radio-button>
							<a-radio-button value="teams">TEAMS</a-radio-button>
							<a-radio-button value="projects">PROJECTS</a-radio-button>
						</a-radio-group>
					</a-col>
				</a-row>
			</template>
		</a-card>
		<!-- User Profile Card -->

		<a-row type="flex" :gutter="24">

			<!-- Platform Settings Column -->
			<a-col :span="24" :md="8" class="mb-24">

				<!-- Platform Settings Card -->
				<CardPlatformSettings></CardPlatformSettings>
				<!-- / Platform Settings Card -->

			</a-col>
			<!-- / Platform Settings Column -->

			<!-- Profile Information Column -->
			<a-col :span="24" :md="16" class="mb-24">

				<!-- Profile Information Card -->
				<EditEmployeesForm :profile="profile"></EditEmployeesForm>
				<!-- / Profile Information Card -->

			</a-col>
			<!-- / Profile Information Column -->

		</a-row>

	</div>
</template>

<script>

	import CardPlatformSettings from "../components/Cards/CardPlatformSettings"
    import EditEmployeesForm from "../components/forms/EditEmployeeForm.vue"


	export default ({
		components: {
			CardPlatformSettings,
            EditEmployeesForm
		},
		data() {
			return {
				// Active button for the "User Profile" card's radio button group.
				profileHeaderBtns: 'overview',
                profile:this.$route.params.profile

			}
		},
	})

</script>

<style lang="scss">
</style>