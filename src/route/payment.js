const express = require('express');
const  PaymentController = require('../controller/payment') 

const paymentController = new PaymentController()

const router = express.Router()

router.post('/success', new PaymentController().SSLsuccess)
router.post('/fail', new PaymentController().SSLfail)
router.post('/cancel', new PaymentController().SSLcancel)
router.post('/initiate', paymentController.initiatePayment.bind(paymentController));
router.get('/validate', paymentController.validatePayment.bind(paymentController));
router.post('/initiate-refund', paymentController.initiateRefund.bind(paymentController));
router.get('/refund-query', paymentController.refundQuery.bind(paymentController));
router.get('/transaction-query-by-transaction-id', paymentController.transactionQueryByTransactionId.bind(paymentController));
router.get('/transaction-query-by-session-id', paymentController.transactionQueryBySessionId.bind(paymentController));

module.exports = router;
