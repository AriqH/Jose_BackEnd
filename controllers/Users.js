import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { refreshToken } from "./RefreshToken.js";

export const Register = async (req, res) => {
    const { name, email, password, confPassword } = req.body;
    if (password !== confPassword) return res.status(400).json({ msg: "Password tidak cocok" });

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        const user = await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            role: 'users'
        });
        res.json({ msg: "Register Berhasil", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

export const Login = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!user) {
            return res.status(404).json({ msg: "Email Tidak ditemukan" });
        }

        const match = await bcrypt.compare(req.body.password, user.password);

        if (!match) {
            return res.status(400).json({ msg: "password salah" });
        }

        const userId = user.id;
        const name = user.name;
        const email = user.email;
        const role = user.role;

        const accessToken = jwt.sign({ userId, name, email, role }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1d'
        });

        const refreshToken = jwt.sign({ userId, name, email, role }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });

        await Users.update({ refresh_token: refreshToken }, {
            where: {
                id: userId
            }
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({ accessToken, refreshToken, role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

export const Logout = async (req, res) => {
    const refresh_token = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);

    try {
        const user = await Users.findOne({
            where: {
                refresh_token: refresh_token
            }
        });

        if (!user) return res.sendStatus(204);

        const userId = user.id;
        await Users.update({ refresh_token: null }, {
            where: {
                id: userId
            }
        });

        res.clearCookie('refreshToken');
        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}
