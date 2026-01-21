import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {  Box, Skeleton } from "@mui/material";
import "aos/dist/aos.css"
import Aos from "aos";

const TopSellers = () => {

  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
        Aos.init({
          duration: 2000,
          once: true,
        });
        Aos.refresh();
      }, []);

  useEffect(() => {
    const fetchSellers = async() => {
setLoading(true);

const response = await axios.get('/topSellers')
setSellers(response.data)
setLoading(false);
}

fetchSellers();
}, [])
  

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row" data-aos="fade-in">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">

              {loading 
              ?
              new Array(12).fill(0).map((_, index) => (
        
        <li key= {index}>
          <Box display="flex" gap='4px' alignItems="center" columnGap="4px">

          <div classname="author_list_pp">
            <Skeleton animation="wave" variant="circular" sx={{marginRight:'0px'}} width={50} height={50} />
          </div>
          <div className="author_list_info">
            <Skeleton animation="wave" variant="text" width="100px" sx={{marginLeft:'-20px', fontSize: '1rem'}} />
            <Skeleton animation="wave" variant="text" width="40px" sx={{marginLeft:'-20px', fontSize: '0.8rem'}} />
          </div>
          </Box>
        </li>

              ))
              : (
                sellers.map((seller) => (
                  
                  <li key={seller.id}>
                  <div className="author_list_pp">
                    <Link to={`/author/${seller.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={seller.authorImage}
                        alt=""
                        />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${seller.authorId}`}>{seller.authorName}</Link>
                    <span>{seller.price} ETH</span>
                  </div>
                </li>
                      ))
                    )
            }
              </ol>
              </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
