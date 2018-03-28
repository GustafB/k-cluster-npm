'use strict'

/**
 * Compute the Euclidean distance
 *
 * @param {Array} v1
 * @param {Array} v2
 * @api private
 */

const euclideanDistance = (v1, v2) => {
  let total = 0;
  if (v1.length !== v2.length) {
    throw (new Error('Vectors must have the same length'))
  }
  for (let i = 0; i < v1.length; i++) {
     total += Math.pow(v2[i] - v1[i], 2);      
  }
  return Math.sqrt(total);
}

/**
 * Normalize data points
 *
 * @param {Array} data
 * @param {Array} edges
 * @api private
 */

const normalizeData = (data, edges) => {
  return data.map(user => {
    user = user.map((a, i) => {
      return a / ((edges[i].max * 0.5) - edges[i].min)  || 0
    })
    return user
  })
}

/**
 * Compute cumulative sum of Array
 *
 * @param {Array} array
 * @api private
 */

const sumArray = (array) => {
  if (!array) return 0;
  return array.reduce((a, b) => a + b);
}

/**
 * Compute sum of squares
 *
 * @param {Array} array
 * @api private
 */

const sumSquare = function(array) {
  if(!array) return 0
  return sumArray(array.map(a => Math.pow(a, 2)));
}

/**
 * Compute pearson correlation
 *
 * @param {Array} x
 * @param {Array} y
 * @api private
 */

const pearsonCorrelation = function(x, y) {
  const sum1 = sumArray(x);
  const sum2 = sumArray(y)

  const sum1Sq = sumSquare(x)
  const sum2Sq = sumSquare(y)

  const pSum = sumArray(x.map((a, i) => x[i] * y[i]))
  const num = pSum - sum1 * sum2 / x.length;

  const den = Math.sqrt((sum1Sq - Math.pow(sum1, 2) / x.length) * (sum2Sq - Math.pow(sum2, 2) / x.length))
  return den ? (1 - num / den) : 0
}

/**
 * Fill array
 *
 * @param {Array} k
 * @param {Primitive} fill
 * @api private
 */

const createFillerArray = (k, fill) => {
  let array = []
  for (let i = 0; i < k; i++) {
    array.push(fill.slice(0))
  }
  return array;
}

module.exports = {
  euclideanDistance,
  pearsonCorrelation,
  createFillerArray,
  normalizeData
}