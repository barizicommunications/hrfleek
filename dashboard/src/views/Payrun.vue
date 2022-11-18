<template>
  <div>
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="Add Employees">
        <CardPayrun :calendar="calendar"></CardPayrun>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Payroll Review" force-render>
        <card-payslips :calendar="calendar"></card-payslips>
      </a-tab-pane>
      <a-tab-pane key="3" tab="Bank Overview">
      <bank-sheet :calendar="calendar"></bank-sheet>
      </a-tab-pane>
      <a-tab-pane key="4" tab="Reports"> 
        <card-review></card-review>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CardPayslips from "../components/Cards/CardPayslips.vue";
import CardPayrun from "../components/Cards/CardPayrun.vue";
import * as fb from "../firebase";
import BankSheet from '../components/Tables/BankSheet.vue';
import CardReview from '../components/Cards/CardReview.vue';


export default {
  components: { CardPayslips, CardPayrun, BankSheet, CardReview },
  data() {
    return {
      calendar: {},
      selectedEmployees: [],
      selectedDepartments: [],
      visible: false,

    };
  },
  methods: {
    async getEmployees() {
      await fb.businessCollection
        .doc(this.currentClient.id)
        .collection("calendars")
        .doc(this.calendar.id)
        .get()
        .then((docs) => {
          employees = docs.data();
          console.log(docs.data());
        });
      console.log(this.calendar.id, this.currentClient.id, employees);
    },
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
