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
            <!-- <a-select-option value="all">All </a-select-option> -->
            <a-select-option v-for="dep of client.departments" :key="dep.id" :value="dep.department_name"> {{dep.department_name}}</a-select-option>
           
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
import * as fb from "../../firebase";
import swal from "sweetalert";
export default {
  props:['client'],
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
      loading:false
    };
  },
  methods: {
    onChange() {},
    handleChange() {},
    handleSubmit(e) {
      e.preventDefault();
      console.log("form was submitted")
      this.form.validateFields((err, values) => {
        if (!err) {
         this.loading=true
          for(let i=0;i<values.departments.length;i++){
            let results = this.employees.filter((e)=>e.department===values.departments[i])
            let dept=values.departments[i]
            if(results.length){
              for(let i=0;i<results.length;i++){
               fb.businessCollection.doc(this.client.id).collection("team").doc(results[i].id).update({
                deductions:fb.types.FieldValue.arrayUnion({
                  name:values.name,
                  amount:values.amount,
                  frequency:values.frequency
                })
               }).then(()=>{
                console.log("updated successfully")
               })
              }

              this.loading=false
              swal({
            title: "SUCCESS!",
            text: `updated successfully`,
            icon: "success",
          });
            }
          }
        }
      });
    },
  },
  computed: {
    ...mapState(["employees"]),
  },
  mounted() {
    this.$store.dispatch("getEmployees");
  },
};
</script>

<style></style>
