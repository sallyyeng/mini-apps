const should = chai.should();

describe('getFibonacci', function() {
  it('should exist', function() {
    should.exist(getFibonacci);
  });

  it('should be a function', function() {
    should.exist(getFibonacci);
    getFibonacci.should.be.a('function');
  });

  it('should return integers', function() {
    var result = getFibonacci(0);
    should.exist(result);
    result.should.be.a('number');
  });

  it('should handle the base cases', function() {
    getFibonacci(0).should.equal(0);
    getFibonacci(1).should.equal(1);
  });

  it('should return the nth Fibonacci number for a given n', function() {
    getFibonacci(5).should.equal(5);
    getFibonacci(10).should.equal(55);
    getFibonacci(20).should.equal(6765);
  });
});
