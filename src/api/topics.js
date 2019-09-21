import http from '../utils/request';
import { API_BASE } from '../config';


/**
 * 获取 话题列表
 *
 * @export
 * @param {*} [data={}]
 */
export function getTopics(data = {}) {
  const url = `${API_BASE}/topics`;

  return http.get({
    url,
    data,
    loadingText: '加载中...',
  });
}


/**
 * 获取 话题详情
 *
 * @export
 * @param {*} [data={}]
 */
export function getTopicDetail(data = {}) {
  const url = `${API_BASE}/topics`;

  return http.get({
    url,
    data,
  });
}

