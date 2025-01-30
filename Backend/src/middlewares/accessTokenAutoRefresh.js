// This middleware will set Authorization Header and will refresh access token on expire
// if we use this middleware we won't have to explicitly make request to refresh-token api url

import refreshAccessToken from "../utils/refreshAccessToken.js";
import isTokenExpired from "../utils/isTokenExpired.js";
import setTokensCookies from "../utils/setTokensCookies.js";

const accessTokenAutoRefresh = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    // If access token exists and is not expired, add it to Authorization header
    if (accessToken && !isTokenExpired(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET_KEY)) {
      req.headers['authorization'] = `Bearer ${accessToken}`;
    } else {
      // If access token is missing or expired, try to refresh it
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        // If refresh token is missing, throw an error
        throw new Error('Refresh token is missing');
      }

      // Access token is expired or missing, make a refresh token request
      const { newAccessToken, newRefreshToken, newAccessTokenExp, newRefreshTokenExp } = await refreshAccessToken(req, res);

      // Set new tokens in cookies
      setTokensCookies(res, newAccessToken, newRefreshToken, newAccessTokenExp, newRefreshTokenExp);

      // Add the new access token to the Authorization header
      req.headers['authorization'] = `Bearer ${newAccessToken}`;
    }

    // Proceed with the next middleware
    next();
  } catch (error) {
    console.error('Error adding access token to header:', error.message);

    // Handle the error, such as returning an error response or redirecting to the login page
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Access token is missing or invalid',
    });
  }
};

export default accessTokenAutoRefresh;



// const accessTokenAutoRefresh = async (req, res, next) => {
//   try {
//     const accessToken = req.cookies.accessToken;

//     if (accessToken && !isTokenExpired(accessToken)) {
//       // Add the access token to the Authorization header
//       req.headers["authorization"] = `Bearer ${accessToken}`;
//       return next();
//     }

//     const refreshToken = req.cookies.refreshToken;
//     if (!refreshToken) {
//       // Refresh token is missing
//       throw new Error("Refresh token is missing");
//     }

//     // Refresh the access token
//     const {
//       newAccessToken,
//       newRefreshToken,
//       newAccessTokenExp,
//       newRefreshTokenExp,
//     } = await refreshAccessToken(req, res);

//     // Set new cookies
//     setTokensCookies(
//       res,
//       newAccessToken,
//       newRefreshToken,
//       newAccessTokenExp,
//       newRefreshTokenExp
//     );

//     // Add the new access token to the Authorization header
//     req.headers["authorization"] = `Bearer ${newAccessToken}`;

//     next(); // Proceed to the next middleware
//   } catch (error) {
//     console.error("Error in access token refresh middleware:", error.message);
//     // Send an error response
//     return res
//       .status(401)
//       .json({ error: "Unauthorized", message: error.message });
//   }
// };

// export default accessTokenAutoRefresh;
