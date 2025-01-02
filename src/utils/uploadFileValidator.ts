import { SYSTEM_ERROR_MESSAGE } from '@/constants/misc';
import { UploadFile } from 'antd';

export function uploadFileValidator(rule: any, value: UploadFile[]) {
  if (!(Array.isArray(value) && value.length > 0)) {
    return Promise.reject('文件不能为空');
  }
  if (value.every((it) => Boolean(it.response))) {
    return Promise.resolve();
  }
  if (value.some((it) => it.status === 'uploading')) {
    return Promise.reject('文件正在上传中...');
  }
  if (value.some((it) => it.status === 'error')) {
    return Promise.reject('文件上传出错啦，请移除错误文件');
  }
  return Promise.reject(SYSTEM_ERROR_MESSAGE);
}
