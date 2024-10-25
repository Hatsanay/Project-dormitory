export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'primary',
    },
    permission_index: 1,  
  },
  ///ระบบแจ้งปัญหา///
  {
    component: 'CNavTitle',
    name: 'แจ้งซ่อมบำรุงห้องพัก',
    permission_index: 5,  
  },
  {
    component: 'CNavItem',
    name: 'ส่งคำร้องแจ้งซ่อม',
    to: '/UserReqView',
    icon: 'cilSend',
    permission_index: 5, 
  },
  ///ระบบจัดการการแจ้งปัญหา///
  {
    component: 'CNavTitle',
    name: 'จัดการการแจ้งซ่อม',
    permission_index: [7, 8],
  },
  {
    component: 'CNavItem',
    name: 'คำร้องขอแจ้งซ่อม',
    to: '/StaffMgnReqView',
    icon: 'cilEnvelopeOpen',
    permission_index: 7,
  },
  {
    component: 'CNavItem',
    name: 'รับคำร้องขอแจ้งซ่อม',
    to: '/macMgnReqView',
    icon: 'cilDescription',
    permission_index: 8,
  },
  ///ระบบจัดการการเบิกวัสดุ///
  {
    component: 'CNavTitle',
    name: 'จัดการการเบิกวัสดุ',
    permission_index: 9,
  },
  {
    component: 'CNavItem',
    name: 'เบิกวัสดุ',
    to: '/starffWithdrawReqView',
    icon: 'cilBasket',
    permission_index: 9, 
  },
  ///ระบบนัดเวลาเข้าซ่อม///
  {
    component: 'CNavTitle',
    name: 'จัดการนัดเวลาเข้าซ่อม',
    permission_index: 10, 
  },
  {
    component: 'CNavItem',
    name: 'นัดเวลาเข้าซ่อม',
    to: '/starffTimeReqView',
    icon: 'cilClock',
    permission_index: 10,
  },
  ///จัดการค่าคงที่ผู้ใช้งาน///
  {
    component: 'CNavTitle',
    name: 'จัดการผู้ใช้งาน',
    permission_index: 11, 
  },
  {
    component: 'CNavItem',
    name: 'ผู้ใช้งาน',
    to: '/ViewResident',
    icon: 'cil-people',
    permission_index: 11, 
  },
  ///จัดการค่าคงที่ห้องพัก///
  {
    component: 'CNavTitle',
    name: 'จัดการห้องพักอาศัย',
    permission_index: 14, 
  },
  {
    component: 'CNavItem',
    name: 'ห้องพักอาศัย',
    to: '/ViewRoomView',
    icon: 'cilRoom',
    permission_index: 14,
  },
  ///ตั้งค่า///
  {
    component: 'CNavTitle',
    name: 'ตั้งค่าข้อมูลระบบ',
    permission_index: [17, 20, 23, 26, 29],
  },

  {
    component: 'CNavGroup',
    name: 'จัดการข้อมูลภายในระบบ',
    to: '#',
    icon: 'cil-notes',
    items: [
      {
        component: 'CNavItem',
        name: 'จัดการข้อมูลสต็อก',
        to: '/ViewStockView',
        permission_index: 17,
      },
      {
        component: 'CNavItem',
        name: 'จัดการข้อมูลประเภทสต็อก',
        to: '/ViewTypeStockView',
        permission_index: 20,
      },
      {
        component: 'CNavItem',
        name: 'จัดการข้อมูลสถานะ',
        to: '/',
        permission_index: 23,
      },
      {
        component: 'CNavItem',
        name: 'จัดการข้อมูลประเภทสถานะ',
        to: '/ViewTypeStatusView',
        permission_index: 26,
      },
      {
        component: 'CNavItem',
        name: 'จัดการข้อมูลหน่วย',
        to: '/ViewUnitView',
        permission_index: 29,
      },

    ],
  },
  {
    component: 'CNavTitle',
    name: 'ออกจากระบบ',
    permission_index: 0, 
  },
  {
    component: 'CNavItem',
    name: 'LOGOUT',
    to: '/login',
    icon: 'cilAccountLogout',
    permission_index: 0, 
  },
];
