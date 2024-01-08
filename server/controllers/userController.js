import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import fs from 'fs';

//for signup
//add new user from the client side
export const registerUserController = async (req, res) => {
   const { orignalname, path } = req.file;
   const parts = orignalname.split('.');
   const ext = parts[parts.length - 1];
   const newPath = path + '.' + ext;
   fs.renameSync(path, newPath);
   const { firstname, lastname, phoneNumber, email, password } = req.body;
   const hashedPassword = bcrypt.hashSync(password, 10);
   const newUser = new userModel({
      firstname,
      lastname,
      phoneNumber,
      email,
      password: hashedPassword,
      licenseFile: newPath,
   });
   if (!firstname) {
      return res.status(400).send({ success: false, message: 'Missing input' });
   }
   try {
      await newUser.save();
      res.status(200).send({
         success: true,
         message: 'User registerd successfully ',
      });
   } catch (error) {
      res.status(500).json({ message: 'Error in updating the car' });
   }
};
