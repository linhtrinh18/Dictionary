import _ from 'lodash';
import {
        DELETE_DICT,
        EDIT_DICT
} from '../actions/types';


export default (state = {}, action) => {
    switch(action.type){
        case 'CREATE_GOOGLE':
            return Object.assign({}, state, action.payload);
        case 'CREATE_OXFORD':
            return Object.assign({}, state, action.payload);
        case 'CREATE_IMAGE':
            return Object.assign({}, state, action.payload);
        case EDIT_DICT:
            return {...state, [action.payload._id]: action.payload.mex};
        case DELETE_DICT:
            return _.omit(state, action.payload);
        case 'CLEAR_DICT':
            // console.log("OMIT DICT, " , _.omit(state, 'google', 'oxford', 'image') )
            return _.omit(state, 'google', 'oxford', 'image');
        default:
            return state;
    }
};