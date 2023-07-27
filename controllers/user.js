import { UserModel } from "../models/users.js";
import bcrypt from "bcrypt";
import { jwtToken } from "../utils/feature.js";
import ErrorHandler from "../middleware/error.js";
import { Amenities } from "../models/amenities.js";

export const userLogin = async(req,res,next)=>{
    try{
        const {email,password} = req.body;
        let user = await UserModel.findOne({email}).select("+password");
        let hashedData = user.password;
        if(!user) next(new ErrorHandler(404,"Invalid Email and Password"));
        const isMatch= await bcrypt.compare(password,hashedData);
        if(!isMatch) return next(new ErrorHandler(404,"Invalid Email and Password"))
        jwtToken(user.id,res,200,`Welcome back ${user.name}`)
    }
    catch(error)
    {
        next(error);
    }
}

export const userRegister = async (req, res, next) => {
  try {
    const { name, email, password, phone, institution, gender, img } = req.body;
    let hashedData = await bcrypt.hash(password, 15);
    let user = await UserModel.findOne({ email });
    if(user) next(new ErrorHandler(404,"Email already exists"));
    
    user = await UserModel.create({
      name,
      email,
      password:hashedData,
      phone,
      institution,
      gender,
      img,
    });
    jwtToken(user,res,201,"Created Successfully!")
  } catch (error) {
    next(error);
  }
};

export const getDetails = async(req,res,next)=>{
    try{
        const user = await UserModel.findById(req.user._id); 
        res.json({success:true,user})
    }
    catch(error)
    {
        next(error);
    }
}

export const userLogout = (req,res)=>{
    res.status(200).cookie("token","",{expires:new Date(Date.now()),httpOnly:true,sameSite:"lax",secure:false}).json({
        success:true,
        message:"Logout Successfully",
        user:req.user
    });
}


export const getUpdate = async(req,res,next)=>{
    const {name,phone,institution,password,img,gender} = req.body;
    try {
        await UserModel.findByIdAndUpdate(req.params.id,{
            name,password,institution,phone,gender,img
        })
        res.json({
            success:"true",
            message:"Updated Successfully"
        })
    } catch (error) {
        next(error);
    }

}


export const UserInterests = async(req,res,next)=>
{
    try {
        const {id} = req.params;
        const interestProp = await Amenities.findById(id);
        if(!interestProp) return next(new ErrorHandler(404,"Something went wrong"))
        let user = await UserModel.findById(req.user._id);
        user = await UserModel.findByIdAndUpdate(req.user._id,{interested:[...user.interested,interestProp]})
        res.json({success:true,user:{
            _id:user._id,
            interested:interestProp
        }});
    } catch (error) {
        next(error)
    }
}

export const UserNotInterests  = async(req,res,next)=>
{
    try{
        const {id} = req.params;
        const interestProp = await Amenities.findById(id);
        const user = await UserModel.updateOne({"interested._id":interestProp._id},{$pull:{"interested":interestProp}});
        res.json({success:true})
    } catch (error) {
        next(error)
    }
}