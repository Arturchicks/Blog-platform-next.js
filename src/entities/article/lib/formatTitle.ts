export const formatTitle = (title: string) => {
  const regex = /[\s+]/g
  const result = title.replace(regex, " ")
  return result.split(" ").reduce((acc, e) => (acc.length > 20 ? acc : acc + " " + e))
}
