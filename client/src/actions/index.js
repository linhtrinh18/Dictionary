import { SIGN_IN, SIGN_OUT , CREATE_DICT} from './types.js'
import dict from '../apis/dictionary'

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    }
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
};


export const createDict = formValues => async dispatch => {
    console.log("action creator")
    const response = await dict.post('/dict', formValues)
    dispatch({type: CREATE_DICT, payload: response.data})
}
