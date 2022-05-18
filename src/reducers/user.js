// Esse reducer será responsável por tratar as informações da pessoa usuária
import { CHANGE_EMAIL } from '../actions';

const initialState = {
  email: '',
};

const reducerLogin = (state = initialState, action) => {
  switch (action.type) {
  case CHANGE_EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default reducerLogin;
