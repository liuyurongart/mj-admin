import { getFileSrc } from '@/utils/file';
import { AxiosRequestConfig } from '@umijs/max';
import { App, Upload, UploadProps } from 'antd';
import to from 'await-to-js';

interface PropsType extends UploadProps {
  /**
   * 最大上传文件体积,单位byte
   */
  maxSize?: { value: number; error: string };
  /**
   * 支持的文件类型
   */
  fileTypes?: { value: string[]; error: string };
  /**
   * 是否自动触发上传行为
   */
  automaticUpload?: Boolean;
  /**
   * 上传接口
   */
  request?: (file: any, options?: AxiosRequestConfig) => Promise<Record<string, any>>;
}

export function useUpload(props: PropsType) {
  const { request, automaticUpload, maxSize, fileTypes, ...restProps } = props;

  const { message } = App.useApp();

  const customRequest: UploadProps['customRequest'] = async (options) => {
    const { file, onSuccess, onError, onProgress } = options;
    const requestOptions: AxiosRequestConfig = {
      onUploadProgress: ({ loaded, total }: any) => {
        onProgress?.({ percent: Math.round((loaded * 100) / total) });
      },
    };
    const [err, res] = await to(request!({ file }, requestOptions));
    const { success, result, message: msg } = res ?? {};
    if (success && result) {
      file.url = getFileSrc(result.uploadUrl);
      onSuccess?.(result);
    } else {
      onError?.(new Error(msg));
    }
  };

  const beforeUpload: UploadProps['beforeUpload'] = (file, FileList) => {
    const { type, size } = file;

    if (Array.isArray(fileTypes?.value) && !fileTypes.value.includes(type)) {
      message.error(fileTypes.error);
      return Upload.LIST_IGNORE;
    }

    if (Array.isArray(maxSize?.value) && size > maxSize.value) {
      message.error(maxSize.error);
      return Upload.LIST_IGNORE;
    }
    return automaticUpload ? undefined : false;
  };

  return {
    beforeUpload,
    customRequest,
    accept: fileTypes?.value?.join(','),
    ...restProps,
  } as Partial<UploadProps>;
}
