<template>
  <a-card
    :bordered="false"
    class="header-solid h-full"
    :bodyStyle="{ padding: 0 }"
  >
    <template #title>
      <a-row type="flex" align="middle">
        <a-col :span="24" :md="3">
          <h6>Employees</h6>
          <p>
            Total
            <span class="text-primary">{{ payrunEmployees.length }}</span>
          </p>
        </a-col>
        <a-col
          :span="24"
          :md="9"
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
          "
        >
          <a-input-group compact>
            <a-select
              mode="multiple"
              placeholder="Search  by name"
              :value="selectedEmployees"
              style="width: 70%"
              @change="handleChange"
            >
              <a-select-option
                v-for="item in employees"
                :key="item.first_name"
                :value="item.first_name"
              >
                {{ item.first_name }}{{ item.last_name }}
              </a-select-option>
            </a-select>
            <a-button
              type="primary"
              @click="addToList"
              id="otp-verfiy-button"
              icon="search"
              >Add
            </a-button>
          </a-input-group>
        </a-col>

        <a-col
          :span="24"
          :md="12"
          style="display: flex; align-items: center; justify-content: flex-end"
        >
          <a-input-group compact>
            <a-select
              mode="multiple"
              placeholder="Search by Departments"
              :value="selectedDepartments"
              style="width: 80%"
              @change="handleDepartmentChange"
            >
              <a-select-option
                v-for="item in currentClient.departments"
                :key="item.department_name"
                :value="item.department_name"
              >
                {{ item.department_name }}
              </a-select-option>
            </a-select>
            <a-button
              type="primary"
              @click="addDepartment"
              id="otp-verfiy-button"
              icon="search"
              >Add To List</a-button
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
import * as fb from "../../firebase";

const columns = [
  {
    title: "First Name",
    dataIndex: "first_name",
    scopedSlots: { customRender: "first_name" },
  },
  {
    title: "Last Name",
    dataIndex: "last_name",
    scopedSlots: { customRender: "last_name" },
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
    reviewandSubmit() {
      this.loading = true;
      if (!this.payrunEmployees.length) {
        swal({
          title: "OOP!",
          text: "There are no employees to be added",
          icon: "error",
        });
        this.loading = false;
      } else {
        swal("Final Changes made will be added to your payrun").then(
          async (value) => {
            await fb.businessCollection
              .doc(this.currentClient.id)
              .collection("calendars")
              .doc(this.calendar.id)
              .update({
                employees: this.payrunEmployees,
              })
              .then(() => {
                console.log(
                  this.payrunEmployees,
                  this.calendar,
                  this.currentClient
                );
                this.$store.dispatch("updatePayrunEmployees", []);
                this.loading = false;
              })
              .catch((err) => {
                swal({
                  title: "OOP!",
                  text: "Something went wrong",
                  icon: "error",
                });
                this.loading = false;
              });
          }
        );
      }
    },

    handleChange(selectedItems) {
      this.selectedEmployees = selectedItems;
    },
    handleDepartmentChange(selectedItems) {
      this.selectedDepartments = selectedItems;
    },
    addToList() {
      this.$store.dispatch("getPayrunEmployees", this.calendar.id);
      if (this.selectedEmployees.length) {
        for (let i = 0; i < this.selectedEmployees.length; i++) {
          let employee = this.employees.find(
            (e) => e.first_name === this.selectedEmployees[i]
          );
          if (this.payrunEmployees.indexOf(employee) === -1) {
            swal(
              "Changes made will be added to your payrun Press ok to Save"
            ).then(async (value) => {
              await fb.businessCollection
                .doc(this.currentClient.id)
                .collection("calendars")
                .doc(this.$route.params.id)
                .update({
                  employees: fb.types.FieldValue.arrayUnion(employee),
                })
                .then(() => {
                
                  this.$store.dispatch("getPayrunEmployees", this.calendar.id);
                  this.$message.success("employee added successfully")
                  this.loading = false;
                })
                .catch((err) => {
                  console.log(err)
                  swal({
                    title: "OOP!",
                    text: "Something went wrong",
                    icon: "error",
                  });
                  this.loading = false;
                });
            });
          }
        }
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
              swal(
              "Changes made will be added to your payrun Press ok to Save"
            ).then(async (value) => {
              await fb.businessCollection
                .doc(this.currentClient.id)
                .collection("calendars")
                .doc(this.$route.params.id)
                .update({
                  employees: fb.types.FieldValue.arrayUnion(element),
                })
                .then(() => {
                
                  this.$store.dispatch("getPayrunEmployees", this.$route.params.id);
                  this.$message.success("employee added successfully")
                  this.loading = false;
                })
                .catch((err) => {
                  console.log(err)
                  swal({
                    title: "OOP!",
                    text: "Something went wrong",
                    icon: "error",
                  });
                  this.loading = false;
                });
            });
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
      swal(
              "Changes made will be added to your payrun Press ok to Save"
            ).then(async (value) => {
              await fb.businessCollection
                .doc(this.currentClient.id)
                .collection("calendars")
                .doc(this.$route.params.id)
                .update({
                  employees: fb.types.FieldValue.arrayRemove(element),
                })
                .then(() => {
                  this.$store.dispatch("getPayrunEmployees", this.$route.params.id);
                  this.$message.error("employee removed successfully")
                  this.loading = false;
                })
                .catch((err) => {
                  swal({
                    title: "OOP!",
                    text: "Something went wrong",
                    icon: "error",
                  });
                  this.loading = false;
                });
            });
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
    this.$store.dispatch("getPayrunEmployees", this.$route.params.id);
  },
  destroyed() {
    this.$store.dispatch("updatePayrunEmployees", []);
    console.log("data cleaned up");
  },
};
</script>

<style></style>
