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
  for (const key in obj) {
    if (hasOwnProperty.call(obj, key))
      iterator.call(null, obj[key], key, obj)
  }
}

module.exports = {
  isDefined: isDefined,
  isObject: isObject,
  isArray: isArray,
  forEach: forEach
}
