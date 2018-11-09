export function parseBoolean (string) {
  if (string === 'true') {
    return true
  } else if (string === 'false') {
    return false
  } else {
    return string
  }
}
