import User from "../models/user.model.js";
import bcrypt from "bcrypt";

async function handleCreateUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ Message: "Email or Password is required" });
    }

    const user = await User.findOne({ email, password });
    if (user) {
        return res
            .status(400)
            .json({ Message: "User is already registered please login..." });
    }

    await User.create({ email, password });
    return res.status(200).json({ Message: "Account Created...!" });
}

async function handleLogin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            Message: "email or password is required...",
        });
    }
    const user = await User.findOne({ email, password });
    if (!user) {
        return res.status(400).json({ Message: "No User Found" });
    }

    const token = bcrypt.hashSync(user._id.toString(), 5);
    user.token = token;
    await user.save();
    
    res.cookie("token", token);
    return res.send(user);
}

async function handleLogout(req, res) {
    const userInDb = await User.findOneAndUpdate(
        { token: req.cookies.token },
        {
            token: null,
        },
        {
            new: true,
        }
    );
    res.clearCookie(req.cookies.token);
    return res.status(200).json({ Message: "logout sucessful" });
}

export { handleCreateUser, handleLogin, handleLogout};
