var utils = require('./util')
var forEach = utils.forEach
var isObject = utils.isObject
var isArray = utils.isArray
// var isDefined = utils.isDefined

function objToLinkNode (obj) {
  var keys = [ '<<root>>' ]
  var vals = [ { parentId: null, children: null, isArray: isArray(obj) } ]

  // return children index
  function populate (obj, parentId) {
    var children = []

    forEach(obj, function (val, key) {
      var tempIndex

      if (isObject(val)) {
        keys.push(key)
        tempIndex = vals.push({ parent: parentId, children: null, isArray: isArray(val) }) - 1
        vals[tempIndex].children = populate(val, tempIndex)
      } else {
        keys.push(key)
        tempIndex = vals.push({ parent: parentId, children: null, val: val }) - 1
      }
      children.push(tempIndex)
    })

    return children
  }

  vals[0].children = populate(obj, 0)

  return {
    keys: keys, vals: vals
  }
}

function linkNodeToObj (lnode) {
  var keys = lnode.keys
  var vals = lnode.vals

  function constructObj(children, isArray) {
    var ret = !!isArray ? [] : {}
    forEach(children, function (childIndex) {
      var keyName = keys[childIndex]
      var child = vals[childIndex]

      if (child.children)  ret[keyName] = constructObj(child.children, child.isArray)
      else ret[keyName] = child.val
    })

    return ret
  }

  return constructObj(vals[0].children, vals[0].isArray)
}

module.exports = {
  linkNodeToObj: linkNodeToObj,
  objToLinkNode: objToLinkNode
}
