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
        <a-card hoverable>
          <img
            slot="cover"
            alt="example"
            src="../../../public/images/kra.png"
			style="height:200px;object-fit:contain"
          />
          <a-card-meta title="PAYE REPORT">
            <template slot="description"> 
				<a-button class="mx-5">View</a-button>
				<a-button type="primary" icon="download">Download</a-button>
				
			</template>
          </a-card-meta></a-card
        >
      </a-col>
      <!-- / Conversations Column -->
      <a-col :span="24" :md="8" class="mb-24">
        <a-card hoverable >
          <img
            slot="cover"
            alt="example"
            src="../../../public/images/nssf.jpg"
			style="height:200px;object-fit:contain"
          />
          <a-card-meta title="Europe Street beat">
            <template slot="description"> <a-button class="mx-5">View</a-button>
				<a-button type="primary" icon="download">Download</a-button> </template>
          </a-card-meta></a-card
        >
      </a-col>
	  <a-col :span="24" :md="8" class="mb-24">
        <a-card hoverable>
          <img
            slot="cover"
            alt="example"
            src="../../../public/images/nhif.jpg"
			style="height:200px;object-fit:contain"
          />
          <a-card-meta title="Europe Street beat">
            <template slot="description"> <a-button class="mx-5">View</a-button>
				<a-button type="primary" icon="download">Download</a-button></template>
          </a-card-meta></a-card
        >
      </a-col>
    </a-row>
  </div>
</template>

<script>
import CardPlatformSettings from "../../components/Cards/CardPlatformSettings.vue";
import CardProfileInformation from "../../components/Cards/CardProfileInformation";
import CardPlatformUpdates from "../../components/Cards/CardPlatformUpdates";
import CardProject from "../../components/Cards/CardProject";
import { mapState } from "vuex";
import ReviewSettings from "./ReviewSettings.vue";

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
];
export default {
  components: {
    CardPlatformSettings,
    CardProfileInformation,
    CardPlatformUpdates,
    CardProject,
    ReviewSettings,
  },
  data() {
    return {
      // Active button for the "User Profile" card's radio button group.
      profileHeaderBtns: "overview",

      // Associating Conversation's list data with its corresponding property.
      conversationsData,
    };
  },
  computed: {
    ...mapState(["userProfile", "currentClient"]),
  },
};
</script>

<style lang="scss"></style>
