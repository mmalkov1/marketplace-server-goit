const fs = require('fs');
const path = require('path');
const util = require('util');
const multiparty = require('multiparty');

const usersFolder = path.resolve(__dirname, '../../../', 'assets');
const writeFile = util.promisify(fs.writeFile);


const imageRoute = (request, response) => {
  if (request.method === 'POST') {
    let form = new multiparty.Form();
    form.on('part', (part)=> {
      part.pipe(fs.createWriteStream(`${usersFolder}/${part.filename}`))
        .on('close', () => {
          response.writeHead(200, {'Content-Type': 'application/json'});
          response.end(`[{"status":"success", "imageSrc": "${usersFolder}\\${part.filename}"}]`);
        })
    })
    form.parse(request);
  }
}

module.exports = imageRoute;
