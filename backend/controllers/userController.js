import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import multer, { diskStorage } from "multer";
import { existsSync, mkdirSync } from "fs";
import generateToken from "../utils/generateToken.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const createUser = asyncHandler(async function (req, res) {
  console.log("file for test ",req.file)
  console.log("Body for test",req.body)
  
  
  const { name, email, password } = req.body;
  
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(401);
    throw new Error("User Already Exist ");
  } 
  const user = await User.create({
    name,
    email,
    password,
    pic:req.file.path
  });
  
   console.log(generateToken(user._id));
  if (user) {
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token:generateToken(user._id)
    });
  }
});
const authUser = asyncHandler(async (req, res) => {
  const {email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token:generateToken(user._id)
    });
  } else{
    res.status(400);
    throw new Error("Invalid Email or Password ");
  }
});

const uploadDir = `/uploads/${req.file.filename}`;

if (!existsSync(uploadDir)){
  mkdirSync(uploadDir,{recursive:true})
}
const storage = diskStorage({
  destination:function (req,file,cb){
    return cb(null,uploadDir)
  },
  filename:function (req,file,cb){
    return cb(null,file.originalname)
  }
})

const upload = multer({storage})


export  { createUser, upload, authUser };
