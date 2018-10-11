const fs = require('fs');
const createProduct = (req, res) => {
  res.set('Content-Type', 'application/json');
  fs.readFile('src/routes/products/all-products.json', 'utf8', function(err, data) {
    if (err) {
      console.log(err)
    } else {
      data = JSON.parse(data);
      let error = {
        "error" : ''
      };
      let validateRow = ["sku", "name", "description", "price", "currency", "categories"];
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
        fs.writeFile('src/routes/products/all-products.json', data); 
        res.send({"status":"success", "product": req.body});
      }
    }
  })    
}

 module.exports = createProduct;