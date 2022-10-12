<template>
  <a-card>
    <div>
      <a-modal v-model="visible" title="Title" on-ok="handleSubmit">
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
            <a-tree-select
              v-model="value"
              style="width: 100%"
              tree-checkable
              search-placeholder="Please select"
              show-search
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="Please select"
              allow-clear
              tree-default-expand-all
            >
              <a-tree-select-node key="all" value="all" title="All">
                <a-tree-select-node
                  key="0-1-1"
                  value="parent 1-0"
                  title="parent 1-0"
                >
                  <a-tree-select-node
                    key="random"
                    :selectable="false"
                    value="leaf1"
                    title="my leaf"
                  />
                  <a-tree-select-node
                    key="random1"
                    value="leaf2"
                    title="your leaf"
                  />
                </a-tree-select-node>
              </a-tree-select-node>
            </a-tree-select>
          </a-form-item>
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
              Add New Department
            </a-button>
          </a-radio-group>
          <a-radio-group size="small" class="mx-5">
            <a-button>Use Current Departments</a-button>
          </a-radio-group>
        </a-col>
      </a-row>
    </template>
    <a-row type="flex" align="middle">
      <a-col
        :span="4"
        v-for="department of currentClient.departments"
        :key="department.department_name"
      >
        <a-button class="m-5" icon="edit" type="link">
          {{ department.department_name }}
        </a-button>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import * as fb from "../firebase";

export default {
  data() {
    return {
      visible: false,
      value: [],
      departments:[]
    };
  },
  methods: {
    openModal() {
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.loading = true;
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const selectedClient = JSON.parse(localStorage.getItem("client"));
          let docRef = fb.businessCollection.doc(selectedClient.id);
          fb.db.runTransaction((transaction) => {
            return transaction
              .get(docRef)
              .then((doc) => {
                if (!doc.exists) {
                  throw "no client with this id";
                }
                let departments = doc.data().departments;
                let depo = departments.some(
                  (e) => e.department_name === values.department_name
                );

                if (depo) {
                  this.$message.error("department exists");
                } else {
                  this.$store.dispatch("createDepartment", values);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          });
        }
      });
    },
    getAllDepartments(){
      console.log(this.clients)
      this.clients.
      foreach((client)=>{
        console.log(client.departments)
      })
    }
  },
  beforeCreate() {
    // Creates the form and adds to it component's "form" property.
    this.form = this.$form.createForm(this, { name: "normal_login" });
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
    this.$store.dispatch("getCurrentClient");
    this.$store.dispatch("getClients");
    this.getAllDepartments()
  },
};
</script>

<style></style>
