import jwt from "jsonwebtoken";

const verifyUser = (req, res, next) => {
  const token = req.cookies.token; // get token from cookie

  if (!token) {
    return res.status(401).json({ message: "No token provided in cookie" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); 
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default verifyUser;
