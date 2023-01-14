import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import Countdown from "../UI/Countdown"

const NewItems = () => {
  const [newItems, setNewItems] = useState([])
  const [loading, setLoading] = useState(true)

  async function getNewItems() {
    await axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      )
      .then(res => setNewItems(res.data))

    setLoading(false)
  }

  useEffect(() => {
    getNewItems()
  }, [])

  return (
    <section
      id="section-items"
      className="no-bottom"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".swiper-button-next-newItems",
                prevEl: ".swiper-button-prev-newItems",
              }}
              loop={true}
              spaceBetween={10}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 2,
                },
                1040: {
                  slidesPerView: 4,
                },
              }}
            >
              {loading
                ? new Array(4).fill(0).map((_, index) => (
                    <SwiperSlide key={index}>
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <div
                            className="lazy skeletonLoading"
                            alt=""
                            style={{ height: "50px", borderRadius: "50%" }}
                          />
                          <i className="fa fa-check"></i>
                        </div>
                        <div
                          className="de_countdown skeletonLoading"
                          style={{
                            position: "absolute",
                            height: "32px",
                            width: "113px",
                            border: "none",
                          }}
                        />

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

                          <div
                            className="lazy nft__item_preview skeletonLoading"
                            alt=""
                            style={{
                              height: "230px",
                              width: "100%",
                              borderRadius: "10%",
                            }}
                          />
                        </div>
                        <div className="nft__item_info">
                          <h4
                            className="skeletonLoading"
                            style={{
                              height: "20px",
                              width: "100px",
                            }}
                          />
                          <div
                            className="skeletonLoading"
                            style={{
                              height: "20px",
                              width: "60px",
                            }}
                          />
                          <div
                            className="nft__item_like"
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <i className="fa fa-heart"></i>
                            <div
                              className="skeletonLoading"
                              style={{
                                height: "16px",
                                width: "16px",
                                marginLeft: "5px",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))
                : newItems.map(item => (
                    <SwiperSlide key={item.id}>
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link
                            to={`/author/${item.authorId}`}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                          >
                            <img
                              className="lazy"
                              src={item.authorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        {item.expiryDate - Date.now() > 0 && (
                          <div className="de_countdown">
                            <Countdown expiryDate={item.expiryDate} />
                          </div>
                        )}

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

                          <Link to={`/item-details/${item.nftId}`}>
                            <img
                              src={item.nftImage}
                              className="lazy nft__item_preview"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft__item_info">
                          <Link to={`/item-details/${item.nftId}`}>
                            <h4>{item.title}</h4>
                          </Link>
                          <div className="nft__item_price">
                            {item.price} ETH
                          </div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{item.likes}</span>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
            </Swiper>
            <div className="swiper-button-prev-newItems"></div>
            <div className="swiper-button-next-newItems"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewItems
