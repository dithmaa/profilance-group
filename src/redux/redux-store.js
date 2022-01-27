import { combineReducers, createStore } from "redux";
import authReducer from "./auth-reducer";
import generalReducer from "./general-reducer";
import newsReducer from "./news-reducer";

let reducers = combineReducers({
    generalPage: generalReducer,
    auth: authReducer,
    newsPage: newsReducer
});

let store = createStore(reducers);

export default store;

window.store = store;