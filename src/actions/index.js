export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const CHANGE_WALLET = 'CHANGE_WALLET';
export const GET_CURRENCY = 'GET_CURRENCY';

export const changeEmail = (payload) => ({
  type: CHANGE_EMAIL,
  payload,
});

export const getCurrency = (payload) => ({
  type: GET_CURRENCY,
  currencies: payload,
});
