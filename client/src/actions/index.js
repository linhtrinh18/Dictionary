import { SIGN_IN,
        SIGN_OUT,
        FETCH_DICTS,
        FETCH_DICT,
        DELETE_DICT,
        EDIT_DICT,
        CLEAR_DICT
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
        type: SIGN_OUT,
    };
};


export const createGoogle = formValues => async (dispatch, getState) => {
    const {userId} = getState().auth;
    if(userId && formValues.word) {
        history.push('/words/show')
        if(getState().dict.data){
            dict.post('/update', {data:{...getState().post, _id: getState().dict.data._id}})
        }
        dispatch({type: CLEAR_DICT, payload: getState()})
        dispatch({type: 'CLEAR_POST', payload: null})
        const responseGoogle = await dict.post('/google',{...formValues, userId});
        dispatch({type: 'CREATE_GOOGLE', payload: responseGoogle.data});
        // Check the word is valid ?
        if(responseGoogle.data.data) {
            const _id =responseGoogle.data.data._id
            formValues.word = responseGoogle.data.data.word
            const responseOxford = await dict.post('/oxford',{...formValues, _id: _id});
            dispatch({type: 'CREATE_GOOGLE', payload: responseOxford.data});
        }
    }
};

export const createBing = formValues => async (dispatch, getState) => {
    // Remember to createDict only have a userId attach to it
    const {userId} = getState().auth;
    if(userId) {
        const responseBing = await dict.post('/bing',{...formValues});
        dispatch({type: 'CREATE_IMAGE', payload: responseBing.data});
        setTimeout( 
            function(){ 
                // console.log("GETSTATE AFTER 1s ne:", getState());
                dict.post('/bingimage',{img: getState().dict.image[0][0], _id: getState().dict.data._id});
            }
            ,1000)
    }
};


export const showExample = (data) => async (dispatch, getState) => {
    dispatch({type: 'SHOW_VIET_MEAN', payload: data});
}


export const showImage = (image) => async (dispatch, getState) => {
    dispatch({type: 'SHOW_IMAGE', payload: image});
}

export const showEngMean = (data, lexicalCategory) => async (dispatch, getState) => {
    dispatch({type: 'SHOW_ENG_MEAN', payload: {cat: lexicalCategory, en:[data]}});
}

export const UpdateMeaning = () => async (dispatch, getState) => {
}

export const showEngExample = (data) => async (dispatch, getState) => {
    dispatch({type: 'SHOW_ENG_EXAMPLE', payload: data});
}

export const ShowMyExample = (data) => async (dispatch, getState) => {
    dispatch({type: 'SHOW_MY_EXAMPLE', payload: data});
}

export const removeEngMean = (data) => async (dispatch, getState) => {
    dispatch({type: 'REMOVE_ENG_MEAN', payload: data});
}


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