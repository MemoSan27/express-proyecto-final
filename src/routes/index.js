const express = require('express');
const userRouter = require('./user.router');
const categoryRouter = require('./category.router');
const productRouter = require('./product.router');
const imageRouter = require('./image.router');
const productcartRouter = require('./productcart.router');
const purchaseRouter = require('./purchase.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/users', userRouter)
router.use('/categories', categoryRouter)
router.use('/products', productRouter);
router.use('/images', imageRouter)
router.use('/productcarts', productcartRouter);
router.use('/purchases', purchaseRouter);

module.exports = router;