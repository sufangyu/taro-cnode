import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import Panel from '@/components/Panel'
import withLogin from '@/hoc/withLogin'
import { getAccount } from '@/api/account'
import { parseTime } from '@/utils'
import './index.scss'

@withLogin()
class Index extends Component {

  config = {
    navigationBarTitleText: '个人资料'
  }

  constructor (props) {
    super(props);

    this.state = {
      account: null,
    };
  }

  componentWillMount () {
    this.getAccount();
  }

  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  componentWillReact () { }

  /**
   * 获取 用户详情
   *
   * @memberof Index
   */
  async getAccount() {
    const { accountStore: { account } } = this.props;
    console.log('获取 用户详情', account);
    const res = await getAccount(account.loginName);

    if (res.success) {
      const {
        avatar_url: avatarUrl,
        create_at: createAt,
        githubUsername,
        loginname: loginName,
        score,
      } = res.data;

      const accountInfo = {
        avatarUrl,
        createAt,
        githubUsername,
        loginName,
        score,
      };
      this.setState({
        account: accountInfo,
      });
    }
  }

  _renderList(list = []) {
    return list.map((item, idx) => {
      return (
        <View
          key={idx}
          className={[
            'list-item',
            idx === list.length - 1 ? 'list-item-last' : null,
          ]}
        >
          <View className='list-title'>{item.title}</View>
          <View className='list-extra'>
            {
              item.extraType === 'image'
              ? <Image src={item.extra} />
              : <Text>{item.extra}</Text>
            }
          </View>
        </View>
      );
    });
  }

  render () {
    const { account } = this.state;

    const listConfig = [
      {
        title: '头像',
        extra: account ? account.avatarUrl : '',
        extraType: 'image',
      },
      {
        title: '昵称',
        extra: account ? account.loginName : '',
      },
      {
        title: '积分',
        extra: account ? account.score : '',
      },
      {
        title: '注册时间',
        extra: account ? parseTime(account.createAt) : '',
      },
      {
        title: '邮箱',
        extra: account ? `${account.githubUsername}@github.com` : '',
      },
      {
        title: 'GitHub',
        extra: account ? `https://github.com/${account.githubUsername}` : '',
      },
    ];
    const list = this._renderList(listConfig);

    return (
      <View className='page page-setting'>
        <Panel>
          {list}
        </Panel>
      </View>
    )
  }
}

export default Index
