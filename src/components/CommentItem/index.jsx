/* eslint-disable react/forbid-elements */
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import { TaroRichTextNoWxParse } from 'taro_rich_text'
import { fromNow } from '../../utils'
import './index.scss'

export default class CommentItem extends Component {
  static defaultProps = {
    comment: {
      create_at: '',
    },
  }

  render() {
    const { comment } = this.props;

    return (
      <View className='comment-item'>
        <View className='comment-avatar'>
          <Image src={comment.author.avatar_url} />
        </View>
        <View className='comment-info'>
          <View className='comment-meta'>
            <View className='comment-meta-left'>
              <View className='comment-username'>{comment.author.loginname}</View>
              <View className='comment-created'>{fromNow(comment.create_at)}</View>
            </View>
            <View className='comment-meta-right'>
              <View onClick={this.props.onReply}>
                <View className='icon-reply'></View>
              </View>
              <View onClick={this.props.onPraise}>
                <View className='icon-praise'></View>
                <Text>{comment.ups ? comment.ups.length : 0}</Text>
              </View>
            </View>
          </View>

          <View className='comment-content'>
            <TaroRichTextNoWxParse
              raw={false}
              type='markdown'
              richText={comment.content}
            />
          </View>
        </View>
      </View>
    )
  }
}
