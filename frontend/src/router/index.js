import DefaultLayout from '@/layouts/DefaultLayout';
import { createRouter, createWebHashHistory } from 'vue-router';
<<<<<<< HEAD
=======

import RegisResView from '../views/Admin/RegisResView.vue';
import EditResView from '../views/Admin/EditResView.vue';
import ViewResView from '../views/Admin/ViewResView.vue';

import RegisRoom from '../views/Admin/RegisRoom.vue';
import ViewRoomView from '../views/Admin/ViewRoomView.vue';
import EditRoomView from '../views/Admin/EditRoomView.vue';

import ViewUnitView from '../views/Admin/ViewUnitView.vue';
import RegisUnit from '../views/Admin/RegisUnit.vue';

import ViewStockView from '../views/Admin/ViewStockView.vue';
import RegisStock from '../views/Admin/RegisStock.vue';

import ViewTypeStockView from '../views/Admin/ViewTypeStockView.vue';
import RegisTypeStock from '../views/Admin/RegisTypeStock.vue';

>>>>>>> 45ad983de95c8c2c2e4c37186f33d20b42af427b
import userDasboard from '../views/dashboard/Dashboard.vue';
import AddReqView from '../views/Request/UserAddReqView.vue';
import ReqView from '../views/Request/UserReqView.vue';
//import Room from '../views/staticRoom/Room.vue';
import EditResView from '../views/staticUsers/EditResView.vue';
import RegisResView from '../views/staticUsers/RegisResView.vue';
import ViewResView from '../views/staticUsers/ViewResView.vue';

import macMgnReqView from '../views/ManageRequets/macMgnReqView.vue';
import StaffMgnReqView from '../views/ManageRequets/StaffMgnReqView.vue';
import starffTimeReqView from '../views/ManageRequets/starffTimeReqView.vue';
import starffWithdrawReqView from '../views/ManageRequets/starffWithdrawReqView.vue';

import RegisRoom from '../views/staticRoom/RegisRoom.vue';
import ViewRoomView from '../views/staticRoom/ViewRoomView.vue';
import EditRoomView from '../views/staticRoom/EditRoomView.vue';

import ViewUnitView from '../views/staticUnit/ViewUnitView.vue';
import RegisUnit from '../views/staticUnit/RegisUnit.vue';

import ViewStockView from '../views/staticStock/ViewStockView.vue';
import RegisStock from '../views/staticStock/RegisStock.vue';

import ViewTypeStockView from '../views/staticTypeStock/ViewTypeStockView.vue';
import RegisTypeStock from '../views/staticTypeStock/RegisTypeStock.vue';

import ViewTypeStatusView from '../views/staticTypeStatus/ViewTypeStatusView.vue';

import { clearToken, hasPermission, isAuthenticated } from './auth';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/login',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        meta: { permission: 'view_users_dashboard', requiresAuth: true },
        component: userDasboard,
      },
      {
        path: '/adminDashboard',
        name: 'AdminDashboard',
        meta: { permission: 'view_admin_dashboard', requiresAuth: true },
        component: () => import('../views/Admin/Dashboard.vue'),
      },

      ///ระบบแจ้งปัญหา///
        {
          path: '/UserReqView',
          name: 'ส่งคำร้องแจ้งซ่อม',
          meta: { permission: 'view_reques', requiresAuth: true },
          component: ReqView,
        },

        {
          path: '/UserAddReqView',
          name: 'แจ้งซ่อมบำรุง',
          meta: { permission: 'add_reques', requiresAuth: true },
          component: AddReqView,
        },
      
      ///ระบบจัดการการแจ้งปัญหา///
      {
          path: '/StaffMgnReqView',
          name: 'คำร้องขอแจ้งซ่อม', //เจ้าหน้าที่
          meta: { permission: 'view_manage_reques', requiresAuth: true },
          component: StaffMgnReqView,
        },
        {
          path: '/macMgnReqView',
          name: 'รับคำร้องขอแจ้งซ่อม', //เจ้าหน้าที่ซ่อมบำรุง
          meta: { permission: 'view_macmanage_reques', requiresAuth: true },
          component: macMgnReqView,
        },

        ///ระบบจัดการการเบิกวัสดุ///
        {
          path: '/starffWithdrawReqView',
          name: 'เบิกวัสดุ', //เจ้าหน้าที่
          meta: { permission: 'view_WithdrawReq', requiresAuth: true },
          component: starffWithdrawReqView,
        },

        ///ระบบนัดเวลาเข้าซ่อม///
        {
          path: '/starffTimeReqView',
          name: 'นัดเวลาเข้าซ่อม', //เจ้าหน้าที่
          meta: { permission: 'view_TimeReq', requiresAuth: true },
          component: starffTimeReqView,
        },
      
      ///จัดการค่าคงที่ผู้ใช้งาน///
      {
        path: '/ViewResident',
        name: 'จัดการผู้ใช้งาน',
        meta: { permission: 'view_RegisResident', requiresAuth: true },
        component: ViewResView,
      },
      {
        path: '/RegisResident',
        name: 'เพิ่มผู้ใช้งาน',
<<<<<<< HEAD
=======
        id: '5',
>>>>>>> 45ad983de95c8c2c2e4c37186f33d20b42af427b
        meta: { permission: 'add_RegisResident', requiresAuth: true },
        component: RegisResView,
      },
      {
<<<<<<< HEAD
        path: '/EditResView',
        name: 'แก้ไขข้อมูลผู้ใช้งาน',
        meta: { permission: 'edit_Resident', requiresAuth: true },
        component: EditResView,
      },


      ///จัดการค่าคงที่ห้องพัก///
      {
        path: '/ViewRoomView',
        name: 'จัดการห้องพัก',
=======
        path: '/ViewResident',
        name: 'จัดการผู้ใช้งาน',
        id: '6',
        meta: { permission: 'view_RegisResident', requiresAuth: true },
        component: ViewResView,
      },
      {
        path: '/EditResView',
        name: 'แก้ไขข้อมูลผู้ใช้งาน',
        id: '7',
        meta: { permission: 'edit_Resident', requiresAuth: true },
        component: EditResView,
      },
      {
        path: '/ViewRoomView',
        name: 'จัดการห้องพัก',
        id: '8',
>>>>>>> 45ad983de95c8c2c2e4c37186f33d20b42af427b
        meta: { permission: 'view_Room', requiresAuth: true },
        component: ViewRoomView,
      },
      {
        path: '/RegisRoom',
        name: 'เพิ่มห้องพัก',
<<<<<<< HEAD
=======
        id: '9',
>>>>>>> 45ad983de95c8c2c2e4c37186f33d20b42af427b
        meta: { permission: 'add_RegisRoom', requiresAuth: true },
        component: RegisRoom,
      },
      {
        path: '/EditRoomView',
        name: 'เเก้ไขห้องพัก',
<<<<<<< HEAD
        meta: { permission: 'Edit_Room', requiresAuth: true },
        component: EditRoomView,
      },

      ///จัดการค่าคงที่หน่วย///
      {
        path: '/ViewUnitView',
        name: 'จัดการหน่วยสต็อก',
=======
        id: '10',
        meta: { permission: 'Edit_Room', requiresAuth: true },
        component: EditRoomView,
      },
      {
        path: '/ViewUnitView',
        name: 'จัดการหน่วยสต็อก',
        id: '11',
>>>>>>> 45ad983de95c8c2c2e4c37186f33d20b42af427b
        meta: { permission: 'View_Unit', requiresAuth: true },
        component: ViewUnitView,
      },
      {
        path: '/RegisUnit',
        name: 'เพิ่มหน่วยสต็อก',
<<<<<<< HEAD
        meta: { permission: 'add_Unit', requiresAuth: true },
        component: RegisUnit,
      },

      ///จัดการค่าคงที่ประเภทสต็อก///
      {
        path: '/ViewTypeStockView',
        name: 'จัดการข้อมูลประเภทสต็อก',
=======
        id: '12',
        meta: { permission: 'add_Unit', requiresAuth: true },
        component: RegisUnit,
      },
      {
        path: '/ViewTypeStockView',
        name: 'จัดการข้อมูลประเภทสต็อก',
        id: '13',
>>>>>>> 45ad983de95c8c2c2e4c37186f33d20b42af427b
        meta: { permission: 'View_TypeStock', requiresAuth: true },
        component: ViewTypeStockView,
      },
      {
        path: '/RegisTypeStock',
        name: 'เพิ่มข้อมูลประเภทสต็อก',
<<<<<<< HEAD
        meta: { permission: 'add_TypeStock', requiresAuth: true },
        component: RegisTypeStock,
      },

      ///จัดการค่าคงที่สต็อก///
      {
        path: '/ViewStockView',
        name: 'จัดการข้อมูลสต็อก',
        meta: { permission: 'View_Stock', requiresAuth: true },
        component: ViewStockView,
      },
      {
        path: '/RegisStock',
        name: 'เพิ่มข้อมูลสต็อก',
        meta: { permission: 'add_Stock', requiresAuth: true },
        component: RegisStock,
      },

      ///จัดการค่าคงที่สต็อก///
      {
        path: '/ViewTypeStatusView',
        name: 'จัดการข้อมูลประเภทสถานะ',
        meta: { permission: 'View_TypeStatus', requiresAuth: true },
        component: ViewTypeStatusView,
      },


      ///ตั้งค่า///
      {
        path: '/UserSetView',
        name: 'ตั้งค่า',
        meta: { permission: 'view_users_Setting', requiresAuth: true },
        component: () => import('../views/staticSetting/UserSetView.vue'),
      },
      


=======
        id: '14',
        meta: { permission: 'add_TypeStock', requiresAuth: true },
        component: RegisTypeStock,
      },
      {
        path: '/ViewStockView',
        name: 'จักการข้อมูลสต็อก',
        id: '15',
        meta: { permission: 'View_Stock', requiresAuth: true },
        component: ViewStockView,
      },



      
      
>>>>>>> 45ad983de95c8c2c2e4c37186f33d20b42af427b
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/Login.vue'),
  },
];

<<<<<<< HEAD
=======
const permissionsMap = [
  'view_users_dashboard',  // Bit 1
  'view_users_reques',     // Bit 2
  'view_users_Setting',    // Bit 3
  'view_admin_dashboard',  // Bit 4
  'view_RegisResident',    // Bit 5
  'add_RegisResident',
  'edit_Resident',
  'view_Room',
  'add_RegisRoom',
  'Edit_Room',
  'View_Unit',
  'add_Unit',
  'View_TypeStock',
  'add_TypeStock',
  'View_Stock',


];


const decodeJWTTH = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var payload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(payload);
};

const token = localStorage.getItem("token");

let permissionsToken = "";
if (token) {
  const decodedPayload = decodeJWTTH(token);
  // console.log(decodedPayload);
  permissionsToken = decodedPayload.permissions;
  // console.log("permissions:", permissions);
} else {
  console.log("Token not found");
}


permissionsToken = "1111111111111111111111111111";
// console.log(permissionsToken);

let permissions = permissionsToken.split('').map(bit => bit === '1');
function hasPermission(permission) {
  const index = permissionsMap.indexOf(permission);
  if (index === -1) {
    console.error('Permission not found:', permission);
    return false;
  }
  return permissions[index] === true;
}

function clearToken() {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
}

function isAuthenticated() {
  return  !!localStorage.getItem('token') || !!sessionStorage.getItem('token');
}

>>>>>>> 45ad983de95c8c2c2e4c37186f33d20b42af427b
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    clearToken();
  }

  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login');
  } else if (to.meta.permission && isAuthenticated()) {
    if (hasPermission(to.meta.permission)) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
