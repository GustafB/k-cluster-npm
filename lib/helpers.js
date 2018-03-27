const euclidean = (v1, v2) => {
  let total = 0;
  for (let i = 0; i < v1.length; i++) {
     total += Math.pow(v2[i] - v1[i], 2);      
  }
  return Math.sqrt(total);
}

const normalize = (data) => {
  let edges = getEdges(data);
  return data.map(user => {
    user.data = user.data.map((a, i) => {
      return a / ((edges[i].max * 0.5) - edges[i].min)  || 0
    })
    return user
  })
}