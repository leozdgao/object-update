var _ = require('./util')

function toLinkNode (origin) {
  var keys = [ '<<root>>' ]
  var vals = [ { parentId: null, children: null, isArray: _.isArray(origin) } ]
  var _hasUpdated = false

  // return children index
  function populate (obj, parentId) {
    var children = []

    _.forEach(obj, function (val, key) {
      var tempIndex

      if (_.isObject(val) || _.isArray(val)) {
        keys.push(key)
        tempIndex = vals.push(
          { parent: parentId, children: null, isArray: _.isArray(val) }
        ) - 1
        vals[tempIndex].children = populate(val, tempIndex)
      } else {
        keys.push(key)
        tempIndex = vals.push(
          { parent: parentId, children: null, val: val }
        ) - 1
      }
      children.push(tempIndex)
    })

    return children
  }

  function constructObj (children, isArray) {
    var ret = !!isArray ? [] : {}
    _.forEach(children, function (childIndex) {
      var keyName = keys[childIndex]
      var child = vals[childIndex]

      if (_.isDefined(child.children))
        ret[keyName] = constructObj(child.children, child.isArray)
      else ret[keyName] = child.val
    })

    return ret
  }

  function getValByPath (path) {
    var paths = path.split('.')
    var ret = paths.reduce(function (target, sub) {
      if (_.isDefined(target) && _.isDefined(target.children)) {
        for (var i = 0; i < target.children.length; i++) {
          var kid = target.children[i]
          var key = keys[kid]
          if (key === sub) {
            return vals[kid]
          }
        }
      }
    }, vals[0])

    return ret
  }

  vals[0].children = populate(origin, 0)

  return {
    getValue: function (path) {
      var target = getValByPath(path)
      if (_.isDefined(target)) {
        if (_.isDefined(target.children))
          return constructObj(target.children, target.isArray)
        else return target.val
      }
    },
    update: function (path, val) {
      var target = getValByPath(path)
      if (_.isDefined(target)) {
        var id = vals.indexOf(target)

        if (_.isArray(val) || _.isObject(val)) {
          target.val = null
          target.children = populate(val, id)
        }
        else {
          target.val = val
          target.children = null
        }

        _hasUpdated = true
      }
    },
    toObject: function () {
      if (_hasUpdated) return constructObj(vals[0].children, vals[0].isArray)
      else return origin
    }
  }
}

module.exports = toLinkNode
