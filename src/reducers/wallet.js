// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCY, REMOVE_EXPENSES, SET_EXPENSES } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  updateAll: {},
  editing: false,
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
  case REMOVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses.filter((exp) => exp.id !== action.id)],
    };
  case 'EDIT_EXPENSES':
    return {
      ...state,
      editing: true,
      updateAll: action.item,
    };
  case 'UPDATE_EXPENSES':
    return {
      ...state,
      editing: false,
      expenses: state.expenses.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      }),
    };
  default:
    return state;
  }
};

export default reducerWallet;
