const fs = require('fs');

const product = (req, res) => {
  fs.readFile('src/routes/products/all-products.json', 'utf8', function(err, data) {
    if (err) {
      console.log(err)
    } else {
      data = JSON.parse(data);
      let item = data.find(el=>el.id==req.params.id)
      if (item === undefined) {
        res.send([])
      } else {
        res.set('Content-Type', 'application/json');
        res.send(item)
      }
    }
  })    
}

module.exports = product;