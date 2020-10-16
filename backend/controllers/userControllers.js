import asyncHandler from "express-async-handler";

import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.isMatchPassword(password))) {
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("Email or password is Invalid");
  }
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (user) {
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }

  // res.send('success')
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    // const existUser = await User.findOne({ email: user.email });
    // if (existUser) {
    //   res.status(401);
    //   throw new Error("User existed");
    // } else {

      if(req.body.currentPassword && !(await user.isMatchPassword(req.body.currentPassword)))
       {
         res.status(401)
         throw new Error("Current password is not match")
       } else {
         
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
     // }
        if (req.body.password) {
          user.password = req.body.password;
        }
       }

    // if(!req.body.currentPassword) {
    //   user.name = req.body.name || user.name
    //   user.email = req.body.email || user.email
    // } else if(!(await user.isMatchPassword(req.body.currentPassword))) {
    //   res.status(401)
    //   throw new Error("Current password is not match")
    // } else {
    //   user.name = req.body.name || user.name
    //   user.email = req.body.email || user.email
    //   if (req.body.password) {
    //      user.password = req.body.password;
    //     }
    // }
     
  

    const userToSave = await user.save();

    res.send({
      _id: userToSave._id,
      name: userToSave.name,
      email: userToSave.email,
      isAdmin: userToSave.isAdmin,
      token: generateToken(userToSave._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }

  // res.send('success')
});

export const userRegister = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  const existUser = await User.findOne({ email });

  if (existUser) {
    res.status(400);
    throw new Error("User existed");
  } else {
    const user = await User.create({
      name,
      email,
      password,
    });

    res.send({
      _id: user._id,
      name: user.name,
      password: user.password,
      token: generateToken(user._id),
    });
  }
});
