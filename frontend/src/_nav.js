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
    permission_index: 2,  
  },
  {
    component: 'CNavItem',
    name: 'ส่งคำร้องแจ้งซ่อม',
    to: '/UserReqView',
    icon: 'cilSend',
    permission_index: 2, 
  },
  ///ระบบจัดการการแจ้งปัญหา///
  {
    component: 'CNavTitle',
    name: 'จัดการการแจ้งซ่อม',
    permission_index: [4, 5],
  },
  {
    component: 'CNavItem',
    name: 'คำร้องขอแจ้งซ่อม',
    to: '/StaffMgnReqView',
    icon: 'cilEnvelopeOpen',
    permission_index: 4,
  },
  {
    component: 'CNavItem',
    name: 'รับคำร้องขอแจ้งซ่อม',
    to: '/macMgnReqView',
    icon: 'cilDescription',
    permission_index: 5,
  },
  ///ระบบจัดการการเบิกวัสดุ///
  {
    component: 'CNavTitle',
    name: 'จัดการการเบิกวัสดุ',
    permission_index: 6,
  },
  {
    component: 'CNavItem',
    name: 'เบิกวัสดุ',
    to: '/starffWithdrawReqView',
    icon: 'cilBasket',
    permission_index: 6, 
  },
  ///ระบบนัดเวลาเข้าซ่อม///
  {
    component: 'CNavTitle',
    name: 'จัดการนัดเวลาเข้าซ่อม',
    permission_index: 7, 
  },
  {
    component: 'CNavItem',
    name: 'นัดเวลาเข้าซ่อม',
    to: '/starffTimeReqView',
    icon: 'cilClock',
    permission_index: 7,
  },
  ///จัดการค่าคงที่ผู้ใช้งาน///
  {
    component: 'CNavTitle',
    name: 'จัดการผู้ใช้งาน',
    permission_index: 8, 
  },
  {
    component: 'CNavItem',
    name: 'ผู้ใช้งาน',
    to: '/ViewResident',
    icon: 'cil-people',
    permission_index: 8, 
  },
  ///จัดการค่าคงที่ห้องพัก///
  {
    component: 'CNavTitle',
    name: 'จัดการห้องพักอาศัย',
    permission_index: 12, 
  },
  {
    component: 'CNavItem',
    name: 'ห้องพักอาศัย',
    to: '/Room',
    icon: 'cilRoom',
    permission_index: 12,  
  },
  ///ตั้งค่า///
  {
    component: 'CNavTitle',
    name: 'ตั้งค่าข้อมูลระบบ',
    permission_index: 14,  
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
        permission_index: 14,
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
