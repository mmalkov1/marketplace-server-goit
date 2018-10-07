const fs = require('fs');
const path = require('path');
const util = require('util');

const usersFolder = path.resolve(__dirname, '../../../', 'data/users');
const writeFile = util.promisify(fs.writeFile);

const saveNewUser = (fileName, data) => {
  const src = path.resolve(usersFolder, fileName + '.json');
  const dataStr = JSON.stringify(data);
  return writeFile(src, dataStr);
};

const userRoute = (request, response) => {
  if (request.method === 'POST') {
    let data = '';
    response.writeHead(200, {"Content-Type": "application/json"});
    
    request.on('data', function(chunk) {
        data += chunk.toString();
    });
    request.on('end', function() {
      data = JSON.parse(data);
      data.map(el=>el.id=Date.now());
      saveNewUser(data[0].id, data);
      let responseData = [
        {
          "status":"success",
          "user": data[0]
        }
      ]
      response.write(JSON.stringify(responseData));
      response.end();
    });
  }
}

module.exports = userRoute;
