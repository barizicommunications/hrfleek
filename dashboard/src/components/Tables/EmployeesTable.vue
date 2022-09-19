<template>
  <a-table
    :columns="columns"
    :data-source="data"
    bordered
    :scroll="{ x: 2000 }"
    rowKey="id"
  >
    <template
      v-for="col in [
        'first_name',
        'last_name',
        'address',
        'email',
        'phone_number',
        'gender',
        'kra_pin',
        'department',
        'nssf',
        'nhif',
        'basicpay',
        'designation'
      ]"
      :slot="col"
      slot-scope="text, record, index"
    >
      <div :key="col">
        <a-input
          v-if="record.editable"
          style="margin: -5px 0"
          :value="text"
          @change="(e) => handleChange(e.target.value, record.id, col)"
        />
        <template v-else>
          {{ text }}
        </template>
      </div>
    </template>
    <template slot="operation" slot-scope="text, record, index">
      <div class="editable-row-operations">
        <span v-if="record.editable">
          <a @click="() => save(record.id)">Save</a>
          <a-popconfirm
            title="Sure to cancel?"
            @confirm="() => cancel(record.id)"
          >
            <a>Cancel</a>
          </a-popconfirm>
        </span>
        <span v-else>
          <a :disabled="editingKey !== ''" @click="() => edit(record.id)"
            >Edit</a
          >
        </span>
      </div>
    </template>
  </a-table>
</template>
<script>
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
    title: "Gender",
    dataIndex: "Gender",
    scopedSlots: { customRender: "gender" },
  },
  {
    title: "Email",
    dataIndex: "email",
    scopedSlots: { customRender: "email" },
  },
  {
    title: "Phone Number",
    dataIndex: "phone_number",
    scopedSlots: { customRender: "phone_number" },
  },
  {
    title: "KRA PIN",
    dataIndex: "kra_pin",
    scopedSlots: { customRender: "kra_pin" },
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
    title: "NHIF Number",
    dataIndex: "nhif_number",
    scopedSlots: { customRender: "nhif" },
  },
  {
    title: "NSSF Number",
    dataIndex: "nssf_number",
    scopedSlots: { customRender: "nssf" },
  },
  {
    title: "Basic Salary",
    className: "column-money",
    dataIndex: "basic_pay",
    scopedSlots: { customRender: "basicpay" },
    sorter: (a, b) => a.basic_pay - b.basic_pay,
  },
  {
    title: "operation",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
    fixed:"right"
  },
];
import { mapState } from "vuex";
import exportFromJSON from "export-from-json";
import * as fb from "../../firebase";
import swal from "sweetalert";
const data = [];

export default {
  data() {
    this.cacheData = data.map((item) => ({ ...item }));
    return {
      data,
      columns,
      editingKey: "",
    };
  },
  methods: {
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.find((item) => key === item.id);
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      console.log(key, this.employees);
      const newData = [...this.data];
      const target = newData.find((item) => key === item.id);
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      const newData = [...this.data];
      const newCacheData = [...this.cacheData];
      const target = newData.find((item) => key === item.id);
      const targetCache = newCacheData.find((item) => key === item.id);
      if (target && targetCache) {
        delete target.editable;
        this.data = newData;
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.editingKey = "";
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.find((item) => key === item.id);
      this.editingKey = "";
      if (target) {
        Object.assign(
          target,
          this.cacheData.find((item) => key === item.id)
        );
        delete target.editable;
        this.data = newData;
      }
    },
    convertTableData() {
      let picked = [];
      this.employees.forEach((object) => {
        const sliced = {
          first_name: object.first_name,
          last_name: object.last_name,
          account_number: object.account_number,
          basic_pay: object.basic_pay,
          bank_name: object.bank_name,
          bank_branch: object.bank_branch,
          address: object.address,
          Country: object.Country,
          Gender: object.Gender,
          Status: object.Status,
          account_name: object.account_name,
          department: object.department,
          designation: object.designation,
          email: object.email,
          employment_type: object.employment_type,
          id: object.id,
          kra_pin: object.kra_pin,
          national_id: object.national_id,
          nhif_number: object.national_id,
          nssf_number: object.nssf_number,
          phone_number: object.phone_number,
        };
        picked.push(sliced);
      });
      this.data = picked;
    },
  },
  computed: {
    ...mapState(["employees", "currentClient"]),
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
        },
        getCheckboxProps: (record) => ({
          props: {
            disabled: record.name === "Disabled User", // Column configuration not to be checked
            name: record.name,
          },
        }),
      };
    },
  },
  mounted() {
    this.$store.dispatch("getEmployees");
    this.$store.dispatch("getCurrentClient");
    this.convertTableData()
  },
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
