const https = require('https');
//const JSONStream = require('JSONStream')
const { getWiki } = require('./getWiki');
const getTweets = require('./getTweets').promiseVersion;
const { promiseVersion, callbackVersion } = require('./getWiki');
console.log('TEST');
module.exports = function(app, db) {
  app.get('/:user', (request, response) => {
    const user = request.params.user;
    const tweets = getTweets(user)
      .then(data => {
        response.status(200).json(data);
      })
      .catch(e => {
        console.log('e', e);
      });
  });

  app.post('/wiki', (request, response) => {
    const wiki = getWiki(request.body.firstName, request.body.lastName)
      .then(data => {
        response.status(200).json(data);
      })
      .catch(e => {
        console.log('e', e);
      });
  });

  app.get('*', function(req, res) {
    res.redirect('../');
  });

  app.listen(process.env.PORT || 3000, function() {
    console.log('Express server listening on port %d in %s mode', process.env.PORT);
  });
};
