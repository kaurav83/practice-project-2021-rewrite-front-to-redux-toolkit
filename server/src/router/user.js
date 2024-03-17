const { Router } = require('express');
const userRouter = Router();
const validators = require('../middlewares/validators');
const userController = require('../controllers/userController');
const hashPass = require('../middlewares/hashPassMiddle');
const checkToken = require('../middlewares/checkToken');
const upload = require('../utils/fileUpload');
const basicMiddlewares = require('../middlewares/basicMiddlewares');

userRouter.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  userController.registration,
);

userRouter.post(
  '/login',
  validators.validateLogin,
  userController.login,
);

userRouter.post(
  '/pay',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validatePaymentCredentials,
  validators.validateContestCreation,
  userController.payment,
);

userRouter.post(
  '/changeMark',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  userController.changeMark,
);

userRouter.post(
  '/updateUser',
  checkToken.checkToken,
  upload.uploadAvatar,
  userController.updateUser,
);

userRouter.post(
  '/cashout',
  checkToken.checkToken,
  basicMiddlewares.onlyForCreative,
  userController.cashout,
);

module.exports = userRouter;