import express from "express";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./DB/connection.js";
import authRoute from "./routes/auth.routes.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use("/", authRoute);


connectToMongoDB()
    .then(() => {
        console.log("mongodb connection sucessful");
        const port = 8005;
        app.listen(port, () => {
            console.log(`server started on port ${port}`);
        });
    })
    .catch((err) => {
        console.log("Error while connecting to MongoDB");
    });
