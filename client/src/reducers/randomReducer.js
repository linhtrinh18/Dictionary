import _ from 'lodash';

export default (state = {}, action) => {
    switch(action.type){
        case 'FETCH_RANDOM':
            let newState = {}
            return {...newState, ..._.mapKeys(action.payload.data, '_id')};
        default:
            return state;
    }
};