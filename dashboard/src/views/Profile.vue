<!-- 
	This is the user profile page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
  <div>
    <!-- Header Background Image -->
    <div
      class="profile-nav-bg"
      style="background-image: url('images/bg-profile.jpg')"
    ></div>
    <!-- / Header Background Image -->

    <!-- User Profile Card -->
    <a-card
      :bordered="false"
      class="card-profile-head"
      :bodyStyle="{ padding: 0 }"
    >
      <template #title>
        <a-row type="flex">
          <a-col :span="24" :md="12" class="col-info">
            <a-avatar :size="74" shape="square" src="images/face-1.jpg" />
            <div class="avatar-info">
              <h4 class="font-semibold m-0">Sarah Jacob</h4>
              <p>CEO / Co-Founder</p>
            </div>
          </a-col>
        </a-row>
      </template>
    </a-card>
    <!-- User Profile Card -->

    <a-row type="flex" :gutter="24">
      <a-col :span="24" :md="4" class="mb-24"></a-col>
      <!-- Platform Settings Column -->
      <a-col :span="24" :md="16" class="mb-24">
        <CardPlatformSettings></CardPlatformSettings>
      </a-col>
      <!-- Conversations Column -->
      <a-col :span="24" :md="4" class="mb-24">
      </a-col>
      <!-- / Conversations Column -->
    </a-row>
  </div>
</template>

<script>
import CardPlatformSettings from "../components/Cards/CardProfileSetting.vue";
import CardProfileInformation from "../components/Cards/CardProfileInformation";
import CardPlatformUpdates from "../components/Cards/CardPlatformUpdates";
import CardProject from "../components/Cards/CardProject";
import { mapState } from "vuex";

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
