const express = require('express')
const router = express.Router()

const UserController = require('../controller/user')

router.post('/create', new UserController().create)
router.post('/login', new UserController().login)
router.get('/:_id', new UserController().getUser)
router.get('/history/:userId', new UserController().getUserHistory)

module.exports = router