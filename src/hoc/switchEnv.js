import Taro from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'

import { ENV, ENV_LIST } from '@/config'
import iconSwitchEnv from '@/assets/images/icon-switch-env.png'

let currentTime = Date.now()
let lastTime = Date.now()

function switchEnv() {
  console.log('HOC =>> switchEnv');

  return function switchEnvComponent(Component) {

    // 处理 H5 兼容异常
    if (Taro.getEnv() === 'WEB') {
      return Component;
    }

    @inject('debuggerStore')
    class SwitchEnv extends Component {
      constructor(props) {
        super(props);

        this.state = {
          debugMenusConfig: [],
        };
      }

      componentWillMount () {
        const { isShowed } = this.props.debuggerStore;
        if (isShowed) {
          this.$_showSwitchApiEnv();
        }
      }


      // 显示 切换 API 环境
      $_handlwSwitchApiEnvShow() {
        const { isShowed, counter, limitCounter } = this.props.debuggerStore;
        if (isShowed) {
          return;
        }

        if (counter >= limitCounter) {
          Taro.showToast({
            title: `当前已可以切换环境`,
            icon: 'none',
          });

          this.$_showSwitchApiEnv();
          this.props.debuggerStore.setSwitchApiEnvShow();
        } else {
          currentTime = Date.now();

          // 累加点击次数
          if (currentTime - lastTime < 500) {
            Taro.showToast({
              title: `还差${limitCounter - counter}步才能切换环境`,
              icon: 'none',
            });
            this.props.debuggerStore.increment();
          }

          lastTime = currentTime;
        }
      }

      /**
       * 显示 环境切换
       *
       * @memberof Index
       */
      $_showSwitchApiEnv() {
        const envName = ENV_LIST.find(item => item.value === ENV).name;
        this.state.debugMenusConfig.push(
          {
            name: `切换环境 - ${envName}(${ENV})`,
            icon: iconSwitchEnv,
            callback:() => {
              this.$_handlwSwitchApiEnv();
            }
          },
          {
            name: '关闭切换环境',
            icon: iconSwitchEnv,
            callback:() => {
              this.$_handlwSwitchApiEnvClose();
            }
          }
        );

        this.setState({
          menusConfig: this.state.menusConfig,
        });
      }

      /**
       * 切换环境
       *
       * @memberof Index
       */
      $_handlwSwitchApiEnv() {
        Taro
          .showActionSheet({
            itemList: ENV_LIST.map(item => item.name),
          })
          .then((res) => {
            const { tapIndex } = res;
            const env = ENV_LIST[tapIndex].value;
            this.props.debuggerStore.setApiEnv(env);

            Taro.showModal({
              title: '提示',
              content: `已切换为${ENV_LIST[tapIndex].name}环境, 请删除小程序重进`,
              showCancel: false,
            });
          })
          .catch((error) => {
            console.log(error.errMsg);
          })
      }

      /**
       * 关闭切换环境
       *
       * @memberof Index
       */
      $_handlwSwitchApiEnvClose() {
        this.setState({
          debugMenusConfig: [],
        });

        this.props.debuggerStore.reset();
      }
    }

    return SwitchEnv;
  }
}

export default switchEnv;
