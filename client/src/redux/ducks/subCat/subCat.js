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
    case GET_LISTINGS:
      return { ...state, form: action.payload }
    default:
      return state
  }
}

function getListings(slug) {
  return dispatch => {
    axios.get("/api/subCat/" + slug).then(resp => {
      const data = resp.data
      dispatch({
        type: GET_LISTINGS,
        payload: data
      })
    })
  }
}

function postListing(slug, title, desc, city, location, price) {
  return dispatch => {
    axios
      .post("/api/subCat/" + slug, { title, desc, city, location, price })
      .then(resp => {
        dispatch(getListings(slug))
      })
  }
}

export function useListings() {
  const dispatch = useDispatch()
  const listings = useSelector(appState => appState.ListingState.listings)
  const fetchListings = slug => dispatch(getListings(slug))
  const sendListing = (slug, title, desc, city, location, price) =>
    dispatch(postListing(slug, title, desc, city, location, price))

  return { listings, fetchListings, sendListing }
}
