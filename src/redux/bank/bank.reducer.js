const INITIAL_STATE = {
    bells: 0
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'DEPOSIT_BELLS':
            return {
                ...state,
                bells: state.bells + action.payload
            }
        case 'WITHDRAW_BELLS':
            return {
                ...state,
                bells: (state.bells - action.payload < 0 ? 0 : state.bells - action.payload)
            }
        default:
            return state;

    }

}

export default userReducer;