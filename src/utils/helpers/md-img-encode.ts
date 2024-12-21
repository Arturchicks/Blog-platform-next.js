export const mdImgEncode = (markdown: string) => {
  const regex = /!\[(.*?)\]\((.*?)\)/g;
  const modifiedMd = markdown.replace(regex, (match, alt, src) => {
    return src.length >= 1000
      ? `![${alt}](${encodeURIComponent(src)})`
      : `![${alt}](${src})`;
  });
  return modifiedMd;
};
