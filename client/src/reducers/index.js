import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer'
import transReducer from './transReducer'
import postReducer from './postReducer'
import postexReducer from './postexReducer'

import authReducer from './authReducer'

export default combineReducers ({
    auth: authReducer,
    form: formReducer,
    user: userReducer,
    dict: transReducer,
    post: postReducer,
    postex: postexReducer
})
