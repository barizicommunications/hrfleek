<template>
<div class="sign-in">
  <a-card>
   <a-form
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
          @submit="handleChange"
          :hideRequiredMark="true"
        >
          <a-form-item class="mb-10" label="Designation" :colon="false">
                  <a-input-group compact>
      <a-input
            v-decorator="[
              'department_name',
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
export default {

}
</script>

<style>

</style>