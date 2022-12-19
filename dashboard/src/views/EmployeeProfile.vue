
<template>
  <div>
    <!-- Header Background Image -->
    <div
      class="profile-nav-bg"
      style="background-image: url('../images/bg-profile.jpg')"
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
              <h4 class="font-semibold m-0">
                {{ employee.first_name }}<span class="mx-4"></span
                >{{ employee.last_name }}
              </h4>
              <p>{{ employee.email }}</p>
              <p>{{ employee.phone_number }}</p>
            </div>
          </a-col>
        </a-row>
      </template>
    </a-card>
    <!-- User Profile Card -->

    <a-row type="flex" :gutter="24">
      <a-col :span="24" :md="24" class="mb-24">
        <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="Employee Information">
        <edit-employee-form
          :client="currentClient"
          :employee="employee"
        ></edit-employee-form>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Allowances" force-render>
       <edit-allowances :data="employee"></edit-allowances>
      </a-tab-pane>
      <a-tab-pane key="3" tab="Deductions">
       <edit-deductions :data="employee"></edit-deductions>
      </a-tab-pane>
    </a-tabs>
      </a-col>
      <!-- Platform Settings Column -->
      <!-- <a-col :span="24" :md="8" class="mb-24">
         <edit-allowances></edit-allowances>
        </a-col> -->
    </a-row>
  </div>
</template>

<script>
import CardPlatformSettings from "../components/Cards/CardProfileSetting.vue";
import CardProfileInformation from "../components/Cards/CardProfileInformation";
import CardPlatformUpdates from "../components/Cards/CardPlatformUpdates";
import CardProject from "../components/Cards/CardProject";
import { mapState } from "vuex";
import CreateEmployee from "./CreateEmployee.vue";
import EditEmployeeForm from "../components/forms/EditEmployeeForm.vue";
import EditAllowances from "../components/forms/EditAllowances.vue";
import EditDeductions from '../components/forms/EditDeductions.vue';

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
    CreateEmployee,
    EditEmployeeForm,
    EditAllowances,
    EditDeductions,
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
    ...mapState(["userProfile", "currentClient", "employees"]),
    employee() {
      let result = this.employees.find((e) => e.id == this.$route.params.id);
      return result;
    },
  },
  mounted() {
    this.$store.dispatch("getEmployees");
    this.$store.dispatch("getCurrentClient");
  },
};
</script>

<style lang="scss"></style>
