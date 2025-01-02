export function formatRangeParams(range: Array<String | number>) {
  if (!Array.isArray(range)) return;
  return `[${range.join(',')}]`;
}
