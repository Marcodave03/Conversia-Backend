import express from "express";
import { CreateUser, GetUser, UpdateUser } from "../controller/UserController.js";
import AvatarController from "../controller/AvatarController.js";
import BackgroundController from "../controller/BackgroundController.js";
import ChatHistoryController from "../controller/ChatHistoryController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// User Routes
router.post("/users", CreateUser);
router.get("/users/:user_id", GetUser);
router.put("/users/:user_id", UpdateUser);

// Avatar Routes
router.post("/users/:user_id/avatars", AvatarController.createAvatar);
router.get("/users/:user_id/avatars", AvatarController.getAvatarsByUser);
router.get("/avatars/:id", AvatarController.getAvatarById);

router.post("/users/:user_id/background", BackgroundController.createBackground);
router.get("/background", BackgroundController.getAllBackgrounds);
router.get("/users/:user_id/background", BackgroundController.getBackgroundsByUser);
router.get("/background/:id", BackgroundController.getBackgroundById);

router.get("/chat-history/:user_id/:model_id", ChatHistoryController.getHistory);
router.post("/chat-history/:user_id/:model_id", ChatHistoryController.addMessage);


router.post("/speech-to-text/:user_id/:model_id",upload.single("audio"),ChatHistoryController.transcribeAndReply);


export default router;
