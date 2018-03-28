Number Formatter
=========

A small library that adds commas to numbers

## Installation

  `npm install @GustafB/k-cluster-npm`

## Usage

    const kMeans = require('k-cluster-npm');

    const data = [
      [1, 1, 1],
      [2, 2, 2],
      [3, 3, 3]
    ];

    const { clusters, assignments } = kMeans(data, 3);
  
  
  assignments should equal: [[1, 1, 1], [2, 2, 2], [3, 3, 3]]
  clusters should equal: [[1, 1, 1], [2, 2, 2], [3, 3, 3]]

## Inputs
  * Data (vectors): nXm array (n points per m columns)
  * k (optional, defaults to 4): number of clusters to be created
  * distance (optional): custom distance function, computing the distance between two arrays.
    `distance = (a, b) => a - b`

## Outputs
  * Clusters: k

## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.