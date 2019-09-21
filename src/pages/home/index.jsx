import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, ScrollView } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import TopicItem from '../../components/TopicTtem'

import { TOPIC_CONFIG } from '../../data'
import { getTopics } from '../../api/topics'

import './index.scss'

class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor() {
    this.state = {
      currentTab: TOPIC_CONFIG[0].value,
      topics: {
        all: {
          scrollTop: 0,
          list: [],
          status: 'NORMAL',
          pagination: {
            page: 1,
            limit: 10,
          },
        },
        good: {
          scrollTop: 0,
          list: [],
          status: 'NORMAL',
          pagination: {
            page: 1,
            limit: 10,
          },
        },
        share: {
          scrollTop: 0,
          list: [],
          status: 'NORMAL',
          pagination: {
            page: 1,
            limit: 10,
          },
        },
        ask: {
          scrollTop: 0,
          list: [],
          status: 'NORMAL',
          pagination: {
            page: 1,
            limit: 10,
          },
        },
        job: {
          scrollTop: 0,
          list: [],
          status: 'NORMAL',
          pagination: {
            page: 1,
            limit: 10,
          },
        },
        dev: {
          scrollTop: 0,
          list: [],
          status: 'NORMAL',
          pagination: {
            page: 1,
            limit: 10,
          },
        },
      },
    };
  }

  componentWillMount () {
    const { currentTab } = this.state;
    this.getTopic(currentTab);
  }

  componentWillReact () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  /**
   *
   *
   * @param {*} tab
   * @memberof Index
   */
  async getTopic(tab) {
    if (!tab) {
      console.warn('Mist tab');
      return;
    }

    const { list, status, pagination: {limit, page} } = this.state.topics[tab];
    if (status === 'LOADING') {
      return;
    }

    try {
      const params = {
        tab,
        limit,
        page,
        mdrender: false,
      };
      const res = await getTopics(params);
      if (res.success) {
        const { data } = res;
        list.push(...data);
        this.setState({
          topics: this.state.topics,
        });
      } else {
        Taro.showToast({
          title: res.message || '加载失败, 请重试',
          icon: 'none',
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  switchTopic(tab, index) {
    this.setState({
      currentTab: tab,
    });

    // 没有数据, 则切换后加载数据
    const { list } = this.state.topics[tab];
    if (list.length === 0) {
      this.getTopic(tab);
    }
  }

  handleScroll(ev) {
    const { detail } = ev;
    const { currentTab } = this.state;
    const currentTopic = this.state.topics[currentTab];
    currentTopic.scrollTop = detail.scrollTop;

    this.setState({
      topics: this.state.topics,
    });
  }

  /**
   * 渲染 topic 类别
   *
   * @returns
   * @memberof Index
   */
  _renderCategies() {
    const { currentTab } = this.state;

    return TOPIC_CONFIG.map((category, idx) => {
      return (
        <Text
          key={idx}
          className={[
            'category-item',
            category.value === currentTab ? 'category-item-current' : null,
          ]}
          onClick={() => {
            this.switchTopic(category.value, idx)
          }}
        >{category.label}</Text>
      );
    });
  }

  /**
   * 渲染 topic 列表
   *
   * @returns
   * @memberof Index
   */
  _renderTopics() {
    const { currentTab } = this.state;
    const { list, status, scrollTop } = this.state.topics[currentTab];

    return TOPIC_CONFIG.map((topics, idx) => {
      return (
        topics.value === currentTab ? <ScrollView
          className='topics'
          scrollY
          key={idx}
          scrollTop={0}
          onScroll={this.handleScroll}
        >
          {
            list.map((topic, index) => {
              return <TopicItem key={index} topic={topic} />
            })
          }
        </ScrollView> : null
      );
    });
  }

  render () {
    const categoriesContent = this._renderCategies();
    const topicsContent = this._renderTopics();
    const { topics, currentTab } = this.state;
    const currentTopic = topics[currentTab];

    return (
      <View className='page page-home'>
        <ScrollView
          className='category'
          scrollX
          scrollWithAnimation
        >
          {categoriesContent }
        </ScrollView>

        <View className='topic-wrapper'>
          {topicsContent}
        </View>
      </View>
    )
  }
}

export default Index
