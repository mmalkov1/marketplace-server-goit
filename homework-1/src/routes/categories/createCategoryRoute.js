const fs = require('fs');
const createCategory = (req, res) => {
  res.set('Content-Type', 'application/json');
  fs.readFile('src/routes/categories/all-categories.json', 'utf8', function(err, data) {
    if (err) {
      res.send({"error": err})
    } else {
      data = JSON.parse(data);
      let error = {
        "error" : ''
      };
      let validateRow = ["name", "description"];
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
        fs.writeFile('src/routes/categories/all-categories.json', data); 
        res.send({"status":"success", "category": req.body});
      }
    }
  })    
}

 module.exports = createCategory;