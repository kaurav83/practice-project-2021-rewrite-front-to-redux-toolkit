const { Select, Rating, Contest, Offer, User, Sequelize, sequelize } = require('../models');
const ServerError = require('../errors/ServerError');
const contestQueries = require('./queries/contestQueries');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
const UtilFunctions = require('../utils/functions');
const CONSTANTS = require('../constants');
const loggerError = require('../loggerError/loggerError');
const { sendEmail } = require('../utils/sendMail');

module.exports.dataForContest = async (req, res, next) => {
  const response = {};
  try {
    const { headers: { characteristic1, characteristic2 } } = req;
    const types = [characteristic1, characteristic2, 'industry'].filter(Boolean);

    const characteristics = await Select.findAll({
      where: {
        type: {
          [Sequelize.Op.or]: types,
        },
      },
    });
    if (!characteristics) {
      return next(new ServerError());
    }
    characteristics.forEach(characteristic => {
      if (!response[characteristic.type]) {
        response[characteristic.type] = [];
      }
      response[characteristic.type].push(characteristic.describe);
    });
    res.send(response);
  } catch (err) {
    console.log(err);
    next(new ServerError('cannot get contest preferences'));
    loggerError(err);
  }
};

module.exports.getContestById = async (req, res, next) => {
  try {
    let contestInfo = await Contest.findOne({
      where: { id: req.headers.contestid },
      order: [
        [Offer, 'id', 'asc'],
      ],
      include: [
        {
          model: User,
          required: true,
          attributes: {
            exclude: [
              'password',
              'role',
              'balance',
              'accessToken',
            ],
          },
        },
        {
          model: Offer,
          required: false,
          where: req.tokenData.role === CONSTANTS.CREATOR
            ? { userId: req.tokenData.userId }
            : {},
          attributes: { exclude: ['userId', 'contestId'] },
          include: [
            {
              model: User,
              required: true,
              attributes: {
                exclude: [
                  'password',
                  'role',
                  'balance',
                  'accessToken',
                ],
              },
            },
            {
              model: Rating,
              required: false,
              where: { userId: req.tokenData.userId },
              attributes: { exclude: ['userId', 'offerId'] },
            },
          ],
        },
      ],
    });

    contestInfo = contestInfo.get({ plain: true });

    contestInfo.Offers = contestInfo.Offers.filter(
      (offer) => offer.approved === 'approve'
    );

    contestInfo.Offers.forEach(offer => {
      if (offer.Rating) {
        offer.mark = offer.Rating.mark;
      }
      delete offer.Rating;
    });
    res.send(contestInfo);
  } catch (e) {
    next(new ServerError());
    loggerError(e);
  }
};

module.exports.getUsersWithOffers = async (req, res, next) => {
  const page = +req.headers.page || 1;
  const itemsPerPage = 10;

  await User.findAndCountAll({
    attributes: [
      'displayName',
      'email'
    ],
    include: [
      {
        model: Offer,
        attributes: [
          'id',
          'text',
          'fileName',
          'approved'
        ],
        include: [
          {
            model: Contest,
            attributes: ['status']
          }
        ],
        required: true,
      },
    ],
    offset: (page - 1) * itemsPerPage,
    limit: itemsPerPage,
    subQuery: false,
  })
    .then(result => {
      const count = result.count;
      const users = result.rows || [];

      const formattedData = users.reduce((acc, user) => {
        user.Offers.forEach((offer) => {
          acc.push({
            offer_id: offer.id,
            text: offer.text,
            fileName: offer.fileName,
            displayName: user.displayName,
            email: user.email,
            status: offer.Contest ? offer.Contest.status : null,
            approved: offer.approved
          });
        });
        return acc;
      }, []);

      const totalPages = Math.ceil(count / itemsPerPage);

      res.send({
        formattedData,
        page: req.headers.page,
        itemsPerPage,
        totalPages,
        totalCount: count
      });
    })
    .catch(error => {
      next(new ServerError());
      loggerError(error);
    });
};

module.exports.changeStatusOfferByModerator = async (req, res, next) => {
  const {
    command,
    offerId,
    email,
  } = req.body;
  try {
    await Offer.update(
      { approved: command },
      {
        where: {
          id: offerId
        }
      }
    );

    await sendEmail(email, command, offerId);

    const offer = await Offer.findByPk(offerId);
    res.status(200).json({
      offerId: offer.id,
      command: offer.approved
    });
  } catch (err) {
    next(err);
    loggerError(err);
  }
};

module.exports.downloadFile = async (req, res, next) => {
  const file = CONSTANTS.CONTESTS_DEFAULT_DIR + req.params.fileName;
  res.download(file);
};

module.exports.updateContest = async (req, res, next) => {
  if (req.file) {
    req.body.fileName = req.file.filename;
    req.body.originalFileName = req.file.originalname;
  }
  const contestId = req.body.contestId;
  delete req.body.contestId;
  try {
    const updatedContest = await contestQueries.updateContest(req.body, {
      id: contestId,
      userId: req.tokenData.userId,
    });
    res.send(updatedContest);
  } catch (e) {
    next(e);
    loggerError(e);
  }
};

module.exports.setNewOffer = async (req, res, next) => {
  const obj = {};
  if (req.body.contestType === CONSTANTS.LOGO_CONTEST) {
    obj.fileName = req.file.filename;
    obj.originalFileName = req.file.originalname;
  } else {
    obj.text = req.body.offerData;
  }
  obj.userId = req.tokenData.userId;
  obj.contestId = req.body.contestId;
  try {
    const result = await contestQueries.createOffer(obj);
    delete result.contestId;
    delete result.userId;
    controller.getNotificationController().emitEntryCreated(
      req.body.customerId);
    const User = Object.assign({}, req.tokenData, { id: req.tokenData.userId });
    res.send(Object.assign({}, result, { User }));
  } catch (e) {
    loggerError(e);
    return next(new ServerError());
  }
};

const rejectOffer = async (offerId, creatorId, contestId) => {
  const rejectedOffer = await contestQueries.updateOffer(
    { status: CONSTANTS.OFFER_STATUS_REJECTED }, { id: offerId });
  controller.getNotificationController().emitChangeOfferStatus(creatorId,
    'Someone of yours offers was rejected', contestId);
  return rejectedOffer;
};

const resolveOffer = async (
  contestId, creatorId, orderId, offerId, priority, transaction) => {
  const finishedContest = await contestQueries.updateContestStatus({
    status: sequelize.literal(`   CASE
            WHEN "id"=${ contestId }  AND "orderId"='${ orderId }' THEN '${ CONSTANTS.CONTEST_STATUS_FINISHED }'
            WHEN "orderId"='${ orderId }' AND "priority"=${ priority +
    1 }  THEN '${ CONSTANTS.CONTEST_STATUS_ACTIVE }'
            ELSE '${ CONSTANTS.CONTEST_STATUS_PENDING }'
            END
    `),
  }, { orderId }, transaction);
  await userQueries.updateUser(
    { balance: sequelize.literal('balance + ' + finishedContest.prize) },
    creatorId, transaction);
  const updatedOffers = await contestQueries.updateOfferStatus({
    status: sequelize.literal(` CASE
            WHEN "id"=${ offerId } THEN '${ CONSTANTS.OFFER_STATUS_WON }'
            ELSE '${ CONSTANTS.OFFER_STATUS_REJECTED }'
            END
    `),
  }, {
    contestId,
  }, transaction);
  transaction.commit();
  const arrayRoomsId = [];
  updatedOffers.forEach(offer => {
    if (offer.status === CONSTANTS.OFFER_STATUS_REJECTED && creatorId !==
      offer.userId) {
      arrayRoomsId.push(offer.userId);
    }
  });
  controller.getNotificationController().emitChangeOfferStatus(arrayRoomsId,
    'Someone of yours offers was rejected', contestId);
  controller.getNotificationController().emitChangeOfferStatus(creatorId,
    'Someone of your offers WIN', contestId);
  return updatedOffers[ 0 ].dataValues;
};

module.exports.setOfferStatus = async (req, res, next) => {
  let transaction;
  if (req.body.command === 'reject') {
    try {
      const offer = await rejectOffer(req.body.offerId, req.body.creatorId,
        req.body.contestId);
      res.send(offer);
    } catch (err) {
      next(err);
    }
  } else if (req.body.command === 'resolve') {
    try {
      transaction = await sequelize.transaction();
      const winningOffer = await resolveOffer(req.body.contestId,
        req.body.creatorId, req.body.orderId, req.body.offerId,
        req.body.priority, transaction);
      res.send(winningOffer);
    } catch (err) {
      transaction.rollback();
      next(err);
      loggerError(err);
    }
  }
};

module.exports.getCustomersContests = async (req, res, next) => {
  await Contest.findAll({
    where: { status: req.headers.status, userId: req.tokenData.userId },
    limit: +req.headers.limit,
    offset: +req.headers.offset ? +req.headers.offset : 0,
    order: [['id', 'DESC']],
    include: [
      {
        model: Offer,
        required: false,
        attributes: ['id', 'status'],
      },
    ],
  })
    .then(contests => {
      contests.forEach(
        contest => contest.dataValues.count = contest.dataValues.Offers.length);
      let haveMore = true;
      if (contests.length === 0) {
        haveMore = false;
      }
      res.send({ contests, haveMore });
    })
    .catch(err => {
      loggerError(err);
      next(new ServerError(err))
    });
};

module.exports.getContests = async (req, res, next) => {
  const predicates = UtilFunctions.createWhereForAllContests(+req.headers.typeindex,
    req.headers.contestid, req.headers.industry, req.headers.awardsort);
  await Contest.findAll({
    where: predicates.where,
    order: predicates.order,
    limit: +req.headers.limit,
    offset: +req.headers.offset ? +req.headers.offset : 0,
    include: [
      {
        model: Offer,
        required: !!+req.headers.ownentries,
        where: !!+req.headers.ownentries ? { userId: req.tokenData.userId } : {},
        attributes: ['id'],
      },
    ],
  })
    .then(contests => {
      contests.forEach(
        contest => contest.dataValues.count = contest.dataValues.Offers.length);
      let haveMore = true;
      if (contests.length === 0) {
        haveMore = false;
      }
      res.send({ contests, haveMore });
    })
    .catch(err => {
      loggerError(err);
      next(new ServerError());
    });
};
