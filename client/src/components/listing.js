import React from "react"
import { useListing } from "../hooks"
import "../styles/listing.css"
export default props => {
  const { listing } = useListing()
  return (
    <div>
      {listing.map(listing => (
        <div key={"listing" + listing.id}>
          <h3>{listing.listing_name}</h3>
          <p>{listing.desc}</p>
        </div>
      ))}
    </div>
  )
}
