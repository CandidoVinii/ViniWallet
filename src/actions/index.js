export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const SET_EXPENSES = 'SET_EXPENSES';
export const GET_CURRENCY = 'GET_CURRENCY';

export const changeEmail = (payload) => ({
  type: CHANGE_EMAIL,
  payload,
});

export const getCurrency = (payload) => ({
  type: GET_CURRENCY,
  payload,
});

export const getCurrencyAPI = () => async (dispatch) => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(url);
  const data = await response.json();
  const currencyFilter = Object.keys(data).filter((currency) => (
    currency !== 'USDT' && currency !== 'DOGE'));
  dispatch(getCurrency(currencyFilter));
};

export const setExpenses = (payload) => ({
  type: SET_EXPENSES,
  payload,
});

export const getExpenses = (state) => async (dispatch) => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(url);
  const data = await response.json();
  state.exchangeRates = data;
  dispatch(setExpenses(state));
};
