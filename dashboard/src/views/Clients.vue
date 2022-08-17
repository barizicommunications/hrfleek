<template>
  <div>
    <!-- Cards -->
     <CardInfo></CardInfo>
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
