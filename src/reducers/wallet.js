// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCY } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
};

const reducerWallet = (state = initialState, action) => {
  switch (action.type) {
  case GET_CURRENCY:
    return {
      ...state,
      currencies: [action.payload],
    };
  default:
    return state;
  }
};

export default reducerWallet;
