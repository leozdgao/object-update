# object-update
[![npm version](https://badge.fury.io/js/object-update.svg)](https://badge.fury.io/js/object-update)
[![Build Status](https://travis-ci.org/leozdgao/object-update.svg?branch=master)](https://travis-ci.org/leozdgao/object-update)

Update a deep nested object with path, return the origin object if not change.

## Installation

Just use npm to install it. If you want to use it in frontend, use can use webpack or browserify to bundle it to your codebase

```javascript
npm install object-update
```

## How to use

```javascript
var update = require('object-update')
var obj = {
  foo: 'bar',
  nest: {
    cat: 'moew'
  },
  arr: [ 0, 1, 2 ]
}

var newObject = update(obj, {
  'foo': 'barrr',
  'arr.1': 100, // support array
  'nest.cat': { kitty: 'lol' }
})

console.log(newObject)
// {
//   foo: 'barrr',
//   nest: {
//     cat: { kitty: 'lol' }
//   },
//   arr: [ 0, 100, 2 ]
// }
//
```

It is very appreciate to do `PureRender` if you are using React.js like this:

```javascript
{
  handleClick () {
    const newObj = update(this.state.todos, {
      '1.text': 'new text'
    })

    this.setState(newObj)
  }

  shouldComponentUpdate (nextProps, nextState) {
    // pure render
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState)
  }
}
```

For more use case, check the lnode.spec.js in test folder.
