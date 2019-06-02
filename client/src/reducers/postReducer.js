import _ from 'lodash';


export default (state = {}, action) => {
    switch(action.type){
        case 'SHOW_VIET_MEAN':
            return Object.assign({}, state, action.payload);
        case 'SHOW_ENG_MEAN':
            return Object.assign({}, state, action.payload);
        case 'SHOW_ENG_EXAMPLE':
            return Object.assign({}, state, action.payload);
        case 'SHOW_MY_EXAMPLE':
            return Object.assign({}, state, action.payload);    
        case 'SHOW_IMAGE':
            return Object.assign({}, state, action.payload);
        case 'CLEAR_POST':
            return _.omit(state, 'post');
        default:
            return state;
    }
};