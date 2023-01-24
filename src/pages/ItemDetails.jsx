import React, { useEffect, useState } from "react"
import EthImage from "../images/ethereum.svg"
import { Link } from "react-router-dom"
import axios from "axios"

const ItemDetails = () => {
  const itemId = window.location.pathname.split("/").pop()
  const [item, setItem] = useState()
  const [loading, setLoading] = useState(true)

  async function getItem() {
    await axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${itemId}`
      )
      .then(res => {
        setItem(res.data)
      })

    setLoading(false)
  }

  useEffect(() => {
    getItem()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div id="wrapper">
      <div
        className="no-bottom no-top"
        id="content"
      >
        <div id="top"></div>
        <section
          aria-label="section"
          className="mt90 sm-mt-0"
        >
          <div className="container">
            <div className="row">
              {loading ? (
                <>
                  <div className="col-md-6 text-center">
                    <div
                      className="img-fluid img-rounded mb-sm-30 nft-image skeletonLoading"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2
                        className="skeletonLoading"
                        style={{ width: "526px", height: "46px" }}
                      />

                      <div className="item_info_counts">
                        <div className="item_info_views skeletonLoading">
                          <i className="fa fa-eye"></i>
                        </div>
                        <div className="item_info_like skeletonLoading">
                          <i className="fa fa-heart"></i>
                        </div>
                      </div>
                      <p
                        className="skeletonLoading"
                        style={{ width: "526px", height: "78px" }}
                      />
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <div
                                className="lazy skeletonLoading"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "100%",
                                }}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </div>
                            <div className="author_list_info">
                              <div
                                className="skeletonLoading"
                                style={{ width: "106px", height: "26px" }}
                              />
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <div
                                className="lazy skeletonLoading"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "100%",
                                }}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </div>
                            <div className="author_list_info">
                              <div
                                className="skeletonLoading"
                                style={{ width: "106px", height: "26px" }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img
                            src={EthImage}
                            alt=""
                          />
                          <span
                            className="skeletonLoading"
                            style={{
                              width: "61px",
                              height: "20px",
                              display: "inline-block",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-6 text-center">
                    <img
                      src={item.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>
                        {item.title} #{item.tag}
                      </h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {item.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {item.likes}
                        </div>
                      </div>
                      <p>{item.description}</p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${item.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={item.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${item.ownerId}`}>
                                {item.ownerName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${item.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={item.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${item.creatorId}`}>
                                {item.creatorName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img
                            src={EthImage}
                            alt=""
                          />
                          <span>{item.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ItemDetails
