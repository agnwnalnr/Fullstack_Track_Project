const express = require('express');
const router = express.Router();
const productRouter = require('./productRouter');
const commentRouter = require('./commentRouter');

router.use('/products', productRouter);
router.use('/comments', commentRouter);

module.exports = router;
