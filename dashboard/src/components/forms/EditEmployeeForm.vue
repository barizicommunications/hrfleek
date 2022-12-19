<template>
  <div>
    <a-card>
      <a-form :form="form" @submit.prevent="handleSubmit">
        <h3>Employee Information</h3>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="First Name">
              <a-input
                v-decorator="[
                  'first_name',
                  {initialValue: employee.first_name,
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
                  {initialValue: employee.last_name,
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
                  {initialValue: employee.email,
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
                  {initialValue: employee.phone_number,
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
                  {initialValue: employee.national_id,
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
                  {initialValue: employee.kra_pin,
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
                  {initialValue: employee.nssf_number,
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
                  {initialValue: employee.nhif_number,
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
                  {initialValue: employee.department,
                    rules: [
                      {
                        required: true,
                        message: 'Please select a department',
                      },
                    ],
                  },
                ]"
                placeholder="department"
                @change="handleDepartmentChange"
              >
                <a-select-option
                  v-for="department in client.departments"
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
                  {initialValue: employee.designation,
                    rules: [
                      {
                        required: true,
                        message: 'Please select a designation',
                      },
                    ],
                  },
                ]"
                placeholder="Select Department"
              >
                <a-select-option
                  v-for="designation in designations"
                  :key="designation.name"
                  :value="designation.name"
                >
                  {{ designation.name }}
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
                  {initialValue: employee.basic_pay,
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
            <a-form-item label="Contract Type">
              <a-select
                v-decorator="[
                  'contract_type',
                  {initialValue: employee.contract_type,
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
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Bank Name">
              <a-select
                v-decorator="[
                  'bank_name',
                  {initialValue: employee.bank_name,
                    rules: [
                      { required: true, message: 'Please choose the bank' },
                    ],
                  },
                ]"
                @change="handleBankChange"
                placeholder="Please choose the bank"
              >
                <a-select-option
                  v-for="bank of bankNames"
                  :key="bank"
                  :value="bank"
                  >{{ bank }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Branch Name">
              <a-select
                v-decorator="[
                  'bank_branch',
                  {initialValue: employee.bank_branch,
                    rules: [{ required: true, message: 'please enter branch' }],
                  },
                ]"
                style="width: 100%"
                placeholder="Branch Name"
              >
              <a-select-option
                  v-for="branch of branches"
                  :key="branch.id"
                  :value="branch.BranchName"
                  >{{ branch.BranchName }}
                </a-select-option>
            </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Account Name">
              <a-input
                v-decorator="[
                  'account_name',
                  {initialValue: employee.account_name,
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
                  {initialValue: employee.account_number,
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
                  {initialValue: employee.Gender,
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
                  {initialValue: employee.status,
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
            <div>
         Date of Appointment :{{employee.date_of_appointment.toDate().toDateString()}}
        </div>
            <a-form-item label="">
              <a-date-picker
                v-decorator="[
                  'date_of_appointment',
                  {
                    rules: [{ required: false, message: 'Field is required' }],
                  },
                ]"
                style="width: 100%"
                placeholder="Edit Appointment Date"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <div>
         Date of Birth :{{employee.date_of_birth.toDate().toDateString()}}
        </div>
            <a-form-item label="">
              <a-date-picker
                v-decorator="[
                  'date_of_birth',
                  {
                    rules: [{ required: false, message: 'Field is required' }],
                  },
                ]"
                style="width: 100%"
                placeholder="Edit Date of birth"
              />
            </a-form-item>

          </a-col>
        </a-row>

        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit" block :loading="loading"> Edit </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>
<script>
import moment from "moment";
import { mapState } from "vuex";
import * as fb from "../../firebase";
import swal from 'sweetalert';
export default {
  props: ["client","employee"],
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
      designations: [],
      branches: [],
      loading:false
    };
  },
  methods: {
    handleDepartmentChange(value) {
      let dept = this.client.departments.find(
        (d) => d.department_name === value
      );
      let designations = [];
      for (let i = 0; i < this.clients.length; i++) {
        if (this.clients[i].designations == undefined) {
          break;
        }
        this.clients[i].designations.forEach((e) => {
          designations.push(e);
        });
      }

      let filtered = designations.filter((e) => e.department == value);
      this.designations = filtered;
    },
    handleBankChange(value) {
      let filtered = this.banks.filter((e) => e.BankName == value);
      this.branches = filtered;
    },

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
        let tentDate=18
        if(values.date_of_birth){
        tentDate =
          new Date().getFullYear() -
          values.date_of_birth.toDate().getFullYear();
        }
        if (!err) {
          this.loading=true
          if (tentDate < 18) {
            this.$message.error("employee must be over 18 years of age");
            this.loading=false
          } else {
            if(!values.date_of_appointment){
          values.date_of_appointment=this.employee.date_of_appointment
        }else{
          values.date_of_appointment= new Date(values.date_of_appointment)
        }
        if(!values.date_of_birth){
          values.date_of_birth=this.employee.date_of_birth
        }else{
          values.date_of_birth = new Date(values.date_of_birth)
        }
        console.log(values);
        const selectedClient = JSON.parse(localStorage.getItem("client"));
        fb.businessCollection.doc(selectedClient.id).collection("team").doc(this.employee.id).update(values).then(()=>{
          this.loading=false
          swal({
          title: "SUCCESS!",
          text: `Details updated successfully`,
          icon: "success",
        });
        }).catch((err)=>{
          this.loading=false
          swal({
          title: "OOPs!",
          text: `Something went wrong`,
          icon: "error",
        });
        })
          }
        } else {
          this.$message.error("some fields are empty");
          this.loading =false
        }
      });
    },
  },
  computed: {
    ...mapState(["employees", "clients", "banks"]),
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
    bankNames() {
      let names = [];
      this.banks.forEach((e) => {
        names.push(e.BankName);
      });
      let name = [...new Set(names)];
      return name;
    },
  },
  mounted() {
    this.$store.dispatch("getEmployees");
    this.$store.dispatch("getClients");
    this.$store.dispatch("getBanks");
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
