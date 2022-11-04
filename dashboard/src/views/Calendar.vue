<template>
  <card-calendar></card-calendar>
</template>

<script>
import CardCalendar from "../components/Cards/CardCalendar.vue";
export default {
  components: { CardCalendar },
  data() {
    return {

    };
  },
  methods: {

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
