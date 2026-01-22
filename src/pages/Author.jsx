import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Skeleton } from "@mui/material";

const Author = () => {

  const [loading, setLoading] = useState(true)
const { id } = useParams();
const [author, setAuthor] = useState(null)
const [copyStatus, setCopyStatus] = useState("Copy");
const [isFollowing, setIsFollowing] = useState(false);
const [followerCount, setFollowerCount] = useState(0);

useEffect(() => {
  if (author) {
    const currentAuthor = Array.isArray(author) ? author[0] : author;
    if (currentAuthor) {
      setFollowerCount(currentAuthor.followers)

    }
  }
}, [author])

const toggleFollow = () => {
  if (isFollowing) {
    setFollowerCount(prev => prev - 1);

  }else{
    setFollowerCount(prev => prev + 1);
  }
  setIsFollowing(!isFollowing)
};

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
  
}
}


useEffect(() => {
  window.scrollTo(0, 0);
  
  async function fetchData() {
    setLoading(true)
    const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`)
    const data = response.data;
    setLoading(false)
    setAuthor(Array.isArray(data) ? data : [data])
    setLoading(false);
  }
  fetchData();
}, [id]);


return (
<div id="wrapper">
<div className="no-bottom no-top" id="content">
<div id="top"></div>
{loading ? (
<React.Fragment>

<section id="profile_banner" className="text-light">
<Skeleton variant="rectangular" width="100%" height="300px" animation="wave" />
</section>
<section area-label="section">
<div className="container">
<div className="row">
<div className="col-md-12">
<div className="d_profile de-flex">
  <div className="de-flex-col">
    <div className="profile_avatar">
      <Skeleton variant="circular" width={150} height={150} animation="wave" />
      <i className="fa fa-check"></i>
      <div className="profile_name">
        <h4>
          <Skeleton variant="text" width="200px" sx={{ fontSize: '2rem'}} animation="wave"/>
          <Skeleton variant="text" width="100px" sx={{ fontSize: '1.2rem'}} animation="wave" />
          <span id="wallet" className="profile_wallet">
            <Skeleton variant="text" width="250px" animation="wave"/>
            </span>
        </h4>
      </div>
    </div>
    </div>
    <div className="profile_follow de-flex">
      <div className="de-flex-col">
        <Skeleton variant="text" width="100px" sx={{ mb: 1}} animation="wave" />
        <Skeleton variant="rectangular" width="120px" height="40px" animation="wave" sx={{ borderRadius: '6px' }} />                     
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </section>
    </React.Fragment>
  )  : (

        author && author.map((authorData, index) => (
          <React.Fragment key={index}>
          <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ background: `url(${authorData.nftCollection?.[0]?.nftImage || AuthorBanner}) top` }}
></section>

<section aria-label="section">
<div className="container">
<div className="row">
<div className="col-md-12">
<div className="d_profile de-flex">
<div className="de-flex-col">
  <div className="profile_avatar">
    <img src={authorData.authorImage} alt="" />

    <i className="fa fa-check"></i>
    <div className="profile_name">
      <h4>
        {authorData.authorName}
        <span className="profile_username">@{authorData.tag}</span>
        <span id="wallet" className="profile_wallet">
          {authorData.address}
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
    <div className="profile_follower">{followerCount} followers</div>
    <Link to="#" className={isFollowing ? "btn-main btn-unfollow" : "btn-main"} onClick={toggleFollow}>
      {isFollowing ? "Unfollow" : "Follow"}
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
))
)}
      </div>
    </div>
  );
};

export default Author;
