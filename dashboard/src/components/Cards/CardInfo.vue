<template>

	<a-card :bordered="false" class="card-info">
		<a-row type="flex">
			<a-col class="col-content" :span="24" :xl="12" v-for="client in clients" :key="client.id">
				<div class="card-content">
					<h5>{{client.address}}</h5>
					<p>2nd Avenue,Ngong</p>
					<p>0705122230,barizicommunications.com</p>
				</div>
				
			</a-col>
			<a-col class="col-img" :span="24" :xl="12" >
				<div class="card-img-bg" >
					<img :src="client.logo" alt="">
				</div> 
			</a-col>
		</a-row>
	</a-card>

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