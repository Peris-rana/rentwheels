import carModel from '../models/carModel.js';
import fs from 'fs';
//add-car
export const addCarController = async (req, res) => {
   try {
      const { originalname, path } = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      // const newImagePath = path + '.' + ext;
      const { model, details, rentalPrice } = req.body;
      const newImagePath = `./uploads/carImages/${model}.${ext}`;
      fs.renameSync(path, newImagePath);
      const car = await carModel.create({
         model,
         details,
         rentalPrice,
         image: newImagePath,
      });
      res.status(200).json({
         car,
         success: true,
         message: 'Car added successfully',
      });
   } catch (error) {
      res.status(500).json({
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
      res.status(200).json({ car, success: true });
   } catch (error) {
      res.status(500).json({ message: 'Error in finding the car' });
   }
};

//update-car
export const updateCarController = async (req, res) => {
   try {
      const { _id, model, details, rentalPrice } = req.body;
      const existingCarData = await carModel.findById(_id);
      let newImagePath = existingCarData.image;
      if (req.file) {
         const { originalname, path } = req.file;
         const parts = originalname.split('.');
         const ext = parts[parts.length - 1];
         const newModel = model || existingCarData.model;
         newImagePath = `./uploads/carImages/${newModel}.${ext}`;

         //rename the file with new image name
         fs.renameSync(path, newImagePath);

         const updateObject = {
            model: model || existingCarData.model,
            details: details || existingCarData.details,
            rentalPrice: rentalPrice || existingCarData.rentalPrice,
            image: newImagePath,
         };
         // update the car with new image path
         const car = await carModel.findByIdAndUpdate(_id, updateObject, {
            new: true,
         });
         res.status(200).json({
            car,
            success: true,
            message: 'Car updated successfully',
         });
      } else {
         // if no new image is provided  , update  other fields without changing the image path and with the existing data

         const updateObject = {
            model: model || existingCarData.model,
            details: details || existingCarData.details,
            rentalPrice: rentalPrice || existingCarData.rentalPrice,
         };
         //update the car without changeing the image path
         const car = await carModel.findByIdAndUpdate(_id, updateObject, {
            new: true,
         });
         res.status(200).json({
            car,
            success: true,
            message: 'Car updated successfully',
         });
      }
   } catch (error) {
      res.status(500).json({ message: 'Error in updating the car' });
   }
};

//delete-car
export const deleteCarController = async (req, res) => {
   const carId = req.params.id; // Assuming the user ID is passed in the URL parameter

   try {
      // Check if the user exists
      const existingCar = await carModel.findById(carId);
      if (!existingCar) {
         return res
            .status(404)
            .json({ success: false, message: 'Car not found' });
      }

      // Perform the deletion
      await carModel.findByIdAndDelete(carId);

      res.status(200).json({
         success: true,
         message: 'Car deleted successfully',
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: 'Error in deleting car',
         error: error.message,
      });
   }
};
