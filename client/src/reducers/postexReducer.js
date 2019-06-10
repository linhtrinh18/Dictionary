
export default (state = {}, action) => {
    switch(action.type){
        case 'DISPLAY_MY_EXAMPLE':
            if(!state.yex){
                return {...state, yex:[action.payload]}
            } else {
                return {...state, yex:state.yex.concat([action.payload])} 
            }
        default:
            return state;
    } 
};