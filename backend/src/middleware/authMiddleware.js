import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    //console.log(authHeader)

    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    // Expecting "Bearer <token>"
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, message: 'Invalid token format' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach decoded payload to request for later use
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};

export default authMiddleware;
