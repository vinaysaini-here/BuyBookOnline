import express from "express";
import passport from "passport";


import accessTokenAutoRefresh from "../middlewares/accessTokenAutoRefresh.js";
import {
  getAllOders,
  getOrderhistory,
  PlaceOrder,
  updateOrderStatus,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post(
  "/placeOrder",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  PlaceOrder
);

router.get(
  "/getOrderHistory",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  getOrderhistory
);

router.get(
  "/getallOrder",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  getAllOders
);

router.put(
  "/updateOrderStatus/:id",  // :id added here
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  updateOrderStatus
);


export default router;
