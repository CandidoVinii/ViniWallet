// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCY, SET_EXPENSES } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
};

const reducerWallet = (state = initialState, action) => {
  switch (action.type) {
  case GET_CURRENCY:
    return {
      ...state,
      currencies: action.payload,
    };
  case SET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, { id: state.expenses.length, ...action.payload }],
    };
  default:
    return state;
  }
};

export default reducerWallet;
