const expect = require('chai').expect;
const getTweets = require('../app/getTweets');
//const nock = require('nock');
const { promiseVersion, callbackVersion } = require('../app/getTweets');

/* Promise */
/*describe('Promise Test', function(){
    it('data returned should not be null or undefined', function(){
        promiseVersion('AbbeyMartin')
        .then(function(data){
            
            expect(data).to.exist;
        });

    });

    it('data returned should be greater than zero, function(){
        promiseVersion('AbbeyMartin')
        .then(function(data){
            expect(data).to.have.length.above(0);
        });
    });
});*/

/* Async / Await */
/*describe('Async / Await Test', function(){

    it('data should not be null or undefined', async function(){
        const tweets = await promiseVersion('AbbeyMartin');
        expect(tweets).to.exist;
    });

    it('data returned should be greater than zero', async function(){
        const tweets = await promiseVersion('AbbeyMartin');
        expect(tweets).to.have.length.above(0);
    });
});*/

/* Callback */
/*describe('Callback Test', function(){
    it('data returned should not be null or undefined', function(done){
        callbackVersion('AbbeyMartin', function(data){
            expect(data).to.exist;
            done();
        });
    });

    it('data returned should be greater than zero', function(done){
        callbackVersion('AbbeyMartin', function(data){
            expect(data).to.have.length.above(0);
            done();
        });
    });

});*/
