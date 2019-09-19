import Taro from '@tarojs/taro'
import ROUTER_CONFIG from './path';


export function getCurrentPage() {
  const pages = Taro.getCurrentPages();
  let currPage = null;
  if (pages.length) {
    currPage = pages[pages.length - 1];
  }
  return currPage;
}


export function gotoLoginPage(actionKey = 'push') {
  const actions = {
    push: 'navigateTo',
    replace: 'redirectTo',
  };
  const key = actions[actionKey];

  const { route } = getCurrentPage();
  const url = `${ROUTER_CONFIG.login.path}?from=/${route}`;

  Taro[key]({
    url,
  });
}
