'use strict'

var isInt = require('101/is-integer')

module.exports = function isPositiveInt (n) {
  return isInt(n) && n > 0
}
