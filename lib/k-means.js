const { pearsonCorrelation, euclideanDistance } = require('./helpers.js');

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
