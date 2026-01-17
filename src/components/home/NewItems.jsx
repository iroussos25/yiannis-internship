import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Countdown from "../timer";

const NewItems = () => {

const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);


useEffect(() => {

const fetchUsers = async() => {
setLoading(true);

const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems')
setUsers(response.data)
console.log(response.data);
setLoading(false);
}

fetchUsers();
}, [])


return (

<section id="section-items" className="no-bottom">
<div className="container">
<div className="row">
<div className="col-lg-12">
<div className="text-center">
<h2>New Items</h2>
<div className="small-border bg-color-2"></div>
</div>
</div>

{loading 
?         
new Array(4).fill(0).map((_, index) => (
<div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
<div className="nft__item">
<div className="author_list_pp">
<div className="lazy skeleton" style={{width: '50px', height: '50px', borderRadius: '50%'}}></div>
</div>
<div className="de_countdown skeleton" style={{width: '80px', height: '20px'}}></div>
</div>
</div>
))
: (

users.map((user) => (

<div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={user.authorId}>
<div className="nft__item">
  <Countdown deadline={user.expiryDate}/>
<div className="author_list_pp">
<Link
to="/author"
data-bs-toggle="tooltip"
data-bs-placement="top"
title="Creator: Monica Lucas"
>
<img className="lazy" src={user.authorImage} alt="" />
<i className="fa fa-check"></i>
</Link>
</div>
{/* <div className="de_countdown"></div> */}

<div className="nft__item_wrap">
<div className="nft__item_extra">
<div className="nft__item_buttons">
<button>Buy Now</button>
<div className="nft__item_share">
        <h4>Share</h4>
        <a href="" target="_blank" rel="noreferrer">
          <i className="fa fa-facebook fa-lg"></i>
          </a>
          <a href="" target="_blank" rel="noreferrer">
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
          src={user.nftImage}
          className="lazy nft__item_preview"
      alt=""
      />
      </Link>
      </div>
      <div className="nft__item_info">
      <Link to="/item-details">
      <h4>{user.title}</h4>
      </Link>
    <div className="nft__item_price">{user.price} ETH</div>
  <div className="nft__item_like">
  <i className="fa fa-heart"></i>
    <span>{user.likes}</span>
  </div>
  </div>
  </div>
  </div>
))
)}

</div>
</div>
</section>
);
};

export default NewItems;
