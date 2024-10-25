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
      'addmindashboard',          //2
      'macdashboard',             //3
      'managerdashboard',         //4
      ///ระบบแจ้งปัญหา///
      'view_reques',              //5
      'add_reques',               //6
      ///ระบบจัดการการแจ้งปัญหา///
      'view_manage_reques',       //7
      'view_macmanage_reques',    //8
      ///ระบบจัดการการเบิกวัสดุ///
      'view_WithdrawReq',         //9
      ///ระบบนัดเวลาเข้าซ่อม///
      'view_TimeReq',             //10
      ///จัดการค่าคงที่ผู้ใช้งาน///
      'view_RegisResident',       //11
      'add_RegisResident',        //12
      'edit_Resident',            //13
      ///จัดการค่าคงที่ห้องพัก///
      'view_Room',                //14
      'add_RegisRoom',            //15
      'Edit_Room',                //16

      'View_Stock',               //17
      'add_Stock',                //18
      'edit_Stock',               //19

      'View_TypeStock',           //20
      'add_TypeStock',            //21
      'edit_TypeStock',           //22

      'View_Status',              //23
      'add_Status',               //24
      'edit_Status',              //25

      'View_TypeStatus',          //26
      'add_TypeStatus',           //27
      'edit_TypeStatus',          //28

      'View_Unit',                //29
      'add_Unit',                 //30
      'edit_Unit',                //31

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
  