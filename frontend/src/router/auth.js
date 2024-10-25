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
      'logout',                   //0
      'viewdashboard',            //1
      ///ระบบแจ้งปัญหา///
      'view_reques',              //2
      'add_reques',               //3
      ///ระบบจัดการการแจ้งปัญหา///
      'view_manage_reques',       //4
      'view_macmanage_reques',    //5
      ///ระบบจัดการการเบิกวัสดุ///
      'view_WithdrawReq',         //6
      ///ระบบนัดเวลาเข้าซ่อม///
      'view_TimeReq',             //7
      ///จัดการค่าคงที่ผู้ใช้งาน///
      'view_RegisResident',       //8
      'add_RegisResident',        //9
      'edit_Resident',            //10
      ///ตั้งค่า///
      'view_users_Setting',       //11
      ///จัดการค่าคงที่ห้องพัก///
      'edit_RegisRoom',           //12
    ];
    
    const permissionsToken = getPermissions();
    localStorage.setItem("permissions", permissionsToken);
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
  