<template>
  <div>
    <a-row type="flex" align="stretch" class="mb-10">
      <a-col :span="24" :md="12" class="col-info">
        <a-input-search
          placeholder="search client"
          style="width: 200px"
          @search="onSearch"
          :loading="searchLoading"
          v-model="searchQuery"
        />
      </a-col>
      <a-col :span="24" :md="12" class="col-info">
        <a-button type="primary">Add New</a-button>
      </a-col>
    </a-row>
    <!-- Cards -->
    <CardInfo :clients="resultQuery"></CardInfo>
    <!-- / Cards -->
  </div>
</template>

<script>
import CardInfo from "../components/Cards/CardInfo";
import { mapState } from "vuex";

export default {
  components: {
    CardInfo,
  },
  data() {
    return {
      current: ["employees"],
      searchQuery: null,
      searchLoading: false,
      allowed: false,
    };
  },
  methods: {
    logKeys() {
      console.log(this.current[0]);
    },
      onSearch(value) {
      console.log(value, this.searchQuery);
      if (this.searchQuery) {
        this.visible = true;
        return this.assets.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => {
              item.asset_name.toLowerCase().includes(v)||item.category.toLowerCase().includes(v)
            });
        });
      } else {
        return this.assets;
      }
    },
  },

   computed: {
    ...mapState(["clients","currentClient"]),
    resultQuery() {
      if (this.searchQuery) {
        return this.clients.filter((item) => {
          return this.searchQuery.toString()
            .toLowerCase()
            .split(" ")
            .every((v) => item.company_name.toLowerCase().includes(v));
        });
      } else {
        return this.clients;
      }
    },
  },
    mounted() {
    this.$store.dispatch("getClients");
     this.$store.dispatch("getCurrentClient");
    

  },
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
