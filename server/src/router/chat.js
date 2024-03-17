const { Router } = require('express');
const chatRouter = Router();
const chatController = require('../controllers/chatController');
const checkToken = require('../middlewares/checkToken');

chatRouter.post(
  '/newMessage',
  checkToken.checkToken,
  chatController.addMessage,
);

chatRouter.post(
  '/getChat',
  checkToken.checkToken,
  chatController.getChat,
);

chatRouter.post(
  '/getPreview',
  checkToken.checkToken,
  chatController.getPreview,
);

chatRouter.post(
  '/blackList',
  checkToken.checkToken,
  chatController.blackList,
);

chatRouter.post(
  '/favorite',
  checkToken.checkToken,
  chatController.favoriteChat,
);

chatRouter.post(
  '/createCatalog',
  checkToken.checkToken,
  chatController.createCatalog,
);

chatRouter.post(
  '/updateNameCatalog',
  checkToken.checkToken,
  chatController.updateNameCatalog,
);

chatRouter.post(
  '/addNewChatToCatalog',
  checkToken.checkToken,
  chatController.addNewChatToCatalog,
);

chatRouter.post(
  '/removeChatFromCatalog',
  checkToken.checkToken,
  chatController.removeChatFromCatalog,
);

chatRouter.post(
  '/deleteCatalog',
  checkToken.checkToken,
  chatController.deleteCatalog,
);

chatRouter.post(
  '/getCatalogs',
  checkToken.checkToken,
  chatController.getCatalogs,
);

module.exports = chatRouter;