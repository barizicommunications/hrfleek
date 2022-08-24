<template>
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
</template>
<script>
import moment from "moment";
import { mapState } from "vuex";
export default {
  data() {
    return {
      setevents: [
        {
          date: moment("2012-08-15"),
          type: "warning",
          content: "meeting with ron.",
        },
        {
          date: moment("2012-08-05"),
          type: "success",
          content: "Wedding at crystal.",
        },
        {
          date: moment("2017-08-20"),
          type: "success",
          content: "moment with java.",
        },
      ],
    };
  },

  methods: {
    onPanelChange(value, mode) {
      console.log(value, mode);
    },
    onSelect(value) {
      let date = value.toDate();

      let listData = this.calendars.filter(
        (e) => e.date.toDate().getUTCDate() == date.getUTCDate()
      );
      console.log(
        date.toLocaleDateString("en-US"),
        listData,
        this.calendars[0].date.toDate().toLocaleDateString("en-US")
      );
    },
    getListData(value) {
      let listData = [];
      this.calendars.forEach((element) => {
        if (value.toDate().toLocaleDateString("en-US")== element.date.toDate().toLocaleDateString("en-US")) {
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
