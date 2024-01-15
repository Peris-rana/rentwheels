import carModel from '../models/carModel.js';
import fs from 'fs';
//add-car
export const addCarController = async (req, res) => {
   try {
      const { originalname, path } = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      // const newPath = path + '.' + ext;
      const { model, details, rentalPrice } = req.body;
      const newPath = `./uploads/carImages/${model}.${ext}`;
      fs.renameSync(path, newPath);
      const car = await carModel.create({
         model,
         details,
         rentalPrice,
         image: newPath,
      });
      res.status(200).send({ car });
   } catch (error) {
      res.status(500).send({
         success: false,
         error,
         message: 'Error in adding car',
      });
   }
};

//get-car
export const getCarController = async (req, res) => {
   try {
      const car = await carModel.find();
      res.status(200).send({ car });
   } catch (error) {
      res.status(500).json({ message: 'Error in finding the car' });
   }
};

//update-car
export const updateCarController = async (req, res) => {
   try {
      const { _id, model, details, rentalPrice } = req.body;
      const updateObject = {
         model,
         details,
         rentalPrice,
      };

      const car = await carModel.findByIdAndUpdate(_id, updateObject, {
         new: true,
      });
      res.status(200).send({ car });
   } catch (error) {
      res.status(500).json({ message: 'Error in updating the car' });
   }
};
