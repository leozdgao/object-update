var assert = require('assert')
var update = require('../lib/update')

var objectCase = {
  style: {
    top: 0,
    width: 100
  },
  tips: [
    { id: 0, text: 'test0' },
    { id: 1, text: 'test1' }
  ]
}

describe('object-update test case', function () {
  it('should return origin if not update', function () {
    var newObj = update(objectCase, {
      'cant.find.value': 'foo'
    })

    assert.equal(newObj === objectCase, true)
  }),
  it('should return a new object after update', function () {
    var newObj = update(objectCase, {
      'style.top': 100,
      'tips.1': { id: 100, text: 'test100' }
    })

    assert.equal(newObj.style.top, 100)
    assert.deepEqual(newObj.tips[1], { id: 100, text: 'test100' })
    assert.equal(newObj === objectCase, false)
  })
})
