import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import fs from 'fs';
import jwt from 'jsonwebtoken';

//for signup
//add new user from the client side
export const registerUserController = async (req, res) => {
   const { originalname, path } = req.file;
   const parts = originalname.split('.');
   const ext = parts[parts.length - 1];
   const { firstName, lastName, phoneNumber, email, password } = req.body;
   // const newPath = path + '.' + ext
   // change the uploaded file name to the username and email
   const newPath = `./uploads/license/${firstName}-${email}.${ext}`;
   fs.renameSync(path, newPath);
   const hashedPassword = bcrypt.hashSync(password, 10);
   const newUser = new userModel({
      firstName,
      lastName,
      phoneNumber,
      email,
      plainPassword: password,
      password: hashedPassword,
      licenseFile: newPath,
   });
   if (!firstName) {
      return res.status(400).send({ success: false, message: 'Missing input' });
   }
   try {
      // if the email is already present then the message is show to the user
      const existingEmail = await userModel.findOne({ email });
      if (existingEmail) {
         return res
            .status(400)
            .send({ success: false, message: 'Email already exists' });
      }
      // save the new user to the database
      await newUser.save();
      res.status(200).send({
         success: true,
         message: 'User registered successfully ',
         newUser,
      });
   } catch (error) {
      res.status(500).json({
         message: 'Error in user registration',
         error: error.message,
      });
   }
};

//for login
export const loginUserController = async (req, res) => {
   const { email, password } = req.body;

   try {
      const existingUser = await userModel.findOne({ email });
      if (!existingUser) {
         return res
            .status(404)
            .send({ success: false, message: 'User not found' });
      }
      const matchPassword = bcrypt.compareSync(password, existingUser.password);
      if (!matchPassword) {
         return res
            .status(401)
            .send({ success: false, message: 'Wrong password' });
      }
      const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
      res.status(200).send({
         success: true,
         message: 'Login successful',
         token,
         user: existingUser,
      });
   } catch (error) {
      return res.status(500).json({
         message: 'Error in login',
         error: error.message,
      });
   }
};
