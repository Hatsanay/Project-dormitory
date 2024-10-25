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

export default {
  name: "starffTimeReq",
  components: {
    FullCalendar,
  },
  setup() {
    const activeTab = ref("1");

    // Example events (you can fetch these from your backend)
    const events = ref([
      {
        title: "งานซ่อม",
        start: "2024-10-25T10:00:00",
        end: "2024-10-25T12:00:00",
        description: "ซ่อมแอร์",
      },
      {
        title: "ตรวจสอบระบบ",
        start: "2024-10-26T14:00:00",
        end: "2024-10-26T16:00:00",
        description: "ตรวจสอบสายไฟ",
      },
    ]);

    // FullCalendar options
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
      dateClick(info) {
        alert("วันที่คุณเลือกคือ: " + info.dateStr);
      },
    });

    const switchTab = (tab) => {
      activeTab.value = tab;
    };

    onMounted(() => {
      // Do something on mount if needed
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

<style scoped></style>
