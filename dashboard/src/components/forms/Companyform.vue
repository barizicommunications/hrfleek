<template>
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
      :hideRequiredMark="true"
    >
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Company Name">
            <a-input
              v-decorator="[
                'company_name',
                {
                  initialValue: client.company_name,
                  rules: [{ required: true, message: 'Field is required!' }],
                },
              ]"
            /> </a-form-item
        ></a-col>
        <a-col :span="12">
          <a-form-item label="KRA PIN">
            <a-input
              v-decorator="[
                'kra_pin',
                {
                  initialValue: client.kra_pin,
                  rules: [{ required: true, message: 'Field is required!' }],
                },
              ]"
              placholder="KRA PIN"
            /> </a-form-item
        ></a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="NHIF NUMBER">
            <a-input
              v-decorator="[
                'nhif_number',
                {
                  initialValue: client.nhif_number,
                  rules: [{ required: true, message: 'Field is required!' }],
                },
              ]"
              placholder="KRA PIN"
            /> </a-form-item
        ></a-col>
        <a-col :span="12">
          <a-form-item label="NSSF NUMBER">
            <a-input
              v-decorator="[
                'nssf_number',
                {
                  initialValue: client.nssf_number,
                  rules: [{ required: true, message: 'Field is required!' }],
                },
              ]"
              placholder=""
            /> </a-form-item
        ></a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Company Email">
            <a-input
              v-decorator="[
                'company_email',
                {
                  initialValue: client.company_email,
                  rules: [{ required: true, message: 'Field is required!' }],
                },
              ]"
            /> </a-form-item
        ></a-col>
        <a-col :span="12">
          <a-form-item label="Phone Number">
            <a-input
              v-decorator="[
                'company_phone',
                {
                  initialValue: client.company_phone,
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
          </a-form-item></a-col
        >
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Bank Name">
            <a-select
              v-decorator="[
                'bank_name',
                {
                  initialValue: client.bank_name,
                  rules: [
                    { required: true, message: 'Please choose the bank' },
                  ],
                },
              ]"
              @change="handleBankChange"
              placeholder="Please choose the bank"
            >
              <a-select-option
                v-for="bank of bankNames"
                :key="bank"
                :value="bank"
                >{{ bank }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Branch Name">
            <a-select
              v-decorator="[
                'bank_branch',
                {
                  initialValue: client.bank_branch,
                  rules: [{ required: true, message: 'please enter branch' }],
                },
              ]"
              style="width: 100%"
              placeholder="Branch Name"
            >
              <a-select-option
                v-for="branch of branches"
                :key="branch.id"
                :value="branch.BranchName"
                >{{ branch.BranchName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Account Name">
            <a-input
              v-decorator="[
                'account_name',
                {
                  initialValue: client.account_name,
                  rules: [{ required: true, message: 'please enter account' }],
                },
              ]"
              style="width: 100%"
              placeholder="account Name"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Account Number">
            <a-input
              v-decorator="[
                'account_number',
                {
                  initialValue: client.account_number,
                  rules: [
                    {
                      required: true,
                      message: 'please enter account number',
                    },
                  ],
                },
              ]"
              style="width: 100%"
              placeholder="account number"
              type="number"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Company Address">
            <a-input
              v-decorator="[
                'company_address',
                {
                  initialValue: client.address,
                  rules: [{ required: true, message: 'Field is required!' }],
                },
              ]"
            /> </a-form-item
        ></a-col>
        <a-col :span="12">
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
              <a-button>
                <a-icon type="upload" /> Click to Upload logo</a-button
              >
            </a-upload>
          </a-form-item></a-col
        >
      </a-row>
      <a-row>
        <a-col :span="24">
            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit" :loading="loading" block>
            Edit Details
          </a-button>
        </a-form-item>
        </a-col>
      </a-row>
    </a-form>
</template>

<script>
export default {
    props:['client','bankNames','banks'],
    data() {
    return {
      loading: false,
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      image: null,
      fileList: [],
      uploading: false,
      branches: []
    };
  },
  methods: {
    handleBankChange(value) {
      let filtered = this.banks.filter((e) => e.BankName == value);
      this.branches = filtered;
    },
    handleChange(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        this.loading = true;
        if (!err) {
            console.log(values)
          this.loading = false;
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
          this.$store.dispatch("updateClients", values).then(() => {
            if (!this.error) {
              this.form.resetFields();
            }
          });
        }
      });
    },
  },
  beforeCreate() {
    // Creates the form and adds to it component's "form" property.
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
};
</script>

<style></style>
