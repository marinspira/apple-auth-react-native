import User from "../models/user.model.js"
import jwt from 'jsonwebtoken'

export const signInWithApple = async (req, res) => {
  try {
    const { appleUserId, email, fullName, identityToken } = req.body;

    // Check data received
    if (!appleUserId || !identityToken) {
      return res.status(400).json({ error: "Apple user ID or identity token is missing" });
    }

    // Check if user already exists
    let user = await User.findOne({ appleUserId });

    // Create a new user if dont exists
    if (!user) {
      user = new User({ appleUserId, email, fullName });
      await user.save();
    }

    // Create token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '365d',
    });

    // Save token on cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });

    // Send token as res
    res.status(200).json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      token,
    });

  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
}

export const authenticateToken = (req, res, next) => {
  const token = req.body.token || req.headers['Authorization'];

  if (!token) {
    return res.status(403).json({ error: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const validateToken = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({
      id: user._id,
      email: user.email,
      fullName: user.fullName,
    });
  } catch (error) {
    console.log('Error:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 })
    res.status(200).json({ message: "Logged out successfully" })
  } catch (error) {
    console.log("Error:", error.message)
    res.status(500).json({ error: "Error Server" })
  }
}