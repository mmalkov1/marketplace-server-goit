const fs = require('fs');

const categoriesList = (req, res) => {
  fs.readFile('src/routes/categories/all-categories.json', 'utf8', function(err, data) {
    if (err) {
      res.send({"error": err})
    } else {
      data = JSON.parse(data);
      res.set('Content-Type', 'application/json');
      res.send(data);
    }
  })    
}

module.exports = categoriesList;