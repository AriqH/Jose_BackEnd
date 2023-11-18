import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);

        const user = await Users.findOne({
            where: {
                refresh_token: refreshToken
            }
        });

        if (!user) return res.sendStatus(403);

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const { userId, name, email, role } = decoded;

        const accessToken = jwt.sign({ userId, name, email, role }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1d' // You may adjust the expiration time as needed
        });

        res.json({ accessToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}


