import Taro from '@tarojs/taro'

import { ACCOUNT_KEY } from '../constants/stote-key'
import { gotoLoginPage } from '../router/helper'

/**
 * 检查 是否已经登录
 *
 * @export
 */
// eslint-disable-next-line import/prefer-default-export
export function checkLoginedMiddle() {
  return new Promise((resolve, reject) => {
    Taro
      .getStorage({ key: ACCOUNT_KEY })
      .then((res) => {
        console.log(res);
        if (res.errMsg === 'getStorage:ok') {
          resolve();
        } else {
          reject();
        }
      }).catch((error) => {
        Taro
          .showToast({
            title: '请先登录',
            icon: 'none',
          })
          .then(() => {
            const action = 'replace';
            gotoLoginPage(action);
          });
      });
  });
}
