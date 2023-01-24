import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([])
  const [loading, setLoading] = useState([])

  async function getTopSellers() {
    await axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      )
      .then(res => setTopSellers(res.data))

    setLoading(false)
  }

  useEffect(() => {
    getTopSellers()
  }, [])

  return (
    <section
      id="section-popular"
      className="pb-5"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div
              className="text-center"
              data-aos="fade-in"
            >
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div
            className="col-md-12"
            data-aos="fade-in"
          >
            <ol className="author_list">
              {loading
                ? new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <div
                          className="lazy pp-author skeletonLoading"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                        />
                        <i className="fa fa-check"></i>
                      </div>
                      <div
                        className="author_list_info"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "4px",
                        }}
                      >
                        <div
                          className="skeletonLoading"
                          style={{ width: "100px", height: "20px" }}
                        />
                        <span
                          className="skeletonLoading"
                          style={{
                            display: "inline-block",
                            width: "40px",
                            height: "20px",
                          }}
                        ></span>
                      </div>
                    </li>
                  ))
                : topSellers.map(author => (
                    <li key={author.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${author.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={author.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${author.authorId}`}>
                          {author.authorName}
                        </Link>
                        <span>{author.price}</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TopSellers
