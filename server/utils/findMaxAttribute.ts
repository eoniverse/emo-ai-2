export default (data: Record<string, number>): [string, number] => {
  return Object.entries(data).reduce(
    (max, [key, value]) => (value > max[1] ? [key, value] : max),
    ['', -Infinity]
  )
}
