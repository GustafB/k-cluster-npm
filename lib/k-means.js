const { pearsonCorrelation, euclideanDistance, createFillerArray, normalizeData } = require('./helpers.js');

const getEdges = (data) => {
  const edges = [];
  data.forEach(vector => {
    vector.forEach((point, j) => {
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

const selectRandomCentroids = (points, k) => {
  let centroids = points.slice(0);
  centroids = centroids.sort(() => (
    (Math.round(Math.random()) - 0.5);
  ));
  return centroids.slice(0, k);
}

const assignToCluster = (vectors, clusters, dist = euclidean) => {
  const assignments = [[],[],[],[]];
  vectors.forEach(vector => {
    const distances = clusters.map(c => dist(c, vector.data));
    const closest = distances.indexOf(Math.min(...distances));
    assignments[closest].push(vector.name);
  })
  return assignments;
}
