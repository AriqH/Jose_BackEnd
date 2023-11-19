import Users from "../models/UserModel.js";
import bcrypt from "bcryptjs";

export const adminRegister = async (req, res) => {
    const { name, email, password, confPassword } = req.body;


    if (password !== confPassword) {
        return res.status(400).json({ msg: "Password tidak cocok" });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        const admin = await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            role: 'admin'
        });
        res.json({ msg: "Admin registered successfully", admin });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "An error occurred while registering admin" });
    }
};
