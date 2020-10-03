const INITIAL_STATE = {
    name: '',
    birthDate: null,
    islandName: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_BDATE':
            return {
                ...state,
                birthDate: action.payload
            }
        case 'SET_NAME':
            return {
                ...state,
                name: action.payload
            }
        case 'SET_ISLAND_NAME':
                return {
                    ...state,
                    islandName: action.payload
                }
        default:
            return state;

    }

}

export default userReducer;