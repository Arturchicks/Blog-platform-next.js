export const countPagination = <T>(articles: T[]): number => {
  return Math.floor(articles.length / 20)
}
