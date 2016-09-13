'use strict'

var assertErr = require('assert-err')
var assign = require('101/assign')
var debug = require('debug')('validate-firepad-text-operation:op-pattern-utils')
var isString = require('101/is-string')
var find = require('object-loops/find')
var last = require('101/last')

var isNegativeInt = require('./is-negative-integer.js')
var isPositiveInt = require('./is-positive-integer.js')

var startPatterns = {
  isStartStringDelete: [isNegativeInt, isPositiveInt],
  isStartStringInsert: [isString, isPositiveInt],
  isStartStringReplace: [isString, isNegativeInt, isPositiveInt]
}
var middlePatterns = {
  isMiddleStringDelete: [isPositiveInt, isNegativeInt, isPositiveInt],
  isMiddleStringInsert: [isPositiveInt, isString, isPositiveInt],
  isMiddleStringReplace: [isPositiveInt, isString, isNegativeInt, isPositiveInt]
}
var endPatterns = {
  isEndStringDelete: [isPositiveInt, isNegativeInt],
  isEndStringInsert: [isPositiveInt, isString],
  isEndStringReplace: [isPositiveInt, isString, isNegativeInt]
}
var fullPatterns = assign(startPatterns, middlePatterns, endPatterns, {
  noop: [isPositiveInt],
  isFullDelete: [isNegativeInt],
  isFullInsert: [isString],
  isFullReplace: [isString, isNegativeInt]
})
var findPatternMatch = function (patternMap, op, exact, endPattern) {
  return find(patternMap, function (pattern) {
    if (exact && pattern.length !== op.length) { return }
    if (pattern.length > op.length) { return }
    var offset = endPattern
      ? (op.length - pattern.length)
      : 0
    return pattern.every(function (test, i) {
      return test(op[i + offset])
    })
  })
}

module.exports.findFullPattern = findFullPattern
module.exports.findStartPattern = findStartPattern
module.exports.findMiddlePattern = findMiddlePattern
module.exports.findEndPattern = findEndPattern

function findFullPattern (op) {
  debug('findFullPattern %o', op)
  var pattern = findPatternMatch(fullPatterns, op, true)
  // op must match full pattern if length is <= 3
  assertErr(pattern || op.length > 3, Error, 'invalid operation start', { op: op })
  return pattern
}

function findStartPattern (op) {
  debug('findStartPattern %o', op)
  if (isPositiveInt(op[0])) {
    return
  }
  // op does not start w/ positive-integer.. must have start op.
  var pattern = findPatternMatch(startPatterns, op)
  assertErr(pattern, Error, 'invalid operation start', { op: op })
  return pattern
}

function findMiddlePattern (op) {
  debug('findMiddlePattern %o', op)
  // must match a middle op.
  var pattern = findPatternMatch(middlePatterns, op)
  assertErr(pattern, Error, 'invalid operation middle', { op: op })
  return pattern
}

function findEndPattern (op) {
  debug('findEndPattern %o', op)
  if (isPositiveInt(last(op))) {
    return
  }
  // op does not start w/ positive-integer.. must have start op.
  var pattern = findPatternMatch(endPatterns, op, false, true)
  assertErr(pattern, Error, 'invalid operation end', { op: op })
  return pattern
}
