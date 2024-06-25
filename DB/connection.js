import mongoose from "mongoose";

function connectToMongoDB(){
    return mongoose.connect("mongodb://127.0.0.1:27017/Stateful-auth")
}

export default connectToMongoDB;