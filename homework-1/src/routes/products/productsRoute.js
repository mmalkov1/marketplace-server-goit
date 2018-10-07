const fs = require('fs');
const util = require('util');
const path = require('path');
const getId = url => {
  const lastIndex = url.lastIndexOf('/');

  if (lastIndex !== -1) {
    return url.slice(lastIndex +1);
  }
};
const productsFolder = path.resolve(__dirname, '../../../', 'data/products');
const writeFile = util.promisify(fs.writeFile);
const saveNewProduct = (fileName, data) => {
  const src = path.resolve(productsFolder, fileName + '.json');
  const dataStr = JSON.stringify(data);
  return writeFile(src, dataStr);
};
const productRoute = (request, response) => {
  if (request.method === 'GET') {
    fs.readFile('src/routes/products/all-products.json', 'utf8', function(err, data) {
      if (err) {
        console.log(err)
      } else {
        response.writeHead(200, {
          'Content-Type': 'application/json',
        });
        data = JSON.parse(data);
        if (getId(request.url) === 'products') {
          response.write(JSON.stringify(data));
        } else {
          let item = data.find(el=>el.id==getId(request.url))
          if (item === undefined) {
            response.write(JSON.stringify([]))
          } else {
            response.write(JSON.stringify(item))
          }
        }       
        response.end()
      }
    })
  }
  if (request.method === 'POST') {
    let data = '';
    response.writeHead(200, {"Content-Type": "application/json"});
    
    request.on('data', function(chunk) {
        data += chunk.toString();
    });
    request.on('end', function() {
      data = JSON.parse(data);
      data.map(el=>el.id=Date.now());
      saveNewProduct(data[0].id, data);
      let responseData = [
        {
          "status":"success",
          "product": data[0]
        }
      ]
      response.write(JSON.stringify(responseData));
      response.end();
    });
  }
};

module.exports = productRoute;