import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import Panel from '../../components/Panel';
import List from '../../components/Menu/list';
import ListItem from '../../components/Menu/item';
import ROUTER_CONFIG from '../../router/path';
import { gotoLoginPage } from '../../router/helper';

import './index.scss';
import avatarDefault from '../../assets/images/avatar-default.png';
import iconWrite from '../../assets/images/icon-write.png';
import iconComment from '../../assets/images/icon-comment.png';
import iconPublished from '../../assets/images/icon-published.png';
import iconFavorite from '../../assets/images/icon-favorite.png';
import iconUser from '../../assets/images/icon-user.png';
import iconFeedback from '../../assets/images/icon-feedback.png';
import iconSetting from '../../assets/images/icon-setting.png';
import iconAbout from '../../assets/images/icon-about.png';

const menusMainConfig = [
  {
    name: '我的收藏',
    icon: iconFavorite,
    path: './path/index?name=zhangSanFeng',
  },
  {
    name: '个人资料',
    icon: iconUser,
    path: './path/index?name=zhangSanFeng',
  },
  {
    name: '意见反馈',
    brief: '去 GitHub 上提交 Issues',
    icon: iconFeedback,
    path: './path/index?name=zhangSanFeng',
  },
  {
    name: '设置',
    icon: iconSetting,
    path: ROUTER_CONFIG.setting.path,
  },
];
const menusOtherConfig = [
  {
    name: '关于项目',
    icon: iconAbout,
    path: ROUTER_CONFIG.about.path,
  },
];


@inject('accountStore')
@observer
export default class Mine extends Component {
  config = {
    navigationBarTitleText: ''
  }

  constructor (props) {
    super(props);
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentWillReact () { }

  componentDidShow () { }

  componentDidHide () { }

  handleGotoLogin() {
    gotoLoginPage();
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
    const { accountStore: {account} } = this.props;

    const menusMain = this._renderMenus(menusMainConfig);
    const menusOther = this._renderMenus(menusOtherConfig);

    return (
      <View className='page page-mine'>
        {
          account.id
          ? (
            <View className='user-header'>
              <View className='user-avatar'>
                <Image className='user-image' src={account.avatarUrl} />
              </View>
              <View className='user-name'>{account.loginName}</View>
            </View>
          )
          : (
            <View className='user-header' onClick={this.handleGotoLogin}>
              <View className='user-avatar'>
                <Image className='user-image' src={avatarDefault} />
              </View>
              <View className='user-name'>登录 / 注册</View>
            </View>
          )
        }
        <Panel>
          <View className='flex'>
            <View className='flex-1 action-link'>
              <View className='line'></View>
              <Image src={iconWrite} className='action-icon'></Image>
              <View className='action-name'>发表主题</View>
            </View>
            <View className='flex-1 action-link'>
              <View className='line'></View>
              <Image src={iconComment} className='action-icon'></Image>
              <View className='action-name'>最近回复</View>
            </View>
            <View className='flex-1 action-link'>
              <Image src={iconPublished} className='action-icon'></Image>
              <View className='action-name'>最近发布</View>
            </View>
          </View>
        </Panel>

        <Panel>
          <List>
            {menusMain}
          </List>
        </Panel>

        <Panel>
          <List>
            {menusOther}
          </List>
        </Panel>

      </View>
    )
  }
}
