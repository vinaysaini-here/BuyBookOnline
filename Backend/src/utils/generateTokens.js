import jwt from "jsonwebtoken";
import UserRefreshTokenModel from "../models/UserRefreshToken.js";

const generateTokens = async (user) => {
  try {
    if (!user) {
      throw new Error("User not found");
    }

    const payload = { _id: user._id, roles: user.roles };

    // Generate access token with expiration time (let's set it to 15 minutes as an example)
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: "15m", // Set expiration to 15 minutes
    });

    // Generate refresh token with expiration time (let's set it to 5 days)
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: "5d", // Set expiration to 5 days
    });

    // Remove any existing refresh token for the user from the database
    await UserRefreshTokenModel.findOneAndDelete({ userId: user._id });

    // Save new refresh token in the database
    await new UserRefreshTokenModel({
      userId: user._id,
      token: refreshToken,
    }).save();

    // Return the generated tokens and their expiration times
    return {
      accessToken,
      refreshToken,
      accessTokenExp: Math.floor(Date.now() / 1000) + 15 * 60, // 15 minutes expiration for access token
      refreshTokenExp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 5, // 5 days expiration for refresh token
    };
  } catch (error) {
    // Handle errors properly
    console.error("Error generating tokens:", error.message);
    return Promise.reject(error); // Reject the promise with the error
  }
};

export default generateTokens;
