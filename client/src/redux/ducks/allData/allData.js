import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"

const GET_ALLCATS = "allData/GET_ALLCATS"

const initialState = {
  cats: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALLCATS:
      return { ...state, cats: action.payload }
    default:
      return state
  }
}

function getAllCats() {
  return dispatch => {
    axios.get("/api/categories").then(resp => {
      const data = resp.data.cats
      console.log(data)
      dispatch({
        type: GET_ALLCATS,
        payload: data
      })
    })
  }
}

export function useAllCats() {
  const dispatch = useDispatch()
  const cats = useSelector(appState => appState.allCatsState.cats)

  useEffect(() => {
    dispatch(getAllCats())
  }, [dispatch])

  return { cats }
}
