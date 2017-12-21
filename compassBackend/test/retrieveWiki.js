const expect = require('chai').expect;
const { getWiki } = require('../app/getWiki');

describe('Retrieve the selected user tweet', function() {
  it('Should exist', function() {
    getWiki('Abby', 'Martin')
      .then(function(data) {
        expect(data).to.be.ok;
      })
      .catch(function(err) {
        console.log('error', err);
      });
  });
});
