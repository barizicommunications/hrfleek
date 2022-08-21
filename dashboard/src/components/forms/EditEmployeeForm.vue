<template>
  <div>
    <a-card>
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
                :placeholder="profile.first_name"
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
               :placeholder="profile.last_name"
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
               :placeholder="profile.email"
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
                :placeholder="profile.phone_number"
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
               :placeholder="profile.national_id"
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
               :placeholder="profile.kra_pin"
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
               :placeholder="profile.department"
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
             :placeholder="profile.designation"
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
               :placeholder="profile.bank_name"
               
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
                  'branch_name',
                  {
                    rules: [{ required: true, message: 'please enter branch' }],
                  },
                ]"
                style="width: 100%"
              :placeholder="profile.branch_name"
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
               :placeholder="profile.account_name"
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
                :placeholder="profile.account_number"
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
               :placeholder="profile.deductions"
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
                :placeholder="profile.basic_pay"
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
                :placeholder="profile.allowances"
              >
                <a-select-option value="equity"> Housing </a-select-option>
                <a-select-option value="kcb"> Food</a-select-option>
                <a-select-option value="sacco"> Transport</a-select-option>
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
               :placeholder="profile.status"
              >
                <a-select-option value="active"> Active </a-select-option>
                <a-select-option value="inactive">Inactive</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    props:["profile"],
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      image: null,
    };
  },
  methods: {
 onChange(){},
 handleChange(){},
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.$store.dispatch("addClients", values).then(() => {
            if (!this.error) {
              this.form.resetFields();
            }
          });
        }
      });
    },
  },
  computed: {
    ...mapState["clients"],
    loading() {
      return this.$store.state.loading;
    },
    error() {
      return this.$store.state.error;
    },
  },
  mounted() {
    this.$store.dispatch("getClients");
  },
};
</script>

<style></style>
