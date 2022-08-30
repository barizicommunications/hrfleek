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
              { rules: [{ required: true, message: 'Field is required!' }] },
            ]"
          />
        </a-form-item>

        <a-form-item label="Payment Cycle">
          <a-select
            default-value="monthly"
            v-decorator="[
              'payment_cycle',
              { rules: [{ required: true, message: 'Field is required!' }] },
            ]"
          >
            <a-select-option value="monthly"> Monthly </a-select-option>
            <a-select-option value="weekly"> Weekly </a-select-option>
            <a-select-option value="hourly"> Hourly </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Normal Payday">
          <a-date-picker
            v-decorator="[
              'date',
              { rules: [{ required: true, message: 'Field is required!' }] },
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
export default {
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      image: null,
    };
  },
  methods: {
    onChange() {},
    handleChange() {},
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store.dispatch("createCalender", values).then(() => {
            if (!this.error) {
              this.form.resetFields();
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
  },
  mounted() {
    this.$store.dispatch("getClients");
  },
};
</script>

<style></style>
