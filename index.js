'use strict'

var assertErr = require('assert-err')
var debug = require('debug')('validate-firepad-text-operation')

var utils = require('./lib/op-pattern-utils.js')

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
  var patternFound
  // check if op for full pattern
  patternFound = utils.findFullPattern(op)
  if (patternFound) {
    return // validated
  }
  // op has multiple ops..
  var opLeft = op.slice()
  var opOut
  // remove start op
  patternFound = utils.findStartPattern(opLeft)
  if (patternFound) {
    // slice it off leave positive integer on end (for middle patterns)
    opOut = opLeft.splice(0, patternFound.length - 1)
    debug('validateTextOperationJSON: startOp %o', opOut)
  }
  // remove end op
  patternFound = utils.findEndPattern(opLeft)
  if (patternFound) {
    // slice it off, leave positive integer at start (for middle patterns)
    opOut = opLeft.splice(0 - patternFound.length - 1)
    debug('validateTextOperationJSON: endOp %o', opOut)
  }
  // remove middle op(s)
  while (opLeft.length) {
    if (opLeft.length === 1) {
      break
    }
    patternFound = utils.findMiddlePattern(opLeft)
    // pattern is guaranteed to be found..
    // slice it off, leave positive integer at start (for middle patterns)
    opOut = opLeft.splice(0, patternFound.length - 1)
    debug('validateTextOperationJSON: middleOp %o', opOut)
  }
}
