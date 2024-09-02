import User from "../models/user.model.js"
import jwt from 'jsonwebtoken'

export const appleAuth = async (req, res) => {
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

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        console.log("Error:", error.message)
        res.status(500).json({ error: "Error Server" })
    }
}