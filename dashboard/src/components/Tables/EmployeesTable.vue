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
          style="width: 100%"
        >
          <a-button block type="primary">
            <a-icon type="upload" /> Select CSV File
          </a-button>
        </a-upload>
      </div>
      <div class="table-upload-btn">
        <a-button type="dashed" block @click.prevent="downloadFile">
          <a-icon type="download" />
          Download Sample CSV
        </a-button>
      </div>
    </a-modal>
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
          kra_pin: "A2030400504J",
          nhif_number: "1923990",
          nssf_number: "520604",
          bank_name: "Equity Bank",
          account_name: "Warren Ochieng",
          account_number: "49999030009",
          bank_branch: "Kenyatta Avenue",
          basic_pay: "1000000",
          Status: "active",
          advance_salary: 0,
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
          national_id: "35276728",
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
          kra_pin: "A2030400504K",
          nhif_number: "19753990",
          nssf_number: "5006043",
          bank_name: "Equity Bank",
          account_name: "Warren Ochieng",
          account_number: "49999030009",
          bank_branch: "Kenyatta Avenue",
          basic_pay: "1000000",
          Status: "active",
          advance_salary: 0,
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
          nhif_number: "1926990",
          nssf_number: "500604",
          bank_name: "Equity Bank",
          account_name: "Warren Ochieng",
          account_number: "49999030009",
          bank_branch: "Kenyatta Avenue",
          basic_pay: "1000000",
          Status: "active",
          advance_salary: 0,
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
    edit(key) {
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
      const newData = [...this.employees];
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
      const selectedClient = JSON.parse(localStorage.getItem("client"));
      fb.businessCollection
        .doc(selectedClient.kra_pin)
        .collection("team")
        .onSnapshot((snapshot) => {
          const loadedEmployers = [];
          snapshot.forEach((doc) => {
            const loadedEmployer = doc.data();
            (loadedEmployer.id = doc.id), loadedEmployers.push(loadedEmployer);
          });
          loadedEmployers.forEach((object) => {
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
        });
      this.data = picked;
    },
    handleChange(value, key, column) {
      const newData = [...this.employees];
      const target = newData.find((item) => key === item.id);
      if (target) {
        target[column] = value;
        this.$store.dispatch("updateEmployeeData",newData);
        console.log(this.employees)
      }
    },
    handleCancel() {
      this.modal = false;
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
                  data = {
                    national_id: newresult[data].national_id,
                    first_name: newresult[data].first_name,
                    last_name: newresult[data].last_name,
                    Gender: newresult[data].Gender,
                    email: newresult[data].email,
                    phone_number: newresult[data].phone_number,
                    address: newresult[data].address,
                    Country: newresult[data].Country,
                    department: newresult[data].department,
                    designation: newresult[data].designation,
                    employment_type: newresult[data].employment_type,
                    kra_pin: newresult[data].kra_pin,
                    nhif_number: newresult[data].nhif_number,
                    nssf_number: newresult[data].nssf_number,
                    bank_name: newresult[data].bank_name,
                    account_name: newresult[data].account_name,
                    account_number: newresult[data].account_number,
                    bank_branch: newresult[data].bank_branch,
                    basic_pay: newresult[data].basic_pay,
                    Status: newresult[data].Status,
                    allowances: {
                      HouseAllowance: newresult[data].HouseAllowance,
                      transportAllowance: newresult[data].transportAllowance,
                      telephoneAllowance: newresult[data].telephoneAllowance,
                      hardshipAllowance: newresult[data].hardshipAllowance,
                      transferAllowance: newresult[data].transferAllowance,
                      riskAllowance: newresult[data].riskAllowance,
                      carAllowance: newresult[data].carAllowance,
                      fuelAllowance: newresult[data].fuelAllowance,
                      leave: newresult[data].leave,
                      entertainmentAllowance:
                        newresult[data].entertainmentAllowance,
                      mealAllowance: newresult[data].mealAllowance,
                    },
                    deductions: {
                      advance_salary: newresult[data].advance_salary,
                      nssf: newresult[data].nssf,
                      nhif: newresult[data].nhif,
                      paye: newresult[data].paye,
                      helb: newresult[data].helb,
                      pension: newresult[data].pension,
                      sacco: newresult[data].sacco,
                    },
                  };

                  await fb.businessCollection
                    .doc(selectedClient.kra_pin)
                    .collection("team")
                    .doc(data.national_id)
                    .set(data)
                    .then(() => {
                      this.loading = false;
                      this.$store.dispatch("getEmployees");
                      this.$store.dispatch("getCurrentClient");
                      this.convertTableData();
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
  created(){
    this.$store.dispatch("getEmployees");
    this.$store.dispatch("getCurrentClient");
  },
  mounted() {
    console.log("mounted");
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
