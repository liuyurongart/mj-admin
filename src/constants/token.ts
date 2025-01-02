export const TOKEN = {
  key: 'Access-Token',
  get: () => {
    return sessionStorage.getItem(TOKEN.key);
  },
  set: (val: string) => {
    sessionStorage.setItem(TOKEN.key, val);
  },
  remove: () => {
    sessionStorage.removeItem(TOKEN.key);
  },
};
