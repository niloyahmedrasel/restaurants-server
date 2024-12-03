const express = require('express');
const router = express.Router()

const TableController = require('../controller/table');

router.post('/create', new TableController().create);

module.exports = router;