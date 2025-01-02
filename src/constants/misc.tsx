export const SYSTEM_ERROR_MESSAGE = '服务异常，请稍后再试...';

// API服务地址
export const API_BASE_URL = {
  dev: 'http://47.97.118.162:8080',
  test: 'http://47.97.118.162:8080',
  prod: 'http://47.97.118.162:8080',
}[process.env.APP_ENV || 'dev'];

// 日期格式
export const DATE_TIME = 'YYYY-MM-DD HH:mm:ss';

// 日期时间格式
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
