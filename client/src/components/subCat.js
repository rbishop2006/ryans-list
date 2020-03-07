import React from "react"
import { useListings, useListing } from "../hooks"
import "../styles/subCat.css"
import { Link } from "react-router-dom"
export default props => {
  const { listings } = useListings()
  const { fetchListing } = useListing()
  return (
    <div className="listingsWrapper">
      {listings.map(listing => (
        <div className="" key={"listing" + listing.id}>
          <Link
            onClick={e => fetchListing(listing.id)}
            to={{ pathname: "/listing/" + listing.id }}
          >
            <h3 className="">{listing.listing_name}</h3>
          </Link>
        </div>
      ))}
    </div>
  )
}
