'use strict';

var SolveBio = require('./init')();

describe('Tests Expression', function() {
  describe('Test evaluate()', function() {
    var accessToken = 'fakeToken';
    var expression;

    beforeEach(function(done) {
      SolveBio.init({
        debug: true,
        accessToken: accessToken
      });

      expression = SolveBio.Expression('1+1', 'integer')
          .evaluate()
          .then(function(data){
            done();
            return data;
          });
    });

    it('Expression URL should be /evaluate', function(done) {
      expression.then(function(data) {
        expect(data.url).toEqual('https://api.solvebio.com/v1/evaluate');
        done();
      });
    });
  });
});
