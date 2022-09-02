<template>
  <a-card
    :bordered="false"
    class="header-solid h-full"
    :bodyStyle="{ padding: 0 }"
  >
    <template #title>
      <a-row type="flex" align="middle">
        <a-col
          :span="24"
          :md="12"
          style="display: flex; align-items: center; justify-content: flex-end"
        >
          <a-input-group compact>
            <a-button
              type="primary"
              @click="downloadCsv"
              id="otp-verfiy-button"
              icon="download"
              :loading="loading"
              >Download Bank Sheet</a-button
            >
          </a-input-group>
        </a-col>
        <!-- <a-col
            :span="24"
            :md="6"
            style="display: flex; align-items: center; justify-content: flex-end"
          >
            <a-button
              type="primary"
              @click="reviewandSubmit"
              id="otp-verfiy-button"
              icon="upload"
              :loading="loading"
              >Review and Submit</a-button
            >
          </a-col> -->
      </a-row>
    </template>
    <a-table
      :columns="columns"
      :data-source="payrunEmployees"
      bordered
      rowKey="id"
    >
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span>
            <a
              @click="
                () => {
                  removeEmployee(record);
                }
              "
              >Remove</a
            >
          </span>
        </div>
      </template>
    </a-table>
    <div></div>
  </a-card>
</template>

<script>
import { mapState } from "vuex";
import swal from "sweetalert";
import exportFromJSON from "export-from-json";

const columns = [
  {
    title: "Name",
    dataIndex: "full_name",
    scopedSlots: { customRender: "full_name" },
  },
  {
    title: "Email",
    dataIndex: "email",
    scopedSlots: { customRender: "email" },
  },
  {
    title: "Department",
    dataIndex: "department",
    scopedSlots: { customRender: "department" },
    filters: [
      { text: "Sales", value: "sales" },
      { text: "Engineering", value: "engineering" },
    ],
    onFilter: (value, record) => record.department.indexOf(value) === 0,
  },
  {
    title: "designation",
    dataIndex: "designation",
    scopedSlots: { customRender: "designation" },
  },
  {
    title: "Phone Number",
    dataIndex: "phone_number",
  },
  {
    title: "Basic Salary",
    className: "column-money",
    dataIndex: "basic_pay",
    sorter: (a, b) => a.basic_pay - b.basic_pay,
  },
];
export default {
  props: {
    calendar: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      columns,
      selectedEmployees: [],
      selectedDepartments: [],
      loading: false,
    };
  },
  methods: {
    downloadCsv() {
        const data = this.payrunEmployees;
      const fileName = "bank sheet";
      const exportType = exportFromJSON.types.csv;

      if (data) exportFromJSON({ data, fileName, exportType });
    },
    handleChange(selectedItems) {
      this.selectedEmployees = selectedItems;
    },
    handleDepartmentChange(selectedItems) {
      this.selectedDepartments = selectedItems;
    },
    addToList() {
      if (this.selectedEmployees.length) {
        for (let i = 0; i < this.selectedEmployees.length; i++) {
          let employee = this.employees.find(
            (e) => e.full_name === this.selectedEmployees[i]
          );
          if (this.payrunEmployees.indexOf(employee) === -1) {
            this.payrunEmployees.push(employee);
          }
        }
        this.$store.dispatch("updatePayrunEmployees", this.payrunEmployees);
      } else {
        swal({
          title: "OOPS!",
          text: `No employees to add`,
          icon: "error",
        });
      }
    },
    addDepartment() {
      if (this.selectedDepartments.length) {
        for (let i = 0; i < this.selectedDepartments.length; i++) {
          let filteredOptions = this.employees.filter(
            (e) => e.department === this.selectedDepartments[i]
          );
          filteredOptions.forEach((element) => {
            if (this.payrunEmployees.indexOf(element) === -1) {
              this.payrunEmployees.push(element);
            }
          });
        }
        this.$store.dispatch("updatePayrunEmployees", this.payrunEmployees);
      } else {
        swal({
          title: "OOPS!",
          text: `please select a department`,
          icon: "error",
        });
      }
    },
    removeEmployee(element) {
      console.log(element);
      let data = this.payrunEmployees.filter((e) => e !== element);
      this.$store.dispatch("updatePayrunEmployees", data);
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
    this.$store.dispatch("getEmployees");
    this.$store.dispatch("getCurrentClient");
  },
  destroyed() {
    this.$store.dispatch("updatePayrunEmployees", []);
    console.log("data cleaned up");
  },
};
</script>

<style></style>
