import mongoose from "mongoose";

export const _dbConnect =()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"PgLife"
    })
    .then(res=>{
        
        console.log(`Database Connected with ${res.connection.host}`);

        //For development purpose only .....
        // console.log("Database Connected !!");
    })
    .catch(err=>{
        console.log("Failed to connect to Database "+err);
    })
}