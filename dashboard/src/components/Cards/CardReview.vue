<!-- 
	This is the user profile page, it uses the dashboard layout in: 
	"./l
  components: { ReviewSettings },ayouts/Dashboard.vue" .
 -->

<template>
  <div>
    <!-- User Profile Card -->

    <a-row type="flex" :gutter="24">
      <!-- Platform Settings Column -->

      <a-col :span="24" :md="8" class="mb-24">
        <a-card hoverable>
          <img
            slot="cover"
            alt="example"
            src="../../../public/images/kra.png"
            style="height: 200px; object-fit: contain"
          />
          <a-card-meta title="PAYE REPORT">
            <template slot="description">
              <a-button
                class="mx-5"
                @click="
                  () => {
                    changeReport('paye');
                  }
                "
                >View</a-button
              >
              <a-button type="primary" icon="download">Download</a-button>
            </template>
          </a-card-meta></a-card
        >
      </a-col>
      <!-- / Conversations Column -->
      <a-col :span="24" :md="8" class="mb-24">
        <a-card hoverable>
          <img
            slot="cover"
            alt="example"
            src="../../../public/images/nssf.jpg"
            style="height: 200px; object-fit: contain"
          />
          <a-card-meta title="NSSF REPORT">
            <template slot="description">
              <a-button
                class="mx-5"
                @click="
                  () => {
                    changeReport('nssf');
                  }
                "
                >View</a-button
              >
              <a-button type="primary" icon="download" @click="downloadNssfCsv">Download</a-button>
            </template>
          </a-card-meta></a-card
        >
      </a-col>
      <a-col :span="24" :md="8" class="mb-24">
        <a-card hoverable>
          <img
            slot="cover"
            alt="example"
            src="../../../public/images/nhif.jpg"
            style="height: 200px; object-fit: contain"
          />
          <a-card-meta title="NHIF REPORT">
            <template slot="description">
              <a-button
                class="mx-5"
                @click="
                  () => {
                    changeReport('nhif');
                  }
                "
                >View</a-button
              >
              <a-button type="primary" icon="download" @click="downloadNhifCsv"
                >Download</a-button
              ></template
            >
          </a-card-meta></a-card
        >
      </a-col>
    </a-row>

    <a-table
      :columns="nssfcolumns"
      :data-source="data"
      bordered
      rowKey="id"
      :scroll="{ x: 2000 }"
      v-if="report == 'nssf'"
    >
    </a-table>
    <a-table
      :columns="nhifcolumns"
      :data-source="data"
      bordered
      rowKey="id"
      :scroll="{ x: 2000 }"
      v-if="report == 'nhif'"
    >
    </a-table>
  </div>
</template>

<script>
import CardPlatformSettings from "../../components/Cards/CardPlatformSettings.vue";
import CardProfileInformation from "../../components/Cards/CardProfileInformation";
import CardPlatformUpdates from "../../components/Cards/CardPlatformUpdates";
import CardProject from "../../components/Cards/CardProject";
import { mapState } from "vuex";
import ReviewSettings from "./ReviewSettings.vue";
import VueHtml2pdf from "vue-html2pdf";
import * as fb from "../../firebase";
import swal from "sweetalert";
import exportFromJSON from "export-from-json";

const nssfcolumns = [
  {
    title: "SIRNAME",
    dataIndex: "first_name",
    scopedSlots: { customRender: "first_name" },
  },
  {
    title: "OTHER NAMES",
    dataIndex: "last_name",
    scopedSlots: { customRender: "last_name" },
  },
  {
    title: "ID NUMBER",
    className: "national_id",
    dataIndex: "national_id",
  },
  {
    title: "KRA PIN",
    dataIndex: "kra_pin",
  },
  {
    title: "NSSF NO",
    dataIndex: "nssf_number",
  },
  {
    title: "GROSS PAY",
    dataIndex: "grossPay",
  },
  {
    title: "voluntary",
    dataIndex: "nssf",
  },
];
const nhifcolumns = [
  {
    title: "FIRST NAME",
    dataIndex: "first_name",
    scopedSlots: { customRender: "first_name" },
  },
  {
    title: "OTHER NAMES",
    dataIndex: "last_name",
    scopedSlots: { customRender: "last_name" },
  },
  {
    title: "ID NUMBER",
    className: "national_id",
    dataIndex: "national_id",
  },
  {
    title: "KRA PIN",
    dataIndex: "kra_pin",
  },
  {
    title: "NHIF NO",
    dataIndex: "nhif_number",
  },
  {
    title: "GROSS PAY",
    dataIndex: "grossPay",
  },
  {
    title: "AMOUNT",
    dataIndex: "NHIF",
  },
];
export default {
  components: {
    CardPlatformSettings,
    CardProfileInformation,
    CardPlatformUpdates,
    CardProject,
    ReviewSettings,
  },
  data() {
    return {
      report: "",
      nssfcolumns,
      selectedEmployees: "",
      loading: false,
      employeePayslip: {},
      data: [],
      taxable_income: 0,
      nhifcolumns,
    };
  },
  computed: {
    ...mapState(["calendars", "currentClient", "payrunEmployees"]),
    employees() {
      return this.$store.state.payrunEmployees;
    },
  },
  methods: {
    downloadNssfCsv() {
      let picked = [];
      this.data.forEach((object) => {
        const sliced = {
          "SIRNAME": object.first_name,
          "LAST NAME": object.last_name,
          "ID NUMBER": object.national_id,
          "KRA PIN": object.kra_pin,
          "NSSF NO": object.nssf_number,
          "GROSS PAY": object.grossPay,
          "voluntary": object.nssf,
        };
        picked.push(sliced);
      });
      const data = picked;
      console.log(typeof picked[0]);
      const fileName = "NSSF Report";
      const exportType = exportFromJSON.types.csv;

      if (data) exportFromJSON({ data, fileName, exportType });
    },
    downloadNhifCsv() {
      let picked = [];
      this.data.forEach((object) => {
        const sliced = {
          "FIRST NAME": object.first_name,
          "LAST NAME": object.last_name,
          "ID NUMBER": object.national_id,
          "KRA PIN": object.kra_pin,
          "NHIF NO": object.nhif_number,
          "GROSS PAY": object.grossPay,
          "AMOUNT": object.NHIF,
        };
        picked.push(sliced);
      });
      const data = picked;
      console.log(typeof picked[0]);
      const fileName = "NSSF Report";
      const exportType = exportFromJSON.types.csv;

      if (data) exportFromJSON({ data, fileName, exportType });
    },
    changeReport(val) {
      this.report = val;
      console.log(this.report);
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

<style lang="scss"></style>
