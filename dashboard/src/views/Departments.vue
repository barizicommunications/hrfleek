<template>
  <a-card>
    <template #title>
      <a-row type="flex" align="middle">
        <a-col :span="24" :md="12">
          <h6>Departments</h6>
        </a-col>
        <a-col
          :span="24"
          :md="12"
          style="display: flex; align-items: center; justify-content: flex-end"
        >
          <a-radio-group size="small">
            <a-button type="primary">
              <router-link to="/create-employee"
                >Add New Department</router-link
              >
            </a-button>
          </a-radio-group>
          <a-radio-group size="small" class="mx-5">
            <a-button @click="exportData">Use Current Departments</a-button>
          </a-radio-group>
        </a-col>
      </a-row>
    </template>
    <a-row type="flex" align="middle">
      <a-col
        :span="4"
        v-for="department of currentClient.departments"
        :key="department.department_name"
      >
        <a-button @click="handleButtonClick" class="m-5" icon="edit">
          {{ department.department_name }}
        </a-button>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["employees", "currentClient"]),
  },
  mounted() {
    this.$store.dispatch("getEmployees");
    this.$store.dispatch("getCurrentClient");
  },
};
</script>

<style></style>
