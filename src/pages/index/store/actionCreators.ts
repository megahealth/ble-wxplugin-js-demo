import { constants } from ".";


export const add = () => ({
    type: constants.ACTION_ADD
})

export const minus = () => ({
    type: constants.ACTION_MINUS
})

// 异步的action
export const asyncAdd = () => {
    return dispatch => {
        setTimeout(() => {
            dispatch(add())
        }, 2000)
    }
}