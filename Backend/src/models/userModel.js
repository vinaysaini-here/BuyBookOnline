import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "" },
    role: { type: String, enum: ["author", "user"], default: "user" },
    is_verified: { type: Boolean, default: false },
    favourates: [{ type: mongoose.Types.ObjectId, ref: "Book" }],
    cart: [{ type: mongoose.Types.ObjectId, ref: "Book" }],
    orders: [{ type: mongoose.Types.ObjectId, ref: "order" }],

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// const User = mongoose.model("User", userSchema);
const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
