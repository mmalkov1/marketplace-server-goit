const fs = require("fs");
const updateUser = (req, res) => {
  res.set("Content-Type", "application/json");
  fs.readFile("src/routes/users/all-users.json", "utf8", function(
    err,
    data
  ) {
    if (err) {
      res.send(err);
    } else {
      data = JSON.parse(data);
      let id = +req.params.id;
      let user = data.find(el => el.id === id);
      if (user !== undefined) {
        for (let itemBody in req.body) {
          for (let itemData in user) {
            if (itemData === itemBody && itemData !== "id") {
              user[itemData] = req.body[itemBody];
            }
          }
        }
        data = JSON.stringify(data);
        fs.writeFile("src/routes/users/all-users.json", data);
        res.send({ status: "success", "user": user });
      } else {
        res.send({"error" : `Not found user ${req.params.id}`})
      }
      
    }
  });
};
module.exports = updateUser;
