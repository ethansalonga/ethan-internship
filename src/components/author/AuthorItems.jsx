import React from "react"
import NftItem from "../UI/NftItem"

const AuthorItems = ({ nftCollection = null, authorImage = null }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {nftCollection
            ? nftCollection.map((item, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <NftItem
                    item={item}
                    authorImage={authorImage}
                  />
                </div>
              ))
            : new Array(8).fill(0).map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div
                    className="nft__item skeletonLoading"
                    style={{ width: "306px", height: "440px" }}
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  )
}

export default AuthorItems
