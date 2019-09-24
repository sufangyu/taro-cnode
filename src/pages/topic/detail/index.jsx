/* eslint-disable react/forbid-elements */
import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image, Input } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import CommentItem from '@/components/CommentItem'
import { parseTime } from '@/utils'
import { getTopicDetail, collectTopic } from '@/api/topics'
import { checkLoginedMiddle } from '@/commons/helper';
import WxParse from '../../../components/wxParse/wxParse'
import '../../../components/wxParse/wxParse.wxss'
import './index.scss'


@inject('accountStore')
@observer
export default class TopicDetail extends Component {

  config = {
    navigationBarTitleText: '详情'
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
        mdrender: true,
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

    WxParse.wxParse('content', 'html', content, this.$scope, 5);


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
            <import src='../../../components/wxParse/wxParse.wxml' />
            <template is='wxParse' data='{{wxParseData:content.nodes}}' />
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
