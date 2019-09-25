import Taro from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { gotoLoginPage } from '@/router/helper'

// 需要检验登录的生命周期
const LIFE_CYCLE_MAP = ['willMount', 'didMount', 'didShow'];

function withLoign(lifecycle = 'willMount') {
  // 异常规避提醒
  if (!LIFE_CYCLE_MAP.includes(lifecycle)) {
    console.warn(
      `传入的生命周期不存在, 鉴权判断异常 ===========> $_{lifecycle}`
    );
    return Component => Component;
  }

  return function withLoginComponent(Component) {

    // 处理 H5 兼容异常
    if (Taro.getEnv() === 'WEB') {
      return Component;
    }

    @inject('accountStore')
    @observer
    class WithLogin extends Component {
      constructor(props) {
        super(props);
      }

      async componentWillMount() {
        if (super.componentWillMount) {
          if (lifecycle === LIFE_CYCLE_MAP[0]) {
            const res = await this.$_checkLogin();
            if (!res) return;
          }

          super.componentWillMount();
        }
      }

      async componentDidMount() {
        if (super.componentDidMount) {
          if (lifecycle === LIFE_CYCLE_MAP[1]) {
            const res = await this.$_checkLogin();
            if (!res) return;
          }

          super.componentDidMount();
        }
      }

      async componentDidShow() {
        if (super.componentDidShow) {
          if (lifecycle === LIFE_CYCLE_MAP[2]) {
            const res = await this.$_checkLogin();
            if (!res) return;
          }

          super.componentDidShow();
        }
      }

      $_checkLogin = () => {
        const { accountStore: { account } } = this.props;
        if (!account) {
          const action = 'replace';
          gotoLoginPage(action);
          return false;
        }

        return account;
      }

      render() {
        return super.render();
      }
    }

    return WithLogin;
  }
}

export default withLoign;
