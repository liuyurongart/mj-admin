import { TOKEN } from '@/constants/token';
import { presetPrimaryColors } from '@ant-design/colors';
import { isArray, isEmpty, random } from 'es-toolkit/compat';
import md5 from 'md5';

export function downloadWithToken(blob: Blob | MediaSource, options?: { name?: string; contentDisposition?: string }) {
  if (!blob) return;
  const { name, contentDisposition } = options ?? {};
  const a = document.createElement('a');
  const href = URL.createObjectURL(blob);
  let filename: string = '';
  if (name) {
    filename = decodeURIComponent(name);
  }
  if (contentDisposition) {
    filename = decodeURIComponent(contentDisposition.split('filename=')[1]);
  }
  if (filename) a.download = filename;
  a.href = href;
  a.click();
  URL.revokeObjectURL(href);
}

export function MD5(message: string) {
  return md5(message).toUpperCase();
}

export function waitTime(time: number = 100) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

export function arrayToMap<T, K extends keyof T>(arr: T[], key: K) {
  return arr.reduce((acc, val) => {
    acc.set(val[key], val);
    return acc;
  }, new Map<T[K], T>());
}

export const dateFormat = 'YYYY-MM-DD';

export const randomColor = () => {
  const colors = Object.entries(presetPrimaryColors);
  return colors[random(0, colors.length - 1)][1];
};

type TreeNode<T> = { children?: TreeNode<T>[] } & T;

export function traverseTree<T>(data: TreeNode<T>, callback: (node: TreeNode<T>) => void) {
  function recursiveTraversal(node: TreeNode<T>) {
    callback(node);
    if (isArray(node?.children) && !isEmpty(node.children)) {
      for (let i = 0; i < node.children.length; i++) {
        recursiveTraversal(node.children[i]);
      }
    }
  }

  recursiveTraversal(data);
}

export function getAuthorizationHeader() {
  return { 'Access-Token': TOKEN.get() };
}
