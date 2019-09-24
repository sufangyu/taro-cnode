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
 * @param {*} id
 * @param {*} data
 * @returns
 */
export function getTopicDetail(id, data) {
  const url = `${API_BASE}/topic/${id}`;

  return http.get({
    url,
    data,
  });
}


/**
 * 收藏 & 取消收藏 话题
 *
 * @export
 * @param {*} action
 * @param {*} data
 * @returns
 */
export function collectTopic(action, data) {
  const urls = {
    collect: `${API_BASE}/topic_collect/collect`,
    de_collect: `${API_BASE}/topic_collect/de_collect`,
  };
  const url = urls[action];

  return http.post({
    url,
    data,
  });
}
