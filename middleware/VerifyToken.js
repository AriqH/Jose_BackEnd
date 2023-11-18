import jwt from "jsonwebtoken";
import Users from "../models/UserModel.js";

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) return res.sendStatus(403);

            const user = await Users.findOne({
                where: {
                    email: decoded.email,
                    refresh_token: token
                }
            });

            if (!user) return res.sendStatus(403);

            req.email = decoded.email;
            next();
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}
