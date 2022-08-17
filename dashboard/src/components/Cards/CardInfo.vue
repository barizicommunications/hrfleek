<template>
	<a-row :gutter="24" type="flex" align="stretch">
	<a-col :span="24" :lg="12" class="mb-24"  v-for="client in clients" :key="client.id">
	<a-card :bordered="false" class="card-info" :span="24" :lg="12">
		<a-row type="flex">
			<a-col class="col-content" >
				<div class="card-content">
					<h5>{{client.company_name}}</h5>
					<p>{{client.address}}</p>
					<p>{{client.company_phone}},{{client.company_email}}</p>
				</div>
				
			</a-col>
			<a-col class="col-img" :span="24" :lg="12" >
				<div class="card-img-bg" >
					<img :src="client.logo" alt="">
				</div> 
			</a-col>
		</a-row>
	</a-card>
</a-col>
	</a-row>

</template>

<script>
import { mapState } from "vuex";


	export default ({
		data() {
			return {
				image:"https://firebasestorage.googleapis.com/v0/b/scanpal-f74da.appspot.com/o/barizi.png?alt=media&token=4039f5ff-b1d4-4084-a02d-fdae939a3d61"
			}
		},
		computed:{
			...mapState(['clients'])
		},
		mounted(){
			this.$store.dispatch("getClients");
		}
	})

</script>
<style scoped>
.card-inner-img{
	height: 100%;
	width: 50px;
}
</style>