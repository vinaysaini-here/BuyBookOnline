// const setTokensCookies = (res, accessToken, refreshToken, newAccessTokenExp, newRefreshTokenExp) => {
//   const accessTokenMaxAge = (newAccessTokenExp - Math.floor(Date.now() / 1000)) * 1000;
//   const refreshTokenmaxAge = (newRefreshTokenExp - Math.floor(Date.now() / 1000)) * 1000;

//   // Set Cookie for Access Token
//   res.cookie('accessToken', accessToken, {
//     httpOnly: true,
//     secure: true, // Set to true if using HTTPS
//     maxAge: accessTokenMaxAge,
//     // sameSite: 'strict', // Adjust according to your requirements
//   });

//   // Set Cookie for Refresh Token
//   res.cookie('refreshToken', refreshToken, {
//     httpOnly: true,
//     secure: true, // Set to true if using HTTPS
//     maxAge: refreshTokenmaxAge,
//     // sameSite: 'strict', // Adjust according to your requirements
//   });
//   // Set Cookie for is_auth
//   res.cookie('is_auth', true, {
//     httpOnly: false,
//     secure: false, // Set to true if using HTTPS
//     maxAge: refreshTokenmaxAge,
//     // sameSite: 'strict', // Adjust according to your requirements
//   });
// }

// export default setTokensCookies


const setTokensCookies = (res, accessToken, refreshToken, newAccessTokenExp, newRefreshTokenExp) => {
  // Ensure newAccessTokenExp and newRefreshTokenExp are always 30 days from now
  newAccessTokenExp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60; // Set to exactly 30 days in the future
  newRefreshTokenExp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60; // Set to exactly 30 days in the future

  const accessTokenMaxAge = (newAccessTokenExp - Math.floor(Date.now() / 1000)) * 1000;
  const refreshTokenmaxAge = (newRefreshTokenExp - Math.floor(Date.now() / 1000)) * 1000;

  // Set Cookie for Access Token
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true, // Set to true if using HTTPS
    maxAge: accessTokenMaxAge, // Fixed to 30 days
  });

  // Set Cookie for Refresh Token
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true, // Set to true if using HTTPS
    maxAge: refreshTokenmaxAge, // Fixed to 30 days
  });

  // Set Cookie for is_auth
  res.cookie("is_auth", true, {
    httpOnly: false,
    secure: false, // Set to true if using HTTPS
    maxAge: refreshTokenmaxAge, // Fixed to 30 days
  });
};

export default setTokensCookies;
