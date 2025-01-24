import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    book: {
      type: mongoose.Types.ObjectId,
      ref: "Book",
    },
    status: {
      type: String,
      default: "Order Placed",
      enum: ["Order Placed", "Out For Delivery", "Delivered", "Canceled"],
    },
  },
  {
    timestamps: true,
  }
);

const order = mongoose.model("Order", orderSchema);
export default order;
