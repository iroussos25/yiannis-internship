import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Countdown from "../timer";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
import { Box, Skeleton } from "@mui/material";
import Aos from "aos";
import "aos/dist/aos.css"

const NewItems = () => {

const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
      Aos.init({
        duration: 2000,
        once: true,
      });
      Aos.refresh();
    }, []);

useEffect(() => {

const fetchUsers = async() => {
setLoading(true);

const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems')
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
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          slideToScroll: 1,
        }
      }
    ]
  };

  
  return (
    
    <section id="section-items" className="no-bottom">
<div className="container">
<div className="row" data-aos="fade-in">
<div className="col-lg-12">
<div className="text-center">
<h2>New Items</h2>
<div className="small-border bg-color-2"></div>
</div>
</div>

{loading 
?         
new Array(4).fill(0).map((_, index) => (
  <Box key={index} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <Skeleton variant="rectangular" animation="wave" width={200} height={100} />
          <Skeleton variant="rectangular" animation="wave" width={200} height={100} />
          <Skeleton variant="rectangular" animation="wave" width={200} height={100} />
          <Skeleton variant="rectangular" animation="wave" width={200} height={100} />
        </Box>


))
: (
  <Slider {...settings}>

{users.map((user) => (
  
  <div key={user.id}>
<div className="nft__item">
  <Countdown deadline={user.expiryDate}/>
<div className="author_list_pp">
<Link
to={`/author/${user.authorId}`}
data-bs-toggle="tooltip"
data-bs-placement="top"
title="Creator: Monica Lucas"
>
<img className="lazy" src={user.authorImage} alt="" />
<i className="fa fa-check"></i>
</Link>
</div>

<div className="nft__item_wrap" >
<div className="nft__item_extra">
   </div>
     <Link to={`/item-details/${user.nftId}`}>
          <img
          src={user.nftImage}
          className="lazy nft__item_preview"
          alt="" 
          />
      </Link>
      </div>
      <div className="nft__item_info" >
      <Link to={`/item-details/${user.nftId}`}>
      <h4>{user.title}</h4>
      </Link>
    <div className="nft__item_price" >{user.price} ETH</div>
  <div className="nft__item_like">
  <i className="fa fa-heart"></i>
    <span>{user.likes}</span>
  </div>
  </div>
  </div>
  </div>
))
}
  </Slider>

)}

</div>
</div>
</section>
);
};

export default NewItems;
