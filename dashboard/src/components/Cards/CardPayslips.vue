<template>
  <a-card>
    <template #title>
      <a-row type="flex" align="middle">
        <a-col
          :span="24"
          :md="12"
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
          "
        >
          <!-- <a-input-group compact>
            <a-select
              placeholder="Select"
              :value="selectedEmployees"
              style="width: 70%"
              @change="handleChange"
            >
              <a-select-option value="all" disabled> All </a-select-option>
              <a-select-option
                v-for="item in employees"
                :key="item.full_name"
                :value="item.first_name"
              >
                {{ item.first_name }}{{ "" }}{{ item.last_name }}
              </a-select-option>
            </a-select>
            <a-button
              type="primary"
              @click="downloadSlips"
              id="otp-verfiy-button"
              icon="download"
              :loading="loading"
              >Download
            </a-button>
          </a-input-group> -->
        </a-col>
      </a-row>
    </template>
    <a-table
      :columns="columns"
      :data-source="data"
      bordered
      rowKey="id"
      :scroll="{ x: 2000 }"
    >
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span>
            <a
              @click="
                () => {
                  downloadSlips(record);
                }
              "
              >Download</a
            >
          </span>
        </div>
      </template>
      <template slot="emailslip" slot-scope="text, record">
        <div class="editable-row-operations">
          <span>
            <a
              @click="
                () => {
                  downloadSlips(record);
                }
              "
              >Email</a
            >
          </span>
        </div>
      </template>
    </a-table>
 
  </a-card>
</template>

<script>
import { mapState } from "vuex";
import VueHtml2pdf from "vue-html2pdf";
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
    title: "Basic Salary",
    className: "column-money",
    dataIndex: "basic_pay",
    sorter: (a, b) => a.basic_pay - b.basic_pay,
  },
  {
    title: "Total Allowances",
    dataIndex: "totalAllowances",
  },
  {
    title: "Total Deductions",
    dataIndex: "totalDeductions",
  },
  {
    title: "PAYE",
    dataIndex: "PAYE",
  },
  {
    title: "NSSF",
    dataIndex: "deductions.nssf",
  },
  {
    title: "NHIF",
    dataIndex: "NHIF",
  },
  {
    title: "Gross Pay",
    dataIndex: "grossPay",
  },
  {
    title: "Net Pay",
    dataIndex: "net_pay",
  },
  {
    title: "operation",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
  },
  {
    title: "Email Payslip",
    dataIndex: "emailslip",
    scopedSlots: { customRender: "emailslip" },
  },
];
export default {
  components: {
    VueHtml2pdf,
  },
  data() {
    return {
      selectedEmployees: "",
      loading: false,
      employeePayslip: {},
      data: [],
      taxable_income: 0,
      columns,
    };
  },
  computed: {
    ...mapState(["calendars", "currentClient", "payrunEmployees"]),
    employees() {
      return this.$store.state.payrunEmployees;
    },
  },
  methods: {
    viewPayslip(record) {
      console.log(record);
    },
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
      this.loading = false;
    },
    onProgress(e) {
      this.loading = false;
    },
    hasStartedGeneration() {
      this.loading = true;
      console.log("started here");
    },
    hasGenerated(e) {
      this.loading = false;
      console.log("done here");
    },
    handleChange(selectedItems) {
      this.selectedEmployees = selectedItems;
      console.log(selectedItems);
    },
    handleDepartmentChange(selectedItems) {
      this.selectedDepartments = selectedItems;
    },
    taxableIncomeAfterMortgage(mortgage, grosspay) {
      let income = 0;
      if (mortgage) {
        if (Number(mortgage) > 25000) {
          income = grosspay - 25000;
        } else {
          income = grosspay - Number(mortgage);
        }
      } else {
        income = grosspay;
      }

      return income;
    },
    taxableIncomeAfterPension(pension, grosspay) {
      let income = 0;
      let netPension = pension + 200;
      if (Number(netPension) > 20000) {
        income = grosspay - 20000;
      } else {
        income = grosspay - Number(netPension);
      }
      return income;
    },
    payeWithoutRelief(taxableIncome) {
      let paye = 0;
      let pay2 = 0;
      let pay2pro = 0;
      let pay3 = 0;
      console.log(taxableIncome);
      if (taxableIncome < 24000) {
        paye = 0;
        console.log("band o", paye);
      }
      if (taxableIncome >= 24000) {
        let phaseone = 0.1 * 24000;
        paye = phaseone;
        console.log("band 1", paye);
      }
      let tierone = taxableIncome - 24000;

      if (tierone <= 8333) {
        pay2 = 0.25 * tierone;
        console.log("band 2", tierone, pay2);
      } else {
        pay2pro = 0.25 * 8333;
        console.log("band 2 pro", pay2pro);
      }
      let tier3 = taxableIncome - 32333;
      if (taxableIncome > 32333) {
        pay3 = 0.3 * tier3;
        console.log("band 3", pay3);
      }
      return paye + pay2 + pay2pro + pay3;
    },
    calculateNhif(grossPay) {
      if (grossPay < 5999) {
        return 150;
      } else if (grossPay > 5999 && grossPay < 7999) {
        return 300;
      } else if (grossPay > 7999 && grossPay < 11999) {
        return 400;
      } else if (grossPay > 11999 && grossPay < 14999) {
        return 500;
      } else if (grossPay > 19999 && grossPay < 24999) {
        return 750;
      } else if (grossPay > 24999 && grossPay < 29999) {
        return 850;
      } else if (grossPay > 29999 && grossPay < 34999) {
        return 900;
      } else if (grossPay > 34999 && grossPay < 39999) {
        return 950;
      } else if (grossPay > 39999 && grossPay < 44999) {
        return 1000;
      } else if (grossPay > 44999 && grossPay < 49999) {
        return 1100;
      } else if (grossPay > 49999 && grossPay < 59999) {
        return 1200;
      } else if (grossPay > 59999 && grossPay < 69999) {
        return 1300;
      } else if (grossPay > 69999 && grossPay < 79999) {
        return 1400;
      } else if (grossPay > 79999 && grossPay < 89999) {
        return 1500;
      } else if (grossPay > 89999 && grossPay < 99999) {
        return 1600;
      } else {
        return 1700;
      }
    },
    // paye with reliefs
    payeWithRelief(employee, payee, nhif) {
      let lifeInsuranceRelief = 0;
      let nhifPremiums = 0.15 * nhif;
      let nhifRelief = 0;
      let insurancepremiums = 0.15 * employee.deductions.life_insurance;

      //get life insurance relief
      if (insurancepremiums > 5000) {
        lifeInsuranceRelief = 5000;
      } else {
        lifeInsuranceRelief = insurancepremiums;
      }
      //get nhif relief
      if (nhifPremiums > 5000) {
        nhifRelief = 500;
      } else {
        nhifRelief = nhifPremiums;
      }
      console.log(
        "paye",
        payee,
        "nhifrelief",
        nhifRelief,
        "life insurance relief",
        lifeInsuranceRelief
      );
      //calculate total relief
      let totalRelief = payee - (lifeInsuranceRelief + nhifRelief + 2400);
      return totalRelief;
    },
    downloadSlips(record) {
      if (record) {
        this.employeePayslip = record;
        this.$refs.html2Pdf.generatePdf();
      } else {
        swal({
          title: "OOPS!",
          text: `No employees payslips selected`,
          icon: "error",
        });
      }
    },
    convertTableData() {
      const selectedClient = JSON.parse(localStorage.getItem("client"));
      fb.businessCollection
        .doc(selectedClient.id)
        .collection("calendars")
        .doc(this.$route.params.id)
        .get()
        .then((docs) => {
          let emp = docs.data();
          emp.employees.forEach((e) => {
            // calculate total allowances
            const totalAllowances=0
            console.log(e)
          e.allowances.forEach((a)=>{
              totalAllowances+a.amount
              console.log("ehehhvhjcj")
          })
          console.log(totalAllowances)
            
            // calculate gross pay
            let grossPay = Number(e.basic_pay) + totalAllowances;
            //PAYE without relief
            //nhif
            // net pay
            let deductions = Object.values(e.deductions);
            const totalDeductions = deductions.reduce(
              (a, b) => Number(a) + Number(b),
              0
            );
            // net pay
            let NHIF = this.calculateNhif(grossPay);
            let PAYEs = this.payeWithRelief(
              e,
              this.payeWithoutRelief(
                this.taxableIncomeAfterPension(
                  e.deductions.pension,
                  this.taxableIncomeAfterMortgage(
                    e.deductions.mortgage,
                    grossPay
                  )
                )
              ),
              this.calculateNhif(grossPay)
            );
            console.log(
              "did not find x",
              NHIF,
              totalAllowances,
              totalDeductions,
              PAYEs
            );
            let PAYE = Math.round((PAYEs + Number.EPSILON) * 100) / 100;
            let net_pay =
              Number(e.basic_pay) +
              totalAllowances -
              (totalDeductions + PAYE + this.calculateNhif(grossPay));

            let new_employee = {
              ...e,
              net_pay,
              PAYE,
              NHIF,
              totalAllowances,
              totalDeductions,
              grossPay,
            };

            this.employeePayslip = new_employee;

            this.data.push(new_employee);
          });
        });
    },
  },
  mounted() {
    this.$store.dispatch("getCalendars");
    this.$store.dispatch("getEmployees");
    this.$store.dispatch("getCurrentClient");
    this.$store.dispatch("getPayrunEmployees", this.$route.params.id);
    this.convertTableData();
  },
};
</script>

<style scoped>
.salary-slip {
  margin-top: 30px;
  align-content: center;
}
.salary-slip-pdf {
  margin-top: 0px;
  align-content: center;
}
.empDetail-pdf {
  width: 100%;
  text-align: left;
  border: 2px solid black;
  border-collapse: collapse;
  table-layout: fixed;
}

.empDetail {
  width: 70%;
  text-align: left;
  border: 2px solid black;
  border-collapse: collapse;
  table-layout: fixed;
  margin-left: 50px;
}

.head {
  margin: 10px;
  margin-bottom: 50px;
  width: 100%;
}

.companyName {
  text-align: right;
  font-size: 25px;
  font-weight: bold;
}

.salaryMonth {
  text-align: center;
}

.table-border-bottom {
  border-bottom: 1px solid;
}

.table-border-right {
  border-right: 1px solid;
}

.myBackground {
  padding-top: 10px;
  text-align: left;
  border: 1px solid black;
  height: 40px;
}

.myAlign {
  text-align: center;
  border-right: 1px solid black;
}

.myTotalBackground {
  padding-top: 10px;
  text-align: left;
  background-color: #ebf1de;
  border-spacing: 0px;
}

.align-4 {
  width: 25%;
  float: left;
}

.tail {
  margin-top: 35px;
}

.align-2 {
  margin-top: 25px;
  width: 50%;
  float: left;
}

.border-center {
  text-align: center;
}
.border-center th,
.border-center td {
  border: 1px solid black;
}

th,
td {
  padding-left: 6px;
}

.ant-carousel >>> .slick-slide {
  text-align: center;
  background: #fff;
}

.ant-carousel >>> .custom-slick-arrow {
  width: 40px;
  height: 40px;
  font-size: 40px;
  color: #364d79;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
  top: 0px;
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}

.ant-carousel >>> .slick-slide h3 {
  color: #364d79;
}
</style>
