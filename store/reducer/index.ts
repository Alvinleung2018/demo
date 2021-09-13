import {combineReducers} from "redux";
// import user from './user'
// import admin from './admin'
import {customerInfoReducer} from "../../components/customer-info/store";

export default combineReducers({
    // user,
    // admin,
    customerInfo: customerInfoReducer
})