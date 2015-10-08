var assert = require('assert')
var lnode = require('../lib/linkNode')
var isSame = function (a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}

var objCase = {
  foo: 'bar',
  bar: [ 0, 1, 2 ],
  num: 0,
  fun: function () {},
  reg: /^$/,
  nest: { foo: 'bar', nest: { foo: 'bar' }, arr: [ 0, 1, 2 ] },
  nexta: [ 0, { foo: 'bar' } ]
}
var arrayCase = [ 0, { foo: 'bar' } ]

describe('LinkNode support deep nested object or array', function () {
  it('should #toObject return origin object or array if not update', function () {
    var n = lnode(objCase)
    var newObj = n.toObject()

    assert.equal(isSame(objCase, newObj), true)
    assert.equal(objCase === newObj, true)

    var a = lnode(arrayCase)
    var newArr = a.toObject()

    assert.equal(isSame(arrayCase, newArr), true)
    assert.equal(arrayCase === newArr, true)
  }),
  it('should #getValByPath get value', function () {
    var n = lnode(objCase)

    assert.equal(n.getValue('foo'), 'bar')
    assert.equal(n.getValue('nest.nest.foo'), 'bar')
    assert.equal(n.getValue('bar.1'), 1)
    assert.equal(isSame([0, 1, 2], n.getValue('bar')), true)
    assert.equal(isSame({ foo: 'bar' }, n.getValue('nest.nest')), true)
    assert.equal(n.getValue('not.find.the.value'), void(0))

    var a = lnode(arrayCase)

    assert.equal(a.getValue('0'), 0)
    assert.equal(a.getValue('1.foo'), 'bar')
  }),
  it('should #update update the link node, and #toObject return a new object' +
    ' or array', function () {
    var n = lnode(objCase)
    n.update('foo', 'new')
    n.update('nest', { bar: 'foo' })
    n.update('nexta.1', 1)
    n.update('num', { dog: [ 2, 3, 4 ] })

    var expect = {
      foo: 'new',
      bar: [ 0, 1, 2 ],
      num: { dog: [ 2, 3, 4 ] },
      fun: function () {},
      reg: /^$/,
      nest: { bar: 'foo' },
      nexta: [ 0, 1 ]
    }
    var newObj = n.toObject()

    assert.equal(isSame(expect, newObj), true)
    assert.equal(objCase === newObj, false)
  })
})
