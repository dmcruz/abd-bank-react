const INITIAL_STATE = {
    bells: 0,
    bellsRequested: 0,
    errorMessage: ''
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
        case 'WITHDRAWAL_REQUEST':
            return {
                ...state,
                errorMessage: '',
                bellsRequested: action.payload,
            }
        case 'WITHDRAWAL_SUCCESS':
            return {
                ...state,
                bellsRequested: 0,
            }
        case 'WITHDRAWAL_FAIL':
            return {
                ...state,
                errorMessage: action.payload,
            }
        case 'DEPOSIT_REQUEST': 
            return {
                ...state,
                errorMessage: '',
                bellsRequested: action.payload,
            }
        case 'DEPOSIT_SUCCESS':
            return {
                ...state,
                bellsRequested: 0,
            }
        case 'DEPOSIT_FAIL':
            return {
                ...state,
                errorMessage: action.payload,
            }
        default:
            return state;

    }

}

export default userReducer;