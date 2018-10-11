const fs = require('fs');

const usersList = (req, res) => {
  fs.readFile('src/routes/users/all-users.json', 'utf8', function(err, data) {
    if (err) {
      console.log(err)
    } else {
      data = JSON.parse(data);
      res.set('Content-Type', 'application/json');
      res.send(data);
    }
  })    
}

module.exports = usersList;