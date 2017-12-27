import axios from 'axios';

export function getWiki(firstName, lastName) {
  //const url = `http://localhost:8000/wiki`;
  const url = `https://se-compass.herokuapp.com/wiki`;

  return new Promise((resolve, reject) => {
    const options = {
      firstName,
      lastName,
    };
    console.log(options);
    axios
      .post(url, options)
      .then(data => {
        console.log('THE DATA', data);
        resolve(data);
      })
      .catch(err => {
        console.log('THE ERROR', err);
        reject(err);
      });
  });
}
