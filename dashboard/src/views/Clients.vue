<template>
  <div>
    <a-row type="flex" align="stretch" class="mb-10">
      <a-col :span="24" :md="12" class="col-info">
        <a-input-search
          placeholder="search client"
          style="width: 200px"
          @search="onSearch"
          :loading="searchLoading"
          v-model="searchQuery"
        />
      </a-col>
      <a-col :span="24" :md="12" class="col-info">
        <a-button type="primary" @click="visible=true">Add New</a-button>
      </a-col>
    </a-row>
    <!-- Cards -->
    <CardInfo :clients="resultQuery"></CardInfo>
    <!-- / Cards -->
         <a-modal v-model="visible" title="Title" on-ok="handleOk">
      <template slot="footer">
        <a-button key="back" @click="handleCancel">
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
            :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload"
              v-decorator="[
              'logo',
              { rules: [{ required: true, message: 'Field is required!' }] },
            ]"
          >
            <a-button> <a-icon type="upload" /> Click to Upload logo</a-button>
          </a-upload>
        </a-form-item>
      </a-form>
    </a-modal>

  </div>
</template>

<script>
import CardInfo from "../components/Cards/CardInfo";
import ClientForm from "../components/forms/ClientForm.vue";
import { mapState } from "vuex";

export default {
  components: {
    CardInfo,
    ClientForm
  },
  data() {
    return {
      searchQuery: null,
      searchLoading: false,
      allowed: false,
      visible:false,
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      image:null,
      fileList: [],
      uploading: false,
    };
  },
  methods: {
    logKeys() {
      console.log(this.current[0]);
    },
      onSearch(value) {
      console.log(value, this.searchQuery);
      if (this.searchQuery) {
        this.visible = true;
        return this.assets.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => {
              item.asset_name.toLowerCase().includes(v)||item.category.toLowerCase().includes(v)
            });
        });
      } else {
        return this.assets;
      }
    },
    handleCancel(){
      this.visible=false
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



   computed: {
    ...mapState(["clients","currentClient"]),
    resultQuery() {
      if (this.searchQuery) {
        return this.clients.filter((item) => {
          return this.searchQuery.toString()
            .toLowerCase()
            .split(" ")
            .every((v) => item.company_name.toLowerCase().includes(v));
        });
      } else {
        return this.clients;
      }
    },
    loading(){
      return this.$store.state.loading
    },
    error(){
      return this.$store.state.error
    }
  },
    mounted() {
    this.$store.dispatch("getClients");
     this.$store.dispatch("getCurrentClient");
    

  },
};
</script>
<style>
#components-layout-demo-top .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
</style>
