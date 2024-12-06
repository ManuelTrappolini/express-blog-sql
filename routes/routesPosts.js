const express = require('express');
const router = express.Router();
const postControllers = require('../Controllers/post.js')

router.get('/', postControllers.index)
router.post('/', postControllers.store)
router.get('/:id', postControllers.show)
router.put('/:id', postControllers.update)
router.delete('/:id', postControllers.destroy)

module.exports = router