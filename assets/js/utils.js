function parseCookies(str) {
  var obj = {}
  var pairs = str.split(';')
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i]
    var index = pair.indexOf('=')

    // skip things that don't look like key=value
    if (index < 0) {
      continue;
    }

    var key = pair.substring(0, index).trim()

    // only assign once
    if (undefined == obj[key]) {
      var val = pair.substring(index + 1, pair.length).trim()

      // quoted values
      if (val[0] === '"') {
        val = val.slice(1, -1)
      }

      try {
        obj[key] = decodeURIComponent(val)
      } catch (e) {
        obj[key] = val
      }
    }
  }
  return obj
}
exports.parseCookies = parseCookies


// Source: https://stackoverflow.com/a/38552302/7431543
const parseJWT = (token) => {
  if (process.server) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
  }
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))

  return JSON.parse(jsonPayload)
}
exports.parseJWT = parseJWT