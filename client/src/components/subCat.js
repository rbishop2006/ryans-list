import React, { useEffect, useState } from "react"
import { useListings, useListing } from "../hooks"
import "../styles/subCat.css"
import { Link } from "react-router-dom"
import moment from "moment"
import validator from "validator"
export default props => {
  const { listings, fetchListings, sendListing } = useListings()
  const [title, setTitle] = useState("")
  const [titleError, setTitleError] = useState("")
  const [city, setCity] = useState("")
  const [cityError, setCityError] = useState("")
  const [location, setLocation] = useState("")
  const [locationError, setLocationError] = useState("")
  const [price, setPrice] = useState("")
  const [priceError, setPriceError] = useState("")
  const [desc, setDesc] = useState("")
  const [descError, setDescError] = useState("")

  useEffect(() => {
    fetchListings(props.match.params.slug)
  }, [props.match.params])

  function handleSubmit(e) {
    e.preventDefault()

    let valid = true

    if (validator.isEmpty(title)) {
      valid = false
      setTitleError(
        "-- Cannot be blank, must contain letters and/or numbers only"
      )
    } else {
      setTitleError("")
    }
    if (validator.isEmpty(city)) {
      valid = false
      setCityError("-- Cannot be blank, must contain letters only")
    } else {
      setCityError("")
    }
    if (validator.isEmpty(location)) {
      valid = false
      setLocationError("-- Cannot be blank, must contain letters only")
    } else {
      setLocationError("")
    }
    if (validator.isEmpty(price)) {
      setPriceError(
        "-- Cannot be blank, must contain letters and/or numbers only"
      )
    } else {
      setPriceError("")
    }
    if (validator.isEmpty(desc)) {
      setDescError("-- Cannot be blank, must contain letters/numbers only")
    } else {
      setDescError("")
    }

    if (valid) {
      sendListing(props.match.params.slug, title, desc, city, location, price)
      setTitle("")
      setCity("")
      setLocation("")
      setPrice("")
      setDesc("")
    }
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
          <label className={titleError ? "error" : ""} htmlFor="title">
            title {titleError && titleError}
          </label>
          <input
            className={titleError ? "errorBox" : ""}
            id="title"
            type="text"
            placeholder="ex. canoeing, running, hiking, etc."
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
          <label className={cityError ? "error" : ""} htmlFor="city">
            city {cityError && cityError}
          </label>
          <input
            className={cityError ? "errorBox" : ""}
            id="city"
            type="text"
            placeholder="ex. Las Vegas"
            onChange={e => setCity(e.target.value)}
            value={city}
          />
          <label className={locationError ? "error" : ""} htmlFor="location">
            location {locationError && locationError}
          </label>
          <input
            className={locationError ? "errorBox" : ""}
            id="location"
            type="text"
            placeholder="ex. Summerlin"
            onChange={e => setLocation(e.target.value)}
            value={location}
          />
          <label className={priceError ? "error" : ""} htmlFor="price">
            price {priceError && priceError}
          </label>
          <input
            className={priceError ? "errorBox" : ""}
            id="price"
            type="text"
            placeholder="ex. Free or $5.00 per class"
            onChange={e => setPrice(e.target.value)}
            value={price}
          ></input>
          <label className={descError ? "error" : ""} htmlFor="Description">
            description {descError && descError}
          </label>
          <textarea
            className={descError ? "errorBox" : ""}
            id="Description"
            placeholder="ex. Canoeing is my passion, I'd like to find a group to organize trips ...."
            onChange={e => setDesc(e.target.value)}
            value={desc}
          ></textarea>
          <button type="submit" className="subCatFormSubmit">
            Submit
          </button>
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
