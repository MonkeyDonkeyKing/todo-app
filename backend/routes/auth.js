import express from "express";
import bcrypt from "bcryptjs";
import pkg from "jsonwebtoken";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const { sign } = pkg;
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({ username: req.body.username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "Benutzer erstellt" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).json({ message: "Ungültige Anmeldeinformationen" });
    }
    const token = sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/getUsername", authMiddleware, async (req, res) => {
  try {
    console.log("HIER REQUEST",req);
    
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({ username: user.username });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

export default router;
