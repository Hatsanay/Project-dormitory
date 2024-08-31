<template>
    <div>
        <WidgetsStatsD class="mb-4" />
        <CRow>
            <CCol :md="10">
            </CCol>
            <CCol :md="2">
                <CButton color="primary" class="w-100" block style="margin-bottom: 20px;"
                    @click="$router.push('/RegisResident')">
                    New
                </CButton>
            </CCol>
        </CRow>
        <CRow>
            <CCol :md="12">
                <CCard class="mb-4">
                    <CCardHeader>ตารางผู้ใช้งานระบบ</CCardHeader>
                    <CCardBody>
                        
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>

        <CToaster class="p-3" placement="top-end">
            <CToast v-for="(toast, index) in toasts" :key="index" visible>
                <CToastHeader closeButton>
                    <span class="me-auto fw-bold">{{ toast.title }}</span>
                </CToastHeader>
                <CToastBody>{{ toast.content }}</CToastBody>
            </CToast>
        </CToaster>
    </div>
</template>

<script>
// import VueGoodTable from 'vue-good-table';
// import 'vue-good-table/dist/vue-good-table.css';

export default {
    name: "ViewResComponents",
    components: {
    },

};
</script>
