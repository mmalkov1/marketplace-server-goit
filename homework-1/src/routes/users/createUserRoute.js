const fs = require('fs');
const createUser = (req, res) => {
  res.set('Content-Type', 'application/json');
  fs.readFile('src/routes/users/all-users.json', 'utf8', function(err, data) {
    if (err) {
      res.send(err);
    } else {
      data = JSON.parse(data);
      let error = {
        "error" : ''
      };
      let validateRow = ["name", "phone", "password"];
      let objRow = [];
      // добавляем в массив названия всех полей из пришедшего объекта
      for (let el in req.body) {
        objRow.push(el)
      }
      for(let el of validateRow) {
        if (objRow.indexOf(el) === -1) {
          error.error += `'${el}' is missing `;
        }
      }
      if (error.error !== '') {
        res.send(error)
      } else {
        req.body.id = Date.now();
        data.push(req.body);
        data = JSON.stringify(data);
        fs.writeFile('src/routes/users/all-users.json', data); 
        res.send({"status":"success", "user": req.body});
      }
    }
  })    
}

 module.exports = createUser;