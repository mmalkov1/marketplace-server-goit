const express = require('express');
const api = express.Router();
//роуты Users
const getAllUsersRoute = require('./users/getAllUsersRoute');
const getUserRoute = require('./users/getUserRoute.js');
const createUserRoute = require('./users/createUserRoute');
const updateUserRouter = require('./users/updateUserRoute');

//роуты Products
const getAllProductsRoute = require('./products/getAllProductsRoute');
const getProductRoute = require('./products/getProductRoute');
const createProductRoute = require('./products/createProductRoute');
const updateProductRoute = require('./products/updateProductRoute');

//роуты Categories
const getAllCategoriesRoute = require('./categories/getAllCategoriesRoute');
const getCategoryRoute = require('./categories/getCategoryRoute');
const createCategoryRoute = require('./categories/createCategoryRoute');
const updateCategoryRoute = require('./categories/updateCategoryRoute');

//роуты Images
const createImageRoute = require('./images/createImageRoute');

api
  .get('/products', getAllProductsRoute)
  .get('/products/:id', getProductRoute)
  .post('/products' , createProductRoute)
  .put('/products/:id', updateProductRoute)
  .get('/users', getAllUsersRoute)
  .get('/users/:id', getUserRoute)
  .post('/users', createUserRoute)
  .put('/users/:id', updateUserRouter)
  .post('/images', createImageRoute())
  .get('/categories', getAllCategoriesRoute)
  .get('/categories/:id', getCategoryRoute)
  .post('/categories', createCategoryRoute)
  .put('/categories/:id', updateCategoryRoute)


module.exports = api;
