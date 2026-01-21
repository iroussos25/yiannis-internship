import { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Box, Skeleton } from "@mui/material";

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

if (loading) {
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <Skeleton 
                  variant="rectangular" 
                  width="100%" 
                  height="100%" 
                  sx={{ minHeight: '450px', borderRadius: '8px' }} 
                  animation="wave" 
                />
              </div>

              <div className="col-md-6">
                <div className="item_info">
                  <Skeleton variant="text" width="80%" height={60} animation="wave" />
                  
                  <Box display="flex" gap={2} my={2}>
                    <Skeleton variant="rectangular" width={80} height={30} animation="wave" />
                    <Skeleton variant="rectangular" width={80} height={30} animation="wave" />
                  </Box>

                  <Box my={3}>
                    <Skeleton variant="text" width="100%" animation="wave" />
                    <Skeleton variant="text" width="100%" animation="wave" />
                    <Skeleton variant="text" width="70%" animation="wave" />
                  </Box>

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Skeleton variant="circular" width={50} height={50} animation="wave" />
                        </div>
                        <div className="author_list_info">
                          <Skeleton variant="text" width={100} animation="wave" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="de_tab tab_simple" style={{ marginTop: '20px' }}>
                    <h6>Creator</h6>
                    <div className="item_author">
                      <div className="author_list_pp">
                        <Skeleton variant="circular" width={50} height={50} animation="wave" />
                      </div>
                      <div className="author_list_info">
                        <Skeleton variant="text" width={100} animation="wave" />
                      </div>
                    </div>

                    <div className="spacer-40"></div>
                    
                    <h6>Price</h6>
                    <Skeleton variant="rectangular" width={100} height={40} animation="wave" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
      {item.description}
    </p>
    <div className="d-flex flex-row">
      <div className="mr40">
        <h6>Owner</h6>
        <div className="item_author">
          <div className="author_list_pp">
            <Link to={`/author/${item.ownerId}`}>
              <img className="lazy" src={item.ownerImage} alt="" />
              <i className="fa fa-check"></i>
            </Link>
          </div>
          <div className="author_list_info">
            <Link to={`/author/${item.ownerId}`}>{item.ownerName}</Link>
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
            <Link to={`/author/${item.creatorId}`}>{item.creatorName}</Link>
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
