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
    let error = {
      "error" : ''
    };
    //массив с обязательными полями для пользователя
    let validateRow = ["name", "phone", "password"];
    response.writeHead(200, {"Content-Type": "application/json"});
    
    request.on('data', function(chunk) {
        data += chunk.toString();
    });
    request.on('end', function() {
      data = JSON.parse(data);
      //создаем пустой массив для полей из пришедшего объекта
      let objRow = [];
      // добавляем в массив названия всех полей из пришедшего объекта
      for (let el in data[0]) {
        objRow.push(el)
      }
      //сравниваем наличие полей в объекте с теми, которые должны быть и добавляем ошибку, если такие есть
      for (let el of validateRow) {
        if (objRow.indexOf(el) === -1) {
          error.error += `'${el}' is missing `;
        }
      }
      if (error.error !== '') {
        response.write(JSON.stringify(error));
        response.end();
      } else {
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
      }  
    });
  }
}

module.exports = userRoute;
