import Book from "../models/BooksModel.js";
import Order from "../models/order.js";
import User from "../models/userModel.js";

export const PlaceOrder = async (req, res) => {
    try {
        const { id } = req.headers;  // User ID
        const { order } = req.body;  // Order items array

        // Validate input
        if (!id || !order || !Array.isArray(order)) {
            return res.status(400).json({ error: "Invalid order data" });
        }

        let orderIds = [];

        // Process each order item
        for (const orderData of order) {
            const newOrder = new Order({
                user: id,
                book: orderData._id,  // Assuming each orderData contains a book _id
            });

            const savedOrder = await newOrder.save();
            orderIds.push(savedOrder._id); // Store order IDs

            // Add order to user history
            await User.findByIdAndUpdate(id, { $push: { orders: savedOrder._id } });
        }

        // ✅ **Clear the entire cart at once after placing orders**
        await User.findByIdAndUpdate(id, { $set: { cart: [] } });

        return res.status(200).json({
            message: "Order placed successfully, cart cleared!",
            orderIds: orderIds
        });

    } catch (error) {
        console.error("Error in placeOrder controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



// export const getOrderhistory  = async (req,res) =>{
//     try {
//         const {id} = req.headers;
//         const userOrder = await User.find({user : id}).populate({
//             path: 'orders',
//             populate: {
//                 path: 'Book',                
//             }
//         });

//         const orderData = userOrder.orders.reverse();
//         res.status(200).json({data : orderData});
//     } catch (error) {
//         console.log("error in getOrderHistory controller ", error.message);
//         res.status(500).json({ error: "Internal Server Error" });        
//     }
// }



// Assuming you're fetching the order history from the database or a service



// export const getOrderhistory = async (req, res) => {
//     const userId = req.headers.id; // User ID sent from the request headers
  
//     try {
//       // Fetch the orders from the database (or wherever you're fetching it from)
//       const orders = await Order.find({ userId });
  
//       // Check if orders are available and are an array
//       if (Array.isArray(orders)) {
        
//         return res.json({ data: orders.reverse() }); // Reverse only if it's a valid array
        
        
//       } else {
//         return res.status(404).json({ message: "No orders found" });
//       }
//     } catch (error) {
//       console.error("Error fetching order history:", error);
//       return res.status(500).json({ message: "Server error" });
//     }
//   };
  



export const getOrderhistory = async (req, res) => {
    const userId = req.headers.id; // User ID sent from the request headers
  
    try {
      // Fetch the orders from the database for the specific user
      const orders = await Order.find({ user: userId }).populate("book"); // Populate book details
  
      // Check if orders are available and are an array
      if (Array.isArray(orders) && orders.length > 0) {
        return res.json({ data: orders.reverse() }); // Reverse orders for latest first
      } else {
        return res.status(404).json({ message: "No orders found" });
      }
    } catch (error) {
      console.error("Error fetching order history:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  




export const getAllOders = async (req, res) =>{
    try {
        const userData = await Order.find(
            ).populate(
                {
                    path: 'Book',
                   
                })
                .populate({
                    path: 'User',
                    
                }
            ).sort({createdAt: -1});
        res.status(200).json({data : userData});
    } catch (error) {
        
        console.log("error in getAllOders controller ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


export const updateOrderStatus = async (req, res) =>{
    try {
        const {id} = req.params;
        await Order.findByIdAndUpdate(id, {status: req.body.status});
        res.status(200).json({message: "Order status updated successfully"});
    }
    catch (error) {
        console.log("error in updateOrderStatus controller ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

