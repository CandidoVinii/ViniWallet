import { combineReducers } from 'redux';
import reducerLogin from './user';
// import wallet from './wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
const rootReducer = combineReducers({
  user: reducerLogin,
});

export default rootReducer;
