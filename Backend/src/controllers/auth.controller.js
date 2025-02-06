import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import sendEmailVerificationOTP from "../utils/sendEmailVerificationOTP.js";
import EmailVerificationModel from "../models/EmailVerification.js";
import generateTokens from "../utils/generateTokens.js";
import setTokensCookies from "../utils/setTokensCookies.js";
import refreshAccessToken from "../utils/refreshAccessToken.js";
import UserRefreshTokenModel from "../models/UserRefreshToken.js";
import jwt from "jsonwebtoken";
import transporter from "../config/emailConfig.js";
import cloudinary from "../config/cloudinary.js"

class UserController {
  // User Registration
  static userRegistration = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ status: "failed", message: "All fields are required" });
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(409)
          .json({ status: "failed", message: "Email already exists" });
      }
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await new User({
        name,
        email,
        password: hashedPassword,
      }).save();
      sendEmailVerificationOTP(req, newUser);
      res.status(201).json({
        status: "success",
        message: "Registration Success",
        user: { id: newUser._id, email: newUser.email },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "failed",
        message: "Unable to Register, please try again later",
      });
    }
  };

  static verifyEmail = async (req, res) => {
    try {
      // Extract request body parameters
      const { email, otp } = req.body;

      // Check if all required fields are provided
      if (!email || !otp) {
        return res
          .status(400)
          .json({ status: "failed", message: "All fields are required" });
      }

      const existingUser = await User.findOne({ email });

      // Check if email doesn't exists
      if (!existingUser) {
        return res
          .status(404)
          .json({ status: "failed", message: "Email doesn't exists" });
      }

      // Check if email is already verified
      if (existingUser.is_verified) {
        return res
          .status(400)
          .json({ status: "failed", message: "Email is already verified" });
      }

      // Check if there is a matching email verification OTP
      const emailVerification = await EmailVerificationModel.findOne({
        userId: existingUser._id,
        otp,
      });
      if (!emailVerification) {
        if (!existingUser.is_verified) {
          // console.log(existingUser);
          await sendEmailVerificationOTP(req, existingUser);
          return res.status(400).json({
            status: "failed",
            message: "Invalid OTP, new OTP sent to     email",
          });
        }
        return res
          .status(400)
          .json({ status: "failed", message: "Invalid OTP" });
      }

      // Check if OTP is expired
      const currentTime = new Date();
      // 15 * 60 * 1000 calculates the expiration period in milliseconds(15 minutes).
      const expirationTime = new Date(
        emailVerification.createdAt.getTime() + 15 * 60 * 1000
      );
      if (currentTime > expirationTime) {
        // OTP expired, send new OTP
        await sendEmailVerificationOTP(req, existingUser);
        return res.status(400).json({
          status: "failed",
          message: "OTP expired, new OTP sent to your email",
        });
      }

      // OTP is valid and not expired, mark email as verified
      existingUser.is_verified = true;
      await existingUser.save();

      // Delete email verification document
      await EmailVerificationModel.deleteMany({ userId: existingUser._id });
      return res
        .status(200)
        .json({ status: "success", message: "Email verified successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "failed",
        message: "Unable to verify email, please try again later",
      });
    }
  };

  // User Login
  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if email and password are provided
      if (!email || !password) {
        return res.status(400).json({
          status: "failed",
          message: "Email and password are required",
        });
      }
      // Find user by email
      const user = await User.findOne({ email });
  
      // Check if user exists
      if (!user) {
        return res.status(401).json({
          status: "failed",
          message: "Invalid email or password",
        });
      }
  
      // Check if the user's account is verified
      if (!user.is_verified) {
        return res.status(403).json({
          status: "failed",
          message: "Your account is not verified. Please check your email.",
        });
      }
  
      // Compare passwords / Check Password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          status: "failed",
          message: "Invalid email or password",
        });
      }
  
      // Generate tokens
      const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } =
        await generateTokens(user);
  
      // Set Cookies
      setTokensCookies(
        res,
        accessToken,
        refreshToken,
        accessTokenExp,
        refreshTokenExp
      );

      // Send success response with tokens
      res.status(200).json({
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: Array.isArray(user?.role) ?  user.role[0] : user.role,  // assuming it's an array of roles
        },
        status: "success",
        message: "Login successful",
        access_token: accessToken,
        refresh_token: refreshToken,
        access_token_exp: accessTokenExp,
        refresh_token_exp: refreshTokenExp,  // Consider returning the expiration of the refresh token as well
        is_auth: true,
      });
    } catch (error) {
      console.error("Login error:", error);
  
      // Specific error message based on different error types can be added here
      res.status(500).json({
        status: "failed",
        message: "Unable to login, please try again later",
      });
    }
  };
  

  // Get New Access Token OR Refresh Token

  static getNewAccessToken = async (req, res) => {
    try {
      // Get new access token using Refresh Token
      const {
        newAccessToken,
        newRefreshToken,
        newAccessTokenExp,
        newRefreshTokenExp,
      } = await refreshAccessToken(req, res);

      // Set New Tokens to Cookie
      setTokensCookies(
        res,
        newAccessToken,
        newRefreshToken,
        newAccessTokenExp,
        newRefreshTokenExp
      );

      res.status(200).send({
        status: "success",
        message: "New tokens generated",
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        access_token_exp: newAccessTokenExp,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "failed",
        message: "Unable to generate new token, please try again later",
      });
    }
  };

  // static getUserInfo = async(req, res) => {
  //   try {
  //     const {id} = req.headers;
  //     // Find user by email
  //     const user = await User.findOne({ id });
  //     // Generate tokens
  //     const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } =
  //       await generateTokens(user);

  //     // Set Cookies
  //     setTokensCookies(
  //       res,
  //       accessToken,
  //       refreshToken,
  //       accessTokenExp,
  //       refreshTokenExp
  //     );

  //     // Send success response with tokens
  //     res.status(200).json({
  //       user: {
  //         id: user._id,
  //         email: user.email,
  //         name: user.name,
  //         role: user.role[0],
  //       },
  //       status: "success",
  //       message: "Get user info successfully",
  //       access_token: accessToken,
  //       refresh_token: refreshToken,
  //       access_token_exp: accessTokenExp,
  //       is_auth: true,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({
  //       status: "failed",
  //       message: "Internal Server Error",
  //     });
  //   }
  // };

  // Profile OR Logged in User

  static userProfile = async (req, res) => {
    console.log(req.user)
    res.send({ user: req.user });
  };

  // Change Password
  static changeUserPassword = async (req, res) => {
    try {
      const { password, confirmPassword } = req.body;

      // Check if both password and confirmPassword are provided
      if (!password || !confirmPassword) {
        return res.status(400).json({
          status: "failed",
          message: "New Password and Confirm New Password are required",
        });
      }

      // Check if password and confirmPassword match
      if (password !== confirmPassword) {
        return res.status(400).json({
          status: "failed",
          message: "New Password and Confirm New Password don't match",
        });
      }

      // Generate salt and hash new password
      const salt = await bcrypt.genSalt(10);
      const newHashPassword = await bcrypt.hash(password, salt);

      // Update user's password
      await User.findByIdAndUpdate(req.user._id, {
        $set: { password: newHashPassword },
      });

      // Send success response
      res
        .status(200)
        .json({ status: "success", message: "Password changed successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "failed",
        message: "Unable to change password, please try again later",
      });
    }
  };

  // Send Password Reset Link via Email
  static sendUserPasswordResetEmail = async (req, res) => {
    try {
      const { email } = req.body;
      // Check if email is provided
      if (!email) {
        return res
          .status(400)
          .json({ status: "failed", message: "Email field is required" });
      }
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ status: "failed", message: "Email doesn't exist" });
      }
      // Generate token for password reset
      const secret = user._id + process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
      const token = jwt.sign({ userID: user._id }, secret, {
        expiresIn: "15m",
      });
      // Reset Link
      const resetLink = `https://buybookonline.onrender.com/newpassword/${user._id}/${token}`;
      // const resetLink = `${process.env.FRONTEND_HOST}/newpassword`;
      console.log(resetLink);

      // Send password reset email
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: "Password Reset Link",
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset - BuyBookOnline</title>
    <style>
        /* Reset styles */
        body {
            margin: 0;
            padding: 0;
            background-color: #f0f7ff;
            font-family: 'Segoe UI', Arial, sans-serif;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        
        /* Container */
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            padding: 0;
            background-color: #ffffff;
            border-radius: 15px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        /* Header */
        .header {
            background: linear-gradient(135deg, #4a90e2 0%, #2c5282 100%);
            padding: 30px 20px;
            text-align: center;
            color: white;
        }
        
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        }
        
        /* Logo */
        .logo {
            text-align: center;
            padding: 20px 0;
            background-color: #ffffff;
        }
        
        /* Content */
        .content {
            padding: 30px;
            line-height: 1.8;
            color: #2d3748;
            background-color: #ffffff;
        }
        
        /* Button */
        .button {
            display: inline-block;
            padding: 14px 30px;
            background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 50px;
            margin: 25px 0;
            font-weight: bold;
            box-shadow: 0 4px 8px rgba(74, 144, 226, 0.3);
            transition: all 0.3s ease;
        }
        
        .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(74, 144, 226, 0.4);
        }
        
        /* Decorative elements */
        .decoration {
            height: 4px;
            background: linear-gradient(90deg, #4a90e2, #2c5282);
        }
        
        /* Footer */
        .footer {
            text-align: center;
            padding: 30px;
            color: #718096;
            font-size: 13px;
            background-color: #f8fafc;
            border-top: 1px solid #e2e8f0;
        }
        
        /* Responsive styles */
        @media screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                margin: 0;
                border-radius: 0;
            }
            
            .content {
                padding: 20px;
            }
            
            .button {
                display: block;
                text-align: center;
                margin: 20px auto;
            }
            
            .header h1 {
                font-size: 24px;
            }
        }
        
        /* Additional styling */
        h2 {
            color: #2c5282;
            margin-bottom: 20px;
        }
        
        p {
            margin-bottom: 15px;
        }
        
        .highlight {
            background-color: #f0f7ff;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #4a90e2;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="decoration"></div>
        <div class="header">
            <h1>📚 BuyBookOnline</h1>
        </div>
        
        <div class="content">
            <h2>Password Reset Request</h2>
            <p>Hello ${user.name},</p>
            <p>We received a request to reset the password for your BuyBookOnline account. If you didn't make this request, you can safely ignore this email.</p>
            
            <div class="highlight">
                <p>To reset your password, click the button below. This link will expire in 24 hours for security purposes.</p>
            </div>
            
            <div style="text-align: center;">
                <a href="${resetLink}" class="button">Reset My Password</a>
            </div>
            
          
            
            <p>For your security, this password reset link will expire in 24 hours. If you need to reset your password after that, please request a new reset link.</p>
            
            <p>Happy Reading! 📚<br>The BuyBookOnline Team</p>
        </div>
        
        <div class="footer">
            <p>This email was sent to {{userEmail}}.</p>
            <p>If you need assistance, our support team is always here to help!</p>
            <p>&copy BuyBookOnline. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`,

        // `<p>Hello ${user.name},</p><p>Please <a href="${resetLink}">click here</a> to reset your password.</p>`,
      });
      // Send success response
      res.status(200).json({
        status: "success",
        message: "Password reset email sent. Please check your email.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "failed",
        message: "Unable to send password reset email. Please try again later.",
      });
    }
  };

  // Password Reset
  // static userPasswordReset = async (req, res) => {
  //   try {
  //     const { password, confirmPassword } = req.body;
  //     const { id, token } = req.params;
  //     // Find user by ID
  //     const user = await User.findById(id);
  //     if (!user) {
  //       return res
  //         .status(404)
  //         .json({ status: "failed", message: "User not found" });
  //     }
  //     // Validate token
  //     const new_secret = user._id + process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
  //     jwt.verify(token, new_secret);

  //     // Check if password and confirmPassword are provided
  //     if (!password || !confirmPassword) {
  //       return res.status(400).json({
  //         status: "failed",
  //         message: "New Password and Confirm New Password are required",
  //       });
  //     }

  //     // Check if password and confirmPassword match
  //     if (password !== confirmPassword) {
  //       return res.status(400).json({
  //         status: "failed",
  //         message: "New Password and Confirm New Password don't match",
  //       });
  //     }

  //     // Generate salt and hash new password
  //     const salt = await bcrypt.genSalt(10);
  //     const newHashPassword = await bcrypt.hash(password, salt);

  //     // Update user's password
  //     await User.findByIdAndUpdate(user._id, {
  //       $set: { password: newHashPassword },
  //     });

  //     // Send success response
  //     res
  //       .status(200)
  //       .json({ status: "success", message: "Password reset successfully" });

  //     // Send email to user confirming password change

  //     await transporter.sendMail({
  //       from: process.env.EMAIL_FROM,
  //       to: user.email,
  //       subject: "Password Reset Successful",
  //       html: `<p>Hello ${user.name},</p><p>Your password has been reset successfully.</p>`,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     if (error.name === "TokenExpiredError") {
  //       return res.status(400).json({
  //         status: "failed",
  //         message: "Token expired. Please request a new password reset link.",
  //       });
  //     }
  //     return res.status(500).json({
  //       status: "failed",
  //       message: "Unable to reset password. Please try again later.",
  //     });
  //   }
  // };

  static userPasswordReset = async (req, res) => {
    try {
      const { password, confirmPassword } = req.body;
      const { id, token } = req.params;

      // Find user by ID
      const user = await User.findById(id);
      if (!user) {
        return res
          .status(404)
          .json({ status: "failed", message: "User not found" });
      }

      // Validate token
      const new_secret = user._id + process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
      jwt.verify(token, new_secret);

      // Check if password and confirmPassword match
      if (password !== confirmPassword) {
        return res.status(400).json({
          status: "failed",
          message: "New Password and Confirm New Password don't match",
        });
      }

      // Generate salt and hash new password
      const salt = await bcrypt.genSalt(10);
      const newHashPassword = await bcrypt.hash(password, salt);

      // Update user's password
      await User.findByIdAndUpdate(user._id, {
        $set: { password: newHashPassword },
      });

      // Send email to user confirming password change

      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: "Password Reset Successful",
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Successful - BuyBookOnline</title>
    <style>
        /* Reset styles */
        body {
            margin: 0;
            padding: 0;
            background-color: #f0f7ff;
            font-family: 'Segoe UI', Arial, sans-serif;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        
        /* Container */
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            padding: 0;
            background-color: #ffffff;
            border-radius: 15px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        /* Header */
        .header {
            background: linear-gradient(135deg, #4a90e2 0%, #2c5282 100%);
            padding: 30px 20px;
            text-align: center;
            color: white;
        }
        
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        }
        
        /* Success Icon */
        .success-icon {
            text-align: center;
            margin: 30px 0;
            animation: scaleIn 0.5s ease-out;
        }
        
        .success-circle {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
        }
        
        .success-icon span {
            color: white;
            font-size: 40px;
        }
        
        /* Content */
        .content {
            padding: 30px;
            line-height: 1.8;
            color: #2d3748;
            background-color: #ffffff;
        }
        
        /* Decorative elements */
        .decoration {
            height: 4px;
            background: linear-gradient(90deg, #4a90e2, #2c5282);
        }
        
        /* Message Box */
        .message-box {
            background-color: #f8f9ff;
            border-left: 4px solid #4a90e2;
            padding: 20px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
        }
        
        /* Footer */
        .footer {
            text-align: center;
            padding: 30px;
            color: #718096;
            font-size: 13px;
            background-color: #f8fafc;
            border-top: 1px solid #e2e8f0;
        }
        
        /* Animation */
        @keyframes scaleIn {
            0% { transform: scale(0); }
            100% { transform: scale(1); }
        }
        
        /* Responsive styles */
        @media screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                margin: 0;
                border-radius: 0;
            }
            
            .content {
                padding: 20px;
            }
            
            .header h1 {
                font-size: 24px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="decoration"></div>
        <div class="header">
            <h1>📚 BuyBookOnline</h1>
        </div>
        
        <div class="content">
            <div class="success-icon">
                <div class="success-circle">
                    <span>✓</span>
                </div>
            </div>
            
            <div class="message-box">
                <p>Hello ${user.name},</p>
                <p>Your password has been reset successfully.</p>
            </div>
            
            <p>You can now log in to your BuyBookOnline account with your new password. All your books and reading preferences are waiting for you! 📖</p>
            
            <p>If you did not request this password reset, please contact our support team immediately at support@buybookonline.com</p>
            
            <p>Happy Reading!<br>The BuyBookOnline Team</p>
        </div>
        
        <div class="footer">
            <p>This is an automated message, please do not reply to this email.</p>
            <p>If you need assistance, our support team is always ready to help!</p>
            <p>&copy;  BuyBookOnline. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`,

        // `<p>Hello ${user.name},</p><p>Your password has been reset successfully.</p>`
      });

      res
        .status(200)
        .json({ status: "success", message: "Password reset successfully" });
    } catch (error) {
      console.error("Error resetting password:", error);
      if (error.name === "TokenExpiredError") {
        return res.status(400).json({
          status: "failed",
          message: "Token expired. Please request a new password reset link.",
        });
      }
      res.status(500).json({
        status: "failed",
        message: "Unable to reset password. Please try again later.",
      });
    }
  };

  // Logout
  static userLogout = async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      
      // If there's no refresh token, the user is not logged in, so we can return a response
      if (!refreshToken) {
        return res.status(400).json({ status: "failed", message: "No refresh token found, user might already be logged out." });
      }

      // Optionally, blacklist the refresh token in the database
      const userRefreshToken = await UserRefreshTokenModel.findOne({ token: refreshToken });

      if (userRefreshToken) {
        // Blacklist the refresh token
        userRefreshToken.blacklisted = true;
        await userRefreshToken.save();
      } else {
        console.log('Refresh token not found in database for blacklisting.');
      }

      // Clear access token and refresh token cookies
      res.clearCookie("accessToken", { path: "/" }); // Specify path if necessary
      res.clearCookie("refreshToken", { path: "/" }); // Specify path if necessary
      res.clearCookie("is_auth", { path: "/" }); // Specify path if necessary

      res.status(200).json({ status: "success", message: "Logout successful" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({
        status: "failed",
        message: "Unable to logout, please try again later",
      });
    }
  };
}

export const UpdateUserRole = async (req, res) => {
  const userId = req.params.id; // Extract user ID from URL parameters

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role: "author" },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User role updated to 'author' successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the user role",
      error: error.message,
    });
  }
};


export const updateProfile = async (req , res)=>{
  try {
      const {profilePic} = req.body;
      const userId = req.user._id

      if(!profilePic){
          res.status(400).json({message:"Profile pic is Required"});
      }

      const uploadResponse = await cloudinary.uploader.upload(profilePic)
      const updatedUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})

      res.status(200).json(updatedUser)

  } catch (error) {
      console.log("error in updating profile", error);
      
      res.status(400).json({message:"Internal server Error"});
  }
}




export default UserController;
