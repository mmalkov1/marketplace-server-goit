const fs = require('fs');

const user = (req, res) => {
  fs.readFile('src/routes/users/all-users.json', 'utf8', function(err, data) {
    res.set('Content-Type', 'application/json');
    if (err) {
      res.send(err)
    } else {
      data = JSON.parse(data);
      let item = data.find(el=>el.id==req.params.id)
      if (item === undefined) {
        res.send([])
      } else {
        res.send(item)
      }
    }
  })    
}

module.exports = user;