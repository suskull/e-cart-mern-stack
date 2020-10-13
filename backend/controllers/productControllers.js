import Product from '../models/productModel.js' 
import asyncHandler from 'express-async-handler'

export const getProducts = asyncHandler(async (req,res) => {
    const products = await Product.find({})
    // throw new Error('Not found')
    res.send(products)
})

export const getProductsById = asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id)
        
    if(!product) {
        res.status(404)
        throw new Error('Product not found')
    }
    res.send(product) 
})