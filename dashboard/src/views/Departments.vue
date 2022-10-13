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
            <a-select mode="tags" style="width: 100%" placeholder="Type and enter or search to select"
            v-decorator="[
              'departments',
              {
                rules: [{ required: true, message: 'Field is required!' }],
              },
            ]">
    <a-select-option   v-for="department of departments" :key="department.department_name">
      {{department.department_name}}
    </a-select-option>
  </a-select>
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
    <a-drawer
      title="Create a new account"
      :width="720"
      :visible="drawer"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
      <a-form :form="form" layout="vertical" hide-required-mark>
       
        <a-row :gutter="16">
          <a-col :span="12" v-for="department of departments" :key="department.department_name" >
            <a-form-item class="mb-10" :label="department.department_name" :colon="false">
            <a-select mode="tags" style="width: 100%" placeholder="Type or search to select"
            v-decorator="[
             department.department_name,
              {
                rules: [{ required: true, message: 'Field is required!' }],
              },
            ]">
    <a-select-option   v-for="designation of department.designations" :key="designation.designation_name">
      {{designation.designation_name}}
    </a-select-option>
  </a-select>
          </a-form-item>
          </a-col>
        </a-row>

      </a-form>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <a-button :style="{ marginRight: '8px' }" @click="onClose">
          Cancel
        </a-button>
        <a-button type="primary" @click="submitDesignation">
          Submit
        </a-button>
      </div>
    </a-drawer>

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
              ADD  DEPARTMENTS
            </a-button>
          </a-radio-group>
          <a-radio-group size="small" class="mx-5">
            <a-button @click="showDrawer">ADD DESIGNATIONS</a-button>
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
      drawer:false,
      value: [],
      departments:[],
    };
  },
  methods: {
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
        this.loading=true
          const selectedClient = JSON.parse(localStorage.getItem("client"));
          let docRef = fb.businessCollection.doc(selectedClient.id);
          fb.db.runTransaction((transaction) => {
            return transaction
              .get(docRef)
              .then((doc) => {
                
                if (!doc.exists) {
                  this.loading=false
                  throw "no client with this id";
                }
               
                let departments = doc.data().departments;
                for(let i=0; i<values.departments.length;i++){
                  let depo = departments.some(
                  (e) => e.department_name === values.departments[i]
                );
                if (depo) {
                  this.$message.error("some department already exist");
                  this.loading=false
                  break
                } else {
                 this.$store.dispatch("createDepartment", {department_name:values.departments[i]});
                }
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
      let departments=[]
      for(let i=0;i<this.clients.length;i++){
        if(this.clients[i].departments==undefined){
          break
        }
        this.clients[i].departments.forEach((e)=>{
          departments.push(e)
        })
   
      }
      this.departments= departments
    },
    submitDesignation(e){
      e.preventDefault()
      this.loading = true;
      this.form.validateFields(async (err, values) => {
        if (!err) {
          console.log(values)
        }})


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
    const selectedClient = JSON.parse(localStorage.getItem("client"));
    this.$store.dispatch("updateClientFromFirebase",selectedClient);
    this.$store.dispatch("getCurrentClient");
    this.$store.dispatch("getClients");
    this.getAllDepartments()
  },
};
</script>

<style></style>
