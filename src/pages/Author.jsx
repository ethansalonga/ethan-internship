import React, { useEffect, useState } from "react"
import AuthorBanner from "../images/author_banner.jpg"
import AuthorItems from "../components/author/AuthorItems"
import { Link } from "react-router-dom"
import AuthorImage from "../images/author_thumbnail.jpg"
import axios from "axios"

const Author = () => {
  const authorId = window.location.pathname.split("/").pop()
  const [author, setAuthor] = useState()
  const [followers, setFollowers] = useState(0)
  const [isFollowing, setIsFollowing] = useState(false)
  const [loading, setLoading] = useState(true)

  async function getAuthor() {
    await axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      )
      .then(res => {
        setAuthor(res.data)
        setFollowers(res.data.followers)
      })

    setLoading(false)
  }

  function handleFollow() {
    if (!isFollowing) {
      setFollowers(prev => prev + 1)
    } else {
      setFollowers(prev => prev - 1)
    }

    setIsFollowing(prev => !prev)
  }

  useEffect(() => {
    getAuthor()
  }, [])

  useEffect(() => {
    console.log(author)
  }, [author])

  return (
    <div id="wrapper">
      <div
        className="no-bottom no-top"
        id="content"
      >
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              {loading ? (
                <>
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <img
                            src={AuthorImage}
                            alt=""
                          />

                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              Monica Lucas
                              <span className="profile_username">
                                @monicaaaa
                              </span>
                              <span
                                id="wallet"
                                className="profile_wallet"
                              >
                                UDHUHWudhwd78wdt7edb32uidbwyuidhg7wUHIFUHWewiqdj87dy7
                              </span>
                              <button
                                id="btn_copy"
                                title="Copy Text"
                              >
                                Copy
                              </button>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">573 followers</div>
                          <Link
                            to="#"
                            className="btn-main"
                          >
                            Follow
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="de_tab tab_simple">
                      <AuthorItems />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <img
                            src={author.authorImage}
                            alt=""
                          />

                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {author.authorName}
                              <span className="profile_username">
                                {author.tag}
                              </span>
                              <span
                                id="wallet"
                                className="profile_wallet"
                              >
                                {author.address}
                              </span>
                              <button
                                id="btn_copy"
                                title="Copy Text"
                              >
                                Copy
                              </button>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">
                            {followers} followers
                          </div>
                          <button
                            className="btn-main"
                            onClick={handleFollow}
                          >
                            {isFollowing ? "Unfollow" : "Follow"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="de_tab tab_simple">
                      <AuthorItems nftCollection={author.nftCollection} />
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

export default Author
