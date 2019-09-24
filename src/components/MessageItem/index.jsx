/* eslint-disable react/forbid-elements */
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import { fromNow } from '../../utils'
import './index.scss'

export default class MessageItem extends Component {
  render() {
    const {
      message: {author, title, topic, reply},
    } = this.props;

    return (
      <View
        className='message-item'
        onClick={this.props.onClick}
      >
        <View className='message-timeline'></View>
        <View className='message-avatar'>
          <Image src={author.avatar_url} />
        </View>

        <View className='message-info'>
          <View className='message-expand'></View>
          <View class='message-title'>TO: {topic.title}</View>
          <View class='message-content'>{reply.content}</View>
          <View class='message-meta'>
            <Text>{author.loginname}</Text>
            <Text> - </Text>
            <Text>{fromNow(reply.create_at)}</Text>
          </View>
        </View>
      </View>
    )
  }
}
