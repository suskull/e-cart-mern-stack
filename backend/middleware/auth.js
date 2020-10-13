import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const auth = asyncHandler(async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   

    const user = await User.findById(decoded.id)

    req.user = user
    // console.log(req.user._id)
    next();
  } catch (error) {
    res.status(404);
    throw new Error("Authorization failed");
  }
});

export default auth;
