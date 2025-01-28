import User from "../models/userModel.js"
import UserRefreshTokenModel from "../models/UserRefreshToken.js";
import generateTokens from "./generateTokens.js";
import verifyRefreshToken from "./verifyRefreshToken.js";

// const refreshAccessToken = async (req, res) => {
//   try {
//     const oldRefreshToken = req.cookies.refreshToken;
//     // Verify Refresh Token is valid or not
//     const { tokenDetails, error } = await verifyRefreshToken(oldRefreshToken);

//     if (error) {
//       return res
//         .status(401)
//         .send({ status: "failed", message: "Invalid refresh token" });
//     }
//     // Find User based on Refresh Token detail id
//     const user = await User.findById(tokenDetails._id);

//     if (!user) {
//       return res
//         .status(404)
//         .send({ status: "failed", message: "User not found" });
//     }

//     const userRefreshToken = await UserRefreshTokenModel.findOne({
//       userId: tokenDetails._id,
//     });

//     if (
//       oldRefreshToken !== userRefreshToken.token ||
//       userRefreshToken.blacklisted
//     ) {
//       return res
//         .status(401)
//         .send({ status: "failed", message: "Unauthorized access" });
//     }

//     // Generate new access and refresh tokens
//     const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } =
//       await generateTokens(user);
//     return {
//       newAccessToken: accessToken,
//       newRefreshToken: refreshToken,
//       newAccessTokenExp: accessTokenExp,
//       newRefreshTokenExp: refreshTokenExp,
//     };
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .send({ status: "failed", message: "Internal server error" });
//   }
// };

// export default refreshAccessToken;


const refreshAccessToken = async (req, res) => {
  try {
    const oldRefreshToken = req.cookies.refreshToken;
    if (!oldRefreshToken) {
      throw new Error("No refresh token provided");
    }

    const { tokenDetails, error } = await verifyRefreshToken(oldRefreshToken);

    if (error) {
      throw new Error("Invalid refresh token");
    }

    const user = await User.findById(tokenDetails._id);
    if (!user) {
      throw new Error("User not found");
    }

    const userRefreshToken = await UserRefreshTokenModel.findOne({
      userId: tokenDetails._id,
    });

    if (
      oldRefreshToken !== userRefreshToken.token ||
      userRefreshToken.blacklisted
    ) {
      throw new Error("Unauthorized access");
    }

    // Generate new tokens
    const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } =
      await generateTokens(user);

    return {
      newAccessToken: accessToken,
      newRefreshToken: refreshToken,
      newAccessTokenExp: accessTokenExp,
      newRefreshTokenExp: refreshTokenExp,
    };
  } catch (error) {
    console.error("Error in refreshAccessToken:", error.message);
    // Instead of sending a response, throw the error
    throw new Error(error.message);
  }
};

export default refreshAccessToken;
