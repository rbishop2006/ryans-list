import React, { useEffect } from "react"
import { useListing } from "../hooks"
import { Link } from "react-router-dom"
import "../styles/listing.css"
import moment from "moment"
export default props => {
  const { listing, fetchListing } = useListing()
  useEffect(() => {
    fetchListing(props.match.params.id)
  }, [props.match.params])
  return (
    <div>
      {listing.map(listing => (
        <div key={"listing" + listing.id}>
          <h5 className="listingTimeStamp">
            posted {moment(listing.time_stamp).fromNow()}
          </h5>
          <div className="listingLeftSide">
            <h3 className="listingName">
              {listing.listing_name} -- {listing.price}
            </h3>
            <img src="https://place-hold.it/400x300" />
            <p className="listingDesc">{listing.desc}</p>

            <p className="listingLocationCity">
              ({listing.location}) {listing.city}
            </p>
            <Link className="listingLinkHomepage" to="/">
              <h3 className="listingHomepage">back to homepage</h3>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
