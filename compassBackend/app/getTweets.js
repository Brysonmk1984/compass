var Twitter = require('twitter');
require('dotenv').config();

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  /* This needs to be retrieved any time you change the token from the twitter api website */
  bearer_token: process.env.BEARER_TOKEN,
});

module.exports = {
  promiseVersion: function(user) {
    var params = { screen_name: user };
    return new Promise((resolve, reject) => {
      client.get('statuses/user_timeline', params, function(error, tweets, response) {
        try {
          if (!error) {
            if (tweets.length) {
              resolve(tweets);
            }
            throw 'No Tweets!';
          }
          throw error;
        } catch (e) {
          reject(e);
        }
      });
    });
  },
  callbackVersion: function(user, cb) {
    var params = { screen_name: user };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      return cb(tweets);
    });
  },
};
