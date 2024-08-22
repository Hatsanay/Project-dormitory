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
    component: 'CNavGroup',
    name: 'จัดการผู้ใช้งาน',
    to: '#',
    icon: 'cil-people',
    items: [
      {
        component: 'CNavItem',
        name: 'จัดการผู้พักอาศัย',
        to: '/RegisResident',
      },
    
      {
        component: 'CNavItem',
        name: 'จัดการนิติบุคคล',
        to: '#',
      },
    
      {
        component: 'CNavItem',
        name: 'จัดการเจ้าหน้าที่ซ่อมบำรุง',
        to: '#',
      },
    
      {
        component: 'CNavItem',
        name: 'จัดการผู้จัดการ',
        to: '#',
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
