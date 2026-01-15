import React from 'react'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function hotCarousel() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
  }
  return (
    <Carousel {...settings}>
       <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={user.id}>
                    <div className="nft_coll">
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
    </Carousel>
  )
}