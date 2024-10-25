<template>
  <div>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: activeTab === '1' }"
          @click.prevent="switchTab('1')"
          href="#"
        >
          <i class="fa-solid fa-calendar-days"></i>
          ปฎิทินเวลาซ่อม
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: activeTab === '2' }"
          @click.prevent="switchTab('2')"
          href="#"
        >
          <i class="fa-solid fa-clock"></i>
          นัดเวลาซ่อม
        </a>
      </li>
    </ul>

    <div class="tab-content mt-3">
      <div v-if="activeTab === '1'" class="tab-pane active">
        <FullCalendar :events="events" :options="calendarOptions" ref="calendar" />
      </div>

      <div v-if="activeTab === '2'" class="tab-pane active">
        <!-- Content for scheduling repairs -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";

export default {
  name: "starffTimeReq",
  components: {
    FullCalendar,
  },
  setup() {
    const activeTab = ref("1");

    const events = ref([]);

    const fetchRepairSchedule = async () => {
      try {
        const permissions = localStorage.getItem("permissions");
        console.log(permissions);
        const response = await axios.get("/api/auth/getreqtime");
        console.log("API Response:", response.data); // ตรวจสอบข้อมูลจาก API

        events.value = response.data.map((item) => {
          // แปลงวันที่จาก พ.ศ. เป็น ค.ศ. และจัดรูปแบบวันที่เป็น YYYY-MM-DD
          const [day, month, year] = item.Date.split("/");
          const convertedYear = parseInt(year, 10) - 543; // แปลง พ.ศ. เป็น ค.ศ.

          const formattedDate = `${convertedYear}-${month.padStart(
            2,
            "0"
          )}-${day.padStart(2, "0")}`;
          const formattedTime = `${formattedDate}T${item.Time}`; // รวมวันที่และเวลา

          console.log(`Formatted Date: ${formattedDate}, Time: ${item.Time}`); // ตรวจสอบรูปแบบวันที่และเวลา

          return {
            title: `${item.Time} - ${item.sdr_mainr_ID}`,
            start: formattedTime,
            description: `รายละเอียดงานซ่อม ${item.sdr_mainr_ID}`,
          };
        });

        console.log("Events:", events.value); // ตรวจสอบว่าข้อมูล events ถูกสร้างอย่างถูกต้อง
      } catch (error) {
        console.error("Error fetching repair schedule:", error);
      }
    };

    const calendarOptions = ref({
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: "dayGridMonth",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      },
      editable: true,
      selectable: true,
      selectMirror: true,
      eventContent: function (arg) {
        return {
          html: `<span>${arg.event.title}</span>`, // Customize how events are displayed
        };
      },
      dateClick(info) {
        alert("วันที่คุณเลือกคือ: " + info.dateStr);
      },
    });

    const switchTab = (tab) => {
      activeTab.value = tab;
    };

    onMounted(() => {
      fetchRepairSchedule();
    });

    return {
      activeTab,
      switchTab,
      events,
      calendarOptions,
    };
  },
};
</script>

<style scoped>
/* Customize event appearance */
.fc-event-time {
  display: none;
}

.fc-event-title {
  font-size: 12px;
  font-weight: bold;
  color: blue;
}
</style>
