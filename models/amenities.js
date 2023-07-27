import mongoose, { Schema } from "mongoose";

const AmenitiesSchema = new Schema({
    name:{
        type:"String",
        required:true,
    },
    address:{
        type:"String",
        required:true,
    },
    price:{
        type:"Number",
        required:true
    },
    ratings:{
        type:"Number",
        required:true
    },
    testimony:{
        type:[{
            name:{
                type:String,
                required:true
            },
            mssg:{
                type:String,
                required:true
            },
        }],
    },
    likes:{
        type:"Number"
    },
    img:{
        type:Buffer,
        contentType:"String"
    }
})


export const Amenities = mongoose.model("Amenities",AmenitiesSchema);