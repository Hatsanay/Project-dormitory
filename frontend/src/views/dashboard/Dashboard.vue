<template>
  <div>
    <ul class="nav nav-tabs">
      <li v-if="showTab1" class="nav-item">
        <a
          class="nav-link"
          :class="{ active: activeTab === '1' }"
          @click.prevent="switchTab('1')"
          href="#"
        >
          Dashboard ผู้ใช่งาน
        </a>
      </li>
      <li v-if="showTab2" class="nav-item">
        <a
          class="nav-link"
          :class="{ active: activeTab === '2' }"
          @click.prevent="switchTab('2')"
          href="#"
        >
          Dashboard นิติ
        </a>
      </li>
      <li v-if="showTab3" class="nav-item">
        <a
          class="nav-link"
          :class="{ active: activeTab === '3' }"
          @click.prevent="switchTab('3')"
          href="#"
        >
          Dashboard ช่าง
        </a>
      </li>
    </ul>

    <div class="tab-content mt-3">
      <div v-if="showTab1 && activeTab === '1'" class="tab-pane active">
        Dashboard ผู้ใช้งาน
      </div>
      <div v-if="showTab2 && activeTab === '2'" class="tab-pane active">
        Dashboard นิติ
      </div>
      <div v-if="showTab3 && activeTab === '3'" class="tab-pane active">
        Dashboard ช่าง
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watchEffect, computed } from "vue";

export default {
  name: "Dashboard",
  components: {},
  setup() {
    const permissions = localStorage.getItem("permissions") || "0000000000000000";
    const showTab1 = permissions.charAt(2) === "1";
    const showTab2 = permissions.charAt(3) === "1";
    const showTab3 = permissions.charAt(4) === "1";
    const activeTab = ref(null);

    console.log(showTab1, showTab2, showTab3);
    const switchTab = (tab) => {
      activeTab.value = tab;
      if (tab === "1") {
      } else if (tab === "2") {
      } else if (tab === "3") {
      } else if (tab === "4") {
      }
    };

    onMounted(() => {
      activeTab.value = showTab1 ? "1" : showTab2 ? "2" : showTab3 ? "3" : null;
    });
    return {
      activeTab,
      switchTab,
      permissions,
      showTab1,
      showTab2,
      showTab3,
    };
  },
};
</script>

<style scoped></style>
