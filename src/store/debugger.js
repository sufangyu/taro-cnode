import Taro from '@tarojs/taro'
import { observable } from 'mobx'

import { API_ENV_KEY, SWITCH_API_ENV_SHOW_KEY } from '../constants/stote-key'

const debuggerStore = observable({
  counter: 0,
  limitCounter: 10,
  isShowed: Taro.getStorageSync(SWITCH_API_ENV_SHOW_KEY) || false,

  increment() {
    this.counter += 1;
  },
  reset() {
    this.isShowed = false;
    this.counter = 0;
    Taro.removeStorage({ key: API_ENV_KEY });
    Taro.removeStorage({ key: SWITCH_API_ENV_SHOW_KEY });
  },
  setSwitchApiEnvShow() {
    this.isShowed = true;
    Taro.setStorage({ key: SWITCH_API_ENV_SHOW_KEY, data: true });
  },
  setApiEnv(val) {
    // 清空所有的缓存
    Taro.clearStorage();
    Taro.setStorage({ key: API_ENV_KEY, data: val });
    Taro.setStorage({ key: SWITCH_API_ENV_SHOW_KEY, data: true });
  },
})
export default debuggerStore
