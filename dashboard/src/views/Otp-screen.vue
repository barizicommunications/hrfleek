<template>
  <div class="sign-in">
    <a-row type="flex" :gutter="[24, 24]" justify="space-around">
      <!-- Sign In Form Column -->
      <a-col
        :span="24"
        :md="12"
        :lg="{ span: 12, offset: 0 }"
        :xl="{ span: 6, offset: 2 }"
        class="col-form"
      >
        <h1 class="mb-15">Phone Verification</h1>
        <h5 class="font-regular text-muted" v-if="authenticated">
          Enter sms code to proceed
        </h5>
        <h5 class="font-regular text-muted" v-else>
          Enter your a valid phone number to verify
        </h5>

        <!-- Sign In Form -->
        <a-form
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
          @submit="confirmOtp"
          :hideRequiredMark="true"
          v-if="authenticated"
        >
          <a-form-item class="mb-10" label="Confirmation CODE" :colon="false">
            <a-input-group compact>
              <a-input
                v-model="code"
                style="width: calc(100% - 100px)"
                label="Confirm Code"
                placeholder="Code"
              />
              <a-button
                type="primary"
                @click="confirmOtp"
                id="otp-verfiy-button"
                >Confirm</a-button
              >
            </a-input-group>
          </a-form-item>
        </a-form>
        <a-form
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
          @submit.prevent="handleSubmit"
          :hideRequiredMark="true"
          v-else
        >
          <a-form-item class="mb-10" label="Phone Number" :colon="false">
            <a-input-group compact>
              <a-input
                v-decorator="[
                  'phone_number',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your phone number!',
                      },
                    ],
                  },
                ]"
                placeholder="705******"
                addon-before="+254"
                style="width: calc(100% - 100px)"
              />
              <a-button
                type="primary"
                html-type="submit"
                id="otp-verfiy-button"
                :loading="loading"
                >VERIFY</a-button
              >
            </a-input-group>
          </a-form-item>
        </a-form>

        <!-- / Sign In Form -->
      </a-col>
      <!-- / Sign In Form Column -->

      <!-- Sign In Image Column -->
      <a-col :span="24" :md="12" :lg="12" :xl="12" class="col-img">
        <img src="images/signup-img.jpg" alt="" />
      </a-col>
      <!-- Sign In Image Column -->
    </a-row>
  </div>
</template>

<script>
import { runInThisContext } from "vm";
import * as fb from "../firebase";
import router from "../router/index";
export default {
  data() {
    return {
      // Binded model property for "Sign In Form" switch button for "Remember Me" .
      loading: false,
      rememberMe: true,
      authenticated: false,
      code: "",
    };
  },
  beforeCreate() {
    // Creates the form and adds to it component's "form" property.
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  methods: {
    // configure recaptcha
    configureRecaptcha() {
      window.recaptchaVerifier = new fb.capture.RecaptchaVerifier(
        "otp-verfiy-button",
        {
          size: "invisible",
        }
      );
    },
    // handle otpsend
    sendOtpForVerification(phoneNumber) {
      this.configureRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      fb.auth.languageCode = "en";
      fb.auth
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          this.$message.success("Otp sent successfully");
          this.authenticated = true;
          this.loading = false;
        })
        .catch((err) => {
          // Error; SMS not sent
          swal({
            title: "OOPS!",
            text: `${err.message}`,
            icon: "error",
          });
          window.recaptchaVerifier.render().then(function (widgetId) {
            grecaptcha.reset(widgetId);
          });
          this.loading = false;
        });
    },
    confirmOtp() {
      this.loading = true;
      window.confirmationResult
        .confirm(this.code)
        .then(async (result) => {
          console.log(result);
          router.push("dashboard");
          // ...
        })
        .catch((error) => {
          this.loading = false;
          // User couldn't sign in (bad verification code?)
          // ...
          swal({
            title: "OOPS!",
            text: `${error.message}`,
            icon: "error",
          });
          this.otpSent = true;
          window.recaptchaVerifier.render().then(function (widgetId) {
            grecaptcha.reset(widgetId);
          });
        });
    },
    resendOtp() {
      this.sendOtpForVerification();
    },
    // Handles input validation after submission.
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true;
          const format1 = "7";
          const format2 = "07";
          const format3 = "+254";
          if (values.phone_number.startsWith(format1)) {
            let formatted_number = "+254" + values.phone_number;
            this.sendOtpForVerification(formatted_number);
            this.form.resetFields();
          } else if (values.phone_number.startsWith(format2)) {
            let formatted_number = "+254" + values.phone_number.substring(1);
            this.sendOtpForVerification(formatted_number);
            this.form.resetFields();
          } else if (values.phone_number.startsWith(format3)) {
            let formatted_number = "+254" + values.phone_number.substring(4);
            this.sendOtpForVerification(formatted_number);
            //this.visible=true
            this.form.resetFields();
          } else {
            this.$message.error("please enter a valid phone number format");
            this.form.resetFields();
          }
        }
      });
    },
  },
  computed: {},
  mounted() {},
};
</script>

<style lang="scss">
body {
  background-color: #ffffff;
}
</style>
