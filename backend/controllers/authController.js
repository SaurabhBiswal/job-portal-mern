import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      const hash = await bcrypt.hash(password, 10);
      user = await User.create({ email, password: hash, role });
    }

    if (user.role !== role) {
      return res.status(400).json({ message: "Wrong role" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.json({ token });
  } catch (e) {
    res.status(500).json({ message: "Login error" });
  }
};







