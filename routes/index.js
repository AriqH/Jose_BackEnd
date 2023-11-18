import express from "express";
import { Register, Login, Logout} from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { createReservation, getReservasi} from "../controllers/reservasiControllers.js";
import { adminRegister } from "../controllers/adminCotroller.js";
import { chatController } from "../controllers/chatController.js";

const router = express.Router();

router.get('/users',verifyToken);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.get('/reservation', getReservasi);
router.post('/reservation',createReservation);
router.post('/adminRegister', adminRegister)
router.post('/chat', chatController);

export default router;
