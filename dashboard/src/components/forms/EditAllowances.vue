<template>
    <a-card
    :bordered="false"
    class="header-solid h-full px-5 py-10"
    :bodyStyle="{ paddingTop: 0, paddingBottom: 0 }"
  >
  <a-modal v-model="visible" title="Add Allowance" @ok="handleSubmit">
    <template slot="footer">
        <a-button key="back" @click="visible=false">
          Cancel
        </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleSubmit">
          Submit
        </a-button>
      </template>
    <a-form
        :form="form"
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
      </a-form>
    </a-modal>
  <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }" :data-source="data.allowances">
    <a-list-item slot="renderItem" slot-scope="item, index">
      <a-card :title="item.name">
        <!-- <a slot="extra" href="#">Remove</a> -->
        {{item.amount}}
      </a-card>
    </a-list-item>
  </a-list>
      <a-button type="primary" block icon="plus" @click="handleOk">
        Add Allowance
      </a-button>
</a-card>
  
</template>

<script>
import * as fb from "../../firebase";
export default {
  props:['data'],
  data(){
    return{
      visible:false,
      formLayout: "vertical",
      form: this.$form.createForm(this, { name: "coordinated" }),
      loading:false
    }
  },
  methods:{
    handleOk(){
      this.visible=true
    },

    handleSubmit(e){
      e.preventDefault()
      this.form.validateFields((err, values) => {
      if (!err) {
        this.loading=true
        const selectedClient = JSON.parse(localStorage.getItem("client"));
        console.log(this.data.id, selectedClient.id)
        fb.businessCollection.doc(selectedClient.id).collection("team").doc(this.data.id).update({
                allowances:fb.types.FieldValue.arrayUnion({
                  name:values.allowance_name,
                  amount:values.amount,
                  frequency:values.frequency,
                  taxed:values.taxed
                })
               }).then(()=>{
                this.$message.success("details updated succcessfully")
                this.loading=false
               }).catch((err)=>{
                console.log(err)
                this.loading=false
                this.$message.error("something went wrong")
               })

      }})
      
    }

  }

}
</script>

<style>

</style>