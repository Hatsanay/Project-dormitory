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
  {
    component: 'CNavTitle',
    name: 'แจ้งซ่อม',
  },
  {
    component: 'CNavItem',
    name: 'แจ้งซ่อมบำรุงหอพัก',
    to: '/UserReqView',
    icon: 'cil-people',
  },

  {
    component: 'CNavTitle',
    name: 'จัดการผู้ใช้งาน',
  },
  {
    component: 'CNavItem',
    name: 'จัดการผู้ใช้งาน',
    to: '/ViewResident',
    icon: 'cil-people',
  },
  // {
  //   component: 'CNavItem',
  //   name: 'จัดการผู้ใช้งานในระบบ',
  //   to: '/RegisResident',
  //   icon: 'cil-people',
  // },

  // {
  //   component: 'CNavItem',
  //   name: 'จัดการนิติบุคคล',
  //   to: '#',
  //   icon: 'cil-people',
  // },

  // {
  //   component: 'CNavItem',
  //   name: 'จัดการเจ้าหน้าที่ซ่อมบำรุง',
  //   to: '#',
  //   icon: 'cil-people',
  // },

  // {
  //   component: 'CNavItem',
  //   name: 'จัดการผู้จัดการ',
  //   to: '#',
  //   icon: 'cil-people',
  // },

  {
    component: 'CNavTitle',
    name: 'จัดการห้องพักอาศัย',
  },
  {
    component: 'CNavItem',
    name: 'จัดการห้องพักอาศัย',
    to: '/ViewRoomView',
    icon: 'cil-people',
  },

  
  {
    component: 'CNavTitle',
    name: 'จัดการข้อมูลอื่นๆ',
  },
  {
    component: 'CNavGroup',
    name: 'จัดการข้อมูลภายในระบบ',
    to: '#',
    icon: 'cil-notes',
    items: [
      {
        component: 'CNavItem',
        name: 'จัดการข้อมูลสถานะ',
        to: '/UserSetView',
      },
      {
        component: 'CNavItem',
        name: 'จัดการข้อมูลประเภทสถานะ',
        to: '/UserSetView',
      },
      {
        component: 'CNavItem',
        name: 'จัดการข้อมูลสต็อก',
        to: '/ViewStockView',
      },
      {
        component: 'CNavItem',
        name: 'จัดการข้อมูลประเภทสต็อก',
        to: '/ViewTypeStockView',
      },
      {
        component: 'CNavItem',
        name: 'จัดการข้อมูลหน่วย',
        to: '/ViewUnitView',
      },
    ],
  },

  {
    component: 'CNavTitle',
    name: 'ตั้งค่า',
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