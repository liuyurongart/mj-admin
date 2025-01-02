import FAVICON from '@/favicon.ico';
import { RuntimeConfig, history } from '@umijs/max';
import { message } from 'antd';
import { merge } from 'es-toolkit/compat';
import { AvatarDropdown } from './components/avatarDropdown';
import { API_BASE_URL } from './constants/misc';
import { TOKEN } from './constants/token';
import { getAuthorizationHeader } from './utils';
import './utils/dayjsPlugins';

export const getInitialState = async () => {
  return { userInfo: TOKEN.get() || '' };
};

export const antd: RuntimeConfig['antd'] = (memo) => {
  memo.form = {
    validateMessages: {
      required: '${label}不能为空',
      types: {
        email: '不是一个有效的邮箱地址',
      },
    },
  };
  memo.input = {
    autoComplete: 'off',
  };

  return memo;
};

export const request: RuntimeConfig['request'] = {
  baseURL: API_BASE_URL,
  paramsSerializer(params) {
    return new URLSearchParams(params).toString();
  },
  requestInterceptors: [
    (url, options) => {
      const defaultOptions = {
        headers: { ...getAuthorizationHeader() },
      };
      return { url, options: merge(defaultOptions, options) };
    },
  ],
  responseInterceptors: [
    async (response) => {
      const { code, message: msg } = response.data as Record<string, any>;
      if (code === 50002) {
        await message.error(msg);
        history.replace('/login');
      }
      return response;
    },
  ],
  errorConfig: {
    errorHandler(error) {
      message.error('服务器发生啦一点问题....');
    },
  },
};

export const layout: RuntimeConfig['layout'] = ({ initialState }) => {
  const { userInfo } = initialState ?? {};
  return {
    layout: 'mix',
    siderWidth: 180,
    logo: FAVICON,
    token: {
      sider: {
        paddingInlineLayoutMenu: 0,
      },
    },
    avatarProps: {
      title: userInfo,
      render: (avatarProps, defaultDom, props) => <AvatarDropdown />,
      src: 'http://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    },
    // waterMarkProps: { content: userInfo },
    onPageChange: () => {
      if (!userInfo) {
        console.log('未登录');
        history.replace('/login');
      }
    },
  };
};
