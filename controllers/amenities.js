import { Amenities } from "../models/amenities.js";

export const getAllProperties = async (req, res, next) => {
  try {
    const data = await Amenities.find({});
    console.log(data);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const setAmenities = async (req, res, next) => {
  try {
    const { name, address, price, ratings, likes, img } = req.body;
    await Amenities.create({
      name,
      address,
      price,
      ratings,
      likes,
      img,
    });
    res.json({ success: true, message: "Property Add Successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateAmenities = async (req, res, next) => {
  try {
    const { name, address, price, img } = req.body;
    await Amenities.findByIdAndUpdate(req.params.id, {
      name,
      address,
      price,
      img,
    });
    res.json({
      success: true,
      message: "Updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAmenities = async (req, res, next) => {
  try {
    await Amenities.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};
