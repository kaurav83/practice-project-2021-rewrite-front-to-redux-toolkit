const express = require('express');
const router = express();
const userRouter = require('./user');
const contestRouter = require('./contest');
const chatRouter = require('./chat');
const checkToken = require('../middlewares/checkToken');

router.use('/', userRouter);

router.use('/', contestRouter);

router.use('/', chatRouter);

router.post(
  '/getUser',
  checkToken.checkAuth,
);

module.exports = router;