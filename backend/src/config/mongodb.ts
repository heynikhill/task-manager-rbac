import mongoose from "mongoose";

const connectDb = async () => {
        try {
            mongoose.connection.on("connected",()=>{
                console.log("DB connected")
            })
            // await mongoose.connect(process.env.MONGODB_URI,{});
            // console.log(process.env.MONGODB_URI);
            // await mongoose.connect(process.env.MONGODB_URI!)
            
            
            await mongoose.connect(process.env.MONGODB_URI!)
            console.log("MongoDB connected");
        } catch (error: any) {
            console.log("Error while connecting to mongoDB : " + error)
            process.exit(1)
        }
}

export default connectDb