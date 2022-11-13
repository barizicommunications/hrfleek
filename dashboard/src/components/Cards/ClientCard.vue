<template>
  <a-card :bordered="false" class="card-info">
    <a-modal v-model="visible" :title="currentClient.company_name + 'Details'" on-ok="handleOk">
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
        @submit="handleChange"
        :hideRequiredMark="true"
      >
        <a-form-item label="Company Name">
          <a-input
            v-decorator="[
              'company_name',
              { 
                initialValue:currentClient.company_name,
                rules: [{ required: true, message: 'Field is required!' }] },
              

            ]"
          />
        </a-form-item>
        <a-form-item label="KRA PIN">
          <a-input
            v-decorator="[
              'kra_pin',
              {initialValue:currentClient.kra_pin,
                 rules: [{ required: true, message: 'Field is required!' }] },
            ]"
            placholder="KRA PIN"
          />
        </a-form-item>
        <a-form-item label="NHIF NUMBER">
          <a-input
            v-decorator="[
              'nhif_number',
              {initialValue:currentClient.nhif_number,
                 rules: [{ required: true, message: 'Field is required!' }] },
            ]"
            placholder="KRA PIN"
          />
        </a-form-item>
        <a-form-item label="NSSF NUMBER">
          <a-input
            v-decorator="[
              'nssf_number',
              {initialValue:currentClient.nssf_number,
                 rules: [{ required: true, message: 'Field is required!' }] },
            ]"
            placholder=""
          />
        </a-form-item>
        <a-form-item label="Company Email">
          <a-input
            v-decorator="[
              'company_email',
              {initialValue:currentClient.company_email,
                 rules: [{ required: true, message: 'Field is required!' }] },
            ]"
          />
        </a-form-item>
        <a-form-item label="Phone Number">
          <a-input
            v-decorator="[
              'company_phone',
              {initialValue:currentClient.company_phone,
                rules: [
                  { required: true, message: 'Please input phone number!' },
                ],
              },
            ]"
            style="width: 100%"
          >
            <a-select
              slot="addonBefore"
              v-decorator="['prefix', { initialValue: '+254' }]"
              style="width: 70px"
            >
              <a-select-option value="+254"> +254 </a-select-option>
              <a-select-option value="+1"> +1 </a-select-option>
            </a-select>
          </a-input>
        </a-form-item>
        <a-form-item label="Company Address">
          <a-input
            v-decorator="[
              'company_address',
              {initialValue:currentClient.address,
                 rules: [{ required: true, message: 'Field is required!' }] },
            ]"
          />
        </a-form-item>
        <a-form-item label="Company Logo">
          <a-upload
            name="file"
            :multiple="false"
            list-type="picture"
            :transform-file="transformFile"
            :file-list="fileList"
            :remove="handleRemove"
            :before-upload="beforeUpload"
            v-decorator="[
              'logo',
              { rules: [{ required: false, message: 'Field is required!' }] },
            ]"
          >
            <a-button> <a-icon type="upload" /> Click to Upload logo</a-button>
          </a-upload>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-row type="flex">
      <a-col class="col-content" :span="24" :xl="12">
        <div class="card-content">
          <h6>ID:{{ currentClient.kra_pin }}</h6>
          <h5>{{ currentClient.company_name }}</h5>
          <p>email:{{ currentClient.company_email }}</p>
          <p>Phone:{{ currentClient.company_phone }}</p>
        </div>
        <div class="card-footer">
          <a size="small" @click="visible = !visible">
            <span>Edit Details</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.29289 14.7071C6.90237 14.3166 6.90237 13.6834 7.29289 13.2929L10.5858 10L7.29289 6.70711C6.90237 6.31658 6.90237 5.68342 7.29289 5.29289C7.68342 4.90237 8.31658 4.90237 8.70711 5.29289L12.7071 9.29289C13.0976 9.68342 13.0976 10.3166 12.7071 10.7071L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071Z"
                fill="#111827"
              />
            </svg>
          </a>
        </div>
      </a-col>
      <a-col class="col-img" :span="24" :xl="12">
        <div class="card-img-bg">
          <img :src="currentClient.logo" alt="" />
        </div>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      visible: false,
      loading: false,
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      image: null,
      fileList: [],
      uploading: false,
    };
  },
  methods: {

    handleChange(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        this.loading = true;
        if (!err) {
          let client = this.clients.filter((c) => c.id === values.client_name);
          localStorage.setItem("client", JSON.stringify(client[0]));
          this.$store.dispatch("getCurrentClient");
          this.$store.dispatch("getEmployees");
          this.loading = false;
          this.visible = false;
        } else {
          this.loading = false;
        }
      });
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      return false;
    },
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
    handleCancel() {
      this.visible = false;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.$store.dispatch("updateClients",values).then(()=>{
            if(!this.error){
              this.form.resetFields()
            }
          })
        }
      });
    },
  },
  beforeCreate() {
    // Creates the form and adds to it component's "form" property.
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  computed: {
    ...mapState(["currentClient", "clients"]),
  },
  mounted() {
    this.$store.dispatch("getCurrentClient");
    this.$store.dispatch("getClients");
  },
};
</script>
