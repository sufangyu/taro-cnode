import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Button,
  Text,
  Image,
  Input,
  Label,
  Checkbox,
  CheckboxGroup,
} from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import avatarDefault from '@/assets/images/avatar-default.png'
import { loginByAccesstoken } from '@/api/account';
import ROUTER_CONFIG from '@/router/path';
import { gotoPage } from '@/router/helper';
import './index.scss'


@inject('accountStore')
@observer
class Index extends Component {

  config = {
    navigationBarTitleText: '登录'
  }

  constructor(props) {
    super(props);

    this.state = {
      params: {},
      isAutoLogin: true,
      accesstoken: '974395a4-8d5b-498e-ac14-b7ca8f143594',
    };
  }

  componentWillMount () {
    const { params } = this.$router;
    this.setState({
      params,
    });
  }

  componentWillReact () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleInputaccesstoken(e) {
    const { value } = e.detail;
    this.setState({
      accesstoken: value,
    });
  }

  handleChange(e) {
    const [val] = e.detail.value;
    this.setState({
      isAutoLogin: !!val,
    });
  }

  async handleSubmit() {
    const { accesstoken, isAutoLogin, params } = this.state;

    console.log('accesstoken =>>', accesstoken);


    if (!accesstoken) {
      Taro.showToast({
        title: '登录密钥不能为空',
        icon: 'none',
      });
      return;
    }

    try {
      const data = {
        accesstoken,
        isAutoLogin,
      };

      const res = await loginByAccesstoken(data);
      console.log(res);
      if (res.success) {
        Taro.showToast({
          title: '登录成功',
          icon: 'none',
        });

        // 存储数据(本地存储 & state)
        const { id, avatar_url, loginname } = res;
        const account = {
          id,
          avatarUrl: avatar_url,
          loginName: loginname,
          accesstoken,
        };

        this.props.accountStore.setAccount(account);

        // 重定向来源页面
        setTimeout(() => {
          const redirectUrl = params.from ? decodeURIComponent(params.from) : ROUTER_CONFIG.home;
          const switchTab = !!params.from;
          const action = 'replace';
          gotoPage(redirectUrl, action, switchTab);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleScanCode() {
    Taro
      .scanCode({
        scanType: 'qrCode',
      })
      .then((res) => {
        console.log(res)
        const { errMsg, result } = res;
        if (errMsg === 'scanCode:ok') {
          this.setState({
            accesstoken: result,
          }, this.handleSubmit);
        }
      })
      .catch((error) => {
        const { errMsg } = error;
        const errorMsg = errMsg === 'scanCode:fail' ? '识别失败, 请重试' : '扫码登录失败, 请重试';

        Taro.showToast({
          title: errorMsg,
          icon: 'none',
        });
      })
  }

  render () {
    const { isAutoLogin, accesstoken } = this.state;

    return (
      <View className='page page-white'>
        <View className='login-placeholder'>
          <Image src={avatarDefault} />
        </View>
        <View className='login-form'>
          <View className='form-item'>
            <Label className='label'>登录密钥</Label>
            <Input
              value={accesstoken}
              onInput={this.handleInputaccesstoken}
              placeholder='请输入 accesstoken'
            />
          </View>

          <View className='form-item flex flex-align-center flex-justify-between'>
            <CheckboxGroup onChange={this.handleChange}>
              <Checkbox
                value={isAutoLogin}
                checked={isAutoLogin}
              >自动登录</Checkbox>
            </CheckboxGroup>
            <Text className='button-link'>忘记 Access Token ?</Text>
          </View>

          <View className='form-item'>
            <Button
              className='button-primary'
              type='primary'
              onClick={this.handleSubmit}
            >立即登录</Button>
            <Button
              onClick={this.handleScanCode}
            >扫码登录</Button>
          </View>

        </View>
      </View>
    )
  }
}

export default Index
