import React from "react";
import { RatingAndReviews } from "../Pagecomponent";
import { Api, Url, Helper, Global } from "../config";
import { Link, NavLink } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

class GiftDetailsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cake_message: "",
      gift_quantity_input: 1,
      wishlist: "",
      delivery_pincode: "",
    };
  }

  refreshCakeSize = (completeGiftDetails, e) => {
    this.props.refreshCake(e.target.value, completeGiftDetails);
  };

  customised_nevigate = (nav) => {
    let user = window.localStorage.getItem("LOGGEDUSER");
    if (user == "" || user === null || user === undefined) {
      document.getElementById("loginss").click();
      return false;
    }
    this.props.history.push(
      "/customize-cake/" + this.props.completeGiftDetails.slug + ""
    );
  };

  nevigate = (nav) => {
    this.props.history.push("/" + nav);
  };

  check_delivery_pincode_validation = () => {
    let status = false;
    if (this.state.delivery_pincode.length == " ") {
      Helper.alert("Please Enter Valid Pincode");
      return false;
    }
    if (this.state.delivery_pincode.length < 6) {
      Helper.alert("Please Enter Valid Pincode");
      return false;
    }
    Global.pincode.map((pincode) => {
      if (pincode == this.state.delivery_pincode) {
        status = true;
      }
    });
    if (status == true) {
      Helper.alert("We Deliver to this Location");
    }
    if (status == false) {
      Helper.alert(" We do not Deliver to this Location");
    }
  };

  addToCart = (completeGiftDetails, purpose) => {
    console.log(purpose);

    let local_gift_quantity = this.state.gift_quantity_input;

    if (local_gift_quantity == "") {
      Helper.alert("Please choose Quantity");
      return false;
    }
    if (parseInt(local_gift_quantity) === 0) {
      Helper.alert(" Quantity cannot be Zero");
      return false;
    }

    console.log(local_gift_quantity);

    let user = window.localStorage.getItem("LOGGEDUSER");
    let local_completeGiftDetails = completeGiftDetails;

    local_completeGiftDetails["price"] = this.props.clickedProductPrice;
    local_completeGiftDetails[
      "product_variation_id"
    ] = this.props.active_variation_id;
    local_completeGiftDetails["weight"] = this.props.active_weight;
    local_completeGiftDetails["message"] = this.state.cake_message;
    local_completeGiftDetails["quantitys"] = local_gift_quantity;

    Helper.cart_json_maker(local_completeGiftDetails, "product_slug_api").then(
      (cart_gift) => {
        if (user == "" || user === null || user === undefined) {
          Helper.localstorage___addToCart(cart_gift);
          Helper.assign_cart_item_modify(local_gift_quantity);
          if (purpose != "no_nevigation") {
            this.nevigate("cart");
          } else {
            Helper.alert("Item Successfully added to Cart");
          }
        }
        if (user != "" && user !== null && user !== undefined) {
          console.log(cart_gift);
          Helper.add_directly_to_database_on_login(cart_gift).then((status) => {
            console.log(status);
            if (purpose != "no_nevigation") {
              this.nevigate("cart");
            } else {
              Helper.alert("Item Successfully added to Cart");
            }
          });
        }
      }
    );
  };

  componentDidMount = () => {
    Helper.loadScript();
    window.scrollTo(0, 0);
    Helper.loadScript();
    if (!this.props.completeGiftDetails.wishlist) {
      this.setState({ wishlist: 0 });
    } else {
      this.setState({ wishlist: 1 });
    }
  };

  add_to_wishlist = (completeGiftDetails) => {
    let user = window.localStorage.getItem("LOGGEDUSER");
    if (user == "" || user === null || user === undefined) {
      document.getElementById("loginss").click();
    }
    if (user != "" && user !== null && user !== undefined) {
      let api = Url.add_to_wishlist;
      Api.add_to_wishlist_slug(
        api,
        completeGiftDetails,
        this.props.active_variation_id
      ).then((res) => {
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

  cake_message(e) {
    if (e.target.value.length > 50) {
      return false;
    }
    this.setState({ cake_message: e.target.value });
  }

  gift_quantity_input(e) {
    if (e.target.value.length < 4) {
      this.setState({ gift_quantity_input: e.target.value });
    }
  }

  delivery_pincode(e) {
    if (e.target.value.length > 6) {
      return false;
    }
    this.setState({ delivery_pincode: e.target.value });
  }

  render() {
    let total_reviews = 0;
    let rating = 0;
    let aggregate = 0;

    if (this.props.completeGiftDetails.reviews_count[0] !== undefined) {
      aggregate = this.props.completeGiftDetails.reviews_count[0].aggregate;
      total_reviews = this.props.completeGiftDetails.reviews_count[0].aggregate;
      rating =
        this.props.completeGiftDetails.reviews_count[0].ratingsum /
        total_reviews;
      rating = parseInt(rating);
      if (isNaN(rating)) {
        rating = 0;
      }
    }

    var ProductMultipleImage = this.props.completeGiftDetails.images.map(
      function (img, index) {
        return (
          <Carousel.Item key={index}>
            <img src={img.image_path} alt="Cake"></img>
          </Carousel.Item>
        );
      }
    );

    return (
      <React.Fragment>
        <React.Fragment key={"---------BREADCRUM---------"}>
          <div className="container">
            <div className="row">
              <div className="col-md-12 breadcrumbWrapper">
                <ul className="breadcrumb">
                  <li onClick={this.nevigate.bind(this, "home")}>
                    <Link to="#">Home</Link>
                  </li>
                  <li onClick={this.nevigate.bind(this, "gifts")}>
                    <Link to="#">Gifts</Link>
                  </li>
                  <li>{this.props.completeGiftDetails.name}</li>
                </ul>
              </div>
            </div>
          </div>

          <section id="productListWrapper" className="rowTopMargin">
            <React.Fragment
              key={
                "-------------------------------WEB_PRODUCT_DETAILS---------------------"
              }
            >
              <div className="web_product_details">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="cake_details_img_content">
                        <Carousel interval={3000000}>
                          {ProductMultipleImage}
                        </Carousel>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="products_name_detls_content">
                        <h2>{this.props.completeGiftDetails.name}</h2>
                        <ul className="product_ratings">
                          <li>
                            {rating}.0
                            <span>
                              <i className="fas fa-star"></i>
                            </span>
                          </li>
                          <li className="division">|</li>
                          <li>{aggregate} Reviews</li>
                        </ul>
                        <ul>
                          <p className="custom_seller_name">
                            Seller: {this.props.completeGiftDetails.vendor.name}
                          </p>
                        </ul>
                        <ul className="product_pricings">
                          <li>
                            <img
                              className="detail_rupee"
                              src={require("../assets/img/money.png")}
                              alt="rupees_img"
                            ></img>
                            <span className="price_main">
                              {this.props.clickedGiftPrice}
                            </span>
                          </li>
                        </ul>
                        <p className="sub_detls">
                          {this.props.completeGiftDetails.description}
                        </p>

                        <div className="customise_cake_detls margin_bottomcustomise_cake_detls">
                          <div className="form-group">
                            <label>Quantity :</label>
                            <input
                              type="number"
                              name="city"
                              list="quantity"
                              className="form-control"
                              placeholder="Enter Quantity"
                              onChange={this.gift_quantity_input.bind(this)}
                              value={this.state.gift_quantity_input}
                            />
                            <datalist id="quantity">
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                              <option value="11">11</option>
                              <option value="12">12</option>
                              <option value="13">13</option>
                              <option value="14">14</option>
                              <option value="15">15</option>
                              <option value="16">16</option>
                              <option value="17">17</option>
                              <option value="18">18</option>
                              <option value="19">19</option>
                              <option value="20">20</option>
                            </datalist>
                          </div>
                        </div>

                        <div className="customise_cake_detls_new addmarg">
                          <div className="form-group check_form">
                            <label>Check Availability</label>
                            <input
                              maxlength="6"
                              value={this.state.delivery_pincode}
                              onChange={this.delivery_pincode.bind(this)}
                              placeholder="Enter your Pincode"
                              type="number"
                              className="form-control inpo"
                            />
                          </div>

                          <div
                            onClick={this.check_delivery_pincode_validation.bind(
                              this
                            )}
                            class="check_btn"
                          >
                            <span>Check Availability</span>
                          </div>
                        </div>

                        <ul className="btn_cart">
                          <li
                            onClick={this.addToCart.bind(
                              this,
                              this.props.completeGiftDetails,
                              "no_nevigation"
                            )}
                            className="add_to_cart"
                          >
                            <Link to="#">Add to cart</Link>
                          </li>
                        </ul>

                        <ul className="btn_cart">
                          <li className="add_to_wishlist">
                            {this.state.wishlist == 0 && (
                              <Link
                                to="#"
                                onClick={this.add_to_wishlist.bind(
                                  this,
                                  this.props.completeGiftDetails
                                )}
                              >
                                <i className="far fa-heart heart_space"></i>
                                Move to Wishlist
                              </Link>
                            )}
                          </li>
                        </ul>
                        <ul className="btn_cart new_buy_nowbtn">
                          <li
                            onClick={this.addToCart.bind(
                              this,
                              this.props.completeGiftDetails
                            )}
                            className="add_to_cart buy_now"
                          >
                            <Link to="#">Buy Now</Link>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="tab_view_content">
                        <ul className="nav nav-tabs" role="tablist">
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              data-toggle="tab"
                              href="#tabs-1"
                              role="tab"
                            >
                              Description
                            </a>
                          </li>

                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#tabs-2"
                              role="tab"
                            >
                              Rating & Reviews ({aggregate})
                            </a>
                          </li>
                        </ul>

                        <div className="tab-content">
                          <div
                            className="tab-pane active"
                            id="tabs-1"
                            role="tabpanel"
                          >
                            <p>
                              {this.props.completeGiftDetails.addintional_info}
                            </p>
                          </div>
                          <div className="tab-pane" id="tabs-2" role="tabpanel">
                            <RatingAndReviews
                              completeProdDetails={
                                this.props.completeGiftDetails
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
            <React.Fragment
              key={
                "-------------------------MOBILE_PRODUCT_DETAILS------------------"
              }
            >
              <div className="mobile_product_details">
                <div className="container">
                  <div className="row">
                    <div className="mycart_details mobilepadding_off mobile_product_sectn">
                      <div className="cake_details_img_content product_details_slide product_details_slide_add">
                        <Carousel interval={3000}>
                          {ProductMultipleImage}
                        </Carousel>
                      </div>
                      <div className="product_info_details_mob">
                        <p>{this.props.completeGiftDetails.name}</p>
                        <span className="colr_diffmob_prodct">
                          {this.props.completeGiftDetails.description}
                        </span>
                        <ul className="mobile_pricelust_product">
                          <li className="realprice_mob_product">
                            Rs {this.props.clickedGiftPrice}
                          </li>
                        </ul>
                        <ul className="rating_mobileproducts">
                          <li className="ratngstar_mobile">
                            {rating}.0
                            <span>
                              <i className="fas fa-star"></i>
                            </span>
                          </li>
                          <li className="ratings_mobile">
                            {aggregate} Reviews
                          </li>
                        </ul>
                        <ul>
                          <p id="custom_seller_name">
                            Seller: {this.props.completeGiftDetails.vendor.name}
                          </p>
                        </ul>
                      </div>
                    </div>

                    <div className="mycart_details padding_sec_mob">
                      <div className="customise_cake_detls margin_bottomcustomise_cake_detls">
                        <div className="form-group">
                          <label>Quantity</label>
                          <input
                            type="number"
                            name="city"
                            list="quantity"
                            className="form-control"
                            placeholder="Enter Quantity"
                            onChange={this.gift_quantity_input.bind(this)}
                            value={this.state.gift_quantity_input}
                          />
                          <datalist id="quantity">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                          </datalist>
                        </div>
                      </div>

                      <div className="customise_cake_detls margin_bottomcustomise_cake_detls">
                        <div className="form-group ">
                          <label>Check Availability</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter your Pincode"
                            value={this.state.delivery_pincode}
                            onChange={this.delivery_pincode.bind(this)}
                          />
                        </div>
                      </div>

                      <div class="add_to_cart_mobile">
                        <Link
                          onClick={this.check_delivery_pincode_validation.bind(
                            this
                          )}
                          to="#"
                        >
                          Check Availability
                        </Link>
                      </div>

                      <ul>
                        <li className="add_to_wishlist mobile_add">
                          {this.state.wishlist == 0 && (
                            <Link
                              to="#"
                              onClick={this.add_to_wishlist.bind(
                                this,
                                this.props.completeGiftDetails
                              )}
                            >
                              <i className="far fa-heart heart_space"></i>
                              Move to Wishlist
                            </Link>
                          )}
                        </li>
                      </ul>
                    </div>

                    <div className="mycart_details">
                      <div id="accordion" className="accordion_productmoble">
                        <div className="card custom_productdetail_mobile_card">
                          <div className="card-header" id="headingOne">
                            <h5 className="mb-0">
                              <button
                                className="btn btn-link"
                                data-toggle="collapse"
                                data-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                              >
                                Description
                              </button>
                            </h5>
                          </div>

                          <div
                            id="collapseOne"
                            className="collapse show"
                            aria-labelledby="headingOne"
                            data-parent="#accordion"
                          >
                            <div className="card-body">
                              {this.props.completeGiftDetails.addintional_info}
                            </div>
                          </div>
                        </div>
                        <div className="card">
                          <div className="card-header" id="headingTwo">
                            <h5 className="mb-0">
                              <button
                                className="btn btn-link collapsed"
                                data-toggle="collapse"
                                data-target="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseTwo"
                              >
                                Rating & Reviews ({aggregate})
                              </button>
                            </h5>
                          </div>
                          <div
                            id="collapseTwo"
                            className="collapse"
                            aria-labelledby="headingTwo"
                            data-parent="#accordion"
                          >
                            <div className="card-body">
                              <RatingAndReviews
                                history={this.props.history}
                                completeProdDetails={
                                  this.props.completeGiftDetails
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          </section>
          <div id="filter" className="filter_mob addtocart_mob">
            <ul className="addbtn_mob">
              <li id="categories-menu">
                <Link
                  onClick={this.addToCart.bind(
                    this,
                    this.props.completeGiftDetails,
                    "no_nevigation"
                  )}
                  to="#"
                >
                  <span className="sortbartext">Add To Cart</span>
                </Link>
              </li>
              <li id="categories-menu" className="buynow_mob">
                <Link
                  onClick={this.addToCart.bind(
                    this,
                    this.props.completeGiftDetails
                  )}
                  to="#"
                >
                  <span className="sortbartext">Buy Now</span>
                </Link>
              </li>
            </ul>
          </div>
        </React.Fragment>
      </React.Fragment>
    );
  }
}
export default GiftDetailsComponent;
