import axios from 'axios';

export default function initiateHeroku() {
  const url = `https://se-compass.herokuapp.com/init`;

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
