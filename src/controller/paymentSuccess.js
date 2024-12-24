const HistoryRepository = require("../repository/history")

const historyRepository = new HistoryRepository()
class PaymentSuccess{
    async success(data) {
        try {
            console.log("Transaction ID:", data.tran_id);
    
            // Find the history document containing the order with the matching tran_id
            const history = await historyRepository.findOneAndUpdate(
                { "order.orderId": data.tran_id }, // Search for the specific orderId in the array
                { 
                    $set: { 
                        "order.$.paymentStatus": "Paid", // Update paymentStatus for the matched order
                        "order.$.status": "Completed"   // Update status for the matched order
                    }
                },
                { new: true }
            );
    
            if (!history) {
                console.error("History not found for transaction ID:", data.tran_id);
                return { success: false, message: "History record not found." };
            }
    
            console.log("History updated successfully:", history);
            return { success: true, message: "Payment and order status updated successfully." };
        } catch (err) {
            console.error("Error updating history:", err);
            return { success: false, message: "Internal server error." };
        }
    }
}
module.exports = PaymentSuccess