import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components';

import './index.scss';

export default class Panel extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { children } = this.props

    return (
      <View className='panel'>
        <View className='panel-body'>
          { children }
        </View>
      </View>
    );
  }
}
