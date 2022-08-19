<template>
  <a-row :gutter="24" type="flex" align="stretch">
    <a-col
      :span="24"
      :lg="8"
      class="mb-24"
      v-for="client in clients"
      :key="client.id"
    >
      <a-card
        :bordered="false"
        class="card-info"
        :title="client.company_name"
        :span="24"
        :lg="16"
        ref="clientcard"
        @click="
          () => {
            switchClient(client);
          }
        "
      >
        <a slot="extra" href="#"><a-icon type="delete" class="ml-10" /> </a>
        <a-row type="flex">
          <a-col class="col-content">
            <div class="card-content">
              <p>{{ client.address }}</p>
              <p>{{ client.company_phone }}</p>
              <p>{{ client.company_email }}</p>
            </div>
          </a-col>
          <a-col class="col-img" :span="24" :lg="8">
            <a-avatar :src="client.logo" :size="104" />
          </a-col>
        </a-row>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      image:
        "https://firebasestorage.googleapis.com/v0/b/scanpal-f74da.appspot.com/o/barizi.png?alt=media&token=4039f5ff-b1d4-4084-a02d-fdae939a3d61",
    };
  },
  computed: {
    ...mapState(["clients","currentClient"]),
    formattedName() {
      return function formatName(name) {
        const newName = name.slice(40);
        return newName;
      };
    },
  },
  methods: {
    formatName(name) {
      const newName = name.slice(40);
      return newName;
    },
    switchClient(index) {
      console.log("this is the index",index)
      const selected = this.clients.indexOf(index);

      this.clients.forEach((client) => {
        if (this.clients.indexOf(client) == selected) {
          this.$refs.clientcard[selected].$el.classList.add("selected-client");
          localStorage.setItem("client", JSON.stringify(client));
          this.$store.dispatch("getCurrentClient");
        } else {
          this.$refs.clientcard[
            this.clients.indexOf(client)
          ].$el.classList.remove("selected-client");
        }
      });
    },
  },
  mounted() {
    this.$store.dispatch("getClients");
     this.$store.dispatch("getCurrentClient");
    

  },
  updated(){
 this.switchClient(this.currentClient);
  }
};
</script>
<style scoped>
.card-inner-img {
  height: 100%;
  width: 50px;
}
.selected-client {
  background-color: #435353;
}
</style>
