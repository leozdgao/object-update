var assert = require('assert')
var lnode = require('../lib/linkNode')
var isSame = function (a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}

describe('LinkNode test case', function () {
  it('should support deep nested object and return a new object', function () {
    var obj = {
      foo: 'bar',
      bar: [ 0, 1, 2 ],
      num: 0,
      fun: function () {},
      reg: /^$/,
      nest: { foo: 'bar', nest: { foo: 'bar' }, arr: [ 0, 1, 2 ] },
      nexta: [ 0, { foo: 'bar' } ]
    }
    var n = lnode.objToLinkNode(obj)
    var newObj = lnode.linkNodeToObj(n)

    assert.equal(isSame(obj, newObj), true)
    assert.equal(obj === newObj, false)
  })
  it('should support deep nested array and return a new array', function () {
    var arr = [ 0, { foo: 'bar' } ]
    var n = lnode.objToLinkNode(arr)
    var newArr = lnode.linkNodeToObj(n)

    assert.equal(isSame(arr, newArr), true)
    assert.equal(arr === newArr, false)
  })
})
