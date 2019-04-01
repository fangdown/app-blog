import { postJson } from '@common/utils/fetchJson';

// 域名
export const getLoginUserInfo = async (data, callback, options) => {
  const url = `/mng/login/getLoginUserInfo`;
  const rs = await postJson(url, data, callback, options);
  return rs;
};
export const getMenu = async (data, callback, options) => {
  const url = `/mng/login/getLoginUserMenu`;
  const rs = await postJson(url, data, callback, options);
  return rs;
};

export const logout = async (data, callback, options) => {
  const url = `/mng/login/logout`;
  const rs = await postJson(url, data, callback, options);
  return rs;
};