import Book from "../models/BooksModel.js";
import order from "../models/order.js";
import User from "../models/userModel.js";


export const PlaceOrder = async (req,res) => {
    try {
        const {id} = req.headers;
        const {order} =req.body;

        for(const orderData in order) {
            const newOrder = new order({user : id, book : orderData._id});
            const orderDataFromDb = newOrder.save()

            await User.findByIdAndUpdate(id , {$push : {orders : orderDataFromDb._id}})
            // clear the cART
            await User.findByIdAndUpdate(id, {$pull : {cart: orderData._id}});

            return res.status(200).json({message: "Order updated successfully"});
        }
    } catch (error) {
        console.log("error in placeOrder controller ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const getOrderhistory  = async (req,res) =>{
    try {
        const {id} = req.headers;
        const userOrder = await User.find({user : id}).populate({
            path: 'orders',
            populate: {
                path: 'book',                
            }
        });

        const orderData = userOrder.orders.reverse();
        res.status(200).json({data : orderData});
    } catch (error) {
        console.log("error in getOrderHistory controller ", error.message);
        res.status(500).json({ error: "Internal Server Error" });        
    }
}


export const getAllOders = async (req, res) =>{
    try {
        const userData = await order.find(
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
        await order.findByIdAndUpdate(id, {status: req.body.status});
        res.status(200).json({message: "Order status updated successfully"});
    }
    catch (error) {
        console.log("error in updateOrderStatus controller ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

