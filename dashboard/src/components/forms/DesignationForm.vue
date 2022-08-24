<template>
  <div class="sign-in">
    <a-card>
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit.prevent="handleSubmit"
        :hideRequiredMark="true"
      >
        <a-form-item class="mb-10" label="Designation" :colon="false">
          <a-input-group compact>
            <a-input
              v-decorator="[
                'designation_name',
                { rules: [{ required: true, message: 'Field is required!' }] },
              ]"
              style="width: calc(100% - 100px)"
            />
            <a-button
              type="primary"
              html-type="submit"
              id="otp-verfiy-button"
              :loading="loading"
              >Submit</a-button
            >
          </a-input-group>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      // Binded model property for "Sign In Form" switch button for "Remember Me" .
      rememberMe: true,
      authenticated: false,
    };
  },
  beforeCreate() {
    // Creates the form and adds to it component's "form" property.
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.loading = true;
      this.form.validateFields(async (err, values) => {
        if (!err) {
          this.$store.dispatch("createDesignation", values);
        }
      });
    },
  },
  computed: {
    ...mapGetters({
      loadingFromStore: "loading",
    }),
    loading: {
      get() {
        return this.loadingFromStore;
      },
      set(value) {
        return value;
      },
    },
  },
};
</script>

<style></style>
