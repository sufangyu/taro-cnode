import Taro from '@tarojs/taro'
import { API_ENV_KEY } from '../constants/stote-key'

export const ENV_LIST = [
  {name: '开发', value: 'dev', apiBase: 'https://dev-cnodejs.org/api/v1'},
  {name: '测试', value: 'test', apiBase: 'https://test-cnodejs.org/api/v1'},
  {name: '生产', value: 'prod', apiBase: 'https://cnodejs.org/api/v1'},
];
export const ENV_CURRENT = 'prod'; // 当前环境
export const ENV = Taro.getStorageSync(API_ENV_KEY) || ENV_CURRENT;
export const API_BASE = ENV_LIST.find(item => item.value === ENV).apiBase;
