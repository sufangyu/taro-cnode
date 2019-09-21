import Taro from '@tarojs/taro'
import { observable } from 'mobx'

import { ACCOUNT_KEY } from '../constants/stote-key'

const accountStore = observable({
  account: Taro.getStorageSync(ACCOUNT_KEY) || null,

  /**
   * 设置 账号信息
   *
   * @param {*} [account={}]
   */
  setAccount(account = {}) {
    Taro.setStorage({ key: ACCOUNT_KEY, data: account });
    this.account = {...account};
  },


  /**
   * 删除 账号信息
   *
   */
  removeAccount() {
    Taro.removeStorage({ key: ACCOUNT_KEY });
    this.account = null;
  },

})
export default accountStore
