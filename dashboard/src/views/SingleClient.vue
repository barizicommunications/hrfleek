<template>
  <div>
    <!-- Cards -->
    <ClientCardVue :client="client"></ClientCardVue>
    <div
      :class="['ant-layout-sider-' + 'primary', 'ant-layout-sider-' + 'light']"
      theme="light"
      :style="{ backgroundColor: 'transparent' }"
      
    >
      <a-menu theme="light" mode="horizontal" v-model="current">
        <a-sub-menu>
          <span slot="title" class="submenu-title-wrapper"
            ><a-icon type="setting" />Organisation Setup</span
          >
          <a-menu-item key="departments">Departments & Designations</a-menu-item>
          <a-menu-item key="settings">Edit Company Details</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="employees">
          <span class="label"><a-icon type="usergroup-add" />Employees</span>
        </a-menu-item>
        <a-sub-menu key="calendar">
          <span slot="title" class="submenu-title-wrapper"
            ><a-icon type="calendar" />Payroll</span
          >  
          <a-menu-item key="allowances">Allowances </a-menu-item>
          <a-menu-item key="otherdeductions">Deductions </a-menu-item>
          <a-menu-item key="createcalendar"> Create Calendar </a-menu-item>
          <a-menu-item key="calendar"> View Calendars </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>
    <EmployeesTableVue v-if="current[0] == 'employees'" :client="client" :employees="employees"></EmployeesTableVue>
    <CardCalendarVue v-if="current[0] == 'calendar'" :client="client" :calendars="calendars"></CardCalendarVue>
    <CalendarForm v-if="current[0] == 'createcalendar'" :admins="admins" :clients="clients"></CalendarForm>
    <DeductionsForm v-if="current[0] == 'otherdeductions'" :client="client" :employees="employees"></DeductionsForm>
    <AllowanceForm v-if="current[0] == 'allowances'" :client="client" :employees="employees"></AllowanceForm>
    <Departments v-if="current[0] == 'departments'" :client="client" :clients="clients"></Departments>
    <DesignationForm v-if="current[0] == 'designations'"></DesignationForm>
    <companyform v-if="current[0] == 'settings'" :client="client" :bankNames="bankNames" :banks="banks"></companyform>

    <!-- / Cards -->
  </div>
</template>

<script>
import CardInfo from "../components/Cards/CardInfo";
import ClientForm from "../components/forms/ClientForm.vue";
import EmployeesTableVue from "../components/Tables/EmployeesTable.vue";
import CardCalendarVue from "../components/Cards/CardCalendar.vue";
import ClientFormVue from "../components/forms/ClientForm.vue";
import CalendarForm from "../components/forms/CalendarForm.vue";
import DeductionsForm from "../components/forms/DeductionsForm.vue";
import AllowanceForm from "../components/forms/AllowanceForm.vue";
import DepartmentForm from "../components/forms/DepartmentsForm.vue";
import DesignationForm from "../components/forms/DesignationForm.vue";
import ClientCardVue from "../components/Cards/ClientCard.vue";
import Departments from "./Departments.vue"
import UserfromVue from '../components/forms/Userfrom.vue';
import { mapState } from 'vuex';
import SetupCompany from '../components/Widgets/SetupCompany.vue';
import Companyform from '../components/forms/Companyform.vue';
export default {
  components: {
    CardInfo,
    ClientForm,
    EmployeesTableVue,
    CardCalendarVue,
    ClientFormVue,
    CalendarForm,
    DeductionsForm,
    AllowanceForm,
    DepartmentForm,
    DesignationForm,
    ClientCardVue,
    Departments,
    UserfromVue,
    SetupCompany,
    Companyform
  },
  data() {
    return {
      current: ["employees"],
    };

  },
  methods: {
    logKeys() {
      console.log(this.current[0]);
    },

  },
  computed: {
    ...mapState(["clients","admins","banks","employees","calendars"]),
    client(){
    return this.clients.find((client)=>client.id==this.$route.params.id)

    },
    bankNames() {
      let names = [];
      this.banks.forEach((e) => {
        names.push(e.BankName);
      });
      let name = [...new Set(names)];
      return name;
    },
  },
  mounted() {
    this.$store.dispatch("getClients");
    this.$store.dispatch("getAdmins");
    this.$store.dispatch("getBanks");
    this.$store.dispatch("getEmployees");
    this.$store.dispatch("getCalendars");

  },
};
</script>
<style>
#components-layout-demo-top .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
</style>
