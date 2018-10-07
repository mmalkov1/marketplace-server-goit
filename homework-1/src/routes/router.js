const usersRoute = require('./users/users');
const productsRoute = require('./products/productsRoute');

const router = {
  '/products': productsRoute,
  '/user': usersRoute,
  default: productsRoute
};

module.exports = router;
