import React, { useEffect, useState } from "react"
import { useListings, useListing } from "../hooks"
import "../styles/subCat.css"
import { Link } from "react-router-dom"
export default props => {
  const { listings, fetchListings, sendListing } = useListings()
  const { fetchListing } = useListing()
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const subCat = listings.length > 0 && listings[0].subCat_id

  const form = {
    title: title,
    subCat_id: subCat,
    desc: desc
  }

  useEffect(() => {
    fetchListings(props.match.params.slug)
  }, [props.match.params])

  console.log(form)

  const handleSubmit = (title, subCat, desc) => {
    sendListing(title, subCat, desc)
  }

  return (
    <div>
      <div className="">
        <h1>{listings.length > 0 && listings[0].name}</h1>
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
      <form>
        <input
          type="text"
          placeholder="Title"
          onChange={e => setTitle(e.target.value)}
          value={title}
        />
        <textarea
          placeholder="Description"
          onChange={e => setDesc(e.target.value)}
          value={desc}
        ></textarea>
        <button onSubmit={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}
