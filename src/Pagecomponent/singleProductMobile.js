import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

import { Api, Url, Helper, Global } from "../config";

class SingleProductMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishlist: "",
    };
  }
  componentDidMount = () => {
    if (!this.props.productInDetails.wishlist) {
      this.setState({ wishlist: 0 });
    } else {
      this.setState({ wishlist: 1 });
    }
  };

  nevigate = (completeProdDetails) => {
    this.props.history.push(
      "/product-detail/" + this.props.productInDetails.slug + ""
    );
  };

  add_to_wishlist = (completeProdDetails) => {
    let user = window.localStorage.getItem("LOGGEDUSER");
    if (user == "" || user === null || user === undefined) {
      document.getElementById("loginss").click();
    }
    if (user != "" && user !== null && user !== undefined) {
      let api = Url.add_to_wishlist;
      Api.add_to_wishlist(api, completeProdDetails).then((res) => {
        let response = JSON.parse(res);
        let data = response;
        if (data.code == 200) {
          Helper.add_to_wishlist_value(data.count);
          Helper.alert(data.message);
          this.setState({ wishlist: 1 });
        }
      });
    }
  };

  remove_to_wishlist = (completeProdDetails) => {
    let user = window.localStorage.getItem("LOGGEDUSER");
    if (user == "" || user === null || user === undefined) {
      document.getElementById("loginss").click();
    } else {
      let api = Url.remove_to_wishlist;
      Api.remove_to_wishlist(api, completeProdDetails).then((res) => {
        let response = JSON.parse(res);
        let data = response;
        if (data.code == 200) {
          Helper.add_to_wishlist_value(data.count);
          Helper.alert(data.message);
          if (this.props.whom != "wishlist") {
            this.setState({ wishlist: 0 });
          }
          if (this.props.whom == "wishlist") {
            this.props.refresh_wishlist_on_remove(completeProdDetails);
          }
        }
      });
    }
  };

  addToCart = (completeProdDetails) => {
    let user = window.localStorage.getItem("LOGGEDUSER");
    Helper.cart_json_maker(completeProdDetails, "product_list_api").then(
      (cart_product) => {
        if (user == "" || user === null || user === undefined) {
          Helper.localstorage___addToCart(cart_product);
          Helper.increment_cart_item();
          Helper.alert("Item Successfully added to Cart");
        }
        if (user != "" && user !== null && user !== undefined) {
          Helper.add_directly_to_database_on_login(cart_product).then((res) => {
            Helper.alert("Item Successfully added to Cart");
            if (this.props.whom == "wishlist") {
              this.props.refresh_wishlist_on_remove(completeProdDetails);
            }
          });
        }
      }
    );
  };

  calculateMrp = (mrp) =>{
    if(mrp>0){
      return mrp*2;
    }else {
      return mrp;
    }
  }

  render() {
    var img = this.props.productInDetails.image.map(function (img, index) {
      if (img.feature == 1) {
        return <img key={index} src={img.image_path} alt="Cake"></img>;
      }
    });

    let total_reviews = 0;
    let rating = 0;
    let starName = '0';

    if (this.props.productInDetails.reviews_count[0] !== undefined) {
      total_reviews = this.props.productInDetails.reviews_count[0]
        .total_reviews;
      // rating =
      //   this.props.productInDetails.reviews_count[0].ratingsum / total_reviews;
      rating = this.props.productInDetails.rating
      rating = parseInt(rating);
    }

    if (this.props.productInDetails.rating>0){
      rating = this.props.productInDetails.rating
      //rating = parseInt(rating);
      if (rating > 4.9){
          starName = '5';
      }else if (rating>4.4 && rating<5){
        starName = '4_5';
      }else if (rating>3 && rating<4.3){
          starName = '4';
      }else if (rating>2 && rating<4){
        starName = '3';
      }else if (rating>1 && rating<3){
        starName = '2';
      }else if (rating>0 && rating<2){
        starName = '1';
      }else {
        starName = '0';
      }
    }


    return (
      <div className="col-md-3 col-sm-6 mobview_content">
        <div className="productItemList productmob_view">
          <div className="productImageWrap productImageWrap_mob row_product" ><Link  onClick={this.nevigate.bind(
                    this,
                    this.props.productInDetails
                  )} to="#">{img}</Link></div>
          <div className="productListInnerContentWrap productListInnerContentWrap_mob">
            <p className="productName productName_mob">
              <strong>
                <Link
                className="anchorSpe"
                  onClick={this.nevigate.bind(
                    this,
                    this.props.productInDetails
                  )}
                >
                  {this.props.productInDetails.name}
                </Link>
              </strong>
            </p>
            <p className="sametxt_mob">
              Same-Day Delivery: <span className="mob_status">Eligible</span>
            </p>
            <div className="starWrap">
              <img
                src={require("../assets/img/" + starName + "star.png")}
                alt="Star"
                className="ratingStar"
              ></img>
              <span>{rating}</span>
              <span className="totalReviews">({total_reviews} Reviews)</span>
            </div>
            {/* <p className="productPrice productPrice_mob">
              <img
                className="rupss_img"
                src={require("../assets/img/inrCurrency_b.png")}
                alt="INR"
              ></img>{" Rs."}
              <strong> {this.props.productInDetails.variation.price}</strong>
              <Link to="#" className="wishlistIcon wishlistIcon_mob">
                {this.state.wishlist == 0 && (
                  <i
                    onClick={this.add_to_wishlist.bind(
                      this,
                      this.props.productInDetails
                    )}
                    className="far fa-heart heart_right"
                  ></i>
                )}
                {this.state.wishlist == 1 && (
                  <i
                    onClick={this.remove_to_wishlist.bind(
                      this,
                      this.props.productInDetails
                    )}
                    className="fas fa-heart heart_right"
                  ></i>
                )}
              </Link>
            </p> */}

            <ul class="price_sec_mob">
                <li class="strike_mob strike_mob_listing">
                {/* <img
                  src={require("../assets/img/inrCurrency_b.png")}
                  alt="INR" className="rupss_img rupss_img_listing"></img>{""} */}
                  {/* <strong className="strike_through_list_items_text"> {this.calculateMrp(this.props.productInDetails.variation.price)} </strong> */}
                </li>
                <li class="productPrice productPrice_mob">
                    <img
                      src={require("../assets/img/inrCurrency_b.png")}
                      alt="INR" className="rupss_img"></img>{""}
                      <div className="priceDiv_list">

                        <strong className="priceMargin"> {this.props.productInDetails.variation.price}</strong>
                      </div>
                    {/* <a href="#" class="wishlistIcon wishlistIcon_mob"><i class="far fa-heart"></i> <i class="fas fa-heart"></i></a> */}
                </li>
                {/* <li class="offlist_mobile offlist_mobile_listing">
                    {Global.discountPercentage}% off
                </li> */}
                <Link to="#" className="wishlistIcon wishlistIcon_mob">
                {this.state.wishlist == 0 && (
                  <i
                    onClick={this.add_to_wishlist.bind(
                      this,
                      this.props.productInDetails
                    )}
                    className="far fa-heart heart_right"
                  ></i>
                )}
                {this.state.wishlist == 1 && (
                  <i
                    onClick={this.remove_to_wishlist.bind(
                      this,
                      this.props.productInDetails
                    )}
                    className="fas fa-heart heart_right"
                  ></i>
                )}
              </Link>
            </ul>

            
          </div>
        </div>
      </div>
    );
  }
}

export default SingleProductMobile;
