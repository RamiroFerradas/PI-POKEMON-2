import { createStore, applyMiddleware, compose } from "redux";
import pokemonReducer from "../reducer";
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(
//   rootReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );
// combineReducers;

const store = createStore(
  pokemonReducer,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
