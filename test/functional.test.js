'use strict'

var expect = require('chai').expect
var operations = require('./fixtures/operations.json')
var validate = require('../index.js')

var describe = global.describe
var it = global.it

describe('validate-firepad-text-operation', function () {
  operations.forEach(function (op) {
    // generated test
    it('should validate valid operations: ' + JSON.stringify(op), function () {
      validate(op)
    })
  })

  var invalidOp = [
    1,
    1,
    2,
    -1,
    3,
    -1
  ]
  it('should error if op is invalid: invalidOp', function () {
    expect(function () {
      validate(invalidOp)
    }).to.throw(/invalid/)
  })
})
