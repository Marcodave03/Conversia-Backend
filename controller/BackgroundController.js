import Background from "../models/Background.js";
import User from "../models/User.js";

const BackgroundController = {
  // Create a background for a user
  async createBackground(req, res) {
    try {
      const { image_id } = req.body;
      const { user_id } = req.params;

      // Check if user exists
      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const background = await Background.create({ user_id, image_id });
      res.status(201).json(background);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get all backgrounds (including user info)
  async getAllBackgrounds(req, res) {
    try {
      const backgrounds = await Background.findAll({ include: User });
      res.status(200).json(backgrounds);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get backgrounds by user_id
  async getBackgroundsByUser(req, res) {
    try {
      const { user_id } = req.params;

      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const backgrounds = await Background.findAll({
        where: { user_id },
        attributes: ["background_id", "image_id", "user_id", "createdAt", "updatedAt"],
      });

      res.status(200).json(backgrounds);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get single background by ID
  async getBackgroundById(req, res) {
    try {
      const { id } = req.params;

      const background = await Background.findByPk(id, { include: User });
      if (!background) {
        return res.status(404).json({ message: "Background not found" });
      }

      res.status(200).json(background);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default BackgroundController;
