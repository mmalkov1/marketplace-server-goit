const fs = require("fs");
const updateProduct = (req, res) => {
  res.set("Content-Type", "application/json");
  fs.readFile("src/routes/products/all-products.json", "utf8", function(
    err,
    data
  ) {
    if (err) {
      res.send(err);
    } else {
      data = JSON.parse(data);
      let id = +req.params.id;
      let product = data.find(el => el.id === id);
      if (product !== undefined) {
        for (let itemBody in req.body) {
          for (let itemData in product) {
            if (itemData === itemBody && itemData !== "id") {
              product[itemData] = req.body[itemBody];
            }
          }
        }
        data = JSON.stringify(data);
        fs.writeFile("src/routes/products/all-products.json", data);
        res.send({ status: "success", product: product });
      } else {
        res.send({ error: `Not found product ${req.params.id}` });
      }
    }
  });
};
module.exports = updateProduct;
