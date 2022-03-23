function parse(str) {
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
exports.parse = parse