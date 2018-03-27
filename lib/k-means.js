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
    (Math.round(Math.random()) - 0.5)
  ));
  return centroids.slice(0, k);
}

const assignToCluster = (vectors, clusters, k, dist = euclideanDistance) => {
  const assignments = createFillerArray(k, [])
  // assignments = [[],[],[],[]]
  console.log(assignments)
  vectors.forEach(vector => {
    const distances = clusters.map(c => dist(c, vector));
    const closest = distances.indexOf(Math.min(...distances));
    assignments[closest].push(vector);
  })
  return assignments;
}

const revertMeans = (data, clusters, k, distance) => {
  assignments = assignToCluster(data, clusters, k, distance)
  let original = clusters.slice(0).toString();
  for (let i = 0; i < clusters.length; i++) {
    let cluster = clusters[i];
    for (let j = 0; j < cluster.length; j++) {
    let sum = 0;
      for (let t = 0; t < assignments[i].length; t++) {
        let user = assignments[i]; 
        // console.log('t', t)
        // console.log(assignments[i][t][j]);
        sum += assignments[i][t][j];
      }
      clusters[i][j] = sum / assignments[i].length || 0
    }
  }
  return [clusters.toString() === original, clusters];
}

const kCluster = (data, k, distance = euclideanDistance) => {
  let edges = getEdges(data, k);
  let norm = normalizeData(data, edges);
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
  return recurse()
}

const kMeans = (data, k = 3) => {
  const clusters = kCluster(data, k);
  const assignments = assignToCluster(data, clusters, k, euclideanDistance);
  return {
    clusters, assignments
  }
}

var data = [
  [1, 2],
  [2, 1],
  [2, 4], 
  [1, 3],
  [2, 2],
  [3, 1],
  [1, 1],

  [7, 3],
  [8, 2],
  [6, 4],
  [7, 4],
  [8, 1],
  [9, 2],

  [10, 8],
  [9, 10],
  [7, 8],
  [7, 9],
  [8, 11],
  [9, 9],
];

const res = kMeans(data);
console.log('\nassignments:\n', res.assignments,'\nclusters:\n', res.clusters)
