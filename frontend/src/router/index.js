import DefaultLayout from '@/layouts/DefaultLayout';
import { createRouter, createWebHashHistory } from 'vue-router';

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

import userDasboard from '../views/dashboard/Dashboard.vue';
import ReqView from '../views/user/UserReqView.vue';

// Define routes
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
        id: '1',
        meta: { permission: 'view_users_dashboard', requiresAuth: true},
        component: userDasboard,
      },
      {
        path: '/UserReqView',
        name: 'แจ้งซ่อมบำรุง',
        id: '2',
        meta: { permission: 'view_users_reques', requiresAuth: true },
        component: ReqView,
      },
      {
        path: '/UserSetView',
        name: 'ตั้งค่า',
        id: '3',
        meta: { permission: 'view_users_Setting', requiresAuth: true },
        component: () => import('../views/user/UserSetView.vue'),
      },
      // Admin
      {
        path: '/adminDashboard',
        name: 'AdminDashboard',
        id: '4',
        meta: { permission: 'view_admin_dashboard', requiresAuth: true },
        component: () => import('../views/Admin/Dashboard.vue'),
      },
      
      {
        path: '/RegisResident',
        name: 'เพิ่มผู้ใช้งาน',
        id: '5',
        meta: { permission: 'add_RegisResident', requiresAuth: true },
        component: RegisResView,
      },
      {
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
        meta: { permission: 'view_Room', requiresAuth: true },
        component: ViewRoomView,
      },
      {
        path: '/RegisRoom',
        name: 'เพิ่มห้องพัก',
        id: '9',
        meta: { permission: 'add_RegisRoom', requiresAuth: true },
        component: RegisRoom,
      },
      {
        path: '/EditRoomView',
        name: 'เเก้ไขห้องพัก',
        id: '10',
        meta: { permission: 'Edit_Room', requiresAuth: true },
        component: EditRoomView,
      },
      {
        path: '/ViewUnitView',
        name: 'จัดการหน่วยสต็อก',
        id: '11',
        meta: { permission: 'View_Unit', requiresAuth: true },
        component: ViewUnitView,
      },
      {
        path: '/RegisUnit',
        name: 'เพิ่มหน่วยสต็อก',
        id: '12',
        meta: { permission: 'add_Unit', requiresAuth: true },
        component: RegisUnit,
      },
      {
        path: '/ViewTypeStockView',
        name: 'จัดการข้อมูลประเภทสต็อก',
        id: '13',
        meta: { permission: 'View_TypeStock', requiresAuth: true },
        component: ViewTypeStockView,
      },
      {
        path: '/RegisTypeStock',
        name: 'เพิ่มข้อมูลประเภทสต็อก',
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



      
      
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/Login.vue'),
  },
];

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
