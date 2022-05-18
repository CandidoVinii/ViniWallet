// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CHANGE_WALLET } from '../actions';

const initialState = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

const reducerWallet = (state = initialState, action) => {
  switch (action.type) {
  case CHANGE_WALLET:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default reducerWallet;
