/** 保存菜单数据 */
export const saveMenuList = menuList => ({
  type: 'SAVE_MENU_LIST',
  menuList,
});

export const saveUserInfo = userInfo => ({
  type: 'SAVE_USER_INFO',
  userInfo,
});

export const clearState = () => ({
  type: 'CLEAR_STATE'
});