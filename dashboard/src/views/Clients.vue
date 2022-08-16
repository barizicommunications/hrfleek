<template>
  <div>
    <!-- Cards -->
    <a-row :gutter="24" type="flex" align="stretch">
      <a-col :span="24" :lg="8" class="mb-24">
        <CardInfo></CardInfo>
      </a-col>
      <a-col :span="24" :lg="8" class="mb-24">
        <CardInfo></CardInfo>
      </a-col>
      <a-col :span="24" :lg="8" class="mb-24">
        <CardInfo></CardInfo>
      </a-col>
    </a-row>
    <!-- / Cards -->
    <client-form></client-form>
  </div>
</template>

<script>
import CardInfo from "../components/Cards/CardInfo";
import ClientForm from "../components/forms/ClientForm.vue";
export default {
  components: {
    CardInfo,
    ClientForm,
  },
};
</script>

<style></style>
