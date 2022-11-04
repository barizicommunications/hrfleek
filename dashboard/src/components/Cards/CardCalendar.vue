<template>
<div>

      <a-modal v-model="visible" :title="selectedDate" on-ok="handleOk">
      <template slot="footer">
        <a-button key="back" @click="handleCancel">
          Close
        </a-button>
       
      </template>
      	<a-card :bordered="false" class="card-info-2 h-full" v-for="selected in selectedCalendar" :key="selected.id">
		<div class="col-content h-full" style="background-image: url('images/info-card-2.jpg')">
			<div class="card-content">
				<h5>{{selected.calendar_name}}</h5>
				<p>Payment cycle:{{selected.payment_cycle}}</p>
        <p>Payment date:{{selected.date.toDate().toLocaleDateString()}}</p>
        
			</div>
			<div class="card-footer">
				<a-button size="small" type="primary">
					<router-link :to="'/payrun/'+selected.id" v-if="selected.date.toDate()>=new Date()"><span>Create A payrun</span></router-link>
          <router-link :to="'/payrun/'+selected.id" v-else><span>View Payrun</span></router-link>
					<svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M7.29289 14.7071C6.90237 14.3166 6.90237 13.6834 7.29289 13.2929L10.5858 10L7.29289 6.70711C6.90237 6.31658 6.90237 5.68342 7.29289 5.29289C7.68342 4.90237 8.31658 4.90237 8.70711 5.29289L12.7071 9.29289C13.0976 9.68342 13.0976 10.3166 12.7071 10.7071L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071Z" fill="#111827"/>
					</svg>
				</a-button>
			</div>
		</div>
	</a-card>
    </a-modal>
    <a-calendar @select="onSelect">
    <ul slot="dateCellRender" slot-scope="value" class="events">
      <li v-for="item in getListData(value)" :key="item.id">
        <a-badge status="success" :text="item.calendar_name" />
      </li>
    </ul>
    <template slot="monthCellRender" slot-scope="value">
      <div v-if="getMonthData(value)" class="notes-month"></div>
    </template>
  </a-calendar>
</div>
</template>
<script>
import moment from "moment";
import { mapState } from "vuex";
export default {
  data() {
    return {
      selectedCalendar: [],
      visible:false,
      loading:false,
      selectedDate:"",
      
    };
  },

  methods: {
    handleCancel(){
this.visible =false
    },
    handleOk(){
      this.visible =false
    },
    onPanelChange(value, mode) {
      console.log(value, mode);
    },
    onSelect(value) {
      let date = value.toDate().toLocaleDateString("en-US");

      let listData = this.calendars.filter(
        (e) => e.date.toDate().toLocaleDateString("en-US") == date
      );
      this.selectedCalendar = listData;
      this.selectedDate=date
      if(listData.length){
        this.visible =true
      }
    },
    getListData(value) {
      let listData = [];
      this.calendars.forEach((element) => {
        if (
          value.toDate().toLocaleDateString("en-US") ==
          element.date.toDate().toLocaleDateString("en-US")
        ) {
          listData.push(element);
        }
      });

      return listData || [];
    },

    getMonthData(value) {
      if (value.month() === 8) {
        return 1394;
      }
    },
  },
  computed: {
    ...mapState(["calendars"]),
  },
  mounted() {
    this.$store.dispatch("getCalendars");
  },
};
</script>
<style scoped>
.events {
  list-style: none;
  margin: 0;
  padding: 0;
}
.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}
.notes-month {
  text-align: center;
  font-size: 28px;
}
.notes-month section {
  font-size: 28px;
}
</style>
