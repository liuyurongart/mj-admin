import { defineConfig } from '@umijs/max';
import routes from './routes';

export const APP_NAME = '系统登录';

export default defineConfig({
  routes,
  antd: {
    configProvider: {},
    appConfig: {},
  },
  model: {},
  access: {},
  hash: true,
  request: {
    dataField: 'result',
  },
  initialState: {},
  // reactQuery: {},
  layout: {
    title: APP_NAME,
  },
  unocss: {
    watch: ['src/**/*.tsx'],
  },
  plugins: [require.resolve('@umijs/plugins/dist/unocss')],
  define: {
    'process.env.APP_NAME': APP_NAME,
    'process.env.APP_ENV': process.env.APP_ENV || 'dev',
  },
});
