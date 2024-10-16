

export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'primary',
    },
  },
  ///ระบบแจ้งปัญหา///
  {
    component: 'CNavTitle',
    name: 'แจ้งซ่อมบำรุงห้องพัก',
  },
  {
    component: 'CNavItem',
    name: 'ส่งคำร้องแจ้งซ่อม',
    to: '/UserReqView',
    icon: 'cil-people',
  },
  ///ระบบจัดการการแจ้งปัญหา///
  {
    component: 'CNavTitle',
    name: 'จัดการการแจ้งซ่อม',
  },
  {
    component: 'CNavItem',
    name: 'คำร้องขอแจ้งซ่อม',
    to: '/StaffMgnReqView',
    icon: 'cil-people',
  },

  ///จัดการค่าคงที่ผู้ใช้งาน///
  {
    component: 'CNavTitle',
    name: 'จัดการผู้ใช้งาน',
  },
  {
    component: 'CNavItem',
    name: 'ผู้ใช้งาน',
    to: '/ViewResident',
    icon: 'cil-people',
  },

  ///จัดการค่าคงที่ห้องพัก///
  {
    component: 'CNavTitle',
    name: 'จัดการห้องพักอาศัย',
  },

  {
    component: 'CNavItem',
    name: 'ห้องพักอาศัย',
    to: '/Room',
    icon: 'cil-people',
  },


  ///ตั้งค่า///
  {
    component: 'CNavTitle',
    name: 'ตั้งค่าข้อมูลระบบ',
  },
  {
    component: 'CNavGroup',
    name: 'ตั้งค่า',
    to: '#',
    icon: 'cil-notes',
    items: [
      {
        component: 'CNavItem',
        name: 'ตั้งค่าโปรไฟล์',
        to: '/UserSetView',
      },
    ],
  },
  {
    component: 'CNavItem',
    name: 'LOGOUT',
    to: '/login',
    icon: 'cil-notes',
  },
   
]
