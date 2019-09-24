import http from '../utils/request';
import { API_BASE } from '../config';


/**
 * 登录 密钥方式
 *
 * @export
 * @param {*} [data={}]
 */
// eslint-disable-next-line import/prefer-default-export
export function getMessages(data) {
  const url = `${API_BASE}/messages`;

  return http.get({
    url,
    data,
  });
}

