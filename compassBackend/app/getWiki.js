const https = require('https');
//const axios = require('axios');

function getWiki(firstName, lastName) {
  console.log('!!!', firstName, lastName);
  const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=${firstName}%20${lastName}`;

  /*return new Promise((resolve,reject)=>{
        const options = {
            headers : {
                'content-type':'application/json'
            }
        }
        axios.get(url, options)
        .then((data)=>{console.log('THETEHTHETHETH', data.res);
            
            //const pageId = data.query.pageids[0];
            const intro = data.query.pages[pageId];
            resolve(intro);
        })
        .catch((err)=>{
            reject(err);
        });
    });*/

  const options = {
    hostname: 'en.wikipedia.org',
    port: 443,
    path: `/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=${firstName}%20${lastName}`,
    method: 'GET',
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let reqBody = '';
      console.log('status code', res.statusCode);
      //console.log('headers', res.headers);
      //console.log(res);
      res.on('data', chunk => {
        reqBody += chunk;
      });

      res.on('end', () => {
        const body = JSON.parse(reqBody);

        let obj;
        for (let item in body) {
          obj = body[item].pages;
        }
        const key = Object.keys(obj)[0];
        const intro = obj[key].extract;

        resolve(intro);
      });
    });

    req.on('error', e => {
      console.error('ERR', e);
      reject(e);
    });

    req.end();
  });
}
module.exports.getWiki = getWiki;
