const INITIAL_STATE = {
  critterType: '',
  critters: [],
  loading: false,
  isError: false,
  message: "",
  apiUrl: "",
  currentPage: 0,
  totalRecords: 0,
}

const critterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CRITTER_TYPE":
      return {
        ...state,
        critterType: action.payload,
      }
    case 'REMOVE_CRITTER':
      const crittersCopy = state.critters;
      if (crittersCopy.length > 0) {
          var foundIndex = crittersCopy.findIndex(f=> `${state.critterType}-${f.id}` === action.payload.id);
          crittersCopy.splice(foundIndex, 1);
          return {
              ...state,
              isError: false,
              critters: crittersCopy
          }
      } else {
          return {
              ...state,
              isError: true,
              message: 'Item not found!'
          }
      }
    case "FETCH_CRITTERS_REQUEST":
      return {
        ...state,
        isError: false,
        loading: true,
        message: "",
        apiUrl: action.payload,
      }
    case "FETCH_CRITTERS_SUCCESS":
      return {
        ...state,
        isError: false,
        loading: false,
        message: "",
        critters: action.payload,
        currentPage: action.payload && action.payload.length > 0 ? 1 : 0, 
        totalRecords: action.payload.length,
      }
    case "FETCH_CRITTERS_FAIL":
      return {
        ...state,
        isError: true,
        loading: false,
        message: action.payload,
      }
    case "SET_CRITTER_CURRENTPAGE":
      return {
          ...state,
          currentPage: action.payload,
      }
    case "SET_CRITTER_TOTALPAGE":
      return {
          ...state,
          totalRecords: action.payload,
      }
    default:
      return state
  }
}

export default critterReducer
