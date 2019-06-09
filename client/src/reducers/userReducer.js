import _ from 'lodash';
import {
        FETCH_DICTS,
        FETCH_DICT,
} from '../actions/types';


export default (state = {}, action) => {
    switch(action.type){
        case FETCH_DICTS:
            return {...state, ..._.mapKeys(action.payload, '_id')};
        case 'FETCH_DICTS_PER_PAGE':
            let newState = {}
            console.log(newState)
            return {...newState, ..._.mapKeys(action.payload.data, '_id'), total: action.payload.total, page: action.payload.page, pages: action.payload.pages };
        case FETCH_DICT:
            return {...state, [action.payload._id]: action.payload};
        case 'CLEAR_USER':
            return _.omit(state, Object.keys(state));    
        default:
            return state;
    }
};