const MenuRepository = require("../repository/menu")
const OrderRepository = require("../repository/order")
const HistoryRepository = require("../repository/history")

const menuRepository = new MenuRepository()
const orderRepository = new OrderRepository()
const historyRepository = new HistoryRepository()
class OrderController {
    async create(req, res) {
        const orderId = req.params.orderId;
        const userId = req.params.userId;

        try {
            // Find the menu item by ID
            const searchMenu = await menuRepository.findById(orderId);
            if (!searchMenu) {
                return res.status(404).json({ message: "Menu item not found" });
            }

            // Find the user's existing order
            const userOrder = await orderRepository.findOne({ user: userId });

            let newOrderItemId;

            if (!userOrder) {
                // Create a new order
                const newOrder = await orderRepository.create({
                    user: userId,
                    order: [{
                        itemName: searchMenu.name,
                        status: "Pending",
                        totalAmount: searchMenu.price,
                        orderDate: new Date(),
                        paymentStatus: "Pending",
                    }],
                });

                // Use the first order item's ID from the new order
                newOrderItemId = newOrder.order[0]._id;
            } else {
                // Create a new order item
                const newOrderItem = {
                    itemName: searchMenu.name,
                    status: "Pending",
                    totalAmount: searchMenu.price,
                    orderDate: new Date(),
                    paymentStatus: "Pending",
                };

                // Update the existing order
                const updatedOrder = await orderRepository.findOneAndUpdate(
                    { user: userId },
                    { $push: { order: newOrderItem } }, 
                    { new: true }
                );

                if (!updatedOrder) {
                    return res.status(404).json({ message: "Order not updated" });
                }

                // Retrieve the latest order item from the array
                newOrderItemId = updatedOrder.order[updatedOrder.order.length - 1]._id;
            }

            // Check if a history record exists for the user
            const existingHistory = await historyRepository.findOne({ userId });

            if (existingHistory) {
                // Append the new order to the history
                await historyRepository.findOneAndUpdate(
                    { userId },
                    {
                        $push: {
                            order: {
                                orderId: newOrderItemId,
                                status: "Pending",
                                amount: searchMenu.price,
                                paymentStatus: "Pending",
                            },
                        },
                    },
                    { new: true }
                );
            } else {
                // Create a new history record
                await historyRepository.create({
                    userId: userId,
                    order: [{
                        orderId: newOrderItemId,
                        status: "Pending",
                        amount: searchMenu.price,
                        paymentStatus: "Pending",
                    }],
                });
            }

            return res.status(200).json({ message: "Order and history created/updated successfully." });
        } catch (err) {
            console.error("Error creating order:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    async getOrder(req,res){
        const userId = req.params.userId
        try{
            const response = await orderRepository.findOne({user:userId})
            res.status(200).json(response)
        }catch(err){
            res.status(500).json(err)
        }
    }

    async deleteOrder(req,res){
        try {
            const userId = req.params.userId; 
            const _id = req.params._id;     
        
            if (userId && _id) {
                const updatedUser = await orderRepository.findOneAndUpdate(
                    { user: userId },                
                    { $pull: { order: { _id: _id } } }, 
                    { new: true }                       
                );
        
                if (updatedUser) {
                    res.status(200).json({
                        message: 'Order successfully removed.',
                        data: updatedUser
                    });
                } else {
                    res.status(404).json({
                        message: 'User or order not found.'
                    });
                }
            } else {
                res.status(400).json({
                    message: 'Invalid userId or _id provided.'
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'An error occurred while removing the order.',
                error: error.message
            });
        }
    }
}

module.exports = OrderController