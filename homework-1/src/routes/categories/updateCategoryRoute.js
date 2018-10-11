const fs = require("fs");
const updateCategory = (req, res) => {
  res.set("Content-Type", "application/json");
  fs.readFile("src/routes/categories/all-categories.json", "utf8", function(
    err,
    data
  ) {
    if (err) {
      res.send(err);
    } else {
      data = JSON.parse(data);
      let id = +req.params.id;
      let category = data.find(el => el.id === id);
      if (category !== undefined) {
        for (let itemBody in req.body) {
          for (let itemData in category) {
            if (itemData === itemBody && itemData !== "id") {
              category[itemData] = req.body[itemBody];
            }
          }
        }
        data = JSON.stringify(data);
        fs.writeFile("src/routes/products/all-products.json", data);
        res.send({ status: "success", "category" : category });
      } else {
        res.send({ error: `Not found product ${req.params.id}` });
      }
    }
  });
};
module.exports = updateCategory;
