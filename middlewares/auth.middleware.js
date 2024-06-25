import User from "../models/user.model.js";
import bcrypt from "bcrypt";

async function restrictedToLoggedInUserOnly(req, res, next) {
    const token = req.cookies?.token;
    
    if (!token) return res.status(400).json({ Message: "Please Login" });

    const user = await User.find({ token });
    
    if (!user || user.length == 0)
        return res.status(400).json({ Message: "Please Login" });

    const decryptToken = await bcrypt.compare(user[0]._id.toString(), token);
     
    if (!decryptToken) {
        return res
            .status(400)
            .json({ Message: "Invalid Token Please Login..." });
    }

    req.user = user;

    next();
}

export default restrictedToLoggedInUserOnly;
