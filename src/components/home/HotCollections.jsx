import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
import { Box, Skeleton, Stack } from "@mui/material";



const HotCollections = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  
  useEffect(() => {
    
    const fetchUsers = async() => {
      setLoading(true);
      
      const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections')
      await new Promise(res => setTimeout(res, 5000));
      setUsers(response.data)
      setLoading(false);
    }
  
      fetchUsers();
    }, [])
  
  
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slideToScroll: 1,
          
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slideToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slideToScroll: 1,
        }
      }
    ]
  };
  
  return (
      loading ? (
        <Stack spacing={6}>
          <Skeleton variant="text" height={48} width = "80%"/>
          <Skeleton variant="rectangular" width="80%" height={200} />
        <Box sx={{ display: 'flex', gap: 10 }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} />

        </Box>
        </Stack>

      ) : (
                  
          <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

           <Slider {...settings}> 

        {users.map((user) => (
          
          <div  key={user.id}>
              <div>
                <div className="nft_wrap">
                  <Link to={`/item-details/${user.nftId}`}>
                   <img src={user.nftImage} className="lazy img-fluid" alt="" />
                   </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={user.authorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{user.title}</h4>
                  </Link>
                  <span>ERC-{user.code}</span>
                </div>
              </div>
            </div>
))
}          
</Slider>
        </div>
      </div>
    </section>
  )
    
    )
  }
  
  








export default HotCollections;
