<template>
  <div>
    <!-- Cards -->
    <a-row :gutter="24">
      <a-col
        :span="24"
        :lg="12"
        :xl="6"
        class="mb-24"
      >
        <!-- Widget 1 Card -->
        <a-card :bordered="false" class="widget-1">
          <a-statistic
            title="Total Employees"
            value="700"
            :precision="0"
            class="text-success"
         
          >
          </a-statistic>
          <div class="icon" v-html="stats[0].icon"></div>
        </a-card>
        <!-- / Widget 1 Card -->
      </a-col>
      <a-col
        :span="24"
        :lg="12"
        :xl="6"
        class="mb-24"
      >
        <!-- Widget 1 Card -->
        <a-card :bordered="false" class="widget-1">
          <a-statistic
            title="Total Calendars"
            :value="calendars.length"
            :precision="0"
            class="text-success"
         
          >
          </a-statistic>
          <div class="icon" v-html="stats[1].icon" @click="getMeData"></div>
        </a-card>
        <!-- / Widget 1 Card -->
      </a-col>
      <a-col
        :span="24"
        :lg="12"
        :xl="6"
        class="mb-24"
      >
        <!-- Widget 1 Card -->
        <a-card :bordered="false" class="widget-1">
          <a-statistic
            title="Total Clients"
            :value="clients.length"
            :precision="0"
            class="text-success"
         
          >
          </a-statistic>
          <div class="icon" v-html="stats[2].icon"></div>
        </a-card>
        <!-- / Widget 1 Card -->
      </a-col>
    </a-row>

    <a-row :gutter="24" type="flex" align="stretch">
      <a-col :span="24" :lg="10" class="mb-24">
        <!-- Active Users Card -->
        <CardBarChart></CardBarChart>
        <!-- Active Users Card -->
      </a-col>
      <a-col :span="24" :lg="14" class="mb-24">
        <!-- Sales Overview Card -->
        <CardLineChart></CardLineChart>
        <!-- / Sales Overview Card -->
      </a-col>
    </a-row>
  </div>
</template>

<script>
// Bar chart for "Active Users" card.
import CardBarChart from "../components/Cards/CardBarChart";

// Line chart for "Sales Overview" card.
import CardLineChart from "../components/Cards/CardLineChart";

// Counter Widgets
import WidgetCounter from "../components/Widgets/WidgetCounter";

// "Projects" table component.
import CardProjectTable from "../components/Cards/CardProjectTable";

// Order History card component.
import CardAccountHistory from "../components/Cards/CardAccountHistory";

// Information card 1.
import CardInfo from "../components/Cards/CardInfo";

// Information card 2.
import CardInfo2 from "../components/Cards/CardInfo2";
import EmployeesTableVue from "../components/Tables/EmployeesTable.vue";
import ClientCardVue from "../components/Cards/ClientCard.vue";

// Counter Widgets stats
const stats = [
  {
    title: "Total Employees",
    value: 200,
    suffix: "+20%",
    icon: `
						<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z" fill="#111827"/>
							<path d="M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z" fill="#111827"/>
							<path d="M12.9291 17C12.9758 16.6734 13 16.3395 13 16C13 14.3648 12.4393 12.8606 11.4998 11.6691C12.2352 11.2435 13.0892 11 14 11C16.7614 11 19 13.2386 19 16V17H12.9291Z" fill="#111827"/>
							<path d="M6 11C8.76142 11 11 13.2386 11 16V17H1V16C1 13.2386 3.23858 11 6 11Z" fill="#111827"/>
						</svg>`,
  },
  {
    title: "Total Calendars",
    value: 12,
    prefix: "+",
    status: "danger",
    suffix: "-20%",
    icon: `
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M6 2C5.44772 2 5 2.44772 5 3V4H4C2.89543 4 2 4.89543 2 6V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V6C18 4.89543 17.1046 4 16 4H15V3C15 2.44772 14.5523 2 14 2C13.4477 2 13 2.44772 13 3V4H7V3C7 2.44772 6.55228 2 6 2ZM6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H14C14.5523 9 15 8.55228 15 8C15 7.44772 14.5523 7 14 7H6Z" fill="#111827"/>
							</svg>`,
  },
  {
    title: "Total Departments",
    value: 13,
    prefix: "",
    suffix: "",
    icon: `
						<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z" fill="#111827"/>
						</svg>`,
  },
];
import { mapState } from "vuex";
import * as fb from "../firebase";

export default {
  components: {
    CardBarChart,
    CardLineChart,
    WidgetCounter,
    CardProjectTable,
    CardAccountHistory,
    CardInfo,
    CardInfo2,
    EmployeesTableVue,
    ClientCardVue,
  },
  data() {
    return {

      // Counter Widgets Stats
      stats,
    };
  },
  methods:{
    getMeData(){
      let count=0
      for(let i=0;i<this.clients.length;i++){
      fb.businessCollection.doc(this.clients[i].id).collection("team").get().then((docs)=>{
        count =docs.docs.length
        console.log(count)
      })
      }
      console.log(count)
    }
  },
  computed: {
    ...mapState(["calendars", "employees", "clients", "payrunEmployees"]),
    totalClients(){
      let count =0
      let employees
      for(let i=0;i<this.clients.length;i++){
      fb.businessCollection.doc(this.clients[i].id).collection("team").get().then((docs)=>{
        console.log(docs.docs.length)
      })
      }
    }
  },
  mounted() {
    this.$store.dispatch("getCalendars");
    this.$store.dispatch("getEmployees");
    this.$store.dispatch("getCurrentClient");
    this.$store.dispatch("getClients");

  },
};
</script>

<style lang="scss"></style>
