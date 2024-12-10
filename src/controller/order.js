const MenuRepository = require("../repository/menu")
const OrderRepository = require("../repository/order")

const menuRepository = new MenuRepository()
const orderRepository = new OrderRepository()
class OrderController {
    async create(req, res) {
        const orderId = req.params.orderId;
        const userId = req.params.userId;
    
        try {
            
            const searchMenu = await menuRepository.findById(orderId);
            if (!searchMenu) {
                return res.status(404).json({ message: "Menu item not found" });
            }
    
            
            const userOrder = await orderRepository.findOne({ user: userId });
    
            if (!userOrder) {
                
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
                return res.status(200).json(newOrder);
            }
    
           
            const newOrderItem = {
                itemName: searchMenu.name,
                status: "Pending",
                totalAmount: searchMenu.price,
                orderDate: new Date(),
                paymentStatus: "Pending",
            };
    
            
            const updatedOrder = await orderRepository.findOneAndUpdate(
                { user: userId },
                { $push: { order: newOrderItem } }, 
                { new: true }
            );
    
            if (!updatedOrder) {
                return res.status(404).json({ message: "Order not updated" });
            }
    
            return res.status(200).json(updatedOrder);
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
}

module.exports = OrderController