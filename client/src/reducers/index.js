import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import dictReducer from './dictReducer'

import authReducer from './authReducer'

export default combineReducers ({
    auth: authReducer,
    form: formReducer,
    dict: dictReducer
})
