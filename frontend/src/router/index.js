import DefaultLayout from '@/layouts/DefaultLayout';
import { createRouter, createWebHashHistory } from 'vue-router';
import userDasboard from '../views/dashboard/Dashboard.vue';
import AddReqView from '../views/Request/UserAddReqView.vue';
import ReqView from '../views/Request/UserReqView.vue';
import Room from '../views/staticRoom/Room.vue';
import EditResView from '../views/staticUsers/EditResView.vue';
import RegisResView from '../views/staticUsers/RegisResView.vue';
import ViewResView from '../views/staticUsers/ViewResView.vue';

import macMgnReqView from '../views/ManageRequets/macMgnReqView.vue';
import StaffMgnReqView from '../views/ManageRequets/StaffMgnReqView.vue';



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
        meta: { permission: 'add_RegisResident', requiresAuth: true },
        component: RegisResView,
      },
      {
        path: '/EditResView',
        name: 'แก้ไขข้อมูลผู้ใช้งาน',
        meta: { permission: 'edit_Resident', requiresAuth: true },
        component: EditResView,
      },


      ///จัดการค่าคงที่ห้องพัก///
      {
        path: '/Room',
        name: 'Room',
        meta: { permission: 'edit_RegisRoom', requiresAuth: true },
        component: Room,
      },


      ///ตั้งค่า///
      {
        path: '/UserSetView',
        name: 'ตั้งค่า',
        meta: { permission: 'view_users_Setting', requiresAuth: true },
        component: () => import('../views/staticSetting/UserSetView.vue'),
      },
      


    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/Login.vue'),
  },
];

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
