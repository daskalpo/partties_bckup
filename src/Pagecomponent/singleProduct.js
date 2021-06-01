import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

import { Api, Url, Helper } from "../config";

class SingleProduct extends Component {
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
      rating =
        this.props.productInDetails.reviews_count[0].ratingsum / total_reviews;
      rating = parseInt(rating);
    }

    if (this.props.productInDetails.rating>0){
      rating = this.props.productInDetails.rating
      //rating = parseInt(rating);
      if (rating>4.4 && rating<5){
        starName = '4_5';
      }else if (rating>1){
        starName = '2';
      }else if (rating>0){
        starName = '1';
      }else if (rating>2){
        starName = '3';
      }else if (rating>3){
        starName = '4';
      }else if (rating > 4.9){
        starName = '5';
      }else {
        starName = '0'
      }
    }


    return (
      <div
        id={this.props.whom + this.props.productInDetails.id}
        key={this.props.productInDetails.id}
        className="col-md-3 col-sm-4"
      >
        <div className="productItemList">
          <div
            onClick={this.nevigate.bind(this, this.props.productInDetails)}
            className="productImageWrap row_product"
          >
            {img}
          </div>

          <div className="productListInnerContentWrap">
            <p className="productName">
              <strong>
                <Link
                  onClick={this.nevigate.bind(
                    this,
                    this.props.productInDetails
                  )}
                >
                  {this.props.productInDetails.name}
                </Link>
              </strong>
            </p>
            <div className="starWrap">
              <img
                src={require("../assets/img/" + starName + "star.png")}
                alt="Star"
                className="ratingStar"
              ></img>
              <span> {rating}</span>{" "}
              <span className="totalReviews">( {total_reviews} Reviews )</span>
            </div>
            <p className="productPrice">
              <img
                className="rupees"
                src={require("../assets/img/inrCurrency.png")}
                alt="INR"
              ></img>
              <strong className="card_rs_font">
                {this.props.productInDetails.variation.price}
              </strong>
              <Link to="#" className="wishlistIcon heart">
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
            </p>
          </div>
          <div className="productCartBtn">
            <Link
              to="#"
              onClick={this.addToCart.bind(this, this.props.productInDetails)}
            >
              <i className="fas fa-shopping-cart"></i>
              <span>Add to cart</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleProduct;
