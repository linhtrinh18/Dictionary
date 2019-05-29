import _ from 'lodash';
import {
        FETCH_DICTS,
        FETCH_DICT,
} from '../actions/types';


export default (state = {}, action) => {
    switch(action.type){
        case FETCH_DICTS:
            return {...state, ..._.mapKeys(action.payload, '_id')};
        case FETCH_DICT:
            return {...state, [action.payload._id]: action.payload};
        default:
            return state;
    }
};