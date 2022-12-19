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
        <a-form-item label="Allowance Name">
          <a-input
            v-decorator="[
              'allowance_name',
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
        <a-form-item label="Allowance Taxed">
          <a-select v-decorator="[
              'taxed',
              { rules: [{ required: true, message: 'Field is required!' }] },
            ]">
            <a-select-option value="yes">Yes </a-select-option>
            <a-select-option value="no">No</a-select-option>
           
          </a-select>
        </a-form-item>
        <a-form-item label="Frequency">
          <a-radio-group name="radioGroup"     v-decorator="[
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
import * as fb from "../../firebase";
import swal from "sweetalert";
export default {
  props:['client','employees'],
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
                allowances:fb.types.FieldValue.arrayUnion({
                  name:values.allowance_name,
                  amount:values.amount,
                  frequency:values.frequency,
                  taxed:values.taxed
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

          // this.$store.dispatch("addAllowance",{
          //   id :this.client.id,
          //   values:values
          // }).then(() => {
          //   if (!this.error) {
          //     this.form.resetFields();
          //   }
          // });
        }
      });
    },
  },
};
</script>

<style></style>
