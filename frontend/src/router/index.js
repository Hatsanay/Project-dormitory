import DefaultLayout from '@/layouts/DefaultLayout';
import { createRouter, createWebHashHistory } from 'vue-router';
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
import RegisTypeStatus from '../views/staticTypeStatus/RegisTypeStatus.vue';

import ViewStatusView from '../views/staticStatus/ViewStatusView.vue';

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
        path: '/ViewRoomView',
        name: 'จัดการห้องพัก',
        meta: { permission: 'view_Room', requiresAuth: true },
        component: ViewRoomView,
      },
      {
        path: '/RegisRoom',
        name: 'เพิ่มห้องพัก',
        meta: { permission: 'add_RegisRoom', requiresAuth: true },
        component: RegisRoom,
      },
      {
        path: '/EditRoomView',
        name: 'เเก้ไขห้องพัก',
        meta: { permission: 'Edit_Room', requiresAuth: true },
        component: EditRoomView,
      },

      ///จัดการค่าคงที่หน่วย///
      {
        path: '/ViewUnitView',
        name: 'จัดการหน่วยสต็อก',
        meta: { permission: 'View_Unit', requiresAuth: true },
        component: ViewUnitView,
      },
      {
        path: '/RegisUnit',
        name: 'เพิ่มหน่วยสต็อก',
        meta: { permission: 'add_Unit', requiresAuth: true },
        component: RegisUnit,
      },

      ///จัดการค่าคงที่ประเภทสต็อก///
      {
        path: '/ViewTypeStockView',
        name: 'จัดการข้อมูลประเภทสต็อก',
        meta: { permission: 'View_TypeStock', requiresAuth: true },
        component: ViewTypeStockView,
      },
      {
        path: '/RegisTypeStock',
        name: 'เพิ่มข้อมูลประเภทสต็อก',
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
      {
        path: '/RegisTypeStatus',
        name: 'เพิ่มข้อมูลประเภทสถานะ',
        meta: { permission: 'add_TypeStatus', requiresAuth: true },
        component: RegisTypeStatus,
      },

      {
        path: '/ViewStatusView',
        name: 'จัดการข้อมูลประเภทสถานะ',
        meta: { permission: 'View_Status', requiresAuth: true },
        component: ViewStatusView,
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
