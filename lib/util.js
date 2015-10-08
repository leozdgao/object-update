var hasOwnProperty = Object.prototype.hasOwnProperty
var toString = Object.prototype.toString

function isDefined (val) {
  return val != null // undefined or null
}

function isObject (val) {
  return toString.call(val) === '[object Object]'
}

function isArray (val) {
  return toString.call(val) === '[object Array]'
}

function forEach (obj, iterator) {
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key))
      iterator.call(null, obj[key], key, obj)
  }
}

function map (obj, iterator) {
  var ret = []

  forEach(obj, function (val, key, o) {
    var a = iterator.call(null, val, key, o)
    if (isDefined(a)) ret.push(a)
  })

  return ret
}

module.exports = {
  isDefined: isDefined,
  isObject: isObject,
  isArray: isArray,
  forEach: forEach,
  map: map
}
