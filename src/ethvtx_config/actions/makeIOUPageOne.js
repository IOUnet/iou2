import { SAVE_PAGE_ONE_MAKE_IOU } from './types'

const makeIOUPageOne = (payload) => {
        return {
            type: SAVE_PAGE_ONE_MAKE_IOU,
            payload
        }
}

export default makeIOUPageOne;