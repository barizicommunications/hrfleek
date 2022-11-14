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
          <a-form-item label="Username">
            <a-input
              v-decorator="[
                'username',
                { rules: [{ required: true, message: 'Field is required!' }] },
              ]"
            />
          </a-form-item>
          <a-form-item label="Email">
            <a-input
              v-decorator="[
                'email',
                { rules: [{ required: true, message: 'Field is required!' }] },
              ]"
            />
          </a-form-item>
  
          <a-form-item label="Role">
            <a-select @change="handleChange"   v-decorator="[
                'role',
                { rules: [{ required: true, message: 'Field is required!' }] },
              ]">
              <a-select-option value="admin">Adminstrator </a-select-option>
              <a-select-option value="manager">Manager(creates clients/adds employees)</a-select-option>
              <a-select-option value="approver">Reviewer(Reviews and approves payroll)</a-select-option>
             
            </a-select>
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
            this.$store.dispatch("addAllowance",{
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
  