
const SslCommerz = require('../controller/SSLCommerze');

const sslcommerzService = new SslCommerz();
 class PaymentController{
    async SSLsuccess(req, res) {
        try {
            const paymentData = req.body;
            const {
                tran_id, val_id, amount, card_type, store_amount, bank_tran_id, status, 
                tran_date, currency, card_issuer, card_brand, card_issuer_country, store_id, 
                risk_level, risk_title
            } = paymentData;
    
            const paymentDetails = await sslcommerzService.createSuccessPayment(
                tran_id, val_id, amount, card_type, store_amount, bank_tran_id, status, 
                tran_date, currency, card_issuer, card_brand, card_issuer_country, store_id, 
                risk_level, risk_title,
            )

            res.redirect('http://localhost:3000/history');
        } catch (error) {
            console.error('Error saving payment data:', error);
            res.status(500).json({ message: 'Error saving payment data', error });
        }
    }
    async SSLfail(req, res){
      res.status(500).json({ message: 'failed to  processing payment'})
    }
    async SSLcancel(req, res){
      res.status(500).json({ message: 'Payment has been canceled'})
    }

    async initiatePayment(req, res) {
        try {
          const paymentData = req.body;
          const response = await sslcommerzService.createPayment(paymentData);

          return res.status(200).send({tran_id:req.body.tran_id ,url:response.GatewayPageURL,sessionKey:response.sessionkey});
        } catch (error) { 
          res.status(500).json({ message: 'Error initiating payment', error });
        }
      }
    
      async validatePayment(req, res) {
        try {
          const { val_id } = req.query;
          const response = await sslcommerzService.validatePayment(val_id);
          res.json(response);
        } catch (error) {
          res.status(500).json({ message: 'Error validating payment', error });
        }
      }
    
      async initiateRefund(req, res) {
        try {
          const refundData = req.body;
          const response = await sslcommerzService.initiateRefund(refundData);
          res.json(response);
        } catch (error) {
          res.status(500).json({ message: 'Error initiating refund', error });
        }
      }
    
      async refundQuery(req, res) {
        try {
          const { refund_ref_id } = req.query;
          const response = await sslcommerzService.refundQuery(refund_ref_id);
          res.json(response);
        } catch (error) {
          res.status(500).json({ message: 'Error querying refund', error });
        }
      }
    
      async transactionQueryByTransactionId(req, res) {
        try {
          const { tran_id } = req.query;
          const response = await sslcommerzService.transactionQueryByTransactionId(tran_id);
          res.json(response);
        } catch (error) {
          res.status(500).json({ message: 'Error querying transaction by ID', error });
        }
      }
    
      async transactionQueryBySessionId(req, res) {
        try {
          const { sessionkey } = req.query;
          const response = await sslcommerzService.transactionQueryBySessionId(sessionkey);
          res.json(response);
        } catch (error) {
          res.status(500).json({ message: 'Error querying transaction by session ID', error });
        }
      }
}

module.exports = PaymentController
