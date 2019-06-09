import _ from 'lodash';

export default (state = {}, action) => {
    switch(action.type){
        case 'SHOW_VIET_MEAN':
            if(!state.vi){
                return {...state, vi:[action.payload]}
            } else {
                if (!state.vi.includes(action.payload)){
                   return {...state, vi:state.vi.concat([action.payload])} 
                } else {
                    return {...state, vi:state.vi.filter(word => word !== action.payload)}
                }
            }

        case 'SHOW_ENG_EXAMPLE':
            if(!state.ex){
                return {...state, ex:[action.payload]}
            } else {
                if (!state.ex.includes(action.payload)){
                   return {...state, ex:state.ex.concat([action.payload])} 
                } else {
                    return {...state, ex:state.ex.filter(word => word !== action.payload)}
                }
            }
   
        case 'SHOW_MY_EXAMPLE':
            if(!state.yex){
                return {...state, yex:[action.payload]}
            } else {
                if (!state.yex.includes(action.payload)){
                   return {...state, yex:state.yex.concat([action.payload])} 
                } else {
                    return {...state, yex:state.yex.filter(word => word !== action.payload)}
                }
            }
        case 'DISPLAY_MY_EXAMPLE':
            if(!state.yex){
                return {...state, yex:[action.payload]}
            } else {
                return {...state, yex:state.yex.concat([action.payload])} 
            }
        case 'SHOW_IMAGE':
            console.log("REDUCER IMAGE", action.payload)
            if(!state.img){
                return {...state, img:[action.payload]}
            } else {
                if (!state.img.includes(action.payload)){
                   return {...state, img:state.img.concat([action.payload])} 
                } else {
                    return {...state, img:state.img.filter(word => word !== action.payload)}
                }
            }
            
            
        case 'SHOW_ENG_MEAN':
            
            // if(!state.en){
            //     return {...state, en:[action.payload]}
            // } else {
            //     let newStateShow = {...state};
            //     newStateShownewStateShow.en.map((eachEngMean, index) => {
            //         if(JSON.stringify(eachEngMean) === JSON.stringify(action.payload)){
            //             console.log("HAV THIS ELEMENT", index)
            //             console.log("newState before remove", newStateShow)
            //             newStateShow.en.splice(index, 1);
            //             console.log("newState after remove", newStateShow)
            //             return newStateShow
            //         } else {
            //             console.log("THERE ARE NO DUPLICATE: STATE: ", state)
            //             console.log("ADDING STATE ", {...state, en:state.en.concat([action.payload])})
            //             return {...newStateShow, en:newStateShow.en.concat([action.payload])}
            //         }
            //     })
                 
            // }
            // return newStateShow
            if(!state.en){
                return {...state, en:[action.payload]}
            } else {
                if (!state.en.includes(action.payload)){
                  return {...state, en:state.en.concat([action.payload])} 
                } else {
                    return {...state, yex:state.en.filter(word => word !== action.payload)}
                }
            }
        case 'REMOVE_ENG_MEAN':
            let newState = {...state};
            newState.en.map((eachEngMean, index) => {
                if(JSON.stringify(eachEngMean) === JSON.stringify(action.payload)){
                    console.log("DONE", index)
                    newState.en.splice(index, 1);
                    return newState
                } else {
                    return newState
                }
            })
            return newState
        case 'CLEAR_POST':
            return _.omit(state, 'vi', 'en', 'ex', '_id', 'yex', 'img');
        default:
            return state;
    }
};