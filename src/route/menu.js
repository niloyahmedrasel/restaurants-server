const express = require('express')
const router = express.Router()

const MenuController = require('../controller/menu')
const upload = require('../middleware/uploadMediaFile')

router.post('/create',upload.single('image'), new MenuController().createMenu)
router.get('/allItem', new MenuController().allMenu)
router.get('/:_id', new MenuController().singleMenuItem)


module.exports = router