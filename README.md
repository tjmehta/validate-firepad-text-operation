# validate-firepad-text-operation [![Build Status](https://travis-ci.org/tjmehta/validate-firepad-text-operation.svg)](https://travis-ci.org/tjmehta/validate-firepad-text-operation) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)
Validate firepad text operation json

# Installation
```bash
npm i --save validate-firepad-text-operation
```

# Usage
Example 1: Successfully validate text-operation json
```js
var validate = require('validate-firepad-text-operation')
var opJSON = [10, 'hello world', 20]

// Success
validate(opJSON)

// Go on and create a firepad TextOperation
TextOperation.fromJSON(opJSON)
```
Example 2: Successfully invalidate text-operation json
```js
var validate = require('validate-firepad-text-operation')

validate({})
// throws [Error: must be an array]
validate([])
// throws [Error: operation cannot be empty]
validate(['f', 1, 1])
// throws [Error: invalid operation start]
validate([1, 1, 1, 1, 1])
// throws [Error: invalid operation middle]
validate([1, 'f', -1, -1])
// throws [Error: invalid operation end]
```

# License
MIT
