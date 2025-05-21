import Avatar from "../models/Avatar.js";
import User from "../models/User.js";

const AvatarController = {
  async createAvatar(req, res) {
    try {
      const { model_id, chat_id } = req.body;
      const { user_id } = req.params; // Use user_id from params

      // Check if user exists
      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const avatar = await Avatar.create({ user_id, model_id, chat_id });
      res.status(201).json(avatar);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getAvatars(req, res) {
    try {
      const avatars = await Avatar.findAll({ include: User });
      res.status(200).json(avatars);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getAvatarsByUser(req, res) {
    try {
      const { user_id } = req.params;
  
      // Check if user exists
      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Now fetch avatars for that user directly
      const avatars = await Avatar.findAll({
        where: { user_id },
        attributes: ["avatar_id", "model_id", "chat_id", "createdAt", "updatedAt", "user_id"],
      });
  
      res.status(200).json(avatars);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getAvatarById(req, res) {
    try {
      const { id } = req.params;
      const avatar = await Avatar.findByPk(id, { include: User });
      if (!avatar) {
        return res.status(404).json({ message: "Avatar not found" });
      }
      res.status(200).json(avatar);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default AvatarController;
