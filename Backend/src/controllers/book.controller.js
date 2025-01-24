import cloudinary from "../config/cloudinary.js";
import Book from "../models/BooksModel.js";
import User from "../models/UserModel.js";

export const BookInfo = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
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

    // let imageUrl;
    // if (image) {
    //   const uploadResponse = await cloudinary.uploader.upload(image);
    //   imageUrl = uploadResponse.secure_url;
    // }

    const newBook = new Book({
      title,
      author,
      description,
      price,
      category,
      language,
      publicationDate,
      pages,
      // coverImage: imageUrl,
      coverImage, // delete it after imageUrl start working
      stock,
    });

    await newBook.save();

    res.status(200).json(newBook);
  } catch (error) {
    console.log("error in sendmessage controller ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



export const UpdateBook = async (req, res) => {
  try {
    const { bookid } = req.params;
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

    // let imageUrl;
    // if (image) {
    //   const uploadResponse = await cloudinary.uploader.upload(image);
    //   imageUrl = uploadResponse.secure_url;
    // }

    await Book.findByIdAndUpdate(bookid, {
      title,
      author,
      description,
      price,
      category,
      language,
      publicationDate,
      pages,
      // coverImage: imageUrl,
      coverImage, // delete it after imageUrl start working
      stock,
    });

    return res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
