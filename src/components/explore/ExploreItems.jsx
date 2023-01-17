import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import AuthorImage from "../../images/author_thumbnail.jpg"
import nftImage from "../../images/nftImage.jpg"
import axios from "axios"
import NftItem from "../UI/NftItem"

const ExploreItems = () => {
  const [items, setItems] = useState([])
  const [itemsShown, setItemsShown] = useState([])
  const [loading, setLoading] = useState(true)

  async function getItems() {
    await axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore")
      .then(res => {
        setItems(res.data)
        setItemsShown(res.data.slice(0, 8))
      })

    setLoading(false)
  }

  function loadMore() {
    if (itemsShown.length === 8) {
      setItemsShown(items.slice(0, 12))
    } else {
      setItemsShown(items.slice(0, 16))
    }
  }

  useEffect(() => {
    getItems()
  }, [])

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading
        ? new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to="/author"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img
                      className="lazy"
                      src={AuthorImage}
                      alt=""
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="de_countdown">5h 30m 32s</div>

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a
                          href=""
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a
                          href=""
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to="/item-details">
                    <img
                      src={nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>Pinky Ocean</h4>
                  </Link>
                  <div className="nft__item_price">1.74 ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>69</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        : itemsShown.map(item => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NftItem item={item} />
            </div>
          ))}
      {itemsShown.length < 16 && (
        <div className="col-md-12 text-center">
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={loadMore}
          >
            Load more
          </Link>
        </div>
      )}
    </>
  )
}

export default ExploreItems
