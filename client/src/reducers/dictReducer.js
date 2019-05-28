import _ from 'lodash';
import {CREATE_DICT,
        FETCH_DICTS,
        FETCH_DICT,
        DELETE_DICT,
        EDIT_DICT
} from '../actions/types';

export default (state = {}, action) => {
    switch(action.type){
        case FETCH_DICTS:
            return {...state, ..._.mapKeys(action.payload, '_id')};
        case FETCH_DICT:
            return {...state, [action.payload._id]: action.payload};
        case CREATE_DICT:
            return {...state, [action.payload._id]: action.payload};
        case EDIT_DICT:
            return {...state, [action.payload._id]: action.payload};
        case DELETE_DICT:
            return _.omit(state, action.payload);
        default:
            return state;
            
        
    }
};