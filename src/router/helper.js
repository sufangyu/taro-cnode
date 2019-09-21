import Taro from '@tarojs/taro'
import ROUTER_CONFIG from './path';

const ACTIONS = {
  push: 'navigateTo',
  replace: 'redirectTo',
};


/**
 * 跳转/重定向 指定页面
 *
 * @export
 * @param {string} [url='']
 * @param {string} [actionKey='push']
 */
export function gotoPage(url = '', actionKey = 'push') {
  const key = ACTIONS[actionKey];
  Taro[key]({
    url,
  });
}


/**
 * 跳转/重定向 登录页面
 *
 * @export
 * @param {string} [actionKey='push']
 */
export function gotoLoginPage(actionKey = 'push') {
  const { route } = getCurrentPage();
  const url = `${ROUTER_CONFIG.login.path}?from=/${route}`;
  gotoPage(url, actionKey);
}


/**
 * 获取 当前页面信息
 *
 * @export
 * @returns
 */
export function getCurrentPage() {
  const pages = Taro.getCurrentPages();
  let currPage = null;
  if (pages.length) {
    currPage = pages[pages.length - 1];
  }
  return currPage;
}
