

<template>
  <div class="sign-in">
    <a-row type="flex" :gutter="[24, 24]" justify="space-around" align="middle">
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
          Enter your email and password to sign in
        </h5>
		   <h5 class="font-regular text-muted" v-else>
          Select client to proceed to dashboard
        </h5>
		

        <!-- Sign In Form -->
        <a-form
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
          @submit="handleChange"
          :hideRequiredMark="true"
		  v-if="authenticated"
        >
          <a-form-item class="mb-10" label="Select Client" :colon="false">
                  <a-input-group compact>
                          <a-select
                v-decorator="[
                  'client_name',
                  {
                    rules: [
                      { required: true, message: 'You have not selected any client' },
                    ],
                  },
                ]"
                placeholder="Please choose a client"
				style="width: calc(100% - 100px)"
              >
                <a-select-option  v-for="client of clients" :key="client.id" :value="client.id"> {{client.company_name}} </a-select-option>
              </a-select>
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
		loading:false,
      rememberMe: true,
	  authenticated:false
    };
  },
  beforeCreate() {
    // Creates the form and adds to it component's "form" property.
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  methods: {
    // Handles input validation after submission.
	handleChange(e){
		e.preventDefault();
      this.form.validateFields(async (err, values) => {
		this.loading =true
        if (!err) {
		let client = this.clients.filter((c)=>c.id===values.client_name)
		localStorage.setItem("client",JSON.stringify(client[0]))
		router.push("/dashboard");
		
		}else{
		this.loading=false	
		}})
	},
     handleSubmit(e) {
      e.preventDefault();
	  this.loading =true
      this.form.validateFields(async (err, values) => {
        if (!err) {
			await fb.auth.signInWithEmailAndPassword(values.email,values.password).then((user)=>{
				this.loading=false
				this.$store.dispatch("fetchUserProfile",user.user)
				this.$message.success("login successful,please select client");
				this.form.resetFields()
				router.push("/otp-screen");


			}).catch((err)=>{
				this.loading =false
				    swal({
            title: "OOPS!",
            text: `${err.message}`,
            icon: "error",
          });
			})
        }else{
			this.loading=false
		}
      });
    },
  },
        		computed:{
			...mapState(['clients']),
		},
		mounted(){
			this.$store.dispatch("getClients");
		}
};
</script>

<style lang="scss">
body {
  background-color: #ffffff;
}
</style>
