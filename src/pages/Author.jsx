import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Author = () => {

const { id } = useParams();
const [author, setAuthor] = useState(null)
const [copyStatus, setCopyStatus] = useState("Copy");

const handleCopy = () => {
  const textToCopy = author.address || author?.[0]?.address;
  if (textToCopy) {
    navigator.clipboard.writeText(textToCopy)
    .then(() => {
    setCopyStatus("Copied!");
    setTimeout(() => setCopyStatus("Copy"), 4000);
  })
  .catch((err) => {
    console.error("Failed to copy text:", err)
  });
  
}else{
  console.error("Copy failed: Address not found")
}
}


useEffect(() => {
  window.scrollTo(0, 0);
  
  async function fetchData() {
    const response = await axios.get(`/authors?author=${id}`)
    const data = response.data;
    setAuthor(Array.isArray(data) ? data : [data])
    
  }
  fetchData();
}, [id]);

if (!author) return <div className="container">Loading...</div>;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        {author.map((author, index) => (
          <React.Fragment key={index}>
          
          <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage={author.nftCollection?.[0]?.nftId}
          style={{ background: `url(${author.nftCollection?.[0]?.nftImage || AuthorBanner}) top` }}
          ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={author.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author.authorName}
                          <span className="profile_username">{author.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {author.address}
                          </span>
                          <button id="btn_copy" title="Copy Text" onClick={handleCopy}>
                            {copyStatus}
                            </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{author.followers} followers</div>
                      <Link to="#" className="btn-main">
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
            </div>
          </div>
        </section>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Author;
