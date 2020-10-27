export default (word) => {
  return word.replace(/(-\w)/g, function (m) { return m[1].toUpperCase() })
}
