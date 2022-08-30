<template>
  <a-card
    :bordered="false"
    class="header-solid h-full"
    :bodyStyle="{ padding: 0 }"
  >
    <template #title>
      <a-row type="flex" align="middle">
        <a-col :span="24" :md="8">
          <h6>Employees</h6>
          <p>
            Total <span class="text-primary">{{ payrunEmployees.length }}</span>
          </p>
        </a-col>
        <a-col
          :span="24"
          :md="12"
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
          "
        >
          <a-select
            mode="multiple"
            placeholder="Search Employees"
            :value="selectedEmployees"
            style="width: 80%"
            @change="handleChange"
          >
            <a-select-option
              v-for="item in employees"
              :key="item.full_name"
              :value="item.full_name"
            >
              {{ item.full_name }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col
          :span="24"
          :md="4"
          style="display: flex; align-items: center; justify-content: flex-end"
        >
          <a-radio-group size="small">
            <a-radio-button value="all" @click="addToList"
              >Add To List</a-radio-button
            >
          </a-radio-group>
        </a-col>
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
            <router-link
              :to="{ name: 'Editemployee', params: { profile: record } }"
            >
              <a>Remove</a></router-link
            >
          </span>
        </div>
      </template>
    </a-table>
  </a-card>
</template>

<script>
import { mapState } from "vuex";
import swal from "sweetalert";
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
  {
    title: "operation",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
  },
];

export default {
  data() {
    return {
      calendar: {},
      columns,
      selectedEmployees: [],
      payrunEmployees: [],
    };
  },
  methods: {
    handleChange(selectedItems) {
      this.selectedEmployees = selectedItems;
    },
    addToList() {
      if (this.selectedEmployees.length) {
        let setemployee = [];
        for (let i = 0; i < this.selectedEmployees.length; i++) {
          let employee = this.employees.find(
            (e) => e.full_name === this.selectedEmployees[i]
          );
          if (this.payrunEmployees.indexOf(employee) === -1) {
            this.payrunEmployees.push(employee);
            
          }
          else {
              swal({
                title: "OOPS!",
                text: `employee Already exists`,
                icon: "error",
              });
            }
          //   if (this.payrunEmployees.indexOf(employee)) {
          //     this.payrunEmployees.push(employee);
          //   } else {
          //     swal({
          //       title: "OOPS!",
          //       text: `${employee.full_name} Already exists`,
          //       icon: "error",
          //     });
          //   }
        }
        console.log(setemployee);
      } else {
        swal({
          title: "OOPS!",
          text: `No employees to add`,
          icon: "error",
        });
      }
    },
  },
  computed: {
    ...mapState(["calendars", "employees", "currentClient"]),
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
