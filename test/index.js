const data = [
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

const { should, expect } = require('chai');
const { pearsonCorrelation } = require('../lib/helpers.js');
const kMeans = require('../lib/k-means.js');

describe('kMeans', () => {
  describe('results', () => {
    it('should return a result (Array)', done => {
      const { assignments, clusters } = kMeans(data);

      expect(assignments).to.exist;
      expect(clusters).to.exist;
      done();
    });

    it('should accept optional k parameter', done => {
      const { assignments, clusters } = kMeans(data, 8);

      expect(clusters).to.have.length(8);
      expect(assignments).to.have.length(8);
      done();
    });

    it('should accept optional distance function', done => {
      const { assignments, clusters } = kMeans(data, 4, pearsonCorrelation);

      expect(assignments).to.exist;
      expect(clusters).to.exist;
      done();
    });

    it('should return 2 clusters with 2 groups', done => {
      const { assignments, clusters } = kMeans([[1, 1], [2, 2]], 2);

      expect(assignments).to.exist;
      expect(clusters).to.exist;
      expect(clusters).to.have.length(2);
      if (clusters[0][0] === 1) {
          expect(clusters[0][1]).to.equal(1);
          expect(clusters[1][0]).to.equal(2);
          expect(clusters[1][1]).to.equal(2);
      } else if (clusters[0][0] === 2) {
          expect(clusters[0][1]).to.equal(2);
          expect(clusters[1][0]).to.equal(1);
          expect(clusters[1][1]).to.equal(1);
      } else {
          throw new Error('should return a 2 groups with the 2 points');
      }
      done();
    });

    it('should return 3 groups with well defined clusters', done => {
      let data = [];
      for (let i = 0; i < 100; i++) {
        data.push(Math.floor(Math.random() * 10));
      }
      for (let i = 0; i < 100; i++) {
        data.push(Math.floor(Math.random() * 10 + 100));
      }
      for (let i = 0; i < 100; i++) {
        data.push(Math.floor(Math.random() * 10 + 1000));
      }

      data = data.map(d => [d]);

      const { clusters, assignments } = kMeans(data, 3);
      const sorted = clusters.sort((a, b) => a[0] - b[0]);
      expect(assignments).to.exist;
      expect(clusters).to.exist;
      expect(clusters).to.have.length(3);

      expect(Number(sorted[0])).to.be.at.least(0);
      expect(Number(sorted[0])).to.be.at.most(10);
      expect(Number(sorted[1])).to.be.at.least(10);
      expect(Number(sorted[1])).to.be.at.most(110);
      expect(Number(sorted[2])).to.be.at.least(100);
      expect(Number(sorted[2])).to.be.at.most(1010);

      done();
    });
  });

})
