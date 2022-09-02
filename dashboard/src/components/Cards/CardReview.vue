<!-- 
	This is the user profile page, it uses the dashboard layout in: 
	"./l
  components: { ReviewSettings },ayouts/Dashboard.vue" .
 -->

 <template>
	<div>

		<!-- User Profile Card -->

		<a-row type="flex" :gutter="24">

			<!-- Platform Settings Column -->
			<a-col :span="24" :md="8" class="mb-24">

				<!-- Platform Settings Card -->
				<review-settings></review-settings>
				<!-- / Platform Settings Card -->

			</a-col>
			<!-- / Platform Settings Column -->
			<!-- / Profile Information Column -->
			
			<!-- Conversations Column -->
			<a-col :span="24" :md="16" class="mb-24">
			
				<!-- Conversations Card -->
				<CardPlatformUpdates
					
				></CardPlatformUpdates>
				<!-- / Conversations Card -->

			</a-col>
			<!-- / Conversations Column -->

		</a-row>

	</div>
</template>

<script>

	import CardPlatformSettings from "../../components/Cards/CardPlatformSettings.vue"
	import CardProfileInformation from "../../components/Cards/CardProfileInformation"
	import CardPlatformUpdates from "../../components/Cards/CardPlatformUpdates"
	import CardProject from "../../components/Cards/CardProject"
	import { mapState } from "vuex"
    import ReviewSettings from "./ReviewSettings.vue"

	// Conversation's list data.
	const conversationsData = [
		{
			id: "1",
			title: "Sophie B.",
			code: "Hi! I need more information…",
			avatar: "images/face-3.jpg",
		},
		{
			id: "2",
			title: "Anne Marie",
			code: "Awesome work, can you…",
			avatar: "images/face-4.jpg",
		},
		{
			id: "3",
			title: "Ivan",
			code: "About files I can…",
			avatar: "images/face-5.jpeg",
		},
		{
			id: "4",
			title: "Peterson",
			code: "Have a great afternoon…",
			avatar: "images/face-6.jpeg",
		},
		{
			id: "5",
			title: "Nick Daniel",
			code: "Hi! I need more information…",
			avatar: "images/face-2.jpg",
		},
	] ;
	export default ({
		components: {
			CardPlatformSettings,
			CardProfileInformation,
			CardPlatformUpdates,
			CardProject,
            ReviewSettings
		},
		data() {
			return {
				// Active button for the "User Profile" card's radio button group.
				profileHeaderBtns: 'overview',

				// Associating Conversation's list data with its corresponding property.
				conversationsData,
			}
		},
		computed:{

			 ...mapState(["userProfile","currentClient"]),
		}
	})

</script>

<style lang="scss">
</style>