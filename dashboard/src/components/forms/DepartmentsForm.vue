<template>
<div class="sign-in">
    <a-row type="flex" :gutter="[24, 24]" justify="space-around" align="middle">
      <!-- Sign In Form Column -->
      <a-col
        :span="24"
        :md="24"
        :lg="{ span: 12, offset: 0 }"
        :xl="{ span: 6, offset: 2 }"
        class="col-form"
      >
   <a-form
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
          @submit="handleChange"
          :hideRequiredMark="true"
        >
          <a-form-item class="mb-10" label="Department Name" :colon="false">
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
                >Confirm</a-button
              >
            </a-input-group>
          </a-form-item>
        </a-form>
        </a-col></a-row></div>
</template>

<script>
export default {

}
</script>

<style>

</style>