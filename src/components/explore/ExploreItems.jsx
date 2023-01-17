import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
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

  async function handleFilter(filterOption) {
    await axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filterOption}`
      )
      .then(res => {
        setItems(res.data)
        setItemsShown(res.data.slice(0, 8))
      })
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
          onChange={e => handleFilter(e.target.value)}
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
              <div
                className="nft__item skeletonLoading"
                style={{ width: "306px", height: "440px" }}
              />
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
      {!loading && itemsShown.length < 16 && (
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
