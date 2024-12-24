
const SSLCommerzPayment = require('sslcommerz-lts') 
const PaymentSuccess = require("./paymentSuccess")
const store_id = 'prost655b57310229d';
const store_passwd = 'prost655b57310229d@ssl';
const is_live = false; 
class SslCommerz extends PaymentSuccess{
    async createSuccessPayment (
        tran_id,
        val_id,
        amount,
        card_type,
        store_amount,
        bank_tran_id,
        status,
        tran_date,  
        currency,
        card_issuer,
        card_brand,
        card_issuer_country,
        store_id,
        risk_level,
        risk_title
      ) {
  
        const paymentData = {
          val_id,
          amount,
          card_type,
          store_amount,
          bank_tran_id,
          status,
          tran_date,
          currency,
          card_issuer,
          card_brand,
          card_issuer_country,
          store_id,
          risk_level,
          risk_title
        };
        return super.success(
          {tran_id,paymentData}
        );
      }
  
      async createPayment(paymentData) {
          const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
          try {
            const response = await sslcz.init(paymentData);
            return response;
          } catch (error) {
            console.error('Error creating payment:', error);
            throw error;
          }
        }
      
        async validatePayment(val_id) {
          const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
          try {
            const response = await sslcz.validate({ val_id });
            return response;
          } catch (error) {
            console.error('Error validating payment:', error);
            throw error;
          }
        }
      
        async initiateRefund(refundData) {
          const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
          try {
            const response = await sslcz.initiateRefund(refundData);
            return response;
          } catch (error) {
            console.error('Error initiating refund:', error);
            throw error;
          }
        }
      
        async refundQuery(refund_ref_id) {
          const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
          try {
            const response = await sslcz.refundQuery({ refund_ref_id });
            return response;
          } catch (error) {
            console.error('Error querying refund:', error);
            throw error;
          }
        }
      
        async transactionQueryByTransactionId(tran_id) {
          const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
          try {
            const response = await sslcz.transactionQueryByTransactionId({ tran_id });
            return response;
          } catch (error) {
            console.error('Error querying transaction by ID:', error);
            throw error;
          }
        }
      
        async transactionQueryBySessionId(sessionkey) {
          const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
          try {
            const response = await sslcz.transactionQueryBySessionId({ sessionkey });
            return response;
          } catch (error) {
            console.error('Error querying transaction by session ID:', error);
            throw error;
          }
        }
  
}

module.exports = SslCommerz 