import React from "react"
import { useAllCats } from "../hooks"
import "../styles/homepage.css"
import { Link } from "react-router-dom"
export default props => {
  const { cats } = useAllCats()
  return (
    <div>
      <div className="outerWrapper">
        <p className="ryansList">ryanslist</p>
        <p className="lasVegas"> las vegas</p>
        <p className="nearbyCl">nearby cl</p>
      </div>
      <div className="wrapper">
        <div className="leftSidebar"></div>
        <div className="catsWrapper">
          {cats.map(cat => (
            <div className="catsBox" key={"cat" + cat.id}>
              <p className="catsHeader">{cat.name}</p>
              {cat.subCats.map(subCat => (
                <Link
                  className="catsLinks"
                  to={{ pathname: "/subCat/" + subCat.slug }}
                  key={"subCat" + subCat.id}
                >
                  <p className="catsSubCats" key={"subCats" + subCat.id}>
                    {subCat.name}{" "}
                  </p>
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="rightSidebar"></div>
      </div>
    </div>
  )
}
