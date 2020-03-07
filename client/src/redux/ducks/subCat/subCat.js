import { useSelector, useDispatch } from "react-redux"
import axios from "axios"

const GET_LISTINGS = "subCat/GET_LISTINGS"

const initialState = {
  listings: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LISTINGS:
      return { ...state, listings: action.payload }
    default:
      return state
  }
}

function getListings(slug) {
  return dispatch => {
    axios.get("/api/subCat/" + slug).then(resp => {
      const data = resp.data
      console.log(data)
      dispatch({
        type: GET_LISTINGS,
        payload: data
      })
    })
  }
}

export function useListings() {
  const dispatch = useDispatch()
  const listings = useSelector(appState => appState.ListingState.listings)
  const fetchListings = slug => dispatch(getListings(slug))

  return { listings, fetchListings }
}
