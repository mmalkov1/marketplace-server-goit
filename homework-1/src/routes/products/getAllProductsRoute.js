const fs = require('fs');

const productsList = (req, res) => {
  fs.readFile('src/routes/products/all-products.json', 'utf8', function(err, data) {
    if (err) {
      console.log(err)
    } else {
      data = JSON.parse(data);
      res.set('Content-Type', 'application/json');
      res.send(data);
    }
  })    
}

module.exports = productsList;