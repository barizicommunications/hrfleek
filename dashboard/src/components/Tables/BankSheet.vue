<template>
  <a-card
    :bordered="false"
    class="header-solid h-full"
    :bodyStyle="{ padding: 0 }"
  >
    <template #title>
      <a-row type="flex">
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
      </a-row>
    </template>
    <a-table
      :columns="columns"
      :data-source="tableData"
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
    title: "PAYEE NAME",
    dataIndex: "payee_name",
    scopedSlots: { customRender: "payee_name" },
  },
  {
    title: "ACCOUNT NUMBER",
    dataIndex: "account_number",
    scopedSlots: { customRender: "account_number" },
  },
  {
    title: "BANK",
    dataIndex: "bank_name",
    scopedSlots: { customRender: "bank_name" },
  },
  {
    title: "BRANCH CODE",
    dataIndex: "banck_branch",
  },
  {
    title: "AMOUNT",
    className: "column-money",
    dataIndex: "basic_pay",
    sorter: (a, b) => a.basic_pay - b.basic_pay,
  },
  {
    title: "REFERENCE",
    dataIndex: "reference",
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
      tableData:[]
    };
  },
  methods: {
    convertTableData(){
      let picked =[]
      this.payrunEmployees.forEach((object)=>{
        const sliced = {
          "payee_name":[object.first_name,object.last_name].join(" "),
          "account_number":object.account_number,
          "basic_pay":object.basic_pay,
          "bank_name":object.bank_name,
          "banck_branch":object.bank_branch,
          "reference":"salary"


        }
        picked.push(sliced)
        
      })
      this.tableData =picked ;
      console.log(this.tableData)
    },
    downloadCsv() {
     
     let picked=[]
     this.payrunEmployees.forEach((object)=>{
        const sliced = {
          "PAYEE NAME":[object.first_name,object.last_name].join(" "),
          "ACCOUNT NUMBER":object.account_number,
          "AMOUNT":object.basic_pay,
          "BANK": object.bank_name,
          "BRANCH":object.bank_branch,
          "REFERENCE":"salary"


        }
        picked.push(sliced)
        
      })
      const data=picked;
      console.log(typeof(picked[0]));
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
    this.convertTableData()
  },
  destroyed() {
    this.$store.dispatch("updatePayrunEmployees", []);
    console.log("data cleaned up");
  },
};
</script>

<style></style>
