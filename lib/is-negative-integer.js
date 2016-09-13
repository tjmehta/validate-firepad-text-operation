'use strict'

var isInt = require('101/is-integer')

module.exports = function isNegativeInt (n) {
  return isInt(n) && n < 0
}
