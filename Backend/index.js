// import express from "express";
// import dotenv from "dotenv";

// dotenv.config();
// import { connectDB } from "./src/config/connectdb.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import passport from "passport";
// import userRoutes from "./src/routes/auth.routes.js";
// import bookRoutes from "./src/routes/book.routes.js";
// import favoritesRoutes from "./src/routes/favorites.routes.js";
// import cartRoutes from "./src/routes/cart.routes.js";
// import orderRoutes from "./src/routes/order.routes.js";

// import "./src/config/passport-jwt-strategy.js";
// import setTokensCookies from "./src/utils/setTokensCookies.js";
// import "./src/config/googleStrategy.js";
// import path from "path";

// const app = express();

// const __dirname = path.resolve();

// const corsOptions = {
//   // set origin to a specific origin.
//   origin:[ process.env.FRONTEND_HOST, "https://buybookonline.onrender.com"],
//   credentials: true,
//   optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));

// connectDB();

// app.use(passport.initialize());

// app.use(cookieParser());

// app.use(express.json());
// app.use("/api/user", userRoutes);
// app.use("/api/book", bookRoutes);
// app.use("/api/favorites", favoritesRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/order", orderRoutes);

// if(process.env.NODE_ENV === 'production'){
//   app.use(express.static(path.join(__dirname , "../Frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../Frontend" , "dist" , "index.html"));
//   });
// }

// app.get(
//   "/auth/google",
//   passport.authenticate("google", {
//     session: false,
//     scope: ["profile", "email"],
//   })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     session: false,
//     failureRedirect: `https://buybookonline.onrender.com/login`,
//   }),
//   (req, res) => {
//     // Access user object and tokens from req.user
//     const { user, accessToken, refreshToken, accessTokenExp, refreshTokenExp } =
//       req.user;
//     setTokensCookies(
//       res,
//       accessToken,
//       refreshToken,
//       accessTokenExp,
//       refreshTokenExp
//     );

//     // Successful authentication, redirect home.
//     res.redirect(`https://buybookonline.onrender.com/`);
//   }
// );

// const PORT = process.env.PORT;
// app.listen(PORT, () => {
//   console.log("App is listening on port :", PORT);
// });


import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import { connectDB } from "./src/config/connectdb.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import userRoutes from "./src/routes/auth.routes.js";
import bookRoutes from "./src/routes/book.routes.js";
import favoritesRoutes from "./src/routes/favorites.routes.js";
import cartRoutes from "./src/routes/cart.routes.js";
import orderRoutes from "./src/routes/order.routes.js";

import "./src/config/passport-jwt-strategy.js";
import setTokensCookies from "./src/utils/setTokensCookies.js";
import "./src/config/googleStrategy.js";

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Fix CORS Configuration
const corsOptions = {
  origin: [
    process.env.FRONTEND_HOST || "http://localhost:5173", 
    "https://buybookonline.onrender.com"
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Connect to Database
connectDB();

// Middleware
app.use(passport.initialize());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/favorites", favoritesRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

// ✅ Google Authentication Routes
app.get(
  "/auth/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "https://buybookonline.onrender.com/login",
  }),
  (req, res) => {
    console.log("✅ Google OAuth Callback Triggered");

    if (!req.user) {
      console.error("❌ Google Authentication Failed");
      return res.redirect("https://buybookonline.onrender.com/login");
    }

    console.log("✅ User Authenticated:", req.user);

    // Set cookies for authentication
    const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } = req.user;
    setTokensCookies(res, accessToken, refreshToken, accessTokenExp, refreshTokenExp);

    res.redirect("https://buybookonline.onrender.com/");
  }
);

// ✅ Serve Frontend in Production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
  });
}

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port: ${PORT}`);
});

