import cloudinary from "../config/cloudinary.js";
import Book from "../models/BooksModel.js";
import User from "../models/userModel.js";

export const BookInfo = async (req, res) => {
  const { id } = req.headers;
  const user = await User.findById(id);

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (user.role !== "author") {
    return res.status(400).json({ message: "Invalid Role" });
  }

  try {
    const {
      title,
      author,
      description,
      price,
      category,
      language,
      publicationDate,
      pages,
      coverImage,
      stock,
    } = req.body;

    let imageUrl;
    if (!coverImage) {
      res.status(401).json({ message: "Missing cover image" });
    }
    const uploadResponse = await cloudinary.uploader.upload(coverImage);
    imageUrl = uploadResponse.secure_url;

    const newBook = new Book({
      title,
      author,
      description,
      price,
      category,
      language,
      publicationDate,
      pages,
      coverImage: imageUrl,
      // coverImage, // delete it after imageUrl start working
      stock,
    });

    await newBook.save();

    res.status(200).json(newBook);
  } catch (error) {
    console.log("error in Book saving controller ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// export const UpdateBook = async (req, res) => {
//   try {
//     const { bookid } = req.headers;
//     const {
//       title,
//       author,
//       description,
//       price,
//       category,
//       language,
//       publicationDate,
//       pages,
//       coverImage,
//       stock,
//     } = req.body;

//     let imageUrl;
//     if (!coverImage) {
//       res.status(401).json({ message: "Missing cover image" });
//     }
//     const uploadResponse = await cloudinary.uploader.upload(coverImage);
//     imageUrl = uploadResponse.secure_url;

//     await Book.findByIdAndUpdate(bookid, {
//       title,
//       author,
//       description,
//       price,
//       category,
//       language,
//       publicationDate,
//       pages,
//       coverImage: imageUrl,
//       // coverImage, // delete it after imageUrl start working
//       stock,
//     });

//     return res.status(200).json({ message: "Book updated successfully" });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

export const DeleteBook = async (req, res) => {
  try {
    const bookid = req.headers.bookid;
    const book = await Book.findById(bookid);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await Book.findByIdAndDelete(book);
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const GetAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });

    return res.status(200).json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const GetRecentBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(4);

    res.status(200).json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const GetBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id).populate("author", "name");

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
