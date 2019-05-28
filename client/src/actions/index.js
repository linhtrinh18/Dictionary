import { SIGN_IN,
        SIGN_OUT,
        CREATE_DICT,
        FETCH_DICTS,
        FETCH_DICT,
        DELETE_DICT,
        EDIT_DICT
} from './types.js';
import dict from '../apis/dictionary';
import history from '../history';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};


export const createDict = formValues => async (dispatch, getState) => {
    // Remember to createDict only have a userId attach to it
    const {userId} = getState().auth;
    const response = await dict.post('/dict',{...formValues, userId});
    dispatch({type: CREATE_DICT, payload: response.data});
    history.push('/');
};


export const fetchDicts = () => async dispatch => {
    const response = await dict.get('/dict');
    dispatch({type: FETCH_DICTS, payload: response.data});
}

export const fetchDict = (_id) => async dispatch => {
    console.log("FETCH DICT", _id)
    const response = await dict.get(`/dict/${_id}`);
    dispatch({type: FETCH_DICT, payload: response.data});
}

export const editDict = (_id, formValues) => async dispatch => {
    const response = await dict.put(`/dict/${_id}`, formValues);
    dispatch({type: EDIT_DICT, payload: response.data});
};

export const deleteDict = (_id) => async dispatch => {
    await dict.put(`/dict/${_id}`);
    dispatch({type: DELETE_DICT, payload: _id});
};