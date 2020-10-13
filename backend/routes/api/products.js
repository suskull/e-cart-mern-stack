import express  from 'express';
const router = express.Router();
// import Product from '../../models/productModel.js'
// import asyncHandler from 'express-async-handler'

import {getProducts, getProductsById} from '../../controllers/productControllers.js'

router.route('/').get(getProducts)
router.route('/:id').get(getProductsById)

 export default router
