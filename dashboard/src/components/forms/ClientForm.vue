<template>
  <div>
      <a-form
        :form="form"
       
        @submit.prevent="handleSubmit"
      >
        <a-form-item label="Company Name">
          <a-input
            v-decorator="[
              'company_name',
              { rules: [{ required: true, message: 'Field is required!' }] },
            ]"
          />
        </a-form-item>
                <a-form-item label="KRA PIN">
          <a-input
            v-decorator="[
              'kra_pin',
              { rules: [{ required: true, message: 'Field is required!' }] },
            ]"
            placholder="KRA PIN"
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
        <a-form-item label="Phone Number">
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
            :multiple="false"
            list-type="picture"
            :transform-file="transformFile"
              v-decorator="[
              'logo',
              { rules: [{ required: true, message: 'Field is required!' }] },
            ]"
          >
            <a-button> <a-icon type="upload" /> Click to Upload logo</a-button>
          </a-upload>
        </a-form-item>
      </a-form>
 
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      image:null,
    };
  },
  methods: {
    transformFile(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const canvas = document.createElement("canvas");
          const img = document.createElement("img");
          img.src = reader.result;
          img.onload = () => {
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            ctx.fillStyle = "red";
            ctx.textBaseline = "middle";
            ctx.fillText("Ant Design", 20, 20);
            canvas.toBlob(resolve);
          };
        };
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.$store.dispatch("addClients",values).then(()=>{
            if(!this.error){
              this.form.resetFields()
            }
          })
        }
      });
    },
  },
  computed:{
    ...mapState['clients'],
    loading(){
      return this.$store.state.loading
    },
    error(){
      return this.$store.state.error
    }
  },
  mounted(){
    this.$store.dispatch("getClients")
  }
};
</script>

<style></style>
