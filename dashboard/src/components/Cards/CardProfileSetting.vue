<template>
  <!-- Platform Settings Card -->
  <a-card
    :bordered="false"
    class="header-solid h-full"
    :bodyStyle="{ paddingTop: 0, paddingBottom: 0 }"
  >
    <template #title>
      <h6 class="font-semibold m-0">Profile Settings</h6>
    </template>
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
      :hideRequiredMark="true"
    >
      <a-form-item class="mb-10" label="Update Password" :colon="false">
        <a-input-group compact>
          <a-input
            v-decorator="[
              'password',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ],
              },
            ]"
            style="width: calc(100% - 100px)"
            label="Confirm Code"
            placeholder="New password"
          />
          <a-button type="primary" @click="handleSubmit" id="otp-verfiy-button"
            >Confirm</a-button
          >
        </a-input-group>
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
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          this.$store.dispatch("updatePassword",values.password)
        }
      });
    },
  },
};
</script>
