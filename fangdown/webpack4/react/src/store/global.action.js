
export const clearState = () => ({
  type: 'CLEAR_STATE'
});

export const saveUserInfo = userInfo => ({
  type: 'SAVE_USER_INFO',
  userInfo,
});

export const currentAnimate = cls => ({
  type: 'CURRENT_ANIMATE',
  cls,
});

export const savePageParam = param => ({
  type: 'SAVE_PAGE_PARAM',
  param,
});

export const saveMainLayoutRef = mainLayoutRef => ({
  type: 'SAVE_MAIN_LAYOUT_REF',
  mainLayoutRef,
});

export const savePageHeight = pageHeight => ({
  type: 'SAVE_PAGE_HEIGHT',
  pageHeight,
});
/** 保存简历来源数据 */
export const saveResumeResource = resumeResource => ({
  type: 'SAVE_RESUME_RESOURCE',
  resumeResource,
});

/** 保存菜单数据 */
export const saveMenuList = menuList => ({
  type: 'SAVE_MENU_LIST',
  menuList,
});
/** 保存选中的菜单地址 */
export const saveSelectMenuUrl = selectMenuUrl => ({
  type: 'SAVE_SELECT_MENU_URL',
  selectMenuUrl,
});
