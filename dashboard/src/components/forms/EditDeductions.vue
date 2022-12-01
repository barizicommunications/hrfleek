<template>
    <a-card
    :bordered="false"
    class="header-solid h-full px-5 py-10"
    :bodyStyle="{ paddingTop: 0, paddingBottom: 0 }"
  >
  <a-modal v-model="visible" title="Add Deduction" @ok="handleSubmit">
    <a-form
        :form="form"
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
      </a-form>
  </a-modal>
  <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }" :data-source="data.deductions">
    <a-list-item slot="renderItem" slot-scope="item, index">
        
      <a-card :title="item.name">
        <a slot="extra" href="#">Remove</a>
        {{item.amount}}
      </a-card>
    </a-list-item>
  </a-list>
      <a-button type="primary" block icon="plus" @click="handleOk">
        Add Deduction
      </a-button>
</a-card>
  
</template>

<script>
export default {
  props:['data'],
  data(){
    return{
      visible:false,
      formLayout: "vertical",
      form: this.$form.createForm(this, { name: "coordinated" }),
    }
  },
  methods:{
    handleOk(){
      this.visible=true
    },
    handleSubmit(){
      
    }

  }

}
</script>

<style>

</style>