import incDec from './incDec'
import changeImg from './changeImg';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
    incDec,
    changeImg
});
export default rootReducer;