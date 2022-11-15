<template>
  <!-- Platform Settings Card -->
  <a-card
    :bordered="false"
    class="header-solid h-full px-5"
    :bodyStyle="{ paddingTop: 0, paddingBottom: 0 }"
  >
    <template #title>
      <h6 class="font-semibold m-0">Change Password</h6>
    </template>
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
      :hideRequiredMark="true"
    >
    <a-form-item label="Enter New Password" has-feedback>
      <a-input
        v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          },
        ]"
        type="password"
      />

    </a-form-item>
    <a-form-item label="Confirm Password" has-feedback>
      <a-input
        v-decorator="[
          'confirm',
          {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          },
        ]"
        type="password"
        @blur="handleConfirmBlur"
      />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" block html-type="submit">
        Submit
      </a-button>
    </a-form-item>
    </a-form>
  </a-card>
  <!-- / Platform Settings Card -->
</template>

<script>
export default {
  data() {
    return {
      // Binded model property for "Platform Settings" switch button for "Email ... follows me" .
      emailForFollows: true,

      // Binded model property for "Platform Settings" switch button for "Email ... answers me" .
      emailForAnswers: false,

      // Binded model property for "Platform Settings" switch button for "Email ... mentions me" .
      emailForMentions: true,

      // Binded model property for "Platform Settings" switch button for "New launches and projects" .
      emailForNewProjects: true,

      // Binded model property for "Platform Settings" switch button for "Monthly product updates" .
      emailForProductUpdates: false,

      // Binded model property for "Platform Settings" switch button for "Subscribe to newsletter" .
      emailForNewsletter: true,
    };
  },
  beforeCreate() {
    // Creates the form and adds to it component's "form" property.
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  methods: {
    // handleSubmit(e) {
    //   e.preventDefault();
    //   this.form.validateFields((err, values) => {
    //     if (!err) {
    //       console.log(values);
    
    //     }
    //   });
    // },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
              this.$store.dispatch("updatePassword",values.password)
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    },
  },
};
</script>
