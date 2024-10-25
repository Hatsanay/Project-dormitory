

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
    icon: 'cilSend',
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
    icon: 'cilEnvelopeOpen',
  },
  {
    component: 'CNavItem',
    name: 'รับคำร้องขอแจ้งซ่อม',
    to: '/macMgnReqView',
    icon: 'cilDescription',
  },

  ///ระบบจัดการการเบิกวัสดุ///
  {
    component: 'CNavTitle',
    name: 'จัดการการเบิกวัสดุ',
  },
  {
    component: 'CNavItem',
    name: 'เบิกวัสดุ',
    to: '/starffWithdrawReqView',
    icon: 'cilBasket',
  },

  ///ระบบนัดเวลาเข้าซ่อม///
 {
    component: 'CNavTitle',
    name: 'จัดการนัดเวลาเข้าซ่อม',
  },
  {
    component: 'CNavItem',
    name: 'นัดเวลาเข้าซ่อม',
    to: '/starffTimeReqView',
    icon: 'cilClock',
  },
  

  ///จัดการค่าคงที่ผู้ใช้งาน///
  {
    component: 'CNavTitle',
    name: 'จัดการผู้ใช้งาน',
  },
  {
    component: 'CNavItem',
<<<<<<< HEAD
    name: 'ผู้ใช้งาน',
    to: '/ViewResident',
    icon: 'cil-people',
  },
=======
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
>>>>>>> 45ad983de95c8c2c2e4c37186f33d20b42af427b

  ///จัดการค่าคงที่ห้องพัก///
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

<<<<<<< HEAD
=======
  
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
>>>>>>> 45ad983de95c8c2c2e4c37186f33d20b42af427b

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
        to: '/',
      },
      {
        component: 'CNavItem',
        name: 'จัดการข้อมูลประเภทสถานะ',
        to: '/ViewTypeStatusView',
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

  ///ตั้งค่า///
  {
    component: 'CNavTitle',
    name: 'ตั้งค่าข้อมูลระบบ',
  },
  {
    component: 'CNavGroup',
    name: 'ตั้งค่า',
    to: '#',
    icon: 'cilSettings',
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
    icon: 'cilAccountLogout',
  },
   
]