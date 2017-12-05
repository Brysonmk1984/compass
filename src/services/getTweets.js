import axios from 'axios';

export function getUserTweets(user) {
  const url = `http://localhost:8000/${user}`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
