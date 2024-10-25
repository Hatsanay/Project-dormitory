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
        <CRows>
          <CFormSelect v-model="selectedClass" aria-label="Filter by Class">
          <option value="">ช่างทั้งหมด</option>

        </CFormSelect>
        <br>
        </CRows>
        <CRows>
          <FullCalendar :events="events" :options="calendarOptions" ref="calendar" />
        </CRows>
      </div>

      <div v-if="activeTab === '2'" class="tab-pane active">
        <!-- Content for scheduling repairs -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watchEffect } from "vue";
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
      eventClassNames: () => ["custom-event"], // กำหนด class name ให้กับ event
      eventContent: function (arg) {
        return {
          html: `<div>
                        <span class="event-time">${arg.event.startStr.slice(
                          11,
                          16
                        )} - ${arg.event.endStr.slice(11, 16)}</span>
                        <span class="event-title">${arg.event.title}</span>
                      </div>`,
        };
      },
      dateClick(info) {
        alert("วันที่คุณเลือกคือ: " + info.dateStr);
      },
    });

    const fetchRepairSchedule = async () => {
      try {
        const response = await axios.get("/api/auth/getreqtime");
        console.log("API Response:", response.data);

        events.value = response.data.map((item) => {
          const date = item.Date;
          const formattedStartTime = `${date}T${item.startTime}`;
          const formattedEndTime = `${date}T${item.endTime}`;

          const technicians = item.technicians
            .map((tech) => `<br>ช่าง: ${tech}`)
            .join("");

          return {
            title: ` ${item.sdr_mainr_ID} ห้อง: ${item.room} ${technicians}`,
            start: formattedStartTime,
            end: formattedEndTime,
            description: `รายละเอียดงานซ่อม ${item.sdr_mainr_ID}`,
          };
        });

        console.log("Events:", events.value);
      } catch (error) {
        console.error("Error fetching repair schedule:", error);
      }
    };

    watchEffect(() => {
      calendarOptions.value.events = events.value;
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
.custom-event {
  background-color: #e6f7ff; /* สีพื้นหลังแบบอ่อน */
  border: 2px solid #007bff; /* เพิ่มกรอบสีน้ำเงิน */
  border-radius: 8px; /* มุมมนของกรอบ */
  padding: 8px;
  margin: 4px 0;
  color: #333;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.2); /* เพิ่มเงา */
  transition: background-color 0.3s ease; /* เพิ่มการเปลี่ยนสีเมื่อ hover */
}

.custom-event:hover {
  background-color: #cceeff; /* เปลี่ยนสีพื้นหลังเมื่อ hover */
}

.event-time {
  font-weight: bold;
  font-size: 12px;
  color: #007bff;
}

.event-title {
  font-size: 14px;
  font-weight: bold;
  margin-top: 5px;
  color: #007bff;
  white-space: pre-line; /* แก้ไขเพื่อแสดงบรรทัดใหม่ */
}

.fc-event-time {
  display: none;
}
</style>
