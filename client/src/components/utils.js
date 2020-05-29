/* eslint-disable no-bitwise */
// https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
export const hashCode = (s) => {
  let hash = 0;
  if (s.length === 0) {
    return hash;
  }
  for (let i = 0; i < s.length; i += 1) {
    const char = s.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash &= hash; // Convert to 32bit integer
  }
  return hash;
};

export const toDate = (s) => {
  const d = new Date(s);
  return d;
};
