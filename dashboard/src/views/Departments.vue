<template>
  <a-card>
    <div>
      <a-modal v-model="visible" title="Create Department" on-ok="handleSubmit">
        <template slot="footer">
          <a-button key="back" @click="handleCancel"> Cancel </a-button>
          <a-button
            key="submit"
            type="primary"
            :loading="loading"
            @click="handleSubmit"
          >
            Submit
          </a-button>
        </template>
        <a-form
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
          @submit.prevent="handleSubmit"
          :hideRequiredMark="true"
        >
          <a-form-item class="mb-10" label="Select Department" :colon="false">
            <a-select
              mode="tags"
              style="width: 100%"
              placeholder="Type and enter or search to select"
              v-decorator="[
                'departments',
                {
                  rules: [{ required: true, message: 'Field is required!' }],
                },
              ]"
            >
              <a-select-option
                v-for="department of departments"
                :key="department"
              >
                {{ department }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
    <div>
      <a-modal v-model="drawer" title="Create Designation" on-ok="handleSubmit">
        <template slot="footer">
          <a-button key="back" @click="handleCancel"> Cancel </a-button>
          <a-button
            key="submit"
            type="primary"
            :loading="loading"
            @click="submitDesignation"
          >
            Submit
          </a-button>
        </template>
        <a-form
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
          @submit.prevent="submitDesignation"
          :hideRequiredMark="false"
        >
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item
                class="mb-10"
                label="Select Department"
                :colon="false"
              >
                <a-select
                  @change="handleDeptChange"
                  v-decorator="[
                    'department',
                    {
                      rules: [
                        { required: false, message: 'Field is required!' },
                      ],
                    },
                  ]"
                >
                  <a-select-option
                    v-for="dept in client.departments"
                    :key="dept.department_name"
                  >
                    {{ dept.department_name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item class="mb-10" label="Designations" :colon="false">
                <a-select
                  mode="tags"
                  style="width: 100%"
                  placeholder="Type or search to select"
                  v-decorator="[
                    'designations',
                    {
                      rules: [
                        { required: false, message: 'Field is required!' },
                      ],
                    },
                  ]"
                >
                  <a-select-option
                    v-for="designation of designations"
                    :key="designation.name"
                  >
                    {{ designation.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-modal>
    </div>

    <template #title>
      <a-row type="flex" align="middle">
        <a-col :span="24" :md="12">
          <h6>Departments</h6>
        </a-col>
        <a-col
          :span="24"
          :md="12"
          style="display: flex; align-items: center; justify-content: flex-end"
        >
          <a-radio-group size="small">
            <a-button type="primary" @click="openModal">
              ADD DEPARTMENTS
            </a-button>
          </a-radio-group>
          <a-radio-group size="small" class="mx-5">
            <a-button @click="showDrawer">ADD DESIGNATIONS</a-button>
          </a-radio-group>
        </a-col>
      </a-row>
    </template>
    <a-row type="flex" align="middle" v-if="client.departments">
      <a-col
        :span="4"
        v-for="department of client.departments"
        :key="department.department_name"
      >
        <h5>{{ department.department_name }}</h5>
      </a-col>
    </a-row>
    <a-empty v-else />
  </a-card>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import * as fb from "../firebase";

export default {
  props: ["client"],
  data() {
    return {
      visible: false,
      drawer: false,
      value: [],
      departments: [],
      designations: [],
    };
  },
  methods: {
    handleDeptChange(value) {
      let designations = [];
      for (let i = 0; i < this.clients.length; i++) {
        if (this.clients[i].designations == undefined) {
          break;
        }
        this.clients[i].designations.forEach((e) => {
          designations.push(e);
        });
      }

      let filtered = designations.filter((e) => e.department == value);
      console.log("designations", filtered);
      this.designations = filtered;
    },
    openModal() {
      this.visible = true;
    },
    showDrawer() {
      this.drawer = true;
    },
    onClose() {
      this.drawer = false;
    },
    handleCancel() {
      this.visible = false;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.loading = true;
      this.form.validateFields(async (err, values) => {
        if (!err) {
          this.loading = true;
          if (this.client.departments) {
            for (let i = 0; i < values.departments.length; i++) {
              let depo = this.client.departments.some(
                (e) => e.department_name === values.departments[i]
              );
              if (depo) {
                this.$message.error("some departments already exist clear before you continue");
                this.loading = false;
                break;
              } else {
                this.$store
                  .dispatch("createDepartment", {
                    client: this.client.id,
                    departments: {
                      department_name: values.departments[i],
                    },
                  })
                  .then(() => {
                    this.visible = false;
                  });
              }
            }
          } else {
            for (let i = 0; i < values.departments.length; i++) {
              this.$store
                .dispatch("createDepartment", {
                  client: this.client.id,
                  departments: {
                    department_name: values.departments[i],
                  },
                })
                .then(() => {
                  this.visible = false;
                });
            }
          }
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
    submitDesignation(e) {
      e.preventDefault();
      this.loading = true;
      this.form.validateFields(async (err, values) => {
        if (!err) {
          console.log(values);
          const selectedClient = JSON.parse(localStorage.getItem("client"));
          for (let i = 0; i < values.designations.length; i++) {
            let data = {
              department: values.department,
              name: values.designations[i],
            };
            console.log(data);
            fb.businessCollection
              .doc(selectedClient.id)
              .update({
                designations: fb.types.FieldValue.arrayUnion(data),
              })
              .then(() => {
                this.$message.success("successfully added");
                this.drawer = false;
              })
              .catch(() => {
                this.$message.error("something went wrong");
              });
          }
        }
      });
    },
  },
  beforeCreate() {
    // Creates the form and adds to it component's "form" property.
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  computed: {
    ...mapState(["employees", "clients"]),
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
    this.$store.dispatch("getClients");
    this.getAllDepartments();
  },
};
</script>

<style></style>
