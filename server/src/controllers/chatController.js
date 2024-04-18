const MessageMDB = require('../models/mongoModels/Message');
const {
  User,
  Conversation,
  ConversationParticipant,
  Message,
  Catalog,
  CatalogConversation,
  sequelize
} = require('../models');
const userQueries = require('./queries/userQueries');
const loggerError = require('../loggerError/loggerError');

module.exports.getPreview = async (req, res, next) => {
  try {
    const userId = req.tokenData.userId;
    const participantConversations = await ConversationParticipant.findAll({
      where: { participantId: userId },
      attributes: ['conversationId']
    });

    const conversationIds = participantConversations.map(pc => pc.conversationId);

    const conversations = await Conversation.findAll({
      where: { id: conversationIds },
      include: [
        {
          model: ConversationParticipant,
          as: 'participants',
          include: [{
            model: User,
            as: 'userDetails',
            attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
          }]
        },
        {
          model: Message,
          as: 'messages',
          attributes: ['sender', 'body', 'createdAt'],
          limit: 1,
          order: [['createdAt', 'DESC']]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    const conversationsWithFormat = conversations.map(conversation => {
      const { id: _id, createdAt, messages } = conversation;
      const createAt = createdAt;
      const message = messages[0];

      const participants = conversation.participants.map(participant => participant.participantId);
      const blackList = conversation.participants.map(participant => participant.blacklisted);
      const favoriteList = conversation.participants.map(participant => participant.favorited);

      const interlocutor = conversation.participants
        .filter(participant => participant.participantId !== req.tokenData.userId)
        .map(participant => {
          return {
            id: participant.userDetails.id,
            firstName: participant.userDetails.firstName,
            lastName: participant.userDetails.lastName,
            displayName: participant.userDetails.displayName,
            avatar: participant.userDetails.avatar,
          };
        })[0];

      return {
        _id,
        sender: message.sender,
        text: message.body,
        createAt,
        participants,
        blackList,
        favoriteList,
        interlocutor
      };
    });

    res.send(conversationsWithFormat);
  } catch (err) {
    next(err);
    loggerError(err);
  }
};

module.exports.getChat = async (req, res, next) => {
  try {
    const conversationHost = await ConversationParticipant.findAll({
      where: { participantId: req.tokenData.userId },
      attributes: ['conversationId'],
      raw: true
    });

    const conversationInterlocutor = await ConversationParticipant.findAll({
      where: { participantId: +req.headers.interlocutorid },
      attributes: ['conversationId'],
      raw: true
    });

    const conversationHostIds = conversationHost.map(c => c.conversationId);
    const conversationInterlocutorIds = conversationInterlocutor.map(c => c.conversationId);
    const commonConversationIds = conversationHostIds.filter(id => conversationInterlocutorIds.includes(id));


    const messages = await Message.findAll({
      where: { conversationId: commonConversationIds }
    });

    const interlocutor = await userQueries.findUser({ id: +req.headers.interlocutorid });

    res.send({
      messages,
      interlocutor: {
        firstName: interlocutor.firstName,
        lastName: interlocutor.lastName,
        displayName: interlocutor.displayName,
        id: interlocutor.id,
        avatar: interlocutor.avatar,
      },
    });
  } catch (err) {
    next(err);
    loggerError(err)
  }
};

module.exports.addMessage = async (req, res, next) => {
  const {
    userId,
    recipient,
    messageBody,
    interlocutor,
    participants,
    conversationId
  } = req.body;

  try {
    if (conversationId) {
      addMessageCallback(res, conversationId, participants, interlocutor, userId, messageBody)
    } else {
      const conversation = await Conversation.create();

      await sequelize.query(`
        INSERT INTO conversation_participants (conversation_id, participant_id, blacklisted, favorited)
        VALUES (${conversation.id}, ${userId}, false, false);
        INSERT INTO conversation_participants (conversation_id, participant_id, blacklisted, favorited)
        VALUES (${conversation.id}, ${recipient}, false, false);
      `);

      addMessageCallback(res, conversation.id, [userId, recipient], interlocutor, userId, messageBody);
    }
  } catch (err) {
    next(err);
  }
};

const addMessageCallback = async (res, conversationId, participants, interlocutor, userId, messageBody) => {
  const conversations = await Conversation.findAll({
    where: { id: conversationId },
    include: [
      {
        model: ConversationParticipant,
        as: 'participants'
      }
    ],
    raw: true
  });

  const conversationFormated = conversations.reduce((acc, cur) => {
    acc.blackList.push(cur['participants.blacklisted']);
    acc.favoriteList.push(cur['participants.favorited']);
    acc._id = cur.id;
    acc.createAt = cur.createdAt;
    acc.participants = participants;

    return acc;
  }, { blackList: [], favoriteList: [] });

  const message = await Message.create({
    sender: userId,
    body: messageBody,
    conversationId,
  });

  res.status(201).json({
    message: {
      id: message.id,
      sender: message.sender,
      body: message.body,
      conversationId: message.conversationId,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
      participants
    },
    preview: {
      interlocutor,
      sender: message.sender,
      text: message.body,
      ...conversationFormated
    }
  });
};

module.exports.blackList = async (req, res, next) => {
  const { blackListFlag, conversationId, participants } = req.body;

  try {
    const conversation = await Conversation.findOne({ where: { id: conversationId } });
    if (!conversation) {
      return res.status(404).send({ message: "Conversation not found." });
    }

    await ConversationParticipant.update(
      { blacklisted: blackListFlag },
      {
        where: {
          conversationId: conversationId,
          participantId: req.tokenData.userId
        }
      }
    );

    const updatedParticipants = await ConversationParticipant.findAll({
      where: { conversationId: conversationId },
      attributes: ['participantId', 'blacklisted', 'favorited'],
      raw: true
    });

    const dataMap = updatedParticipants.reduce((acc, item) => {
      acc[item.participantId] = item;
      return acc;
    }, {});

    const orderedData = participants.map(id => dataMap[id]).filter(item => item);

    const response = {
      participants: orderedData.map(p => p.participantId),
      blackList: orderedData.map(p => p.blacklisted),
      favoriteList: orderedData.map(p => p.favorited),
      _id: conversation.id,
      createdAt: conversation.createdAt,
      updatedAt: conversation.updatedAt
    };

    res.send(response);
  } catch (err) {
    res.send(err);
    loggerError(err);
  }
};

module.exports.favoriteChat = async (req, res, next) => {
  const { favoriteFlag, conversationId, participants } = req.body;

  try {
    const conversation = await Conversation.findOne({ where: { id: conversationId } });
    if (!conversation) {
      return res.status(404).send({ message: "Conversation not found." });
    }

    await ConversationParticipant.update(
      { favorited: favoriteFlag },
      {
        where: {
          conversationId: conversationId,
          participantId: req.tokenData.userId
        }
      }
    );

    const updatedParticipants = await ConversationParticipant.findAll({
      where: { conversationId: conversationId },
      attributes: ['participantId', 'blacklisted', 'favorited'],
      raw: true
    });

    const dataMap = updatedParticipants.reduce((acc, item) => {
      acc[item.participantId] = item;
      return acc;
    }, {});

    const orderedData = participants.map(id => dataMap[id]).filter(item => item);

    const response = {
      participants: orderedData.map(p => p.participantId),
      blackList: orderedData.map(p => p.blacklisted),
      favoriteList: orderedData.map(p => p.favorited),
      _id: conversation.id,
      createdAt: conversation.createdAt,
      updatedAt: conversation.updatedAt
    };

    res.send(response);
  } catch (err) {
    res.send(err);
    loggerError(err);
  }
};

module.exports.createCatalog = async (req, res, next) => {
  const { catalogName, chatId } = req.body;

  try {
    const catalog = await Catalog.create({
      userId: req.tokenData.userId,
      catalogName
    });

    await CatalogConversation.create({
      catalogId: catalog.id,
      conversationId: chatId
    });

    res.status(201).send({
      chats: [chatId],
      _id: catalog.id,
      userId: req.tokenData.userId,
      catalogName: catalog.catalogName,
    });
  } catch (err) {
    next(err);
    loggerError(err);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  const { catalogId } = req.body;

  try {
    await Catalog.update(
      { catalogName: req.body.catalogName },
      {
        where: {
          id: catalogId
        }
      }
    );

    const catalog = await Catalog.findByPk(catalogId, {
      attributes: ['id', 'catalogName', 'userId'],
      include: [{
        model: CatalogConversation,
        as: 'CatalogConversations',
        attributes: ['conversationId']
      }]
    });

    if (!catalog) {
      return res.status(404).send('Catalog not found.');
    }

    res.status(200).json({
      catalogName: catalog.catalogName,
      chats: catalog.CatalogConversations.map(conversations => conversations.conversationId),
      userId: catalog.userId,
      _id: catalog.id
    });
  } catch (err) {
    next(err);
    loggerError(err)
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  const { chatId, catalogId } = req.body;

  try {
    const catalog = await Catalog.findOne({
      where: { id: catalogId, userId: req.tokenData.userId }
    });

    if (!catalog) {
      return res.status(404).send('The directory is not found or the user does not have access to it.');
    }

    const existingLink = await CatalogConversation.findOne({
      where: { catalogId: catalogId, conversationId: chatId }
    });

    if (existingLink) {
      return res.status(409).send('This chat has already been added to the catalog.');
    }

    const newLink = await CatalogConversation.create({
      catalogId: catalogId,
      conversationId: chatId
    });

    res.status(201).json(newLink);
  } catch (err) {
    next(err);
    loggerError(err);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  const { catalogId, chatId } = req.body;

  try {
    await CatalogConversation.destroy({
      where: {
        catalogId: catalogId,
        conversationId: chatId
      }
    });

    const catalog = await Catalog.findByPk(catalogId, {
      attributes: ['id', 'catalogName', 'userId'],
      include: [{
        model: CatalogConversation,
        as: 'CatalogConversations',
        attributes: ['conversationId']
      }]
    });

    if (!catalog) {
      return res.status(404).send('Catalog not found.');
    }

    res.status(200).json({
      catalogName: catalog.catalogName,
      chats: catalog.CatalogConversations.map(conversations => conversations.conversationId),
      userId: catalog.userId,
      _id: catalog.id
    });
  } catch (err) {
    next(err);
    loggerError(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  try {
    const numDestroyed = await Catalog.destroy({
      where: { id: +req.headers.catalogid }
    });

    if (numDestroyed) {
      res.status(200).send(`The catalog with id=${req.headers.catalogid} and all related chats have been successfully deleted.`);
    } else {
      res.status(404).send('The catalog was not found or has already been deleted.');
    }
  } catch (err) {
    next(err);
    loggerError(err);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  try {
    const catalogs = await Catalog.findAll({
      where: { userId: req.tokenData.userId },
      include: [{
        model: CatalogConversation,
        as: 'CatalogConversations',
        include: [{
          model: Conversation,
          as: 'Conversation',
          attributes: ['id']
        }]
      }],
      attributes: ['id', 'catalogName'],
    });

    const transformedCatalogs = catalogs.map(catalog => {
      return {
        _id: catalog.id,
        chats: catalog.CatalogConversations.map(conv => conv.Conversation.id),
        catalogName: catalog.catalogName
      };
    });

    res.json(transformedCatalogs);
  } catch (err) {
    next(err);
    loggerError(err)
  }
};

const getCountMessagesByText = async () => {
  try {
    const records = await MessageMDB.aggregate([
      { $match: { body: /паровоз/i } },
      { $count: "locomotive" }
    ]);

    console.log(`Number of records by word "паровоз" - ${records[0]?.locomotive}`);
  } catch (err) {
    console.log(err);
    loggerError(err)
  }
};

getCountMessagesByText();
