import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: "String",
    required: true,
  },
  email: {
    unique: true,
    type: "String",
    required: true,
  },
  password: {
    type: "String",
    select: false,
    required: true,
  },
  phone: {
    type: "Number",
    required: true,
  },
  institution: {
    type: "String",
    required: true,
  },
  gender: {
    type: "String",
    required: true,
  },
  img: {
    type: Buffer,
    contentType: "String",
  },
  interested: {
    type: Array,
    ref:"Amenities"
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const UserModel = mongoose.model("User", UserSchema);
