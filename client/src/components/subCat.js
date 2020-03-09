import React, { useEffect, useState } from "react"
import { useListings, useListing } from "../hooks"
import "../styles/subCat.css"
import { Link } from "react-router-dom"
export default props => {
  const { listings, fetchListings, sendListing } = useListings()
  const { fetchListing } = useListing()
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")

  useEffect(() => {
    fetchListings(props.match.params.slug)
  }, [props.match.params])

  function handleSubmit(e) {
    e.preventDefault()
    sendListing(props.match.params.slug, title, desc)
  }

  return (
    <div className="">
      <div className="subCatsHeaderWrapper">
        <h1>{listings.length > 0 && listings[0].name}</h1>
        <h1>post a new listing</h1>
      </div>
      <div className="subCatWrapper">
        <div className="subCatInfo">
          {listings.map(listing => (
            <div className="subCatTextInfo" key={"listing" + listing.id}>
              <Link
                className="subCatLinkInfo"
                onClick={e => fetchListing(listing.id)}
                to={{ pathname: "/listing/" + listing.id }}
              >
                <h3 className="subCatTextInfo">{listing.listing_name}</h3>
              </Link>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="subCatForm">
          <input
            className="subCatFormTitle"
            type="text"
            placeholder="ex. canoeing, running, hiking, etc."
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
          <textarea
            className="subCatFormTextarea"
            placeholder="ex. Canoeing is my passion, I'd like to find a group to organize trips ...."
            onChange={e => setDesc(e.target.value)}
            value={desc}
          ></textarea>
          <button className="subCatFormSubmit">Submit</button>
        </form>
      </div>
    </div>
  )
}
