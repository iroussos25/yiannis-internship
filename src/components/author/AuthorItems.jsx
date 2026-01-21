import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {  Skeleton } from "@mui/material";

const AuthorItems = () => {

  const { id } = useParams();
const [author, setAuthor] = useState(null)
const [loading, setLoading] = useState(true)


useEffect(() => {
window.scrollTo(0, 0);

async function fetchData() {
  setLoading(true);
const response = await axios.get(`/authors?author=${id}`)
const data = response.data;
setAuthor(Array.isArray(data) ? data[0] : data)
setLoading(false);

}
fetchData();
}, [id]);

  return (
   
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading ? 
          new Array(8).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
            <Skeleton variant="rectangular" width='100%' height='250px'sx={{ borderRadius: '8px', mb: 2}} />
            <Skeleton variant="text" width='60%' />
            <Skeleton variant="text" width='40%' />
            </div>
         
           )) : 
           
           author?.nftCollection?.map((nft, index) => (
           <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
            <div className="nft__item">
            <div className="author_list_pp">
            <Link to="">
            <img className="lazy" src={author.authorImage} alt="" />
            <i className="fa fa-check"></i>
            </Link>
            </div>
            <div className="nft__item_wrap">
            <div className="nft__item_extra">
            </div>
            <Link to={`/item-details/${nft.nftId}`}>
            <img
            src={nft.nftImage}
            className="lazy nft__item_preview"
            alt=""
            />
            </Link>
            </div>
            <div className="nft__item_info">
            <Link to={`/item-details/${nft.nftId}`}>
            <h4>{nft.title}</h4>
            </Link>
            <div className="nft__item_price">{nft.price} ETH</div>
            <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{nft.likes}</span>
            </div>
            </div>
            </div>
            </div>
          )) }
          
          </div>
          </div>
          </div>
        
      );
    };

export default AuthorItems;
