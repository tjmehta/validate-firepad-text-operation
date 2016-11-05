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
      // var prelen = op.length
      validate(op)
      // expect(op.length).to.equal(prelen)
    })
  })

  var invalidOps = [
    [
      1,
      1
    ],
    [
      0,
      0
    ],
    [
      -1,
      -1
    ],
    [
      'yo',
      'yo'
    ],
    [
      {}
    ]
  ]
  invalidOps.forEach(function (op) {
    it('should error if op is invalid: invalidOp', function () {
      expect(function () {
        validate(op)
      }).to.throw(/invalid/)
    })
  })
})
