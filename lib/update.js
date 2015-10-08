var _ = require('./util')
var linkNode = require('./linkNode')

function update (obj, pathmap) {
  // obj => lnode
  var lnode = linkNode(obj)

  // update
  _.forEach(pathmap, function (val, key) {
    lnode.update(key, val)
  })

  // lnode => obj
  return lnode.toObject()
}

module.exports = update
