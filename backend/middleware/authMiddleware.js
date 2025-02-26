import pkg from "jsonwebtoken";
const { verify } = pkg;

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Kein Token, Zugriff verweigert" });
  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Ungültiges Token" });
  }
};

export default authMiddleware;
