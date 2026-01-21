import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
const { id } = useParams();
const [item, setItem] = useState(null)
const [loading, setLoading] = useState(true)

useEffect(() => {
window.scrollTo(0, 0);

async function fetchData() {
  if (!id) {
    console.error("No ID found in URL");
    return;
  }
  setLoading(true);
  try {

    const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`)
    const data = (response.data)
    console.log("Fetched Data for ID:", id, response.data)
    setItem(Array.isArray(data) ? data[0] : data);
  } catch (error) {
    console.error("Error fetching item details:", error)
  }
  finally
   {
    setLoading(false);
    
  }
  
}
fetchData();
}, [id]);

if (loading || !item) {
  return (
    <div id="wrapper">
      <div className="container text-center" style={{padding: '100px'}}>
        <h2>Loading Item Details...</h2>
      </div>
    </div>
  );
}
return (
<div id="wrapper">

<div className="no-bottom no-top" id="content">
<div id="top"></div>
<section aria-label="section" className="mt90 sm-mt-0">
<div className="container">
<div className="row">
<div className="col-md-6 text-center">
  <img
    src={item.nftImage}
    className="img-fluid img-rounded mb-sm-30 nft-image"
    alt={item.title}
  />
  
  </div>


<div className="col-md-6">
  <div className="item_info">
    <h2>{item.title} #{item.nftId}</h2>

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
    <p>
      doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
      illo inventore veritatis et quasi architecto beatae vitae
      dicta sunt explicabo.
    </p>
    <div className="d-flex flex-row">
      <div className="mr40">
        <h6>Owner</h6>
        <div className="item_author">
          <div className="author_list_pp">
            <Link to={`/author/${item.ownerId}`}>
              <img className="lazy" src={item.authorImage} alt="" />
              <i className="fa fa-check"></i>
            </Link>
          </div>
          <div className="author_list_info">
            <Link to={`/author/${item.ownerId}`}>Monica Lucas</Link>
          </div>
        </div>
      </div>
    </div>
    <div className="de_tab tab_simple">
      <div className="de_tab_content">
        <h6>Creator</h6>
        <div className="item_author">
          <div className="author_list_pp">
            <Link to={`/author/${item.creatorId}`}>
              <img className="lazy" src={item.creatorImage} alt="" />
              <i className="fa fa-check"></i>
            </Link>
          </div>
          <div className="author_list_info">
            <Link to={`/author/${item.creatorId}`}>Monica Lucas</Link>
          </div>
        </div>
      </div>
      <div className="spacer-40"></div>
      <h6>Price</h6>
      <div className="nft-item-price">
        <img src={EthImage} alt="" />
        <span>{item.price}</span>
      </div>
    </div>
  </div>
</div>
</div>
</div>
</section>
</div>

</div>

)
};

export default ItemDetails;
