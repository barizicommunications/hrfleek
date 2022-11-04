<template>
  <div>
    <a-steps :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
     <div v-if="current==0">
       <a-card class="my-5">
        <a-form
        :form="form"
        layout="vertical"
        :hide-required-mark="false"
        @submit.prevent="handleSubmit"
      >
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
                    rules: [{ required: true, message: 'please enter email' }],
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
                    rules: [{ required: true, message: 'please enter phone' }],
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
            <a-form-item label="National ID">
              <a-input
                v-decorator="[
                  'national_id',
                  {
                    rules: [{ required: true, message: 'Field is required' }],
                  },
                ]"
                style="width: 100%"
                placeholder="national_id"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="KRA PIN">
              <a-input
                v-decorator="[
                  'kra_pin',
                  {
                    rules: [{ required: true, message: 'Field is required' }],
                  },
                ]"
                style="width: 100%"
                placeholder="KRA PIN"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="NSSF NUMBER">
              <a-input
                v-decorator="[
                  'nssf_number',
                  {
                    rules: [{ required: true, message: 'Field is required' }],
                  },
                ]"
                style="width: 100%"
                placeholder="nssf number"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="NHIF NUMBER">
              <a-input
                v-decorator="[
                  'nhif_number',
                  {
                    rules: [{ required: true, message: 'Field is required' }],
                  },
                ]"
                style="width: 100%"
                placeholder="NHIF"
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
                <a-select-option  v-for="department in currentClient.departments" :key="department.department_name" :value="department.department_name">
                  {{department.department_name}}
                </a-select-option>
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
            <a-form-item label="Branch Name">
              <a-input
                v-decorator="[
                  'bank_branch',
                  {
                    rules: [{ required: true, message: 'please enter branch' }],
                  },
                ]"
                style="width: 100%"
                placeholder="Branch Name"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
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
                placeholder="account Name"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Account Number">
              <a-input
                v-decorator="[
                  'account_number',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'please enter account number',
                      },
                    ],
                  },
                ]"
                style="width: 100%"
                placeholder="account number"
                type="number"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Deductions">
              <a-select
                mode="multiple"
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
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Allowances">
              <a-select
                mode="multiple"
                v-decorator="[
                  'allowances',
                  {
                    rules: [
                      {
                        required: false,
                        message: 'Please choose the allowances',
                      },
                    ],
                  },
                ]"
                placeholder="Please choose allowances"
              >
                <a-select-option value="housing"> Housing </a-select-option>
                <a-select-option value="food"> Food</a-select-option>
                <a-select-option value="tranport"> Transport</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Status">
              <a-select
                v-decorator="[
                  'status',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Please select employee status',
                      },
                    ],
                  },
                ]"
                placeholder="Status"
              >
                <a-select-option value="active"> Active </a-select-option>
                <a-select-option value="inactive">Inactive</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
      
          <a-col :span="12">
            <a-form-item label="Gender">
              <a-select
                v-decorator="[
                  'gender',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Please select',
                      },
                    ],
                  },
                ]"
                
              >
                <a-select-option value="male"> Male </a-select-option>
                <a-select-option value="female">Female</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
       </a-card>
     </div>
    </div>
    <div class="steps-action">
      <a-button v-if="current < steps.length - 1" type="primary" @click="next">
        Next
      </a-button>
      <a-button
        v-if="current == steps.length - 1"
        type="primary"
        @click="$message.success('Processing complete!')"
      >
        Done
      </a-button>
      <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
        Previous
      </a-button>
    </div>
  </div>
</template>

<script>
    import { mapState } from 'vuex';
export default {
  data() {
    return {
      current: 0,
      steps: [
        {
          title: "Employee Details",
          content: "First-content",
        },
        {
          title: "Allowances",
          content: "Second-content",
        },
        {
          title: "Deductions",
          content: "Last-content",
        },
      ],
      form: this.$form.createForm(this, { name: "coordinated" }),
    };
  },
  methods: {
    next() {
      this.current++;
    },
    prev() {
      this.current--;
    },
  },
  computed: {
    ...mapState(["employees","currentClient"]),
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
  },
};
</script>

<style></style>
