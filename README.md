[![Build Status](https://travis-ci.org/GustafB/k-cluster-npm.svg?branch=master)](https://travis-ci.org/GustafB/k-cluster-npm)
[![Coverage Status](https://coveralls.io/repos/github/GustafB/k-cluster-npm/badge.svg?branch=master)](https://coveralls.io/github/GustafB/k-cluster-npm?branch=master)

K-Means Cluster
=========

Implementation of the k-means clustering algorithm.

## Installation

  `npm i -S npm-kmeans`

## Usage

    const kMeans = require('npm-kmeans');

    const data = [
      [1, 1, 1],
      [2, 2, 2],
      [3, 3, 3]
    ];

    const { clusters, assignments } = kMeans(data, 3);
  
  
  assignments should equal: [[1], [2], [3]]
  clusters should equal: [[1, 1, 1], [2, 2, 2], [3, 3, 3]]

## Inputs
  * Data (vectors): nXm array (n points per m columns.)
  * k (optional, defaults to 4): number of clusters to be created.
  * distance (optional): custom distance function, computing the distance between two arrays.
    `distance = (a, b) => a - b`

## Outputs
  * Clusters: array of k subarrays, each representing the vector of a cluster
  * Assignments: array of k subarrays, each containing the indices of the original
    data set vectors that have been assigned to it.

## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality.