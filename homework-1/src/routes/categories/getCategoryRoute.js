const fs = require('fs');

const category = (req, res) => {
  fs.readFile('src/routes/categories/all-categories.json', 'utf8', function(err, data) {
    if (err) {
      res.send({"error":err})
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

module.exports = category;