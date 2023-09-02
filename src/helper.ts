export const buildHighlightStr = (str: string, keyword: string): string => {
  const keywordLen = keyword.length;
  let result = "";

  if (keywordLen === 0) return `<div>${str}</div>`;

  while (str.length > 0) {
    const i = str.indexOf(keyword);
    if (i !== -1) {
      // found the match
      const notMatchPart = str.substring(0, i);
      const matchPart = `<span class='highlight'>${str.substring(
        i,
        i + keywordLen
      )}</span>`;
      str = str.substring(i + keywordLen);
      result += notMatchPart + matchPart;
    } else {
      //no found
      break;
    }
  }

  result += str;

  return `<div>${result}</div>`;
};
