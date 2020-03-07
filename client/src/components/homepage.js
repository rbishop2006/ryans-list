import React from "react"
import { useAllCats, useListings } from "../hooks"
import "../styles/homepage.css"
import { Link } from "react-router-dom"
export default props => {
  const { cats } = useAllCats()
  const { fetchListings } = useListings()
  return (
    <div className="catsWrapper">
      {cats.map(cat => (
        <div className="catsBox" key={"cat" + cat.id}>
          <h3 className="catsHeader">{cat.name}</h3>
          {cat.subCats.map(subCat => (
            <Link
              onClick={e => fetchListings(subCat.slug)}
              to={{ pathname: "/subCat/" + subCat.slug }}
            >
              <p className="catsSubCats" key={"subCats" + subCat.id}>
                {subCat.name}{" "}
              </p>
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}
