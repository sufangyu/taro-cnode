import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import Panel from '../../components/Panel';
import List from '../../components/Menu/list';
import ListItem from '../../components/Menu/item';
import ROUTER_CONFIG from '../../router/path';

import './index.scss'
import iconAboutCnode from '../../assets/images/icon-about-cnode.png';
import iconClear from '../../assets/images/icon-clear.png';
import iconVersion from '../../assets/images/icon-version.png';


@inject('accountStore')
@observer
class Index extends Component {

  config = {
    navigationBarTitleText: '设置'
  }

  constructor (props) {
    super(props);

    this.state = {
      menusConfig: [
        {
          name: '关于 CNode 设置',
          icon: iconAboutCnode,
          path: ROUTER_CONFIG.about.path,
        },
        {
          name: '清除缓存',
          icon: iconClear,
          disabled: true,
          // path: ROUTER_CONFIG.about.path,
          callback:() => {
            console.log('清除缓存');
          }
        },
        {
          name: '当前版本',
          icon: iconVersion,
          extra: '1.0.0',
        },
      ],
    };
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  componentWillReact () { }

  handleLogout() {
    this.props.accountStore.removeAccount();

    // 重定向到首页
    Taro.switchTab({
      url: ROUTER_CONFIG.home.path,
    });
  }

  _renderMenus(menus = []) {
    return menus.map((menu, idx) => {
      return (
        <ListItem
          key={idx}
          menu={menu}
          isLast={idx === menus.length - 1}
        />
      );
    });
  }

  render () {
    const { menusConfig } = this.state;
    const menus = this._renderMenus(menusConfig);

    return (
      <View className='page page-setting'>
        <Panel>
          <List>{menus}</List>
        </Panel>

        <Panel>
          <Button
            className='button-logout'
            onClick={this.handleLogout}
          >退出登录</Button>
        </Panel>
      </View>
    )
  }
}

export default Index
