import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./src/config/connectdb.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import userRoutes from "./src/routes/auth.routes.js";
import bookRoutes from "./src/routes/book.routes.js";
import "./src/config/passport-jwt-strategy.js";
import setTokensCookies from "./src/utils/setTokensCookies.js";
import "./src/config/googleStrategy.js";

const app = express();

const corsOptions = {
  // set origin to a specific origin.
  origin: process.env.FRONTEND_HOST,
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

connectDB();

app.use(passport.initialize());

app.use(cookieParser());

app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/book", bookRoutes);

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
    failureRedirect: `${process.env.FRONTEND_HOST}/account/login`,
  }),
  (req, res) => {
    // Access user object and tokens from req.user
    const { user, accessToken, refreshToken, accessTokenExp, refreshTokenExp } =
      req.user;
    setTokensCookies(
      res,
      accessToken,
      refreshToken,
      accessTokenExp,
      refreshTokenExp
    );

    // Successful authentication, redirect home.
    res.redirect(`${process.env.FRONTEND_HOST}/`);
  }
);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("App is listening on port :", PORT);
});
