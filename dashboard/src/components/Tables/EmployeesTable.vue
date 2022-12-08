<template>
  <a-card>
    <a-drawer
      title="Add a new Employee"
      :width="720"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="handleCancel"
    >
      <create-employee :client="client"></create-employee>
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
        <a-button :style="{ marginRight: '8px' }" @click="handleCancel">
          Cancel
        </a-button>
      </div>
    </a-drawer>
    <a-modal v-model="modal" title="Bulk Imports">
      <template slot="footer">
        <a-button key="back" @click="handleCancel"> Cancel </a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
          @click="parseFile"
        >
          Upload
        </a-button>
      </template>
      <div class="table-upload-btn">
        <a-button type="dashed" block @click.prevent="exportExcel">
          <a-icon type="download" />
          Download Sample CSV
        </a-button>
      </div>
      <a-input type="file" accept=".csv" @change="handleUpload($event)" />
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
            <a-button type="primary" @click="visible = true">
              Add New Employee
            </a-button>
          </a-radio-group>
          <a-radio-group size="small" class="mx-5">
            <a-button @click="exportData">Export Employee Data</a-button>
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
              >Quick Edit</a
            >
          </span>
        </div>
      </template>
      <template slot="view" slot-scope="text, record, index">
        <div class="editable-row-operations">
          <span>
            <a
              @click="
                () => {
                  viewEmployee(record);
                }
              "
              >View</a
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
import { mapState } from "vuex";
import exportFromJSON from "export-from-json";
import * as fb from "../../firebase";
import swal from "sweetalert";
import Papa from "papaparse";
import CreateEmployee from "../../views/CreateEmployee.vue";
import router from "../../router";
import * as ExcelJS from "exceljs";
import { debugPort } from "process";
const data = [];

export default {
  components: { CreateEmployee },
  props: ["client"],
  data() {
    this.cacheData = data.map((item) => ({ ...item }));
    return {
      data,
      departmentFilters: [],
      columns: [
        {
          title: "First Name",
          dataIndex: "first_name",
          scopedSlots: { customRender: "first_name" },
          fixed: "left",
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
          filters: [],
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
        {
          title: "View",
          dataIndex: "view",
          scopedSlots: { customRender: "view" },
          fixed: "right",
        },
      ],
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
          kra_pin: "A2030400504L",
          nhif_number: "1926990",
          nssf_number: "500604",
          bank_name: "Equity Bank",
          account_name: "Warren Ochieng",
          account_number: "49999030009",
          bank_branch: "Kenyatta Avenue",
          basic_pay: "1000000",
          Status: "active",
          date_of_appointment: "",
          contract_type: "",
          date_of_birth: "",
          employee_id: "",
        },
      ],
      jsondata: [
        {
          user: "1",
          name: "warren ochieng",
          phone: "+254705122230",
          gender: "male",
        },
        {
          user: "2",
          name: "Hardy Kathurima",
          phone: "+254705122230",
          gender: "male",
        },
        {
          user: "3",
          name: "warren ochieng",
          phone: "+254705122230",
          gender: "male",
        },
      ],
      parsed: false,
      content: [],
      file: "",
      departments:[]
    };
  },
  methods: {
    exportExcel() {
      var data = [
        { id: 1, name: "Agus",lastname:'Ochieng', dob: "1997-02-01", grade: "A", genders: "male" },
      ];

      // Important part is key and header
      var header = [
        { key: "id", header: "ID", width: 20 },
        {
          header: "First Name",
          key: "first_name",
          width: 30,
        },
        {
          header: "Last Name",
          key: "last_name",
          width: 30,
        },
        {
          header: "Gender",
          key: "gender",
          width: 30,
        },
        {
          header: "Email",
          key: "email",
          width: 30,
        },
        {
          header: "Phone Number",
          key: "phone_number",
          width: 30,
        },
        {
          header: "KRA PIN",
          key: "kra_pin",
          width: 30,
        },
        {
          header: "Department",
          key: "department",
          width: 30,
        },
        {
          header: "Designation",
          key: "designation",
          width: 30,
        },
        {
          header: "NHIF Number",
          key: "nhif_number",
          width: 30,
        },
        {
          header: "NSSF Number",
          key: "nssf_number",
          width: 30,
        },
        {
          header: "Basic Salary",
          key: "basic_pay",
          width: 30,
        },
        {
          header: "Bank Name",
          key: "bank_name",
          width: 30,
        },
        {
          header: "Account Number",
          key: "account_number",
          width: 30,
        },
        {
          header: "Bank Branch",
          key: "bank_branch",
          width: 30,
        },

      ];
      this.exportToExcel(header, data, "Employee Data");
    },
    async exportToExcel(header, data, filename) {
      const options = {
        filename: filename + ".xlsx",
      };

      //Init Workbook
      const workbook = new ExcelJS.Workbook(options);
      const worksheet = workbook.addWorksheet(filename);

      worksheet.columns = header;

      //Setting font size and bold for header
      worksheet.getRow(1).font = {
        bold: true,
      };

      //Insert data row to excel the data key will follow header key
      for (let index = 0; index < data.length; index++) {
        worksheet.addRow(data[index]);
      }

      worksheet
        .getColumn("D")
        .eachCell({ includeEmpty: true }, function (cell, rowNumber) {
          cell.dataValidation = {
            type: "list",
            allowBlank: false,
            formulae: ['"male,female,other"'],
          };
        });
        let dept=['"finances,admin"']
      worksheet
        .getColumn("H")
        .eachCell({ includeEmpty: true }, function (cell, rowNumber) {
          cell.dataValidation = {
            type: "list",
            allowBlank: true,
            formulae: dept,
          };
        });

      //Export Excel to Base64
      const base64 = Buffer.from(await workbook.xlsx.writeBuffer()).toString(
        "base64"
      );

      // Download File
      const a = document.createElement("a");
      a.href = "data:application/xlsx;base64," + base64;
      a.download = `${filename}.xlsx`; // File name Here
      a.click();
    },
    exportAsExcel() {
      const format = "xlsx";
      const exportSelectedOnly = false;
      const filename = "sample data";
      this.$refs.grid.exportTable(format, exportSelectedOnly, filename);
    },
    viewEmployee(record) {
      router.push(`/employee/${record.id}`);
    },
    async handleUpload(e) {
      e.preventDefault();
      this.file = event.target.files[0];
    },
    parseFile() {
      this.loading = true;
      Papa.parse(this.file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          this.content = results;
          this.parsed = true;
          this.uploadtoFirebase(results.data);
        }.bind(this),
      });
    },
    uploadtoFirebase(data) {
      if (data.length) {
        // for (let i = 0; i < data.length; +i++) {
        //   fb.banksCollection.add(data[i])
        // }
        console.log(data)
      } else {
        this.loading = false;
        this.$message.error("no data to upload");
      }
    },
    handleFileChange(info) {
      let fileList = [...info.fileList];
      // 1. Limit the number of uploaded files
      fileList = fileList.slice(-1);
      this.fileList = fileList;
    },
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
        this.$store.dispatch("updateEmployeeData", newData);
        console.log(this.employees);
      }
    },
    handleCancel() {
      this.modal = false;
      this.visible = false;
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
    handleUploads(e) {
      e.preventDefault();
      if (this.fileList.length) {
        this.loading = true;
        let promise = new Promise((resolve, reject) => {
          var reader = new FileReader();
          var vm = this;
          reader.onload = (e) => {
            resolve((vm.fileinput = reader.result));
          };
          console.log(this.fileList[0]);
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
                  console.log(newresult[data]);
                  // data = {
                  //   national_id: newresult[data].national_id,
                  //   first_name: newresult[data].first_name,
                  //   last_name: newresult[data].last_name,
                  //   Gender: newresult[data].Gender,
                  //   email: newresult[data].email,
                  //   phone_number: newresult[data].phone_number,
                  //   address: newresult[data].address,
                  //   Country: newresult[data].Country,
                  //   department: newresult[data].department,
                  //   designation: newresult[data].designation,
                  //   employment_type: newresult[data].employment_type,
                  //   kra_pin: newresult[data].kra_pin,
                  //   nhif_number: newresult[data].nhif_number,
                  //   nssf_number: newresult[data].nssf_number,
                  //   bank_name: newresult[data].bank_name,
                  //   account_name: newresult[data].account_name,
                  //   account_number: newresult[data].account_number,
                  //   bank_branch: newresult[data].bank_branch,
                  //   basic_pay: newresult[data].basic_pay,
                  //   Status: newresult[data].Status,
                  //   date_of_appointment: "",
                  //   contract_type: "",
                  //   date_of_birth:newresult[data].date_of_birth,
                  //   allowances: {
                  //     house_allowance: newresult[data].house_allowance,
                  //     transportAllowance: newresult[data].transportAllowance,
                  //     telephoneAllowance: newresult[data].telephoneAllowance,
                  //     hardshipAllowance: newresult[data].hardshipAllowance,
                  //     transferAllowance: newresult[data].transferAllowance,
                  //     riskAllowance: newresult[data].riskAllowance,
                  //     carAllowance: newresult[data].carAllowance,
                  //     fuelAllowance: newresult[data].fuelAllowance,
                  //     house_allowance: newresult[data].house_allowance,
                  //     entertainmentAllowance:
                  //       newresult[data].entertainmentAllowance,
                  //   },
                  //   deductions: {
                  //     salary_advance: newresult[data].salary_advance,
                  //     helb: newresult[data].helb,
                  //     pension: newresult[data].pension,
                  //     sacco: newresult[data].sacco,
                  //     life_insurance: newresult[data].life_insurance
                  //   },
                  // };

                  // await fb.businessCollection
                  //   .doc(selectedClient.kra_pin)
                  //   .collection("team")
                  //   .doc(data.national_id)
                  //   .set(data)
                  //   .then(() => {
                  //     this.loading = false;
                  //     this.$store.dispatch("getEmployees");
                  //     this.$store.dispatch("getCurrentClient");
                  //     this.convertTableData();
                  //     swal({
                  //       title: "Sucess!",
                  //       text: `record added successfully`,
                  //       icon: "success",
                  //     });
                  //   })
                  //   .catch((err) => {
                  //     swal({
                  //       title: "OOPS!",
                  //       text: `${err.message}`,
                  //       icon: "error",
                  //     });
                  //     this.loading = false;
                  //   });
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
    exportData() {
      const data = this.employees;
      console.log(typeof data);
      const fileName = "employee data";
      const exportType = exportFromJSON.types.csv;

      if (data) exportFromJSON({ data, fileName, exportType });
    },
    filterDepartments() {
      this.currentClient.departments.forEach((d) => {
        let newFitler = { text: d.department_name, value: d.department_name };
        this.columns[6].filters.push(newFitler);
      });
      console.log(this.columns[6].filters);
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
    departmenti(){
      let depo=[]
        for (let i = 0; i < this.client.departments.length; i++) {
        depo.push(this.client.departments[i].department_name);
      }
      return depo

      }
  },
  created() {
    this.$store.dispatch("getEmployees");
    this.$store.dispatch("getCurrentClient");
  },
  mounted() {
    this.$store.dispatch("getEmployees");
    this.$store.dispatch("getCurrentClient");
    this.convertTableData();
    this.filterDepartments();

  },
  updated() {},
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
