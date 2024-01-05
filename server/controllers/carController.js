import carModel from "../models/carModel.js";
import fs from "fs";
//add-car
export const addCarController = async (req, res) => {
  try {
    const { model, details, rentalPrice } = req.body;
    const car = await carModel.create({ model, details, rentalPrice });
    res.status(200).send({ car });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in adding car",
    });
  }
};

//get-car
export const getCarController = async (req, res) => {
  try {
    const car = await carModel.find();
    res.status(200).send({ car });
  } catch (error) {
    res.status(500).json({ message: "Error in finding the car" });
  }
};

//update-car
export const updateCarController = async (req, res) => {
  try {
    const { _id, model, details, rentalPrice } = req.body;
    const car = await carModel.findOneAndUpdate({
      _id,
      model,
      details,
      rentalPrice,
    });
    res.status(200).send({ car });
  } catch (error) {
    res.status(500).json({ message: "Error in updating the car" });
  }
};
