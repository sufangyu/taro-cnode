import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components';

import './index.scss';
import { parseTime, fromNow } from '../../utils';

export default class TopicItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      author: { avatar_url = '', loginname },
      create_at,
      title,
      content,
      visit_count,
      reply_count,
      last_reply_at,
    } = this.props.topic;

    return (
      <View className='topic-item'>
        <View className='topic-item-extra flex'>
          <View className='topic-image'>
            <Image src={avatar_url} />
          </View>
          <View className='topic-item-info'>
            <View className='topic-author'>{loginname}</View>
            <View className='topic-create'>发布于{fromNow(create_at)}</View>
          </View>
        </View>

        <View className='topic-item-content'>
          <View className='topic-title'>{title}</View>
          <View className='topic-summary'>{content.substr(0, 100)}</View>
        </View>
        <View className='topic-item-meta'>
          <View>
            <Text>阅: {visit_count}</Text>
            <Text>评: {reply_count}</Text>
          </View>

          <View>评论于: {parseTime(last_reply_at)}</View>
        </View>
      </View>
    );
  }
}

TopicItem.defaultProps = {
  topic: {
    author: {
      avatar_url: '',
      loginname: ''
    },
    create_at: '',
    title: '',
    content: '',
    visit_count: '',
    reply_count: '',
    last_reply_at: '',
  },
};
