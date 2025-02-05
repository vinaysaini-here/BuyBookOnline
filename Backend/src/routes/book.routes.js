import express from "express";
import {
  BookInfo,
  DeleteBook,
  // UpdateBook,
  GetAllBooks,
  GetRecentBooks,
  GetBookById,
} from "../controllers/book.controller.js";

import passport from "passport";

import accessTokenAutoRefresh from "../middlewares/accessTokenAutoRefresh.js";

const router = express.Router();

// Private author Routes

router.post(
  "/saveBook",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  BookInfo
);

// router.patch(
//   "/updateBook",
//   accessTokenAutoRefresh,
//   passport.authenticate("jwt", { session: false }),
//   UpdateBook
// );

router.delete(
  "/deleteBook",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  DeleteBook
);

// Public Routes

router.get("/getAllBooks", GetAllBooks);
router.get("/recentBooks", GetRecentBooks);
router.get("/getBookById/:id", GetBookById);

export default router;
