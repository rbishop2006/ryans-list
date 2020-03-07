import React from "react"
import { Route } from "react-router-dom"
import Homepage from "./homepage"
import SubCat from "./subCat"
import Listing from "./listing"

export default props => {
  return (
    <div>
      <Route exact path="/" component={Homepage}></Route>
      <Route path="/subCat/:slug" component={SubCat}></Route>
      <Route path="/listing/:id" component={Listing}></Route>
    </div>
  )
}
