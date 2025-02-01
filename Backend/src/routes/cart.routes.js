import express from "express";
import passport from "passport";

import accessTokenAutoRefresh from "../middlewares/accessTokenAutoRefresh.js";
import {
  AddToCart,
  removeBookfromCart,
  viewCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.patch(
  "/addBookToCart",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  AddToCart
);

router.patch(
  "/removeBookFromCart/:bookid",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  removeBookfromCart
);

router.get(
  "/viewCart",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  viewCart
);

export default router;
