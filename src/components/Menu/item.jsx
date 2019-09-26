import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import PropTypes from 'prop-types';

import './index.scss';

export default class ListItem  extends Component {
  constructor(props) {
    super(props);
  }

  handleNavigateTo(menu) {
    const { path } = menu;
    if (path) {
      Taro.navigateTo({
        url: path,
      });
    }
  }

  render() {
    const { menu, isLast } = this.props;
    const {
      name,
      icon,
      brief,
      path,
      disabled,
      callback,
    } = menu;

    return (
      <View
        className={
          [
            'list-item',
            disabled ? 'list-item-disabled' : null,
            isLast ? 'list-item-last' : null,
          ]
        }
        onClick={() => {
          if (path) {
            this.handleNavigateTo(menu);
          } else {
            callback();
          }
        }}
      >
        {
          icon
          ? <View className='list-item-thumb'><Image src={icon} /></View>
          : null
        }

        <View className='list-item-content'>
          <View className='list-item-title'>
            <Text>{name}</Text>
            {
              brief
              ? <View className='list-item-brief'>{brief}</View>
              : null
            }
          </View>

          <View className='list-item-extra'></View>
          {
            path
            ? <View className='list-item-arrow'></View>
            : null
          }
        </View>
      </View>
    );
  }
}

ListItem.propTypes = {
  menu: PropTypes.object,
  isLast: PropTypes.bool,
};

ListItem.defaultProps = {
  menu: {},
  isLast: false,
};
