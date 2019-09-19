import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components';

import './index.scss';

export default class List extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { children } = this.props

    return (
      <View className='list'>
        { children }
      </View>
    );
  }
}
