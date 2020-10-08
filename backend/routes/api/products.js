import express  from 'express';
const router = express.Router();
import Product from '../../models/productModel.js'
import asyncHandler from 'express-async-handler'


//@desc   Fetch all products
//@route  GET /api/products
//@access Public
router.get('/', asyncHandler(async (req,res) => {
        const products = await Product.find({})
        res.send(products)
}))


//@desc   Fetch product by id
//@route  GET /api/products/:id
//@access Public
router.get('/:id' ,asyncHandler(async (req,res) => {
        const product = await Product.findById(req.params.id)
        
        if(!product) {
            res.status(404)
            throw new Error('Product not found')
        }
        res.send(product)
}))

 export default router
