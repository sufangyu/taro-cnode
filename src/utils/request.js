import Taro from '@tarojs/taro'

const defaults = {
  url: '',
  data: {},
  header: {},
  method: 'GET',
  loading: true,
  loadingText: '',
};

function request(options) {
  const mergetOptions = Object.assign({}, defaults, options);
  const { url, data, header, method, loading, loadingText } = mergetOptions;

  return new Promise((resolve, reject) => {
    if (loading) {
      const loadingOption = loadingText ? {title: loadingText, mask: true} : {mask: true};
      Taro.showLoading(loadingOption);
    }

    Taro
      .request({
        url,
        data,
        method,
        header,
      })
      .then((res) => {
        Taro.hideLoading();

        const { success, error_msg } = res.data;
        if (success) {
          return resolve(res.data);
        } else {
          Taro.showToast({
            title: error_msg || '请求失败, 请重试',
            icon: 'none',
            duration: 2000,
          });
          return reject(res.data);
        }
      })
      .catch((error) => {
        Taro.hideLoading();

        Taro.showToast({
          title: error.errMsg || '请求失败, 请重试',
          icon: 'none',
          duration: 2000,
        });
        return reject(error);
      })
  });
}




const http = {
  get({url = '', data = {}, loading = true, loadingText}) {
    return request({url, data, loading, loadingText});
  },
  post({url = '', data = {}, loading = true, loadingText}) {
    return request({url, data, method: 'POST', loading, loadingText});
  },
};

export default http;
