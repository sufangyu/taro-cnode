/* eslint-disable react/forbid-elements */
import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image, Input } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { TaroRichTextNoWxParse } from 'taro_rich_text'
import CommentItem from '@/components/CommentItem'
import { parseTime } from '@/utils'
import { getTopicDetail, collectTopic } from '@/api/topics'
import { checkLoginedMiddle } from '@/middleware/account.js'
import './index.scss'


@inject('accountStore')
@observer
export default class TopicDetail extends Component {

  config = {
    navigationBarTitleText: '详情',
    usingComponents: {}
  }

  constructor() {
    this.state = {
      params: {},
      topic: {
        content: '',
        replies: [],
      },
    };
  }

  componentWillMount () {
    this.setState({
      params: this.$router.params,
    });
  }

  componentWillReact () { }

  componentDidMount () {
    this.getTopicDetail();
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  /**
   *
   *
   * @memberof TopicDetail
   */
  async getTopicDetail() {
    try {
      const { id } = this.state.params;
      const data = {
        mdrender: false,
      };
      const res = await getTopicDetail(id, data);
      console.log(res);
      if (res.success) {
        this.setState({
          topic: res.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 评论
   *
   * @param {*} comment
   * @memberof TopicDetail
   */
  handleReply(comment) {
    Taro.showToast({
      title: '功能暂时未开放',
      icon: 'none',
    });
  }

  /**
   * 点赞
   *
   * @param {*} comment
   * @memberof TopicDetail
   */
  handlePraise(comment) {
    Taro.showToast({
      title: '功能暂时未开放',
      icon: 'none',
    });
  }

  /**
   * 收藏
   *
   * @memberof TopicDetail
   */
  async handleFavorite() {
    checkLoginedMiddle().then(async () => {
      const { account: {accesstoken} } = this.props.accountStore;
      const { is_collect, id } = this.state.topic;
      const params = {
        accesstoken,
        topic_id: id,
      };

      const action = is_collect ? 'de_collect' : 'collect';
      try {
        const res = await collectTopic(action, params);
        if (res.success) {
          const msg = action === 'de_collect' ? '已取消收藏' : '收藏成功';
          Taro.showToast({
            title: msg,
            icon: 'success',
          });

          this.state.topic.is_collect = !(action === 'de_collect');
          this.setState({
            topic: this.state.topic,
          });
        }
      } catch (error) {
        console.log(error);
      }
    });

  }

  render () {
    const {
      title,
      content,
      create_at,
      visit_count,
      reply_count,
      author,
      is_collect,
      replies,
    } = this.state.topic;

    return (
      <View className='page page-topic-detail'>
        {/* 详情内容 */}
        <View className='topic-detail'>
          <View className='topic-title'>{title}</View>
          <View className='topic-meta flex'>
            <View className='topic-author-avatar'>
              <Image src={author.avatar_url} />
            </View>
            <View className='flex-1'>
              <View className='topic-author-name'>{author.loginname}</View>
              <View className='topic-info'>
                <View>{parseTime(create_at)}</View>
                <View>
                  <Text>阅: {visit_count}</Text>
                  <Text>评: {reply_count}</Text>
                </View>
              </View>
            </View>
          </View>
          <View className='topic-content'>
            <TaroRichTextNoWxParse
              raw={false}
              type='markdown'
              richText={content}
            />
          </View>
        </View>

        {/* 评论 */}
        <View className='topic-comments-wrapper'>
          <View className='model-title'>全部评论</View>
          <View className='topic-comments'>
            {
              replies.reverse().map((comment, idx) => {
                return <CommentItem
                  key={idx}
                  comment={comment}
                  onReply={() => {
                    this.handleReply(comment);
                  }}
                  onPraise={() => {
                    this.handlePraise(comment)
                  }}
                />
              })
            }
            <View className='list-status'>没有更多了</View>
          </View>
        </View>

        {/* 评论 & 收藏 & 分享 */}
        <View className='tools'>
          <View
            className='tools-action-comment'
            onClick={() => {
              Taro.showToast({
                title: '功能暂时未开放',
                icon: 'none',
              });
            }}
          >写评论</View>
          <View className='tools-actions'>
            <View
              className={[
                'icon-favorite',
                is_collect ? 'icon-favorited' : null,
              ]}
              onClick={this.handleFavorite}
            />
            <View
              className='icon-share'
            />
          </View>
        </View>
      </View>
    )
  }
}
