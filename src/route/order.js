const express = require('express');
const router = express.Router();

const OrderController = require('../controller/order');

router.post('/create/:orderId/:userId', new OrderController().create);
router.get('/:userId', new OrderController().getOrder);
router.delete('/:userId/:_id', new OrderController().deleteOrder);

module.exports = router;