'use strict'

var assertErr = require('assert-err')
var debug = require('debug')('validate-firepad-text-operation')

module.exports = validateTextOperationJSON

/**
 * validate firepad text-operation json
 * @param  {Array} op firepad text-operation json
 * @return {[type]}    [description]
 */
function validateTextOperationJSON (op) {
  debug('validateTextOperationJSON %o', op)
  assertErr(Array.isArray(op), Error, 'operation must be an array', { op: op })
  assertErr(op.length, Error, 'operation cannot be empty', { op: op })
  let type
  let lastType = ''
  op.forEach(function (item) {
    if (typeof item === 'string') {
      // valid
      type = 'string'
      assertErr(lastType !== type, Error, 'invalid operation: cannot have repeating ' + type + 's')
      lastType = type
      return
    } else if (typeof item === 'number') {
      var isIntegerOrZero = (item === (item | 0))
      assertErr(isIntegerOrZero, Error, 'invalid operation: numbers must be integers')
      type = item === 0
        ? 'zero'
        : item > 0
          ? 'positive integer'
          : 'negative integer'
      assertErr(lastType !== type, Error, 'invalid operation: cannot have repeating ' + type + 's')
      lastType = type
    } else {
      throw new Error('invalid operation: must be an array of strings and numbers')
    }
  })
}
