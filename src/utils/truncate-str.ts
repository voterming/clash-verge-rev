export const truncateStr = (str?: string, prefixLen = 16, maxLen = 56) => {
<<<<<<< HEAD
  if (!str || str.length <= maxLen) return str
  return (
    str.slice(0, prefixLen) + ' ... ' + str.slice(-(maxLen - prefixLen - 5))
  )
}
=======
  if (!str || str.length <= maxLen) return str;
  return (
    str.slice(0, prefixLen) + " ... " + str.slice(-(maxLen - prefixLen - 5))
  );
};
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
