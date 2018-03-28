'use strict'

/*
 * k-cluster-npm
 * Copyright(c) 2018 GustafB <gustaf.brostedt@gmail.com>
 * MIT Licensed
 */

/*
Implementation of the k-means clustering algorithm. The function takes as its
input a two-dimensional array, represented as N vectors, k, representing the 
number of clusters to be created, and a distance function. Both of the latter
are optional and will default to 4 and Euclidean distance respectively.

The function will output:
  - centroids: an Array of k vectors, each representing a centroid of each cluster
  - assignments: An array of size k, where each subarray contains the vectors assigned to it
*/

const { pearsonCorrelation, euclideanDistance, createFillerArray, normalizeData } = require('./helpers.js');
const _ = require('lodash');


/**
 * Compute edges of each vector
 *
 * @param {Array} data
 * @api private
 */

const getEdges = (data) => {
  const edges = [];
  data.forEach(vector => {
    vector.forEach((point, j) => {
      if (typeof point !== 'number') {
        throw (new Error('Vectors may only contain numeric values'))
      }
      if (!edges[j]) {
        edges[j] = {min: Infinity, max: -Infinity};
      }
      if (point[j] < edges[j].min) {
        edges[j].min = point[j];
      }
      if (point[j] > edges[j].max) {
        edges[j].max = point[j];
      }
    })
  })
  return edges;
}


/**
 * Randomly select beginning centroids
 *
 * @param {Array} points
 * @param {Number} k
 * @api private
 */

const selectRandomCentroids = (points, k) => {
  let centroids = points.slice(0);
  centroids = centroids.sort(() => (
    (Math.round(Math.random()) - 0.5)
  ));
  return centroids.slice(0, k);
}


/**
 * Assign vector to closest cluster
 *
 * @param {Array} vectors
 * @param {Array} clusters
 * @param {Number} k
 * @param {Function} dist
 * @api private
 */

const assignToCluster = (vectors, clusters, k, dist = euclideanDistance) => {
  const assignments = createFillerArray(k, [])
  vectors.forEach((vector, i) => {
    const distances = clusters.map((c) => dist(c, vector));
    const closest = distances.indexOf(Math.min(...distances));
    console.log(i)
    assignments[closest].push(i);
  })
  return assignments;
}

/**
 * Recalculates the mean of each cluster
 *
 * @param {Array} data
 * @param {Array} clusters
 * @param {Number} k
 * @param {Function} distance
 * @api private
 */
const revertMeans = (data, clusters, k, distance) => {
  const assignments = assignToCluster(data, clusters, k, distance);
  const original = clusters.slice(0).toString();
  clusters.forEach((cluster, i) => {
    cluster.forEach((_, j) => {
      let sum = 0;
      assignments[i].forEach((_, t) => {
        sum += data[assignments[i][t]][j]
      })
      clusters[i][j] = sum / assignments[i].length || 0;
    })
  })
  return [clusters.toString() === original, clusters, assignments];
}

/**
 * Recursively recalculate means until
 * cluster centers are found
 *
 * @param {Array} data
 * @param {Number} k
 * @param {Function} distance
 * @api private
 */
const kCluster = (data, k, distance) => {
  let edges = getEdges(data, k);
  let centroids = selectRandomCentroids(data, k);
  let iterations = 0;
  const recurse = () => {
    let means = revertMeans(data, centroids, k, distance);
    if(!means[0]) {
      iterations++
      return recurse();
    } else {
      return means[1];
    }
  }
  // recurse()
  return [...recurse()];
}

/**
 * Wrapper function to produce output
 *
 * @param {Array} vectors
 * @param {Array} clusters
 * @param {Number} k
 * @param {Function} dist
 * @api private
 */

const kMeans = (data, k = 4, distance = euclideanDistance) => {
  if (arguments.length == 0) {
    throw (new Error('Please provide arguments: data, k (optional), distance function (optional)'))
  }
  if (k > data.length) {
    throw (new Error('The number of vectors must be greater than k'));
  }
  if (!_.isArray(data)) {
    throw (new Error('The data must be provided through a multi-dimensoinal array'));
  }
  const clusters = kCluster(data, k);
  const assignments = assignToCluster(data, clusters, k, distance);
  return {
    clusters, assignments
  }
}

module.exports = kMeans