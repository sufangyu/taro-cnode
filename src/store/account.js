import Taro from '@tarojs/taro'
import { observable } from 'mobx'

const ACCOUNT_KEY = 'ACCOUNT'

const accountStorage = Taro.getStorageSync(ACCOUNT_KEY);

const accountStore = observable({
  account: accountStorage || null,

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
