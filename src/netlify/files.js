// const fs = require('fs');
const sha1 = window.require('sha1-file');

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
