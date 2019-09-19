import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

import './index.scss'

class Index extends Component {

  config = {
    navigationBarTitleText: '关于项目'
  }

  componentWillMount () { }

  componentWillReact () {
    console.log('componentWillReact')
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='page page-white page-about'>
        <View className='text-content'>
          <View className='h3'>关于项目</View>
          <View className='p'>项目是基于 CNode 社区提供的 API，采用 VueJS 重写的 Webapp。</View>

          <View className='h3'>技术栈</View>
          <View className='p'>项目基于 vue2、vue-router、vuex 进行开发，使用了 vue-cli 开发、编译打包。</View>

          <View className='h3'>源码地址</View>
          <View className='p'><a href="https://github.com/sufangyu/vue-cnode/issues" target="_blank">https://github.com/sufangyu/vue-cnode</a></View>

          <View className='h3'>意见反馈</View>
          <View className='p'><a href="https://github.com/sufangyu/vue-cnode" target="_blank">发表意见或者提需求</a></View>

          <View className='h3'>当前版本</View>
          <View className='p'>V 1.0.0</View>
        </View>
      </View>
    )
  }
}

export default Index
