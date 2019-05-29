import { SIGN_IN,
        SIGN_OUT,
        CREATE_DICT,
        FETCH_DICTS,
        FETCH_DICT,
        DELETE_DICT,
        EDIT_DICT
} from './types.js';
import dict from '../apis/dictionary';
// import history from '../history';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT,
    };
};


export const createDict = formValues => async (dispatch, getState) => {
    // Remember to createDict only have a userId attach to it
    const {userId} = getState().auth;
    // if(userId) {
    //     const responseGoogle = await dict.post('/google',{...formValues, userId});
    //     dispatch({type: CREATE_GOOGLE, payload: responseGoogle.data});
    //     const _id =responseGoogle.data.data._id
    //     console.log("Google action ID: ",_id)
    //     // Change the base Form from GoogleAPI
    //     formValues.word = responseGoogle.data.data.word
    //     const responseOxford = await dict.post('/oxford',{...formValues, _id: _id});
    //     dispatch({type: CREATE_OXFORD, payload: responseOxford.data});
    //     const responseBing = await dict.post('/bing',{...formValues, _id: _id});
    //     dispatch({type: CREATE_BING, payload: responseBing.data});
    // }
    
    
    if(userId) {
        const responseGoogle = await dict.post('/google',{...formValues, userId});
        dispatch({type: CREATE_DICT, payload: responseGoogle.data});
        const _id =responseGoogle.data.data._id
        console.log("Google action ID: ",_id)
        // Change the base Form from GoogleAPI
        formValues.word = responseGoogle.data.data.word
        const responseOxford = await dict.post('/oxford',{...formValues, _id: _id});
        dispatch({type: CREATE_DICT, payload: responseOxford.data});
        const responseBing = await dict.post('/bing',{...formValues, _id: _id});
        dispatch({type: CREATE_DICT, payload: responseBing.data});
    }
};


export const fetchDicts = (userId) => async dispatch => {
    // console.log("my userId",userId)
    const response = await dict.get(`/dict/${userId}`);
    // console.log("Response", response)
    dispatch({type: FETCH_DICTS, payload: response.data});
}

export const fetchDict = (_id) => async dispatch => {
    // console.log("FETCH DICT", _id)
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