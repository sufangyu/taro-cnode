import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Image, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import MessageItem from '@/components/MessageItem';
import { getMessages } from '@/api/message'
import ROUTER_CONFIG from '@/router/path'
import { gotoPage } from '@/router/helper'
import withLogin from '@/hoc/withLogin'
import './index.scss'

@withLogin()
export default class MessageList extends Component {
  config = {
    navigationBarTitleText: ''
  }

  constructor() {
    this.state = {
      currentTab: 'hasnot_read_messages',
      tabs: [
        {
          name: '未读信息',
          value: 'hasnot_read_messages',
        },
        {
          name: '已读信息',
          value: 'has_read_messages',
        }
      ],
      messages: {
        has_read_messages: [],
        hasnot_read_messages: [],
      },
    };
  }

  componentDidShow() {
    this.getMessages();
  }

  async getMessages() {
    const { accountStore: { account } } = this.props;

    try {
      const params = {
        accesstoken: account.accesstoken,
        mdrender: false,
      };
      const res = await getMessages(params);
      if (res.success) {
        this.setState({
          messages: res.data,
        });
      };
    } catch (error) {
    }
  }

  handleChangeTab(tab) {
    this.setState({
      currentTab: tab.value,
    });
  }

  /**
   * 跳转 话题详情页
   *
   * @param {*} topic
   * @memberof MessageList
   */
  handleGotoDetail(topic) {
    const { id } = topic;
    const url = `${ROUTER_CONFIG.topicDetail.path}?id=${id}`;
    gotoPage(url);
  }

  /**
   * 渲染 列表空内容
   *
   * @returns
   * @memberof MessageList
   */
  _renderEmptyContent() {
    const { tabs, currentTab } = this.state;
    const tabSelected = tabs.find(item => item.value === currentTab);

    return <View className='empty-data'>
      <View>
        <Image src='../../../assets/images/icon-empty.png' />
        <View>暂时没有{tabSelected.name} ~~</View>
      </View>
    </View>
  }

  /**
   * 渲染 列表
   *
   * @memberof MessageList
   */
  _renderMessageList(tab) {
    const { value } = tab;
    const { messages } = this.state;
    const list = messages[value];

    return list.map((message, idx) => {
      return <MessageItem
        key={idx}
        message={message}
        onClick={() => {
          this.handleGotoDetail(message.topic)
        }}
      />;
    });
  }

  _renderMessageContent() {
    const { tabs, currentTab, messages } = this.state;

    return tabs.map((tab, idx) => {
      return(
        <ScrollView
          key={idx}
          className='messages'
          scrollY
          style={{
            'display': tab.value === currentTab ? 'block' : 'none',
          }}
        >
          {
            messages[currentTab].length > 0
            ? <View className='timeline'>{this._renderMessageList(tab)}</View>
            : this._renderEmptyContent()
          }
        </ScrollView>
      )
    });
  }

  render() {
    const { tabs, currentTab } = this.state;

    const messageContent = this._renderMessageContent();

    return (
      <View className='page page-message'>
        <View className='tab-handler'>
          {
            tabs.map((tab, idx) => {
              return <View
                key={idx}
                className={[
                  'tab-item',
                  tab.value === currentTab ? 'tab-item-actived' : null,
                ]}
                onClick={() => {this.handleChangeTab(tab)}}
              >{tab.name}</View>
            })
          }
        </View>

        <View className='tab-panel'>{messageContent}</View>
      </View>
    );
  }
}
