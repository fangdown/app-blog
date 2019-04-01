
export const global = (state = {}, action) => {
  switch (action.type) {
    case 'CLEAR_STATE': {
      return {};
    }
    case 'SAVE_USER_INFO':
    {
      const roles = (action.userInfo && action.userInfo.roles) || [];
      return {
        ...state,
        userInfo: action.userInfo,
        isSuperManager: roles.indexOf('PA_RCRT_WENET_SUPER_MANAGER') > -1, // 超管
        isManager: roles.indexOf('PA_RCRT_WENET_MANAGER') > -1, // 管理员
      };
    }
    case 'SAVE_MENU_LIST':
      return {
        ...state,
        menuList: action.menuList,
      };
    case 'SAVE_SELECT_MENU_URL':
      return {
        ...state,
        selectMenuUrl: action.selectMenuUrl,
      };
    case 'SAVE_PAGE_PARAM':
      // 保存页面参数
      return {
        ...state,
        globalParam: { ...state.globalParam, ...action.param },
      };
    default:
      return state;
  }
};
