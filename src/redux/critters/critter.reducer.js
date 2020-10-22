const INITIAL_STATE = {
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
