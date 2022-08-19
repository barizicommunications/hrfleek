<template>
  <div>
    <!-- Cards -->
    <CardInfo></CardInfo>
    <div
      :class="['ant-layout-sider-' + 'primary', 'ant-layout-sider-' + 'light']"
      theme="light"
      :style="{ backgroundColor: 'transparent' }"
    >
      <a-menu theme="light" mode="horizontal" v-model="current">
        <a-menu-item  key="employees">
          <span class="label"><a-icon type="usergroup-add" />Employees</span>
        </a-menu-item>
        <a-sub-menu key="calendar">
        <span slot="title" class="submenu-title-wrapper"
          ><a-icon type="calendar" />Calendar</span
        >  <a-menu-item key="createcalendar">
            Create Calendar
          </a-menu-item>
          <a-menu-item key="calendar">
            View Calendar
          </a-menu-item>
     
      </a-sub-menu>
           <a-sub-menu >
        <span slot="title" class="submenu-title-wrapper"
          ><a-icon type="setting" />Bulk Edits</span
        >  <a-menu-item key="allowances">
            Add Allowances
          </a-menu-item>
          <a-menu-item key="deductions">
           Add Deductions
          </a-menu-item>
          <a-menu-item key="departments">
           Add Departments
          </a-menu-item>
           <a-menu-item key="designations">
           Add Designations
          </a-menu-item>
     
      </a-sub-menu>
        <a-menu-item key="reports">
          <span class="label">Reports</span>
        </a-menu-item>
          <a-menu-item  key="clients">
          <span class="label"><a-icon type="setting" />Add New Client</span>
        </a-menu-item>
      </a-menu>
    </div>
    <EmployeesTableVue v-if="current[0]=='employees'" ></EmployeesTableVue>
    <CardCalendarVue v-if="current[0]=='calendar'"></CardCalendarVue>
    <ClientFormVue  v-if="current[0]=='clients'"></ClientFormVue>
    <CalendarForm v-if="current[0]=='createcalendar'"></CalendarForm>
    <DeductionsForm v-if="current[0]=='deductions'"></DeductionsForm>
    <AllowanceForm v-if="current[0]=='allowances'"></AllowanceForm>
    <DepartmentForm v-if="current[0]=='departments'"></DepartmentForm>
    <DesignationForm v-if="current[0]=='designations'"></DesignationForm>

    <!-- / Cards -->
  </div> 
</template>

<script>
import CardInfo from "../components/Cards/CardInfo";
import ClientForm from "../components/forms/ClientForm.vue";
import EmployeesTableVue from "../components/Tables/EmployeesTable.vue";
import CardCalendarVue from '../components/Cards/CardCalendar.vue';
import ClientFormVue from "../components/forms/ClientForm.vue";
import CalendarForm from "../components/forms/CalendarForm.vue";
import DeductionsForm from "../components/forms/DeductionsForm.vue";
import AllowanceForm from "../components/forms/AllowanceForm.vue";
import DepartmentForm from "../components/forms/DepartmentsForm.vue";
import DesignationForm from "../components/forms/DesignationForm.vue";



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
    DesignationForm
  },
  data() {
    return {
      current: ["employees"],
    };
  },
  methods:{
    logKeys(){
      console.log(this.current[0])
    }
  }
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
