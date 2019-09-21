import http from '../utils/request';
import { API_BASE } from '../config';


/**
 * 登录 密钥方式
 *
 * @export
 * @param {*} [data={}]
 */
export function loginByAccesstoken(data = {}) {
  const url = `${API_BASE}/accesstoken`;

  return http.post({
    url,
    data,
  });
}


/**
 * 退出登录
 *
 * @export
 */
export function logout() { }


/**
 * 获取 用户信息
 *
 * @export
 * @param {*} username
 * @returns
 */
export function getAccount(username) {
  const url = `${API_BASE}/user/${username}`;

  return http.get({
    url,
  });
}
