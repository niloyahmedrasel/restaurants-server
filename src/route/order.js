const express = require('express');
const router = express.Router();

const OrderController = require('../controller/order');

router.post('/create/:orderId/:userId', new OrderController().create);
router.get('/:userId', new OrderController().getOrder);

module.exports = router;