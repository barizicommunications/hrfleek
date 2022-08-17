<template>
  <a-card
    :bordered="false"
    class="header-solid h-full"
    :bodyStyle="{ padding: 0 }"
  >
    <a-drawer
      title="Create a new account"
      :width="720"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
      <a-form :form="form" layout="vertical" hide-required-mark @submit.prevent="handleSubmit">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="First Name">
              <a-input
                v-decorator="[
                  'first_name',
                  {
                    rules: [
                      { required: true, message: 'Please enter user name' },
                    ],
                  },
                ]"
                placeholder="Please enter user name"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Last Name">
              <a-input
                v-decorator="[
                  'last_name',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'please enter your last name',
                      },
                    ],
                  },
                ]"
                style="width: 100%"
                placeholder="last name"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Email">
              <a-input
                v-decorator="[
                  'email',
                  {
                    rules: [
                      { required: true, message: 'please enter account' },
                    ],
                  },
                ]"
                style="width: 100%"
                placeholder="email"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Phone Number">
              <a-input
                v-decorator="[
                  'phone_number',
                  {
                    rules: [
                      { required: true, message: 'please enter phone' },
                    ],
                  },
                ]"
                style="width: 100%"
                placeholder="phone"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Department">
              <a-select
                v-decorator="[
                  'department',
                  {
                    rules: [
                      { required: true, message: 'Please select a department' },
                    ],
                  },
                ]"
                placeholder="department"
              >
                <a-select-option value="engineering">
                  engineering
                </a-select-option>
                <a-select-option value="sales"> sales </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Designation">
              <a-input
                v-decorator="[
                  'designation',
                  {
                    rules: [
                      { required: true, message: 'please enter designation' },
                    ],
                  },
                ]"
                style="width: 100%"
                placeholder="designation"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Bank Name">
              <a-select
                v-decorator="[
                  'bank_name',
                  {
                    rules: [
                      { required: true, message: 'Please choose the bank' },
                    ],
                  },
                ]"
                placeholder="Please choose the bank"
              >
                <a-select-option value="equity"> Equity Bank </a-select-option>
                <a-select-option value="kcb"> KCB Bank </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Account Name">
              <a-input
                v-decorator="[
                  'account_name',
                  {
                    rules: [
                      { required: true, message: 'please enter account' },
                    ],
                  },
                ]"
                style="width: 100%"
                placeholder="account"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Account Number">
                <a-input
                v-decorator="[
                  'account_number',
                  {
                    rules: [
                      { required: true, message: 'please enter account number' },
                    ],
                  },
                ]"
                style="width: 100%"
                placeholder="account number"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
              <a-form-item label="Branch Name">
              <a-input
                v-decorator="[
                  'branch_name',
                  {
                    rules: [
                      { required: true, message: 'please enter account' },
                    ],
                  },
                ]"
                style="width: 100%"
                placeholder="account"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
          <a-form-item label="Deductions">
              <a-select  mode="multiple"
                v-decorator="[
                  'deductions',
                  {
                    rules: [
                      { required: true, message: 'Please choose the bank' },
                    ],
                  },
                ]"
                placeholder="Please choose the bank"
              >
                <a-select-option value="equity"> NHIF </a-select-option>
                <a-select-option value="kcb"> NSSF</a-select-option>
                <a-select-option value="sacco"> Saccos</a-select-option>
              </a-select>
            </a-form-item>

          </a-col>
          <a-col :span="12">
            <a-form-item label="Basic Pay">
              <a-input
                v-decorator="[
                  'basic_pay',
                  {
                    rules: [
                      { required: true, message: 'please enter account' },
                    ],
                  },
                ]"
                style="width: 100%"
                placeholder="Basic Pay"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <a-button :style="{ marginRight: '8px' }" @click="onClose">
          Cancel
        </a-button>
        <a-button type="primary" @click="handleSubmit"> Submit </a-button>
      </div>
    </a-drawer>
    <template #title>
      <a-row type="flex" align="middle">
        <a-col :span="24" :md="12">
          <h6>Employees</h6>
          <p>Total <span class="text-primary">{{employees.length}}</span></p>
        </a-col>
        <a-col
          :span="24"
          :md="12"
          style="display: flex; align-items: center; justify-content: flex-end"
        >
          <a-radio-group v-model="projectHeaderBtns" size="small">
            <a-radio-button value="all" @click="showModal"
              >Add New</a-radio-button
            >
          </a-radio-group>
        </a-col>
      </a-row>
    </template>
    <a-table :row-selection="rowSelection" :columns="columns" :data-source="employees" bordered>
      <template slot="name" slot-scope="text">
        <a>{{ text }}</a>
      </template>
      <template slot="footer"> Footer </template>
    </a-table>

    <div class="table-upload-btn">
      <a-button type="dashed" block>
        <svg
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3 17C3 16.4477 3.44772 16 4 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H4C3.44772 18 3 17.5523 3 17ZM6.29289 6.70711C5.90237 6.31658 5.90237 5.68342 6.29289 5.29289L9.29289 2.29289C9.48043 2.10536 9.73478 2 10 2C10.2652 2 10.5196 2.10536 10.7071 2.29289L13.7071 5.29289C14.0976 5.68342 14.0976 6.31658 13.7071 6.70711C13.3166 7.09763 12.6834 7.09763 12.2929 6.70711L11 5.41421L11 13C11 13.5523 10.5523 14 10 14C9.44771 14 9 13.5523 9 13L9 5.41421L7.70711 6.70711C7.31658 7.09763 6.68342 7.09763 6.29289 6.70711Z"
            fill="#111827"
          />
        </svg>
        import CSV
      </a-button>
    </div>
  </a-card>
</template>
<script>
const columns = [
  {
    title: "Name",
    dataIndex: "full_name",
    scopedSlots: { customRender: "name" },
  },
   {
    title: "Email",
    dataIndex: "email",
  },
     {
    title: "Department",
    dataIndex: "department",
     filters: [
      { text: 'Sales', value: 'sales' },
      { text: 'Engineering', value: 'engineering' },
    ],
    onFilter: (value, record) => record.department.indexOf(value) === 0,
  },
     {
    title: "Designation",
    dataIndex: "designation",
  },
     {
    title: "Phone Number",
    dataIndex: "phone_number",
  },
  {
    title: "Net Salary",
    className: "column-money",
    dataIndex: "basic_pay",
    sorter: (a, b) => a.basic_pay - b.basic_pay,
  },
 
];


import { mapState } from 'vuex';
export default {
  data() {
    return {
      columns,
      projectHeaderBtns: "all",
      visible: false,
       form: this.$form.createForm(this, { name: "coordinated" }),
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
      handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.$store.dispatch("addEmployees",values)
        }
      });
    },

  },
      		computed:{
			...mapState(['employees']),
          rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
          },
        }),
      };
    },
		},
		mounted(){
			this.$store.dispatch("getEmployees");
		}
};
</script>
<style>
th.column-money,
td.column-money {
  text-align: right !important;
}
</style>
