export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const CHANGE_WALLET = 'CHANGE_WALLET';

export const changeEmail = (payload) => ({
  type: CHANGE_EMAIL,
  payload,
});

export const changeWallet = (payload) => ({
  type: CHANGE_WALLET,
  payload,
});
