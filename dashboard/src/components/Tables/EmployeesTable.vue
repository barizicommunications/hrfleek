<template>
  <a-card>
    <a-modal v-model="modal" title="Bulk Imports">
      <template slot="footer">
        <a-button key="back" @click="handleCancel"> Cancel </a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
          @click="handleUpload"
        >
          Upload
        </a-button>
      </template>
      <div class="table-upload-btn">
        <a-upload
          :file-list="fileList"
          :remove="handleRemove"
          :before-upload="beforeUpload"
          accept=".csv"
        >
          <a-button block> <a-icon type="upload" /> Select CSV File </a-button>
        </a-upload>
      </div>
      <div class="table-upload-btn">
        <a-button type="dashed" block @click.prevent="downloadFile">
          <a-icon type="download" />
          Download Sample CSV
        </a-button>
      </div>
    </a-modal>
    <a-drawer
      title="Create a new employee account"
      :width="720"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
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
            <a-form-item label="Date of Birth">
              <a-date-picker
                v-decorator="[
                  'date_of_birth',
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
          <p>
            Total <span class="text-primary">{{ employees.length }}</span>
          </p>
        </a-col>
        <a-col
          :span="24"
          :md="12"
          style="display: flex; align-items: center; justify-content: flex-end"
        >
          <a-radio-group size="small">
            <router-link to="/create-employee">Add New Employee</router-link>
          </a-radio-group>
        </a-col>
      </a-row>
    </template>
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
          'designation',
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
    <div class="table-upload-btn">
      <a-button type="dashed" block @click="showDrawer">
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
    title: "Quick Edit",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
    fixed: "right",
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
      projectHeaderBtns: "all",
      visible: false,
      form: this.$form.createForm(this, { name: "coordinated" }),
      editingKey: "",
      modal: false,
      loading: false,
      fileList: [],
      uploading: false,
      filesrc: {
        label: "sample.csv",
        url: "./sample.csv",
      },
      sampleData: [
        {
          national_id: "35276738",
          first_name: "Liliane",
          last_name: "Lorrainbe",
          Gender: "male",
          email: "citlalli.wolf@hotmail.com",
          phone_number: "0705122230",
          address: "2448 Willms Freeway",
          Country: "Kenya",
          department: "sales",
          designation: "sales manager",
          employment_type: "contract",
          kra_pin: "A2030400504L",
          nhif_number: "1923990",
          nssf_number: "500604",
          bank_name: "Equity Bank",
          account_name: "Warren Ochieng",
          account_number: "49999030009",
          bank_branch: "Kenyatta Avenue",
          basic_pay: "1000000",
          Status: "active",
          adavnce_salary: 0,
              nssf: 0,
              nhif: 0,
              paye: 0,
              helb: 0,
              pension: 0,
              sacco: 0,
              HouseAllowance: 0,
              transportAllowance: 0,
              telephoneAllowance: 0,
              hardshipAllowance: 0,
              transferAllowance: 0,
              riskAllowance: 0,
              carAllowance: 0,
              fuelAllowance: 0,
              leave: 0,
              entertainmentAllowance: 0,
              mealAllowance: 0,
          employee_id: "",
        },
        {
          national_id: "35276738",
          first_name: "Phillip",
          last_name: "Mugo",
          Gender: "male",
          email: "citlalli.wolf@hotmail.com",
          phone_number: "0705122230",
          address: "2448 Willms Freeway",
          Country: "Kenya",
          department: "sales",
          designation: "sales manager",
          employment_type: "contract",
          kra_pin: "A2030400504L",
          nhif_number: "1923990",
          nssf_number: "500604",
          bank_name: "Equity Bank",
          account_name: "Warren Ochieng",
          account_number: "49999030009",
          bank_branch: "Kenyatta Avenue",
          basic_pay: "1000000",
          Status: "active",
          adavnce_salary: 0,
              nssf: 0,
              nhif: 0,
              paye: 0,
              helb: 0,
              pension: 0,
              sacco: 0,
              HouseAllowance: 0,
              transportAllowance: 0,
              telephoneAllowance: 0,
              hardshipAllowance: 0,
              transferAllowance: 0,
              riskAllowance: 0,
              carAllowance: 0,
              fuelAllowance: 0,
              leave: 0,
              entertainmentAllowance: 0,
              mealAllowance: 0,
          employee_id: "",
        },
        {
          national_id: "36273495",
          first_name: "MIchelle",
          last_name: "Natasha",
          Gender: "female",
          email: "citlalli.wolf@hotmail.com",
          phone_number: "0705122230",
          address: "2448 Willms Freeway",
          Country: "Kenya",
          department: "sales",
          designation: "sales manager",
          employment_type: "contract",
          kra_pin: "A2030400504L",
          nhif_number: "1923990",
          nssf_number: "500604",
          bank_name: "Equity Bank",
          account_name: "Warren Ochieng",
          account_number: "49999030009",
          bank_branch: "Kenyatta Avenue",
          basic_pay: "1000000",
          Status: "active",
          adavnce_salary: 0,
              nssf: 0,
              nhif: 0,
              paye: 0,
              helb: 0,
              pension: 0,
              sacco: 0,
              HouseAllowance: 0,
              transportAllowance: 0,
              telephoneAllowance: 0,
              hardshipAllowance: 0,
              transferAllowance: 0,
              riskAllowance: 0,
              carAllowance: 0,
              fuelAllowance: 0,
              leaveAllowance: 0,
              entertainmentAllowance: 0,
              mealAllowance: 0,
          employee_id: "",
        },
      ],
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
      const selectedClient = JSON.parse(localStorage.getItem("client"));
      const newData = [...this.data];
      const newCacheData = [...this.cacheData];
      const target = newData.find((item) => key === item.id);
      const targetCache = newCacheData.find((item) => key === item.key);
      console.log(target);
      // if (target && targetCache) {
      //   delete target.editable;
      //   this.data = newData;
      //   Object.assign(targetCache, target);
      //   this.cacheData = newCacheData;
      // }
      this.editingKey = "";
      fb.businessCollection
        .doc(selectedClient.id)
        .collection("team")
        .doc(key)
        .update(target)
        .then(() => {
          this.$message.success("user details updated successfully");
          this.$store.dispatch("getCurrentClient");
          this.convertTableData();
          delete target.editable;
        });
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
    showModal() {
      this.visible = true;
    },
    showDrawer() {
      this.modal = true;
    },
    onClose() {
      this.visible = false;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store.dispatch("addEmployee", values);
          console.log(values);
        }
      });
    },
    handleChange(value, key, column) {
      const newData = [...this.employees];
      const target = newData.find((item) => key === item.id);
      if (target) {
        target[column] = value;
        this.employees = newData;
      }
    },
    handleOk() {},
    handleCancel() {
      this.modal = false;
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      return false;
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    handleUpload(e) {
      e.preventDefault();
      if (this.fileList.length) {
        this.loading = true;
        let promise = new Promise((resolve, reject) => {
          var reader = new FileReader();
          var vm = this;
          reader.onload = (e) => {
            resolve((vm.fileinput = reader.result));
          };
          reader.readAsText(this.fileList[0]);
        });
        promise.then(
          (result) => {
            /* handle a successful result */
            var lines = result.split("\n");
            var newresult = [];
            var headers = lines[0].split(",");
            for (var i = 1; i < lines.length; i++) {
              var obj = {};
              var currentline = lines[i].split(",");
              for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
              }
              newresult.push(obj);
            }
            //return result; //JavaScript object
            //JSON
            function checkIdDuplicates(array, value) {
              var count = 0;
              array.forEach((v) => v.national_id === value && count++);
              return count;
            }
            function checkKRADuplicates(array, value) {
              var count = 0;
              array.forEach((v) => v.kra_pin === value && count++);
              return count;
            }
            function checkNSSFDuplicates(array, value) {
              var count = 0;
              array.forEach((v) => v.nssf_number === value && count++);
              return count;
            }
            function checkNHIFDuplicates(array, value) {
              var count = 0;
              array.forEach((v) => v.nhif_number === value && count++);
              return count;
            }
            if (newresult && typeof newresult === "object") {
              Object.keys(newresult).forEach(async (data) => {
                const selectedClient = JSON.parse(
                  localStorage.getItem("client")
                );
                console.log(
                  checkIdDuplicates(newresult, newresult[data].national_id)
                );

                if (
                  checkIdDuplicates(newresult, newresult[data].national_id) > 1
                ) {
                  /* vendors contains the element we're looking for */
                  console.log(newresult);
                  this.loading = false;
                  this.$message.error("some ID are duplicates");
                } else if (
                  checkKRADuplicates(newresult, newresult[data].kra_pin) > 1
                ) {
                  this.loading = false;
                  this.$message.error("some KRA PINs are duplicates");
                } else if (
                  checkNSSFDuplicates(newresult, newresult[data].nssf_number) >
                  1
                ) {
                  this.loading = false;
                  this.$message.error("some NSSF numbers are duplicates");
                } else if (
                  checkNHIFDuplicates(newresult, newresult[data].nhif_number) >
                  1
                ) {
                  this.loading = false;
                  this.$message.error("some NHIF numbers are duplicates");
                } else {
                  await fb.businessCollection
                    .doc(selectedClient.kra_pin)
                    .collection("team")
                    .doc(newresult[data].national_id)
                    .set(newresult[data])
                    .then(() => {
                      this.loading = false;
                      swal({
                        title: "Sucess!",
                        text: `record added successfully`,
                        icon: "success",
                      });
                    })
                    .catch((err) => {
                      swal({
                        title: "OOPS!",
                        text: `${err.message}`,
                        icon: "error",
                      });
                      this.loading = false;
                    });
                }
              });
            }
          },
          (error) => {
            /* handle an error */
            console.log(error);
            this.loading = false;
          }
        );
      } else {
        swal({
          title: "OOPS!",
          text: `please select a valid CSV file`,
          icon: "error",
        });
      }
    },
    forceFileDownload(response, title) {
      console.log("this is the tilte", title);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", title);
      document.body.appendChild(link);
      link.click();
    },

    downloadFile() {
      const data = this.sampleData;
      console.log(typeof data);
      const fileName = "sample employee data";
      const exportType = exportFromJSON.types.csv;

      if (data) exportFromJSON({ data, fileName, exportType });
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
    this.convertTableData();
  },
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
