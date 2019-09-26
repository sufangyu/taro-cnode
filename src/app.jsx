import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'
import { Provider } from '@tarojs/mobx'

import accountStore from './store/account'
import debuggerStore from './store/debugger'
import Index from './pages/index'
import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  accountStore,
  debuggerStore,
}

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  config = {
    pages: [
      'pages/home/index',
      'pages/topic/detail/index',

      'pages/messages/list/index',

      'pages/account/login/index',
      'pages/mine/index',
      'pages/profile/index',
      'pages/setting/index',
      'pages/about/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#5677fc',
      navigationBarTitleText: 'CNode 社区',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      color: '#808080',
      selectedColor: '#5171f0',
      borderStyle: 'black',
      backgroundColor: '#ffffff',
      list: [
        {
          text: '首页',
          pagePath: 'pages/home/index',
          iconPath: 'assets/images/tabbar/home.png',
          selectedIconPath: 'assets/images/tabbar/home-selected.png',
        },
        {
          text: '信息',
          pagePath: 'pages/messages/list/index',
          iconPath: 'assets/images/tabbar/message.png',
          selectedIconPath: 'assets/images/tabbar/message-selected.png',
        },
        {
          text: '我的',
          pagePath: 'pages/mine/index',
          iconPath: 'assets/images/tabbar/mine.png',
          selectedIconPath: 'assets/images/tabbar/mine-selected.png',
        }
      ],
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
