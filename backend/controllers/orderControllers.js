import asyncHandler from 'express-async-handler'

import Order from '../models/orderModel.js'

export const addOrderItems = asyncHandler(async (req,res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    } = req.body

    if(!orderItems) {
        res.status(400)
        throw new Error('Bad request, no Order Items')
    } else {
        const order = new Order ({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        })
        const createdOrder = await order.save()
        
        res.send(createdOrder)

    }


})