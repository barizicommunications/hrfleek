<template>
  <div>
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="Employees">
        <CardPayrun :calendar="calendar"></CardPayrun>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Payslips Preview" force-render>
      <card-payslips></card-payslips>
      </a-tab-pane>
      <a-tab-pane key="3" tab="Bank Overview">
        Content of Tab Pane 3
      </a-tab-pane>
      <a-tab-pane key="4" tab="Settings"> Content of Tab Pane 3 </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CardPayslips from "../components/Cards/CardPayslips.vue";
import CardPayrun from "../components/Cards/CardPayrun.vue";


export default {
  components: { CardPayslips, CardPayrun },
  data() {
    return {
      calendar: {},
      selectedEmployees: [],
      selectedDepartments: [],
      visible: false,
    };
  },
  methods: {
  },
  computed: {
    ...mapState(["calendars", "employees", "currentClient", "payrunEmployees"]),
    filteredOptions() {
      return this.employees.filter((o) => !this.selectedEmployees.includes(o));
    },
  },
  mounted() {
    this.$store.dispatch("getCalendars");
    this.calendar = this.calendars.find((e) => e.id === this.$route.params.id);
    this.$store.dispatch("getEmployees");
    this.$store.dispatch("getCurrentClient");
  },
};
</script>

<style></style>
