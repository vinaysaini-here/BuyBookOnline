import express from "express";
import {
  addBooktoFavorite,
  removeBookfromFavorite,
  getFavoriteBooks,
} from "../controllers/favourites.controller.js";
import passport from "passport";

import accessTokenAutoRefresh from "../middlewares/accessTokenAutoRefresh.js";

// Protected Routes

const router = express.Router();

router.patch(
  "/addBookToFavorite",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  addBooktoFavorite
);

router.put(
  "/removeBookToFavorite",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  removeBookfromFavorite
);

router.get(
  "/getFavoriteBooks",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  getFavoriteBooks
);
export default router;
