<template>
  <div>
    <!-- Cards -->
    <CardInfo></CardInfo>
    <!-- / Cards -->
  </div> 
</template>

<script>
import CardInfo from "../components/Cards/CardInfo";




export default {
  components: {
    CardInfo
  },
  data() {
    return {
      current: ["employees"],
    };
  },
  methods:{
    logKeys(){
      console.log(this.current[0])
    }
  }
};
</script>
<style>
#components-layout-demo-top .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}

</style>
