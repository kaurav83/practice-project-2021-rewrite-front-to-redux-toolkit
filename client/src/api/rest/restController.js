import http from '../interceptor';

// User's requests
export const getUser = () => http.get('getUser');
export const cashOut = data => http.post('cashout', data);
export const registerRequest = data => http.post('registration', data);
export const loginRequest = data => http.post('login', data);
export const updateUser = data => http.put('updateUser', data);

// Contests' requests
export const dataForContest = data => http.get('dataForContest', { headers: data });
export const downloadContestFile = data => http.get(`downloadFile/${data.fileName}`);
export const getContestById = data =>
  http.get('getContestById', {
    headers: {
      contestId: data.contestId,
    },
  });

export const getActiveContests = ({
  offset,
  limit,
  typeIndex,
  contestId,
  industry,
  awardSort,
  ownEntries,
}) => http.get('getAllContests',
  {
    headers: {
      offset,
      limit,
      typeIndex,
      contestId,
      industry,
      awardSort,
      ownEntries: +ownEntries,
    }
  }
);

export const getCustomersContests = data =>
  http.get(
    'getCustomersContests',
    {
      headers: {
        status: data.contestStatus,
        limit: data.limit,
        offset: data.offset,
      },
    }
  );

export const payMent = data => http.post('pay', data.formData);
export const updateContest = data => http.put('updateContest', data);

// Offer's requests
export const setNewOffer = data => http.post('setNewOffer', data);
export const setOfferStatus = data => http.post('setOfferStatus', data);
export const changeMark = data => http.post('changeMark', data);
export const getUsersWithOffers = (page) =>
  http.post('getUsersWithOffers', {
    page,
  });

export const getContestsWithoutPagination = () =>
  http.get('getContestsWithoutPagination');

// Chat's requests
export const getPreviewChat = () => http.get('getPreview');
export const getDialog = data => http.get('getChat', { headers: data });
export const getCatalogList = () => http.get('getCatalogs');
export const changeChatFavorite = data => http.put('favorite', data);
export const changeChatBlock = data => http.put('blackList', data);
export const changeCatalogName = data => http.put('updateNameCatalog', data);
export const removeChatFromCatalog = data => http.put('removeChatFromCatalog', data);
export const newMessage = data => http.post('newMessage', data);
export const addChatToCatalog = data => http.post('addNewChatToCatalog', data);
export const createCatalog = data => http.post('createCatalog', data);
export const deleteCatalog = data => http.delete('deleteCatalog', { headers: data });