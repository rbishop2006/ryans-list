import { useSelector, useDispatch } from "react-redux"
import axios from "axios"

const GET_LISTING = "listing/GET_LISTING"

const initialState = {
  listing: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LISTING:
      return { ...state, listing: action.payload }
    default:
      return state
  }
}

function getListing(id) {
  return dispatch => {
    axios.get("/api/listing/" + id).then(resp => {
      const data = resp.data
      dispatch({
        type: GET_LISTING,
        payload: data
      })
    })
  }
}

export function useListing() {
  const dispatch = useDispatch()
  const listing = useSelector(appState => appState.ListState.listing)
  const fetchListing = id => dispatch(getListing(id))

  return { listing, fetchListing }
}
