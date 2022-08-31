<template>
  <div>
    <a-card>
      <div>
        <a-steps :current="current">
          <a-step v-for="item in steps" :key="item.title" :title="item.title" />
        </a-steps>
        <div class="steps-content">
          <a-form
            :form="form"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
            @submit.prevent="handleSubmit"
            v-if="current == 0"
          >
            <a-form-item label="Calendar Name">
              <a-input
                v-decorator="[
                  'calendar_name',
                  {
                    rules: [{ required: true, message: 'Field is required!' }],
                  },
                ]"
              />
            </a-form-item>

            <a-form-item label="Payment Cycle">
              <a-select
                default-value="monthly"
                v-decorator="[
                  'payment_cycle',
                  {
                    rules: [{ required: true, message: 'Field is required!' }],
                  },
                ]"
              >
                <a-select-option value="monthly"> Monthly </a-select-option>
                <a-select-option value="weekly"> Weekly </a-select-option>
                <a-select-option value="hourly"> Hourly </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="Normal Payday">
              <a-date-picker
                v-decorator="[
                  'date',
                  {
                    rules: [{ required: true, message: 'Field is required!' }],
                  },
                ]"
              />
            </a-form-item>
          </a-form>
          <Payrun v-if="current == 1"></Payrun>
        </div>
        <div class="steps-action">
          <a-button
            v-if="current < steps.length - 1"
            type="primary"
            @click="next"
            :loading="loading"
          >
            Next
          </a-button>
          <a-button
            v-if="current == steps.length - 1"
            type="primary"
            @click="$message.success('Processing complete!')"
          >
            Done
          </a-button>
          <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
            Previous
          </a-button>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Payrun from "../../views/Payrun.vue";
export default {
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      image: null,
      current: 0,
      steps: [
        {
          title: "Calendar Details",
          content: "First-content",
        },
        {
          title: "Employees",
          content: "Second-content",
        },
        {
          title: "Variable Fields",
          content: "Last-content",
        },
      ],
    };
  },
  methods: {
    onChange() {},
    next(e) {
      if (this.current == 0) {
        this.handleSubmit(e);
      }
      else{
        console.log(this.employees,this.error,"employeees")
      }


    },
    prev() {
      this.current--;
    },
    handleChange() {},
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          // this.$store.dispatch("createCalender", values).then(() => {
          //     if (!this.error) {
          //         this.form.resetFields();
          //         this.current++;
          //     }
          // });

          localStorage.setItem("calendar", values);
          this.current++;
        }
      });
    },
  },
  computed: {
    ...mapState["clients"],
    loading() {
      return this.$store.state.loading;
    },
    error() {
      return this.$store.state.error;
    },
    employees(){
      return this.$store.state.payrunEmployees
    }
  },
  mounted() {
    this.$store.dispatch("getClients");
  },
  components: { Payrun },
};
</script>

<style></style>
