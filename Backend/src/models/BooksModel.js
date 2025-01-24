import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: true,
      enum: [
        "Fiction",
        "Non-Fiction",
        "Science",
        "Biography",
        "Children",
        "Fantasy",
        "Romance",
        "Mystery",
        "History",
        "Others",
      ],
    },
    language: { type: String, required: true },
    publicationDate: { type: Date, default: Date.now },
    pages: { type: Number, required: true, min: 1 },
    coverImage: { type: String },
    stock: { type: Number, default: 0, min: 0 },
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
