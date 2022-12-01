<template>
    <a-card class="my-5">
        <vue-json-to-csv :json-data="[
    { name: 'Joe', surname: 'Roe' },
    { name: 'John', surname: 'Doe' }
  ]"
  :labels="{ name: { title: 'First name' } }"
  csv-title="My_CSV"
  >
  <button>
    <b>My custom button</b>
  </button>
</vue-json-to-csv>
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <div class="steps-content">
        {{ steps[current].content }}
      </div>
      <div class="steps-action">
        <a-button v-if="current < steps.length - 1" type="primary" @click="next">
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
    </a-card>
  </template>
  <script>
  import VueJsonToCsv from 'vue-json-to-csv'
  export default {
    components:{
        VueJsonToCsv
    },
    data() {
      return {
        current: 0,
        steps: [
          {
            title: 'First',
            content: 'First-content',
          },
          {
            title: 'Second',
            content: 'Second-content',
          },
          {
            title: 'Last',
            content: 'Last-content',
          },
        ],
      };
    },
    methods: {
      next() {
        this.current++;
      },
      prev() {
        this.current--;
      },
    },
  };
  </script>
  <style scoped>
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }
  
  .steps-action {
    margin-top: 24px;
  }
  </style>
  