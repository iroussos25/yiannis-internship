import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Box, Skeleton } from "@mui/material";
import Countdown from "../timer";

const ExploreItems = () => {

  const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [visibleItems, setVisibleItems] = useState(8);

   const sortedItems = useMemo(() => {
  const sortType = searchParams.get("sort");
  let items = [...data]; 

  if (sortType === "price_low_to_high") {
    items.sort((a, b) => a.price - b.price);
  } else if (sortType === "price_high_to_low") {
    items.sort((a, b) => b.price - a.price);
  } else if (sortType === "likes_high_to_low") {
    items.sort((a, b) => b.likes - a.likes);
  }
  
  return items;
}, [data, searchParams]);

     const loadMore =() => {
      setVisibleItems((prevValue) => prevValue + 4)
    };

  const filterItems = (selectedValue) => {
    setSearchParams({ sort: selectedValue });
  };
   
    
    useEffect(() => {
      window.scrollTo(0, 0);
  
      const fetchData = async() => {
        setLoading(true);
  
        const response = await axios.get('/explore')
        setData(response.data) 
        console.log(response.data)
        setLoading(false)
      }
      fetchData();
    }, []);

  return (
    <>
      <div>
        <select id="filter-items" value={searchParams.get("sort") || ""} onChange={(e) => filterItems(e.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
<div className="row">

      {
        loading ?
        new Array(8).fill(0).map((_, index) => (
          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
            <Skeleton variant="rectangular" animation="wave" width="100%" height="450px" sx={{ mb: 2 }}/>
          </div>

        )) : (

          sortedItems.slice(0, visibleItems).map((data, index) => (
            <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
            >

            <div className="nft__item">
               <Countdown deadline={data.expiryDate}/>
            <div className="author_list_pp">
              <Link
                to={`/author/${data.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                >
                <img className="lazy" src={data.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>

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
              <Link to={`/item-details/${data.nftId}`}>
                <img src={data.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={`/item-details/${data.nftId}`}>
                <h4>{data.title}</h4>
              </Link>
              <div className="nft__item_price">{data.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{data.likes}</span>
              </div>
            </div>
          </div>
        </div>
          )))
      } 
        </div>
        {visibleItems < data.length && visibleItems < 16 && (
          <div className="col-md-12 text-center">

        <button  id="loadmore" className="btn-main lead" onClick={loadMore}>
          Load more
        </button>

      </div>
        )}
  
  </>
);
};

export default ExploreItems;
