import { patterns } from '@/constants';

export function desensitize(value: string, before: number, after: number) {
  const placeholder = '*'.repeat(Math.min(after - before, 4));
  return value.substring(0, before) + placeholder + value.substring(after);
}

export function desensitizer(value: string) {
  if (!value) return;
  const len = value.length;
  if (patterns?.email.pattern.test(value)) {
    return desensitize(value, 1, value.indexOf('@'));
  }
  if (patterns?.mobile.pattern.test(value)) {
    return desensitize(value, 3, 7);
  }
  const after = len < 3 ? len : len - 1;
  const before = Math.min(Math.floor(len / 3), 6);
  return desensitize(value, before, after);
}
