<template>
  <a-card :bordered="false" class="card-info">
    
    <a-row type="flex">
      <a-col class="col-content" :span="24" :xl="12">
        <div class="card-content">
          <h5>WORKSPACE:<span class="mx-5 text-primary">{{ client.company_name }}</span></h5>
          <h5>email:<span class="text-primary">{{ client.company_email }}</span></h5>
          <h5>Phone:<span class="text-primary">{{ client.company_phone }}</span></h5>
        </div>
      </a-col>
      <a-col class="col-img" :span="24" :xl="12">
        <a-avatar :src="client.logo" alt="logo" :size="150"  class="bg-gray-6"/>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
export default {
  props:['client'],
  computed: {
  },
  mounted() {
  },
};
</script>
