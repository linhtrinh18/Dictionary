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

export const clearDict = formValues => async (dispatch) => {
    dispatch({type: CLEAR_DICT, payload: null})
    dispatch({type: 'CLEAR_POST', payload: null})
}

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
        console.log("responseGoogle.data", responseGoogle.data)
        dispatch({type: 'CREATE_GOOGLE', payload: responseGoogle.data});
        // Check the word is valid ?
        if(responseGoogle.data.data) {
            const _id =responseGoogle.data.data._id
            formValues.word = responseGoogle.data.data.word
            dispatch(createBing(formValues, _id));
            const responseOxford = await dict.post('/oxford',{...formValues, _id: _id});
            dispatch({type: 'CREATE_OXFORD', payload: responseOxford.data});
        
            // const responseBing = await dict.post('/bing',{...formValues});
            // dispatch({type: 'CREATE_IMAGE', payload: responseBing.data});
            // dict.post('/bingimage',{img: responseBing.data.image[0][0], _id: getState().dict.data._id});


        }
    }
};
export const createBing = (formValues,_id) => async (dispatch, getState) => {
    // Remember to createDict only have a userId attach to it
    console.log("FORMVALUE BING", formValues, _id)
    const {userId} = getState().auth;
    if(userId) {
        const responseBing = await dict.post('/bing',{...formValues});
        dispatch({type: 'CREATE_IMAGE', payload: responseBing.data});
        dict.post('/bingimage',{img: getState().dict.image[0][0], _id:_id});
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
    const response = await dict.get(`/dict/${userId}`);
    dispatch({type: FETCH_DICTS, payload: response.data});
}
export const fetchDictPerPage = (userId, page) => async dispatch => {
    const response = await dict.get(`/review-page/${page}/${userId}`);
    dispatch({type: 'FETCH_DICTS_PER_PAGE', payload: {data: response.data.docs, total: response.data.total, page:Number(response.data.page), pages: response.data.pages}});
}                                                                            

export const fetchDict = (userId) => async dispatch => {
    const response = await dict.get(`/dict/${userId}`);
    dispatch({type: FETCH_DICTS, payload: response.data});
}
export const editDict = (_id, formValues) => async dispatch => {
    const response = await dict.put(`/dict/${_id}`, formValues);
    dispatch({type: EDIT_DICT, payload: response.data});
};
export const deleteDict = (_id) => async dispatch => {
    await dict.put(`/dict/${_id}`);
    dispatch({type: DELETE_DICT, payload: _id});
};