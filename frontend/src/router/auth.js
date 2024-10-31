export const decodeJWTTH = (token) => {
    try {
      const base64Url = token.split('.')[1];
      if (!base64Url) {
        throw new Error('Invalid token format');
      }
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join('')
      );
      return JSON.parse(payload);
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  };
  
  export const getPermissions = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedPayload = decodeJWTTH(token);
      return decodedPayload?.permissions || '';
    }
    console.log('Token not found');
    return '';
  };
  
  export const getUserID = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedPayload = decodeJWTTH(token);
      return decodedPayload?.id || '';
    }
    console.log('Token not found');
    return '';
  };
  
  export const hasPermission = (permission) => {
    const permissionsMap = [
      'logout',
      'home',
      'userdashboard',
      'addmindashboard',
      'macdashboard',
      'managerdashboard',
      ///ระบบแจ้งปัญหา///
      'add_reques',
      'view_reques',
      ///ระบบจัดการการแจ้งปัญหา///
      'view_manage_reques',
      'view_macmanage_reques',
      ///ระบบจัดการการเบิกวัสดุ///
      'view_WithdrawReq',
      ///ระบบนัดเวลาเข้าซ่อม///
      'view_TimeReq',
      ///จัดการค่าคงที่ผู้ใช้งาน///
      'view_RegisResident', 
      'add_RegisResident',
      'edit_Resident',
      ///จัดการค่าคงที่ห้องพัก///
      'view_Room',
      'add_RegisRoom',
      'Edit_Room',
      
      'View_Stock',
      'add_Stock',
      'edit_Stock',

      'View_TypeStock',
      'add_TypeStock',
      'edit_TypeStock',
            
      'View_Status',
      'add_Status',
      'edit_Status',

      'View_TypeStatus',
      'add_TypeStatus',
      'edit_TypeStatus',

      'View_Unit',
      'add_Unit',
      'edit_Unit',
      
      'View_Role',
      'add_Role',
      'edit_Role'
      
      ///ตั้งค่า///
        ];
    
    const permissionsToken = getPermissions();
    const UserID = getUserID();
    localStorage.setItem("userID", UserID);
    let lUserId = localStorage.getItem('userID');
    console.log("userID "+lUserId)
  
    if (!permissionsToken) {
      console.error('Permissions token not found');
      return false;
    }
  
    const permissions = permissionsToken.split('').map((bit) => bit === '1');
    const index = permissionsMap.indexOf(permission);
    if (index === -1) {
      console.error('Permission not found:', permission);
      return false;
    }
    return permissions[index] === true;
  };
  
  export const isAuthenticated = () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
    // return !!localStorage.getItem('token') || !!sessionStorage.getItem('token');
  };
  
  export const clearToken = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    localStorage.removeItem('userID');
    sessionStorage.removeItem('userID');
    // localStorage.removeItem('localUserid');
    // sessionStorage.removeItem('localUserid');
  };
  