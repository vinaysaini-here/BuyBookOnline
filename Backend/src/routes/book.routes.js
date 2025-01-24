import express from "express";
import { BookInfo, UpdateBook } from "../controllers/book.controller.js";

const router = express.Router();

router.post("/saveBook", BookInfo);
router.patch("/updateBook", UpdateBook);

export default router;
