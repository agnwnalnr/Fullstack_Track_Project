const express = require('express');
const router = express.Router();
const productRouter = require('./productRouter');
const commentRouter = require('./commentRouter');
const videoRouter = require('./videoRouter');

router.use('/products', productRouter);
router.use('/comments', commentRouter);
router.use('/videos', videoRouter);

module.exports = router;
