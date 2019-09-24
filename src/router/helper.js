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
 * @param {boolean} [switchTab=false]
 */
export function gotoPage(url = '', actionKey = 'push', switchTab = false) {
  const key = ACTIONS[actionKey];
  if (switchTab) {
    Taro.switchTab({
      url,
    });
  } else {
    Taro[key]({
      url,
    });
  }
}


/**
 * 跳转/重定向 登录页面
 *
 * @export
 * @param {string} [actionKey='push']
 * @param {boolean} [switchTab=false]
 */
export function gotoLoginPage(actionKey = 'push', switchTab = false) {
  const { route, options } = getCurrentPage();
  let fullpath = `/${route}`;
  const queries = [];

  Object.keys(options).forEach((key) => {
   const val = options[key];
    queries.push(`${key}=${val}`);
  });

  if (queries.length !== 0) {
    fullpath += `?${queries.join('&')}`
  }

  const fromUrl = encodeURIComponent(fullpath);
  const url = `${ROUTER_CONFIG.login.path}?from=${fromUrl}`;
  gotoPage(url, actionKey, switchTab);
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
