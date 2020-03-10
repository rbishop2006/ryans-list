import React, { useEffect, useState } from "react"
import { useListings, useListing } from "../hooks"
import "../styles/subCat.css"
import { Link } from "react-router-dom"
import moment from "moment"
export default props => {
  const { listings, fetchListings, sendListing } = useListings()

  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [city, setCity] = useState("")
  const [location, setLocation] = useState("")
  const [price, setPrice] = useState("")

  useEffect(() => {
    fetchListings(props.match.params.slug)
  }, [props.match.params])

  function handleSubmit(e) {
    e.preventDefault()
    sendListing(props.match.params.slug, title, desc, city, location, price)
    setTitle("")
    setDesc("")
    setCity("")
    setLocation("")
    setPrice("")
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
                to={{ pathname: "/listing/" + listing.id }}
              >
                <h3 className="subCatTextInfo">
                  {listing.listing_name} -- {listing.price}
                </h3>
                <p className="subCatLocationTime">
                  ({listing.location}) {moment(listing.time_stamp).fromNow()}
                </p>
              </Link>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="subCatForm">
          <label className="subCatLabels" htmlFor="title">
            title
          </label>
          <input
            className="subCatFormTitle"
            id="title"
            type="text"
            placeholder="ex. canoeing, running, hiking, etc."
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
          <label className="subCatLabels" htmlFor="city">
            city
          </label>
          <input
            className="subCatFormTitle"
            id="city"
            type="text"
            placeholder="ex. Las Vegas"
            onChange={e => setCity(e.target.value)}
            value={city}
          />
          <label className="subCatLabels" htmlFor="location">
            location
          </label>
          <input
            className="subCatFormTitle"
            id="location"
            type="text"
            placeholder="ex. Summerlin"
            onChange={e => setLocation(e.target.value)}
            value={location}
          />
          <label className="subCatLabels" htmlFor="price">
            price
          </label>
          <input
            className="subCatFormPrice"
            id="price"
            type="text"
            placeholder="ex. Free or $5.00 per class"
            onChange={e => setPrice(e.target.value)}
            value={price}
          ></input>
          <label className="subCatLabels" htmlFor="Description">
            description
          </label>
          <textarea
            className="subCatFormTextarea"
            id="Description"
            placeholder="ex. Canoeing is my passion, I'd like to find a group to organize trips ...."
            onChange={e => setDesc(e.target.value)}
            value={desc}
          ></textarea>
          <button className="subCatFormSubmit">Submit</button>
        </form>
      </div>
      <div>
        <Link className="subCatLinkHomepage" to="/">
          <h3 className="subCatHomepage">back to homepage</h3>
        </Link>
      </div>
    </div>
  )
}
