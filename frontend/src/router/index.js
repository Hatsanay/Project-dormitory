import DefaultLayout from '@/layouts/DefaultLayout';
import { createRouter, createWebHashHistory } from 'vue-router';
import RegisResView from '../views/Admin/RegisResView.vue';
import RegisRoom from '../views/Admin/RegisRoom.vue';
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
        name: 'จัดการผู้พักอาศัย',
        id: '5',
        meta: { permission: 'edit_RegisResident', requiresAuth: true },
        component: RegisResView,
      },
      {
        path: '/RegisRoom',
        name: 'จัดการห้องพัก',
        id: '7',
        meta: { permission: 'edit_RegisRoom', requiresAuth: true },
        component: RegisRoom,
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
  'edit_RegisResident',
  'edit_RegisRoom',
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
