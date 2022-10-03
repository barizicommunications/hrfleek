<template>
  <div>
    <a-card>
    <a-form
      :form="form"

      @submit.prevent="handleSubmit"
    >
    <h3>General Information</h3>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="First Name">
            <a-input
              v-decorator="[
                'first_name',
                {
                  rules: [{ required: true, message: 'Please enter  name' }],
                },
              ]"
              placeholder="First Name"
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
                    {
                      required: true,
                      message: 'Please select a department',
                    },
                  ],
                },
              ]"
              placeholder="department"
            >
              <a-select-option
                v-for="department in currentClient.departments"
                :key="department.department_name"
                :value="department.department_name"
              >
                {{ department.department_name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Designation">
            <a-select
              v-decorator="[
                'designation',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please select a designation',
                    },
                  ],
                },
              ]"
              placeholder="hr manager"
            >
              <a-select-option
                v-for="designation in currentClient.designations"
                :key="designation.designation"
                :value="designation.designation_name"
              >
                {{ designation.designation_name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Basic Pay">
            <a-input
              v-decorator="[
                'basic_pay',
                {
                  rules: [{ required: true, message: 'please enter amount' }],
                },
              ]"
              style="width: 100%"
              placeholder="Basic Pay"
              type="number"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Date of Birth">
            <a-date-picker
              v-decorator="[
                'date_of_birth',
                {
                  initialValue: date,
                  rules: [
                  
                    { required: true, message: 'Field is required' },
                    
                  ],
                },
              ]"
              style="width: 100%"
              placeholder="Date of Birth"
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
                  rules: [{ required: true, message: 'please enter account' }],
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
          <a-form-item label="Date Of Appointment">
            <a-date-picker
              v-decorator="[
                'date_of_appointment',
                {
                  rules: [{ required: true, message: 'Field is required' }],
                },
              ]"
              style="width: 100%"
              placeholder="Date of Appointment"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Contract Type">
            <a-select
              v-decorator="[
                'contract_type',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please select contract type',
                    },
                  ],
                },
              ]"
              placeholder="contract type"
            >
              <a-select-option value="permanet"> Permanent </a-select-option>
              <a-select-option value="temporary">Temporary</a-select-option>
              <a-select-option value="casual">Casual</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>

      <h3>Allowances</h3>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="House Allowance">
            <a-input
              v-decorator="[
                'house_allowance',
                {
                  rules: [{ required: true, message: 'Field is required' }],
                },
              ]"
              placeholder=""
              type="number"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Transport Allowance">
            <a-input
              v-decorator="[
                'transportAllowance',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Field is required',
                    },
                  ],
                },
              ]"
              style="width: 100%"
              placeholder=""
              type="number"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Telephone Allowance">
            <a-input
              v-decorator="[
                'telephoneAllowance',
                {
                  rules: [{ required: true, message: 'Field is required' }],
                },
              ]"
              style="width: 100%"
              placeholder=""
              type="number"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Hardship Allowance">
            <a-input
              v-decorator="[
                'hardshipAllowance',
                {
                  rules: [{ required: true, message: 'please enter' }],
                },
              ]"
              style="width: 100%"
              placeholder=""
              type="number"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Transfer Allowance">
            <a-input
              v-decorator="[
                'transferAllowance',
                {
                  rules: [{ required: true, message: 'Field is required' }],
                },
              ]"
              style="width: 100%"
              placeholder=""
              type="number"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Risk Allowance">
            <a-input
              v-decorator="[
                'riskAllowance',
                {
                  rules: [{ required: true, message: 'Field is required' }],
                },
              ]"
              style="width: 100%"
              placeholder=""
              type="number"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Car Allowance">
            <a-input
              v-decorator="[
                'carAllowance',
                {
                  rules: [{ required: true, message: 'Field is required' }],
                },
              ]"
              style="width: 100%"
              placeholder=""
              type="number"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Fuel Allowance">
            <a-input
              v-decorator="[
                'fuelAllowance',
                {
                  rules: [{ required: true, message: 'Field is required' }],
                },
              ]"
              style="width: 100%"
              placeholder=""
              type="number"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Leave Allowance">
            <a-input
              v-decorator="[
                'leave_allowance',
                {
                  rules: [{ required: true, message: 'Field is required' }],
                },
              ]"
              style="width: 100%"
              placeholder=""
              type="number"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Entertainment Allowance">
            <a-input
              v-decorator="[
                'entertainmentAllowance',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Field is required',
                    },
                  ],
                },
              ]"
              style="width: 100%"
              placeholder=""
              type="number"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <h3>Deductions</h3>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="LIFE INSURANCE">
            <a-input
              v-decorator="[
                'life_insurance',
                {
                  rules: [{ required: true, message: 'Field is required' }],
                },
              ]"
              style="width: 100%"
              placeholder=""
              type="number"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="HELB">
            <a-input
              v-decorator="[
                'helb',
                {
                  rules: [{ required: true, message: 'please enter' }],
                },
              ]"
              style="width: 100%"
              placeholder=""
              type="number"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="PENSION">
            <a-input
              v-decorator="[
                'pension',
                {
                  rules: [{ required: true, message: 'Field is required' }],
                },
              ]"
              style="width: 100%"
              placeholder=""
              type="number"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="SACCO">
            <a-input
              v-decorator="[
                'sacco',
                {
                  rules: [{ required: true, message: 'Field is required' }],
                },
              ]"
              style="width: 100%"
              placeholder=""
              type="number"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="SALARY ADVANCE">
            <a-input
              v-decorator="[
                'salary_advance',
                {
                  rules: [{ required: true, message: 'Field is required' }],
                },
              ]"
              style="width: 100%"
              placeholder=""
              type="number"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit" block> Submit </a-button>
      </a-form-item>
    </a-form>
    </a-card>
  </div>
</template>
<script>
import moment from "moment";
import { mapState } from "vuex";
export default {
  data() {
    return {
      current: 0,
      date: null,
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
      employeeDetails: {},
      allowances: {},
      PAYE: 0,
      net_gross: 0,
    };
  },
  methods: {
    validateDate(rule, value, callback) {
      const { getFieldError, isFieldTouched } = this.form;
      let tentDate = new Date().getFullYear() - value.toDate().getFullYear();
      if (tentDate < 18) {
        callback("Employee must be over 18yrs!");
        return;
      } else {
        callback();
      }
    },
    next() {
      if (this.current == 0) {
        console.log("you are at the current form");
        this.current++;
      }
      if (this.current == 1) {
        console.log("you are at the second form");
        this.current++;
      }
    },
    submitEmployeeDetails(e) {
      console.log("you are at the current form");

      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          // this.$store.dispatch("addEmployee", values);
          console.log(values);
          this.employeeDetails = values;
          this.current++;
        }
      });
    },
    submitAllowances(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
           this.$store.dispatch("addEmployee", values);
          console.log(values);
        }
      });
    },
    prev() {
      this.current--;
    },
    firstTaxBand(value) {
      if (this.net_gross <= 24000) {
        return 0.1 * net_gross;
      } else if (this.net_gross > 24000 && this.net_gross <= 32332) {
        return 0.25 * this.net_gross;
      } else {
        return 0.25 * this.net_gross;
      }
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        let tentDate = new Date().getFullYear() - values.date_of_birth.toDate().getFullYear();

        if (!err) {
          if(tentDate<18){
          this.$message.error("employee must be over 18 years of age")
        }else{
          console.log(values)
             this.$store.dispatch("addEmployee", values);
             
        }
          // console.log(this.employeeDetails.gross_pay);
          // let net_gross =
          //   this.employeeDetails.gross_pay -
          //   values.pension -
          //   values.life_insurance;

          // console.log("this is the Tax", this.firstTaxBand(net_gross));

          // let details =this.employeeDetails,
          // allowances =this.allowances,
          // deductions=values
          // let formDetails={...details,deductions,allowances}
          // console.log(formDetails)
        
        } else {
          this.$message.error("some fields are empty");
        }
      });
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
  },
};
</script>
<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
}
</style>
