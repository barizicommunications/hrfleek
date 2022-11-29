<template>
  <a-card>
    <a-drawer
      title="Payslip Breakdown"
      :width="720"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="handleCancel"
    >
      <a-card
        :bordered="false"
        class="header-solid h-full"
        :bodyStyle="{ padding: 1 }"
      >
        <div class="salary-slip-pdf">
          <div clas="p-3">
            <p class="companyName mt-5">
              {{ currentClient.company_name }}
            </p>
          </div>
          <div class="p-4 my-4">
            <p class="my-5" style="background-color: aliceblue">
              {{ new Date().toDateString() }}
            </p>
            <p>Payslip NO: <span>XXXXXXXXXXX</span></p>
          </div>
          <div class="p-5 my-5">
            <p class="my-5" style="background-color: aliceblue">
              Name:{{ selectUser.first_name }} <span class="ml-4"></span
              >{{ selectUser.last_name }}
            </p>
            <p class="my-5">National ID:{{ selectUser.national_id }}</p>
            <p class="my-5 py-4" style="background-color: aliceblue">
              KRA PIN:{{ selectUser.kra_pin }}
            </p>
            <p class="my-5">Phone Number: {{ selectUser.phone_number }}</p>
            <p class="my-5 py-4" style="background-color: aliceblue">
              Email:{{ selectUser.email }}
            </p>
          </div>
          <div
            class="p-5 my-5"
            style="border: 2px solid black; margin-top: 10px"
          >
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: aliceblue;
              "
              class="my-5 p-3"
            >
              <p class="slip-title">EARNINGS</p>
              <p class="slip-title">AMOUNT</p>
            </div>
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
              "
              class="my-5"
            >
              <p class="slip-title">BASIC PAY</p>
              <P>{{ selectUser.basic_pay }}</P>
            </div>
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
              "
              class="my-5"
              v-for="allowance of selectUser.allowances"
              :key="allowance.name"
            >
              <p class="slip-title">{{ allowance.name }}</p>
              <p>{{ allowance.amount }}</p>
            </div>
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
              "
              class="my-5"
            >
              <p class="slip-title">TOTAL ALLOWANCES</p>
              <P>{{ selectUser.totalAllowances }}</P>
            </div>
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
              "
              class="my-5"
            >
              <p class="slip-title">GROSS PAY</p>
              <P>{{ selectUser.grossPay }}</P>
            </div>
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: aliceblue;
              "
              class="my-5"
            >
              <p class="slip-title">DEDUCTIONS</p>
              <p class="slip-title">AMOUNT</p>
            </div>
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
              "
              class="my-5"
            >
              <p class="slip-title">PAYE</p>
              <p>{{ selectUser.PAYE }}</p>
            </div>
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
              "
              class="my-5"
            >
              <p class="slip-title">NHIF</p>
              <p>{{ selectUser.NHIF }}</p>
            </div>
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
              "
              class="my-5"
            >
              <p class="slip-title">NSSF</p>
              <p>{{ selectUser.nssf }}</p>
            </div>
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
              "
              class="my-5"
              v-for="deduction of selectUser.deductions"
              :key="deduction.name"
            >
              <p class="slip-title">{{ deduction.name }}</p>
              <p>{{ deduction.amount }}</p>
            </div>
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
              "
              class="my-5"
            >
              <p class="slip-title">TOTAL DEDUCTIONS</p>
              <P>{{ selectUser.totalDeductions }}</P>
            </div>
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: aliceblue;
              "
              class="my-5"
            >
              <p class="slip-title">NET SALARY</p>
              <P>{{ selectUser.net_pay }}</P>
            </div>
          </div>
        </div>
      </a-card>
    </a-drawer>
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
      <template slot="breakdown" slot-scope="text, record">
        <div class="editable-row-operations">
          <span>
            <a
              @click="
                () => {
                  viewBreakDown(record);
                }
              "
              >View Break Down</a
            >
          </span>
        </div>
      </template>
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
        <div>
          <vue-html2pdf
            :show-layout="false"
            :float-layout="true"
            :enable-download="true"
            :preview-modal="true"
            :paginate-elements-by-height="2900"
            :filename="record.first_name + '' + 'Payslip'"
            :pdf-quality="2"
            :manual-pagination="true"
            pdf-format="a5"
            pdf-orientation="portrait"
            pdf-content-width="100%"
            @progress="onProgress($event)"
            @hasStartedGeneration="hasStartedGeneration()"
            @hasGenerated="hasGenerated($event)"
            ref="html2Pdf"
          >
            <section slot="pdf-content">
              <!-- PDF Content Here -->
              <a-card
                :bordered="false"
                class="header-solid h-full"
                :bodyStyle="{ padding: 1 }"
              >
                <div class="salary-slip-pdf">
                  <div clas="p-3">
                    <p class="companyName mt-5">
                      {{ currentClient.company_name }}
                    </p>
                  </div>
                  <div class="p-4 my-4">
                    <p class="my-5" style="background-color: aliceblue">
                      {{ new Date().toDateString() }}
                    </p>
                    <p>Payslip NO: <span>XXXXXXXXXXX</span></p>
                  </div>
                  <div class="p-5 my-5">
                    <p class="my-5" style="background-color: aliceblue">
                      Name:{{ record.first_name }} <span class="ml-4"></span
                      >{{ record.last_name }}
                    </p>
                    <p class="my-5">National ID:{{ record.national_id }}</p>
                    <p class="my-5 py-4" style="background-color: aliceblue">
                      KRA PIN:{{ record.kra_pin }}
                    </p>
                    <p class="my-5">Phone Number: {{ record.phone_number }}</p>
                    <p class="my-5 py-4" style="background-color: aliceblue">
                      Email:{{ record.email }}
                    </p>
                  </div>
                  <div
                    class="p-5 my-5"
                    style="border: 2px solid black; margin-top: 10px"
                  >
                    <div
                      style="
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        background-color: aliceblue;
                      "
                      class="my-5 p-3"
                    >
                      <p class="slip-title">EARNINGS</p>
                      <p class="slip-title">AMOUNT</p>
                    </div>
                    <div
                      style="
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                      "
                      class="my-5"
                    >
                      <p class="slip-title">BASIC PAY</p>
                      <P>{{ record.basic_pay }}</P>
                    </div>
                    <div
                      style="
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                      "
                      class="my-5"
                      v-for="allowance of record.allowances"
                      :key="allowance.name"
                    >
                      <p class="slip-title">{{ allowance.name }}</p>
                      <p>{{ allowance.amount }}</p>
                    </div>
                    <div
                      style="
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                      "
                      class="my-5"
                    >
                      <p class="slip-title">TOTAL ALLOWANCES</p>
                      <P>{{ record.totalAllowances }}</P>
                    </div>
                    <div
                      style="
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                      "
                      class="my-5"
                    >
                      <p class="slip-title">GROSS PAY</p>
                      <P>{{ record.grossPay }}</P>
                    </div>
                    <div
                      style="
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        background-color: aliceblue;
                      "
                      class="my-5"
                    >
                      <p class="slip-title">DEDUCTIONS</p>
                      <p class="slip-title">AMOUNT</p>
                    </div>
                    <div
                      style="
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                      "
                      class="my-5"
                    >
                      <p class="slip-title">PAYE</p>
                      <p>{{ record.PAYE }}</p>
                    </div>
                    <div
                      style="
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                      "
                      class="my-5"
                    >
                      <p class="slip-title">NHIF</p>
                      <p>{{ record.NHIF }}</p>
                    </div>
                    <div
                      style="
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                      "
                      class="my-5"
                    >
                      <p class="slip-title">NSSF</p>
                      <p>{{ record.nssf }}</p>
                    </div>
                    <div
                      style="
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                      "
                      class="my-5"
                      v-for="deduction of record.deductions"
                      :key="deduction.name"
                    >
                      <p class="slip-title">{{ deduction.name }}</p>
                      <p>{{ deduction.amount }}</p>
                    </div>
                    <div
                      style="
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                      "
                      class="my-5"
                    >
                      <p class="slip-title">TOTAL DEDUCTIONS</p>
                      <P>{{ record.totalDeductions }}</P>
                    </div>
                    <div
                      style="
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        background-color: aliceblue;
                      "
                      class="my-5"
                    >
                      <p class="slip-title">NET SALARY</p>
                      <P>{{ record.net_pay }}</P>
                    </div>
                  </div>
                </div>
              </a-card>
            </section>
          </vue-html2pdf>
        </div>
        <div class="editable-row-operations">
          <span>
            <a
              @click="
                () => {
                  sendMail(record);
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
    dataIndex: "nssf",
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
    title: "Break Down",
    scopedSlots: { customRender: "breakdown" },
  },
  {
    title: "Payslips",
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
      record: {},
      data: [],
      taxable_income: 0,
      columns,
      selectUser: {},
      visible: false,
      currentUser:fb.auth.currentUser
    };
  },
  computed: {
    ...mapState(["calendars", "currentClient", "payrunEmployees"]),
    employees() {
      return this.$store.state.payrunEmployees;
    },
  },
  methods: {
    viewBreakDown(record) {
      this.selectUser = record;
      this.visible = true;
      console.log(this.currentUser)
    },
    handleCancel() {
      this.visible = false;
    },
    sendMail(record) {
      console.log(this.$refs.html2Pdf);
    },
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
      if (pension) {
        if (Number(pension) + 200 > 20000) {
          income = grosspay - 20000;
        } else {
          income = grosspay - (Number(pension) + 200);
        }
      } else {
        income = grosspay;
      }

      return income;
    },
    payeWithoutRelief(taxableIncome) {
      let paye = 0;
      let pay2 = 0;
      let pay2pro = 0;
      let pay3 = 0;
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
      let life = employee.deductions.life_insurance ?? 0;
      console.log("life", life);
      let insurancepremiums = 0.15 * life;

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
        this.record = record;
        this.$refs.html2Pdf.generatePdf();
      } else {
        swal({
          title: "OOPS!",
          text: `No employees payslips selected`,
          icon: "error",
        });
      }
    },
    totalAllowances(array) {
      let sum = 0;
      for (let i = 0; i < array.length; i++) {
        sum += Number(array[i].amount);
      }
      return sum;
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
            const totalAllowances = this.totalAllowances(e.allowances);
            // calculate gross pay
            let grossPay = Number(e.basic_pay) + totalAllowances;
            //PAYE without relief
            //nhif
            // net pay
            const totalDeductions = this.totalAllowances(e.deductions);
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
              nssf: 200,
            };

            this.record = new_employee;

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
.slip-title {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 28px;
  text-align: center;
  text-transform: uppercase;

  color: #000000;
}
.payslip-outline {
  width: 100%;
  height: 100%;
  padding: 10px;
}

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
