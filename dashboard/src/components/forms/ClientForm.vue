<template>
  <div>
    <a-card>
      <a-form
        :form="form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
        @submit="handleSubmit"
      >
        <a-form-item label="Company Name">
          <a-input
            v-decorator="[
              'company_name',
              { rules: [{ required: true, message: 'Field is required!' }] },
            ]"
          />
        </a-form-item>
        <a-form-item label="Company Email">
          <a-input
            v-decorator="[
              'company_email',
              { rules: [{ required: true, message: 'Field is required!' }] },
            ]"
          />
        </a-form-item>
        <a-form-item  label="Phone Number">
          <a-input
            v-decorator="[
              'company_phone',
              {
                rules: [
                  { required: true, message: 'Please input phone number!' },
                ],
              },
            ]"
            style="width: 100%"
          >
            <a-select
              slot="addonBefore"
              v-decorator="['prefix', { initialValue: '86' }]"
              style="width: 70px"
            >
              <a-select-option value="86"> +254 </a-select-option>
              <a-select-option value="87"> +1 </a-select-option>
            </a-select>
          </a-input>
        </a-form-item>
        <a-form-item label="Company Address">
          <a-input
            v-decorator="[
              'company_address',
              { rules: [{ required: true, message: 'Field is required!' }] },
            ]"
          />
        </a-form-item>
        <a-form-item label="Company Logo">
          <a-upload
            name="file"
            :multiple="true"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            @change="handleChange"
          >
            <a-button> <a-icon type="upload" /> Click to Upload logo</a-button>
          </a-upload>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit"> Submit </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
    };
  },
  methods: {
    handleChange() {
      console.log("hello");
    },
    handleSubmit(e) {
      e.preventDefault();
    },
  },
};
</script>

<style></style>
