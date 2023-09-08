export const cutString = (str: string, num: number) => {
  if (str.length > num) {
    return `${str.substring(0, num)}...`;
  }
  return str;
};

export const stripHtml = (str: string) => {
  return cutString(str.replace(/(<([^>]+)>)/gi, ''), 120);
};
