import { FILE_BASE_URL } from '@/constants/misc';

export function getFileSrc(uri: string) {
  return uri ? `${FILE_BASE_URL}${uri}` : uri;
}

export function getFileName(uri: string) {
  return uri ? uri.split('/').pop() : uri;
}

export function getFileInfo(uri: string) {
  return { name: getFileName(uri), url: getFileSrc(uri), response: { uploadUrl: uri } };
}
