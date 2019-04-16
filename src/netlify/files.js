// const fs = require('fs');
const sha1 = window.require('sha1-file');
import axios from 'axios';

export const hashFiles = (folder, files) => {
  let filesObject = {};

  files.forEach(file => {
    filesObject[file] = sha1(`${folder}${file}`);
  });
  return filesObject;
};

export const readFile = () => {
  fs.readFile('./user-app/index.html', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }

  });
}

// axios.post(`https://api.netlify.com/api/v1/sites/${siteId}/deploys`, data)
// .then(res => {
//   const id = res.data.id;
//   fs.readFile('./user-app/index.html', 'utf8', function(err, data) {
//     if (err) {
//       return console.log(err);
//     }
//     axios.put(`https://api.netlify.com/api/v1/deploys/${id}/files/index.html`, data, {headers: {'Content-Type': 'application/octet-stream'}})
//     .then(res => console.log(res.data))
//     .catch(err => console.log(err))
//   });
// })

// /api/v1/deploys/1234/files/index.html
