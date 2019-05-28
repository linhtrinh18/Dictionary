import { SIGN_IN, SIGN_OUT } from '../actions/types'
import _ from 'lodash'

const INITIAL_STATE = {
    isSignedIn: null,
    userId: null
}
// Remember to save the Name of the User on the payload property

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SIGN_IN:
            return {...state, isSignedIn:true, userId: action.payload}
        case SIGN_OUT:
            return {..._.omit(state),isSignedIn:false, userId: null};
        default:
            return state;
    }
};