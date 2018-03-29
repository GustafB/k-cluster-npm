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
const { pearsonCorrelation, euclideanDistance, sumSquare, sumArray } = require('../lib/helpers.js');
const kMeans = require('../lib/k-means.js');

describe('kMeans', () => {
  describe('Helper Functions', () => {
    it('should compute the distance between two arrays', done => {
      const distance1 = euclideanDistance([1,2,3,4], [1,2,3,4]);
      const distance2 = euclideanDistance([2,-1], [-2, 2]);

      expect(distance1).to.exist;
      expect(distance2).to.exist;
      expect(distance1).to.equal(0);
      expect(distance2).to.equal(5);
      done();
    });

    it('should compute the sum of an array', done => {
      const sum1 = sumArray([1,2,3]);
      const sum2 = sumArray([-1,-2,-3]);
      const noInput = sumArray();

      expect(sum1).to.exist;
      expect(sum2).to.exist;
      expect(noInput).to.exist;

      expect(sum1).to.equal(6);
      expect(sum2).to.equal(-6);
      expect(noInput).to.equal(0);
      done();
    })

    it('should compute the sum of squares', done => {
      const sumOfSquares1 = sumSquare([5,5]);
      const sumOfSquares2 = sumSquare([2,2]);
      const sumOfSquares3 = sumSquare([1,1]);
      const noInput = sumSquare();

      expect(noInput).to.exist;
      expect(sumOfSquares1).to.exist;
      expect(sumOfSquares2).to.exist;
      expect(sumOfSquares3).to.exist;

      expect(noInput).to.equal(0);
      expect(sumOfSquares1).to.equal(50);
      expect(sumOfSquares2).to.equal(8);
      expect(sumOfSquares3).to.equal(2);
      done();
    });


  });

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

  describe('Error Handling', () => {
    it('should throw error when vectors are of different lengths', done => {
      const error = 'Vectors must have the same length';
      const badInput = () => kMeans([[1,2,3], [1,2]], 1);
      expect(badInput).to.throw(error);
      done();
    });

    it('should throw error when k < number of vectors', done => {
      const error = 'The number of vectors must be greater than k';
      const badInput = () => kMeans([[1,2,3], [1,2]]);
      expect(badInput).to.throw(error);
      done();
    });

    it('should throw error when data is not an array', done => {
      const error = 'The data must be provided through a multi-dimensoinal array';
      const badInput = () => kMeans({});
      expect(badInput).to.throw(error);
      done();
    });

    it('should throw error when no arguments are provided', done => {
      const error = 'Please provide arguments: data, k (optional), distance function (optional)';
      const badInput = () => kMeans();
      expect(badInput).to.throw(error);
      done();
    });

    it('should throw error when none numeric values are entered', done => {
      const error = 'Vectors may only contain numeric values';
      const badInput = () => kMeans([[1,2,'a'], [1,1,1]], 1);
      expect(badInput).to.throw(error);
      done();
    });    

  })

});
