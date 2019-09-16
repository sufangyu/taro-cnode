import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import Panel from '../../components/panel';
import avatarDefault from '../../assets/images/avatar-default.png';
import iconWrite from '../../assets/images/icon-write.png';
import iconComment from '../../assets/images/icon-comment.png';
import iconPublished from '../../assets/images/icon-published.png';
import './index.scss'

@inject('counterStore')
@observer
class Mine extends Component {

  constructor (props) {
    super(props);
    this.state = {
      // avatar: avatarDefault,
    };
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentWillReact () { }

  componentDidShow () { }

  componentDidHide () { }


  config = {
    navigationBarTitleText: ''
  }

  render () {
    const { state } = this;

    return (
      <View className='page page-mine'>
        <View className='user-header'>
          <View className='user-avatar'>
            <Image className='user-image' src={avatarDefault} />
          </View>
          <View className='user-name'>登录 / 注册</View>
        </View>

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
      </View>
    )
  }
}

export default Mine
