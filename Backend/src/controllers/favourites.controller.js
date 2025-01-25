import User from "../models/userModel.js"



export const addBooktoFavorite = async (req, res) => {
    try {
        const { bookid , id } = req.headers;
        const user = await User.findById(id);
        // it check if book is already in favorites or not
        const isBookfavorite = user.favourites.includes(bookid);
        
        if (isBookfavorite) {
            return res.status(400).json({ message: "Book already in your favorite list" });
        }
        
        await User.findByIdAndUpdate(id,{ $push: { favourites:  bookid} });
        res.status(201).json({ message: "Book added to your favorite list" });
        
        
    } catch (error) {
        
        res.status(500).json({message: "internal Server error" });
    }
};

export const removeBookfromFavorite = async (req, res) => {
    try {
        const { bookid , id } = req.headers;
        const user = await User.findById(id);
        // it check if book is already in favorites or not
        const isBookfavorite = user.favourites.includes(bookid);
        
        if (!isBookfavorite) {
            return res.status(400).json({ message: "Book not found in your favorite list" });
        }
        
        await User.findByIdAndUpdate(id,{ $pull: { favourites:  bookid} });
        res.json({ message: "Book removed from your favorite list" });
        
        
    } catch (error) {
        
        res.status(500).json({message: "internal Server error" });
    }
};


export const getFavoriteBooks = async (req, res) => {
    try {
        const { id } = req.headers;
        
        // populate give the whole book data instead of just bookid

        const user = await User.findById(id).populate("favourites");
        const favouriteBooks = user.favourites;
        
        if (!favouriteBooks) {
            return res.status(404).json({ message: "No favorite books found" });
        }
       return res.status(201).json({data : favouriteBooks});
        
        
    } catch (error) {
        
        res.status(500).json({message: "internal Server error" });
    }
};

