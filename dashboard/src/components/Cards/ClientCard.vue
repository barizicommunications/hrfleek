<template>
  <a-card :bordered="false" class="card-info">
    <a-row type="flex">
      <a-col class="col-content" :span="24" :xl="12">
        <div class="card-content">
          <h6>ID:{{ currentClient.kra_pin }}</h6>
          <h5>Company:{{ currentClient.company_name }}</h5>
          <p>email:{{ currentClient.company_email }}</p>
          <p>Phone:{{ currentClient.company_phone }}</p>
          <a-form
            id="components-form-demo-normal-login"
            :form="form"
            class="login-form"
            @submit="handleChange"
            :hideRequiredMark="true"
            v-if="visible"
          >
            <a-form-item class="mb-10" label="Select Client" :colon="false">
              <a-input-group compact>
                <a-select
                  v-decorator="[
                    'client_name',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'You have not selected any client',
                        },
                      ],
                    },
                  ]"
                  placeholder="Please choose a client"
                  style="width: calc(100% - 100px)"
                >
                  <a-select-option
                    v-for="client of clients"
                    :key="client.id"
                    :value="client.id"
                  >
                    {{ client.company_name }}
                  </a-select-option>
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
        </div>
        <div class="card-footer">
          <a size="small" @click="visible = !visible">
            <span v-if="visible">Cancel</span>
            <span v-else>Switch Client</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.29289 14.7071C6.90237 14.3166 6.90237 13.6834 7.29289 13.2929L10.5858 10L7.29289 6.70711C6.90237 6.31658 6.90237 5.68342 7.29289 5.29289C7.68342 4.90237 8.31658 4.90237 8.70711 5.29289L12.7071 9.29289C13.0976 9.68342 13.0976 10.3166 12.7071 10.7071L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071Z"
                fill="#111827"
              />
            </svg>
          </a>
        </div>
      </a-col>
      <a-col class="col-img" :span="24" :xl="12">
        <div class="card-img-bg">
          <img :src="currentClient.logo" alt="" />
        </div>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      visible: false,
      loading:false
    };
  },
  methods:{
    	handleChange(e){
		e.preventDefault();
      this.form.validateFields(async (err, values) => {
		this.loading =true
        if (!err) {
		let client = this.clients.filter((c)=>c.id===values.client_name)
		localStorage.setItem("client",JSON.stringify(client[0]))
		this.$store.dispatch("getCurrentClient");
        this.loading=false
        this.visible=false
		
		}else{
		this.loading=false	
		}})
	},
  },
    beforeCreate() {
    // Creates the form and adds to it component's "form" property.
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  computed: {
    ...mapState(["currentClient", "clients"]),
  },
  mounted() {
    this.$store.dispatch("getCurrentClient");
    this.$store.dispatch("getClients");
  },
};
</script>
