const usersRoute = require('./users/users');
const productsRoute = require('./products/productsRoute');
const categoriesRoute = require('./categories/categoriesRoute');
const imageRoute = require('./images/imageRoute');

const router = {
  '/products': productsRoute,
  '/user': usersRoute,
  '/categories' : categoriesRoute,
  '/images' : imageRoute,
  default: productsRoute
};

module.exports = router;
