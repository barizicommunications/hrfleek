<template>
  <div>
    <a-card>
      <template></template>
      <a-form
        :form="form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
        @submit.prevent="handleSubmit"
      >
        <a-form-item label="Deduction Name">
          <a-input
            v-decorator="[
              'name',
              { rules: [{ required: true, message: 'Field is required!' }] },
            ]"
          />
        </a-form-item>

        <a-form-item label="Department">
          <a-select @change="handleChange"  mode="multiple"    v-decorator="[
              'departments',
              { rules: [{ required: true, message: 'Field is required!' }] },
            ]">
            <a-select-option value="all">All </a-select-option>
            <a-select-option v-for="dep of departments" :key="dep" :value="dep"> {{dep}}</a-select-option>
           
          </a-select>
        </a-form-item>
        <a-form-item label="Frequency">
          <a-radio-group name="radioGroup" :default-value="1"    v-decorator="[
              'frequency',
              { rules: [{ required: true, message: 'Field is required!' }] },
            ]">
            <a-radio value="oneoff"> One off </a-radio>
            <a-radio value="monthly"> Monthly</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="Amount">
          <a-input
            v-decorator="[
              'amount',
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
import { mapState,mapGetters } from "vuex";
export default {
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      image: null,
      visible: false,
      drawer: false,
      value: [],
      departments: [],
      designations: [],
    };
  },
  methods: {
    onChange() {},
    handleChange() {},
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values,this.currentClient.id);
          this.$store.dispatch("addDeduction",{
            id :this.currentClient.id,
            values:values
          }).then(() => {
            if (!this.error) {
              this.form.resetFields();
            }
          });
        }
      });
    },
    getAllDepartments() {
      let departments = [];
      for (let i = 0; i < this.clients.length; i++) {
        if (this.clients[i].departments == undefined) {
          break;
        }
        this.clients[i].departments.forEach((e) => {
          departments.push(e.department_name);
        });
      }
      this.departments = [...new Set(departments)];
    },
  },
  computed: {
    ...mapState(["employees", "currentClient", "clients"]),
    ...mapGetters({
      loadingFromStore: "loading",
    }),
    loading: {
      get() {
        return this.loadingFromStore;
      },
      set(value) {
        return value;
      },
    },
  },
  mounted() {
    this.$store.dispatch("getEmployees");
    const selectedClient = JSON.parse(localStorage.getItem("client"));
    this.$store.dispatch("updateClientFromFirebase", selectedClient);
    this.$store.dispatch("getCurrentClient");
    this.$store.dispatch("getClients");
    this.getAllDepartments();
  },
};
</script>

<style></style>
