import User from "../models/userModel.js";

export const AddToCart = async (req, res, next) => {
  try {
    const { bookid, id } = req.headers;
    const user = await User.findById(id);
    const isBookInCart = user.cart.includes(bookid);

    if (isBookInCart) {
      return res.status(400).json({ message: "Book already in cart" });
    }

    await User.findByIdAndUpdate(id, { $push: { cart: bookid } });
    res.status(201).json({ message: "Book added to your Cart list" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const removeBookfromCart = async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const user = await User.findById(id);
    // it check if book is already in favorites or not
    const isBookInCart = user.cart.includes(bookid);

    if (!isBookInCart) {
      return res
        .status(400)
        .json({ message: "Book not found in your Cart list" });
    }

    await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });
    res.status(201).json({ message: "Book removed from your Cart list" });
  } catch (error) {
    res.status(500).json({ message: "internal Server error" });
  }
};

export const viewCart = async (req, res) => {
    try {
        const { id } = req.headers;
        

        const user = await User.findById(id).populate("cart");
        // reverse  will return recent book on top 
        const CartBooks = user.cart.reverse();
        
        if (!CartBooks) {
            return res.status(404).json({ message: "No books found In Cart" });
        }
       return res.status(201).json({data : CartBooks});
        
        
    } catch (error) {
        
        res.status(500).json({message: "internal Server error" });
    }

}
