import asyncHandler from 'express-async-handler'

import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

export const userLogin  = asyncHandler(async (req,res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user && (await user.isMatchPassword(password))) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id) 
        })
    } else {
        res.status(404)
        throw new Error('Email or password is Invalid')
    }

})


export const getUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id).select('-password')

    if(user) {
        res.send(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }

    res.send('success')
})


export const userRegister = asyncHandler(async (req,res) => {
    const {email, password, name} = req.body
    const existUser = await User.findOne({email})


    if(existUser) {
        res.status(400)
        throw new Error('User existed')
    } else {
        const user = await User.create({
            name, email, password
        })
    
        res.send({
            _id: user._id,
            name: user.name,
            password: user.password,
            token: generateToken(user._id)
        })
    }
    
   
})