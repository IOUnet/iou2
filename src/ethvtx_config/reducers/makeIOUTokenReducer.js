import { SAVE_PAGE_ONE_MAKE_IOU, 
         SAVE_PAGE_TWO_MAKE_IOU,
         ADD_IOU_TOKENS } from '../actions/types';

const initialStateMakeIOU = {
    'makeIOUform': {},
    'tokens':[]
}


const indexTokenTokens = (state=initialStateMakeIOU, action) => {

    switch(action.type) {
        case SAVE_PAGE_ONE_MAKE_IOU:
            return {...state, makeIOUform: action.payload }
        case SAVE_PAGE_TWO_MAKE_IOU:
            var currentPayload = action.payload;
            var state_makeIOU = state.makeIOUform;
            var currentPayloadAction =  {...state_makeIOU, ...currentPayload}
            return {...state, makeIOUform: currentPayloadAction}
        case ADD_IOU_TOKENS:
            return {...state, tokens:action.payload}
        default:
            return state;
    }

}

export default indexTokenTokens;