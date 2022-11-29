<template>
  <div>
    <a-card>
      
      <a-form
        :form="form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
        @submit.prevent="handleSubmit"
      >
        <a-form-item label="Calendar Name">
          <a-input
            v-decorator="[
              'calendar_name',
              {
                rules: [{ required: true, message: 'Field is required!' }],
              },
            ]"
          />
        </a-form-item>

        <a-form-item label="Payment Cycle">
          <a-select
            default-value="monthly"
            v-decorator="[
              'payment_cycle',
              {
                rules: [{ required: true, message: 'Field is required!' }],
              },
            ]"
          >
            <a-select-option value="monthly"> Monthly </a-select-option>
            <a-select-option value="weekly" disabled> Weekly </a-select-option>
            <a-select-option value="hourly" disabled> Hourly </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Reviewer">
          <a-select
            v-decorator="[
              'reviewer',
              {
                rules: [{ required: true, message: 'Field is required!' }],
              },
            ]"
          >
            <a-select-option v-for="reviewer of admins" :key="reviewer.id"  :value="reviewer.email">{{reviewer.email}}</a-select-option>
            
          </a-select>
        </a-form-item>
        <a-form-item label="Normal Payday">
          <a-date-picker
            v-decorator="[
              'date',
              {
                rules: [{ required: true, message: 'Field is required!' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit" :loading="loading">
            Submit
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Payrun from "../../views/Payrun.vue";
export default {
  props:["admins"],
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      image: null,
      current: 0,
      steps: [
        {
          title: "Calendar Details",
          content: "First-content",
        },
        {
          title: "Employees",
          content: "Second-content",
        },
        {
          title: "Variable Fields",
          content: "Last-content",
        },
      ],
    };
  },
  methods: {
    onChange() {},
    next(e) {
      if (this.current == 0) {
        this.handleSubmit(e);
      } else {
        console.log(this.employees, this.error, "employeees");
      }
    },
    prev() {
      this.current--;
    },
    handleChange() {},
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store.dispatch("createCalender", values).then(() => {
              if (!this.error) {
                  this.form.resetFields();
                  this.current++;
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
    employees() {
      return this.$store.state.payrunEmployees;
    },
  },
  mounted() {
    this.$store.dispatch("getClients");
  },
  components: { Payrun },
};
</script>

<style></style>
