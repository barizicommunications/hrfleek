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
        <h1 class="mb-15">Sign In</h1>
        <h5 class="font-regular text-muted" v-if="authenticated">
          Enter sms code to proceed
        </h5>
        <h5 class="font-regular text-muted" v-else>
          Enter your email and password to sign in
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
                :loading="loading"
                >Confirm</a-button
              >
            </a-input-group>
          </a-form-item>
        </a-form>
        <a-form
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
          @submit="handleSubmit"
          :hideRequiredMark="true"
          v-else
        >
          <a-form-item class="mb-10" label="Email" :colon="false">
            <a-input
              v-decorator="[
                'email',
                {
                  rules: [
                    { required: true, message: 'Please input your email!' },
                  ],
                },
              ]"
              placeholder="Email"
            />
          </a-form-item>
          <a-form-item class="mb-5" label="Password" :colon="false">
            <a-input-password
              v-decorator="[
                'password',
                {
                  rules: [
                    { required: true, message: 'Please input your password!' },
                  ],
                },
              ]"
              type="password"
              placeholder="Password"
            />
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              block
              html-type="submit"
              class="login-form-button"
              id="otp-verfiy-button"
              :loading="loading"
            >
              SIGN IN
            </a-button>
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
import * as fb from "../firebase";
import { mapState } from "vuex";
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
    // Handles input validation after submission.
    handleChange(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        this.loading = true;
        if (!err) {
          let client = this.clients.filter((c) => c.id === values.client_name);
          localStorage.setItem("client", JSON.stringify(client[0]));
          router.push("/dashboard");
        } else {
          this.loading = false;
        }
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.loading = true;
      this.form.validateFields(async (err, values) => {
        if (!err) {
          await fb.adminCollections
            .get()
            .then((docs) => {
              let admins = [];
              docs.docs.forEach((doc) => {
                admins.push(doc.data());
              });
              let user = admins.find(
                (admin) =>
                  admin.email === values.email &&
                  admin.password === values.password
              );
              if (user) {
                console.log(user);
                 this.sendOtpForVerification(user.phone);
                this.loading = false;
              } else {
                swal({
                  title: "OOps!",
                  text: `Please check the credentials and try again`,
                  icon: "error",
                });
                this.loading = false;
              }
            })
            .catch((err) => {
              this.loading = false;
              console.log(err);
              swal({
                title: "OOps!",
                text: `something went wrong`,
                icon: "error",
              });
            });
        } else {
          this.loading = false;
        }
      });
    }, // configure recaptcha
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
  },
  computed: {
    ...mapState(["clients"]),
  },
  mounted() {
    this.$store.dispatch("getClients");
  },
};
</script>

<style lang="scss">
body {
  background-color: #ffffff;
}
</style>
