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
          <a-input-group compact>
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
                :value="item.full_name"
              >
                {{ item.full_name }}
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
          </a-input-group>
        </a-col>
      </a-row>
    </template>
    <a-carousel arrows>
      <div
        slot="prevArrow"
        class="custom-slick-arrow"
        style="right: -30px; top: 0px"
      >
        <a-icon type="left-circle" />
      </div>
      <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
        <a-icon type="right-circle" />
      </div>
      <div class="salary-slip" v-for="employee in employees" :key="employee.id">
        <table class="empDetail">
          <tr height="100px" style="background-color: #c2d69b">
            <td colspan="4">
              <img height="90px" :src="currentClient.logo" />
            </td>
            <td colspan="4" class="companyName">
              {{ currentClient.company_name }}
            </td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{{ employee.full_name }}</td>
            <td></td>
            <th>Bank Code</th>
            <td>ABC123</td>
            <td></td>
            <th>Branch Name</th>
            <td>ABC123</td>
          </tr>
          <tr>
            <th>National ID</th>
            <td>{{ employee.national_id }}</td>
            <td></td>
            <th>Bank Name</th>
            <td>{{ employee.bank_name }}</td>
            <td></td>
            <th>Payslip no.</th>
            <td>XXXXXXXXXX</td>
          </tr>
          <tr>
            <th>KRA PIN</th>
            <td>{{ employee.kra_pin }}</td>
            <td></td>
            <th>Bank Branch</th>
            <td>{{ employee.bank_branch }}</td>
            <td></td>
            <th>Pay Period</th>
            <td>XXXXXXXXXXX</td>
          </tr>
          <tr>
            <th>Phone Number:</th>
            <td>{{ employee.phone_number }}</td>
            <td></td>
            <th>Bank A/C no.</th>
            <td>{{ employee.account_number }}</td>
            <td></td>
            <th>Personel Area</th>
            <td>XXXXXXXXXX</td>
          </tr>
          <tr>
            <th>Email:</th>
            <td>{{ employee.email }}</td>
            <td></td>
            <th>Employee Group</th>
            <td>Sales Manager</td>
            <td></td>
            <th>PAN No:</th>
            <td>MOP72182E</td>
          </tr>
          <tr class="myBackground">
            <th colspan="2">Payments</th>
            <th>Particular</th>
            <th class="table-border-right">Amount (Rs.)</th>
            <th colspan="2">Deductions</th>
            <th>Particular</th>
            <th>Amount (Rs.)</th>
          </tr>
          <tr>
            <th colspan="2">Basic Salary</th>
            <td></td>
            <td class="myAlign">4935.00</td>
            <th colspan="2">Provident Fund</th>
            <td></td>

            <td class="myAlign">00.00</td>
          </tr>
          <tr>
            <th colspan="2">Fixed Dearness Allowance</th>
            <td></td>

            <td class="myAlign">00.00</td>
            <th colspan="2">LIC</th>
            <td></td>

            <td class="myAlign">00.00</td>
          </tr>
          <tr>
            <th colspan="2">Variable Dearness Allowance</th>
            <td></td>

            <td class="myAlign">00.00</td>
            <th colspan="2">Loan</th>
            <td></td>

            <td class="myAlign">00.00</td>
          </tr>
          <tr>
            <th colspan="2">House Rent Allowance</th>
            <td></td>
            <td class="myAlign">00.00</td>
            <th colspan="2">Professional Tax</th>
            <td></td>
            <td class="myAlign">00.00</td>
          </tr>
          <tr>
            <th colspan="2">Graduation Allowance</th>
            <td></td>

            <td class="myAlign">00.00</td>
            <th colspan="2">Security Deposite(SD)</th>
            <td></td>

            <td class="myAlign">00.00</td>
          </tr>
          <tr>
            <th colspan="2">Conveyance Allowance</th>
            <td></td>
            <td class="myAlign">00.00</td>
            <th colspan="2">Staff Benefit(SB)</th>
            <td></td>
            <td class="myAlign">00.00</td>
          </tr>
          <tr>
            <th colspan="2">Post Allowance</th>
            <td></td>
            <td class="myAlign">00.00</td>
            <th colspan="2">Labour Welfare Fund</th>
            <td></td>
            <td class="myAlign">00.00</td>
          </tr>
          <tr>
            <th colspan="2">Special Allowance</th>
            <td></td>
            <td class="myAlign">00.00</td>
            <th colspan="2">NSC</th>
            <td></td>
            <td class="myAlign">00.00</td>
          </tr>
          <tr>
            <td colspan="4" class="table-border-right"></td>
            <th colspan="2">Union Thanco Officer(UTO)</th>
            <td></td>
            <td class="myAlign">00.00</td>
          </tr>
          <tr>
            <td colspan="4" class="table-border-right"></td>
            <th colspan="2">Advance</th>
            <td></td>
            <td class="myAlign">00.00</td>
          </tr>
          <tr>
            <td colspan="4" class="table-border-right"></td>
            <th colspan="2">Income Tax</th>
            <td></td>
            <td class="myAlign">00.00</td>
          </tr>
          <tr class="myBackground">
            <th colspan="3">Total Payments</th>
            <td class="myAlign">10000</td>
            <th colspan="3">Total Deductions</th>
            <td class="myAlign">1000</td>
          </tr>
          <tr height="40px">
            <th colspan="2">Projection for Financial Year:</th>
            <th></th>
            <td class="table-border-right"></td>
            <th colspan="2" class="table-border-bottom">Net Salary</th>
            <td></td>
            <td>XXXXXXXXXX</td>
          </tr>
          <tr>
            <td colspan="2">Gross Salary</td>
            <td></td>
            <td class="myAlign">00.00</td>
            <td colspan="4"></td>
          </tr>
          <tr>
            <td colspan="2">Aggr. Dedu - P.Tax & Std Ded</td>
            <td></td>
            <td class="myAlign">00.00</td>
            <th colspan="2">Cumulative</th>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td colspan="2">Gross Total Income</td>
            <td></td>
            <td class="myAlign">00.00</td>
            <td colspan="2">Empl PF Contribution</td>
            <td></td>
            <td class="myAlign">00.00</td>
          </tr>
          <tr>
            <td colspan="2">Aggr of Chapter "PF"</td>
            <td></td>
            <td class="myAlign">00.00</td>
            <td colspan="4"></td>
          </tr>
          <tr>
            <td colspan="2">Total Income</td>
            <td></td>
            <td class="myAlign">00.00</td>
            <td colspan="4"></td>
          </tr>
          <tbody class="border-center">
            <tr>
              <th>Attend/ Absence</th>
              <th>Days in Month</th>
              <th>Days Paid</th>
              <th>Days Not Paid</th>
              <th>Leave Position</th>
              <th>Privilege Leave</th>
              <th>Sick Leave</th>
              <th>Casual Leave</th>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>Yrly Open Balance</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
            </tr>
            <tr>
              <th>Current Month</th>
              <td>31.0</td>
              <td>31.0</td>
              <td>31.0</td>
              <td>Availed</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
            </tr>
            <tr>
              <td colspan="4"></td>
              <td>Closing Balance</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>0.0</td>
            </tr>
            <tr>
              <td colspan="4">&nbsp;</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td colspan="4"></td>
              <td>Company Pool Leave Balance</td>
              <td>1500</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="false"
        :paginate-elements-by-height="1400"
        :filename="selectedEmployees + '' + 'Payslip'"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="portrait"
        pdf-content-width="800px"
        @progress="onProgress($event)"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf"
      >
        <section slot="pdf-content">
          <!-- PDF Content Here -->
          <div class="salary-slip">
            <table class="empDetail">
              <tr height="100px" style="background-color: #c2d69b">
                <td colspan="4">
                  <img height="90px" :src="currentClient.logo" />
                </td>
                <td colspan="4" class="companyName">
                  {{ currentClient.company_name }}
                </td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{{ employeePayslip.full_name }}</td>
                <td></td>
                <th>Bank Code</th>
                <td>ABC123</td>
                <td></td>
                <th>Branch Name</th>
                <td>ABC123</td>
              </tr>
              <tr>
                <th>National ID</th>
                <td>{{ employeePayslip.national_id }}</td>
                <td></td>
                <th>Bank Name</th>
                <td>{{ employeePayslip.bank_name }}</td>
                <td></td>
                <th>Payslip no.</th>
                <td>XXXXXXXXXX</td>
              </tr>
              <tr>
                <th>KRA PIN</th>
                <td>{{ employeePayslip.kra_pin }}</td>
                <td></td>
                <th>Bank Branch</th>
                <td>{{ employeePayslip.bank_branch }}</td>
                <td></td>
                <th>Pay Period</th>
                <td>XXXXXXXXXXX</td>
              </tr>
              <tr>
                <th>Phone Number:</th>
                <td>{{ employeePayslip.phone_number }}</td>
                <td></td>
                <th>Bank A/C no.</th>
                <td>{{ employeePayslip.account_number }}</td>
                <td></td>
                <th>Personel Area</th>
                <td>XXXXXXXXXX</td>
              </tr>
              <tr>
                <th>Email:</th>
                <td>{{ employeePayslip.email }}</td>
                <td></td>
                <th>Employee Group</th>
                <td>Sales Manager</td>
                <td></td>
                <th>PAN No:</th>
                <td>MOP72182E</td>
              </tr>
              <tr class="myBackground">
                <th colspan="2">Payments</th>
                <th>Particular</th>
                <th class="table-border-right">Amount (Rs.)</th>
                <th colspan="2">Deductions</th>
                <th>Particular</th>
                <th>Amount (Rs.)</th>
              </tr>
              <tr>
                <th colspan="2">Basic Salary</th>
                <td></td>
                <td class="myAlign">4935.00</td>
                <th colspan="2">Provident Fund</th>
                <td></td>

                <td class="myAlign">00.00</td>
              </tr>
              <tr>
                <th colspan="2">Fixed Dearness Allowance</th>
                <td></td>

                <td class="myAlign">00.00</td>
                <th colspan="2">LIC</th>
                <td></td>

                <td class="myAlign">00.00</td>
              </tr>
              <tr>
                <th colspan="2">Variable Dearness Allowance</th>
                <td></td>

                <td class="myAlign">00.00</td>
                <th colspan="2">Loan</th>
                <td></td>

                <td class="myAlign">00.00</td>
              </tr>
              <tr>
                <th colspan="2">House Rent Allowance</th>
                <td></td>
                <td class="myAlign">00.00</td>
                <th colspan="2">Professional Tax</th>
                <td></td>
                <td class="myAlign">00.00</td>
              </tr>
              <tr>
                <th colspan="2">Graduation Allowance</th>
                <td></td>

                <td class="myAlign">00.00</td>
                <th colspan="2">Security Deposite(SD)</th>
                <td></td>

                <td class="myAlign">00.00</td>
              </tr>
              <tr>
                <th colspan="2">Conveyance Allowance</th>
                <td></td>
                <td class="myAlign">00.00</td>
                <th colspan="2">Staff Benefit(SB)</th>
                <td></td>
                <td class="myAlign">00.00</td>
              </tr>
              <tr>
                <th colspan="2">Post Allowance</th>
                <td></td>
                <td class="myAlign">00.00</td>
                <th colspan="2">Labour Welfare Fund</th>
                <td></td>
                <td class="myAlign">00.00</td>
              </tr>
              <tr>
                <th colspan="2">Special Allowance</th>
                <td></td>
                <td class="myAlign">00.00</td>
                <th colspan="2">NSC</th>
                <td></td>
                <td class="myAlign">00.00</td>
              </tr>
              <tr>
                <td colspan="4" class="table-border-right"></td>
                <th colspan="2">Union Thanco Officer(UTO)</th>
                <td></td>
                <td class="myAlign">00.00</td>
              </tr>
              <tr>
                <td colspan="4" class="table-border-right"></td>
                <th colspan="2">Advance</th>
                <td></td>
                <td class="myAlign">00.00</td>
              </tr>
              <tr>
                <td colspan="4" class="table-border-right"></td>
                <th colspan="2">Income Tax</th>
                <td></td>
                <td class="myAlign">00.00</td>
              </tr>
              <tr class="myBackground">
                <th colspan="3">Total Payments</th>
                <td class="myAlign">10000</td>
                <th colspan="3">Total Deductions</th>
                <td class="myAlign">1000</td>
              </tr>
              <tr height="40px">
                <th colspan="2">Projection for Financial Year:</th>
                <th></th>
                <td class="table-border-right"></td>
                <th colspan="2" class="table-border-bottom">Net Salary</th>
                <td></td>
                <td>XXXXXXXXXX</td>
              </tr>
              <tr>
                <td colspan="2">Gross Salary</td>
                <td></td>
                <td class="myAlign">00.00</td>
                <td colspan="4"></td>
              </tr>
              <tr>
                <td colspan="2">Aggr. Dedu - P.Tax & Std Ded</td>
                <td></td>
                <td class="myAlign">00.00</td>
                <th colspan="2">Cumulative</th>
                <td colspan="2"></td>
              </tr>
              <tr>
                <td colspan="2">Gross Total Income</td>
                <td></td>
                <td class="myAlign">00.00</td>
                <td colspan="2">Empl PF Contribution</td>
                <td></td>
                <td class="myAlign">00.00</td>
              </tr>
              <tr>
                <td colspan="2">Aggr of Chapter "PF"</td>
                <td></td>
                <td class="myAlign">00.00</td>
                <td colspan="4"></td>
              </tr>
              <tr>
                <td colspan="2">Total Income</td>
                <td></td>
                <td class="myAlign">00.00</td>
                <td colspan="4"></td>
              </tr>
              <tbody class="border-center">
                <tr>
                  <th>Attend/ Absence</th>
                  <th>Days in Month</th>
                  <th>Days Paid</th>
                  <th>Days Not Paid</th>
                  <th>Leave Position</th>
                  <th>Privilege Leave</th>
                  <th>Sick Leave</th>
                  <th>Casual Leave</th>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Yrly Open Balance</td>
                  <td>0.0</td>
                  <td>0.0</td>
                  <td>0.0</td>
                </tr>
                <tr>
                  <th>Current Month</th>
                  <td>31.0</td>
                  <td>31.0</td>
                  <td>31.0</td>
                  <td>Availed</td>
                  <td>0.0</td>
                  <td>0.0</td>
                  <td>0.0</td>
                </tr>
                <tr>
                  <td colspan="4"></td>
                  <td>Closing Balance</td>
                  <td>0.0</td>
                  <td>0.0</td>
                  <td>0.0</td>
                </tr>
                <tr>
                  <td colspan="4">&nbsp;</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td colspan="4"></td>
                  <td>Company Pool Leave Balance</td>
                  <td>1500</td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </vue-html2pdf>
      <div v-if="!employees.length">
        <a-result
          status="404"
          title="Payslips Preview"
          sub-title="Sorry, You haven't selected any employees"
        >
          <template #extra> </template>
        </a-result>
      </div>
    </a-carousel>
  </a-card>
</template>

<script>
import { mapState } from "vuex";
import VueHtml2pdf from "vue-html2pdf";

export default {
  components: {
    VueHtml2pdf,
  },
  data() {
    return {
      selectedEmployees: "",
      loading: false,
      employeePayslip: {},
    };
  },
  computed: {
    ...mapState(["calendars", "employees", "currentClient", "payrunEmployees"]),
    employees() {
      return this.$store.state.payrunEmployees;
    },
  },
  methods: {
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
      this.loading=false
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
    downloadSlips() {
      if (this.selectedEmployees.length) {
        this.employeePayslip = this.employees.find(
          (e) => e.full_name === this.selectedEmployees
        );
        console.log(this.employeePayslip);
        this.$refs.html2Pdf.generatePdf();
      } else {
        swal({
          title: "OOPS!",
          text: `No employees payslips selected`,
          icon: "error",
        });
      }
    },
  },
  mounted() {
    this.$store.dispatch("getCalendars");
    this.$store.dispatch("getEmployees");
    this.$store.dispatch("getCurrentClient");
  },
};
</script>

<style scoped>
.salary-slip {
  margin-top: 30px;
}
.empDetail {
  width: 99%;
  text-align: left;
  border: 2px solid black;
  border-collapse: collapse;
  table-layout: fixed;
  margin-left: 2px;
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
