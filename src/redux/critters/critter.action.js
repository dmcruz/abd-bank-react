export const fetchCrittersRequest = (apiUrl) => ({
  type: "FETCH_CRITTERS_REQUEST",
  payload: apiUrl
})

export const fetchCrittersSuccess = (critters) => ({
  type: "FETCH_CRITTERS_SUCCESS",
  payload: critters,
})

export const fetchCrittersFail = (message) => ({
  type: "FETCH_CRITTERS_FAIL",
  payload: message,
})

export const setCritterCurrentPage = (currentPage) => ({
  type: "SET_CRITTER_CURRENTPAGE",
  payload: currentPage,
})

export const removeCritter = (critter) => ({
  type: "REMOVE_CRITTER",
  payload: critter,
})

export const setCritterType = (type) => ({
  type: "SET_CRITTER_TYPE",
  payload: type,
})
