import React, { useState } from "react";
import { RatingAndReviews, RecommendedSection, RecommendedWebsiteSection } from "../Pagecomponent";
import { Api, Url, Helper, Global } from "../config";
import { Link, NavLink } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { SingleProduct, SingleProductMobile } from "../Pagecomponent";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import { DateTimePicker } from "react-widgets";
//import momentLocalizer from "react-widgets-moment";
//import "react-widgets/dist/css/react-widgets.css";
import InfiniteScroll from "react-infinite-scroll-component";
const moment= require('moment')
//momentLocalizer();



const ClickableInput = ({onChange, placeholder, value, isSecure, id, onClick}) => (
  
  <input
    style={{height:"54px",}}
    type="text" class="form-control"
    onChange={onChange}
    placeholder={placeholder}
    value={value}
    isSecure={isSecure}
    id={id}
    onClick={onClick}
    disabled={true}
  />
);


const ClickableInputWeb = ({onChange, placeholder, value, isSecure, id, onClick}) => (
  
  <input
    style={{height:"54px",}}
    type="text" class="form-control"
    onChange={onChange}
    placeholder={placeholder}
    value={value}
    isSecure={isSecure}
    id={id}
    onClick={onClick}
    //disabled={true}
  />
);





class ProductDetailsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      delivery_pincode: "",
      cake_message: "",
      product_quantity_input: 1,
      wishlist: "",
      delivery_time: new Date(),
      backup_delivery_time: new Date(),
      minimum_delivery_time: new Date(),
      maximum_delivery_time: new Date(),
      selectedDate: new Date(),
      optionsArray: [
        "10am-2pm",
        "2pm-6pm",
        "6pm-10pm"
      ],
      timeSlab: "",
      selectedTime: "For today’s delivery place orders by 6 pm.",
    };
    //const [selectedDate, setSelectedDate] = useState(new Date())
  }

  openDatepicker = () => this._calendar.setOpen(true);

  // setStartDate = (date) => {
  //   this.state.startDate = date
  // }

  setSelectedDate = (date) => {
    this.setState({selectedDate: date})
    console.log(date)
    this.checkDayDiff(date);
  }


  refreshCakeSize = (completeProdDetails, e) => {
    this.props.refreshCake(e.target.value, completeProdDetails);
  };

  customised_nevigate = (nav) => {
    let user = window.localStorage.getItem("LOGGEDUSER");
    if (user == "" || user === null || user === undefined) {
      document.getElementById("loginss").click();
      return false;
    }
    this.props.history.push(
      "/customize-cake/" + this.props.completeProdDetails.slug + ""
    );
  };

  nevigate = (nav) => {
    //console.log(nav)
    this.props.history.push("/" + nav);
  };


  addToCart = (completeProdDetails, purpose) => {
    console.log(purpose);

    let local_product_quantity = this.state.product_quantity_input;

    if (local_product_quantity == "") {
      Helper.alert("Please choose Quantity");
      return false;
    }
    if (parseInt(local_product_quantity) === 0) {
      Helper.alert(" Quantity cannot be Zero");
      return false;
    }

    console.log(local_product_quantity);

    let user = window.localStorage.getItem("LOGGEDUSER");
    let local_completeProdDetails = completeProdDetails;

    local_completeProdDetails["price"] = this.props.clickedProductPrice;
    local_completeProdDetails[
      "product_variation_id"
    ] = this.props.active_variation_id;
    local_completeProdDetails["weight"] = this.props.active_weight;
    local_completeProdDetails["message"] = this.state.cake_message;
    local_completeProdDetails["quantitys"] = local_product_quantity;
    local_completeProdDetails[
      "custom_delivery_time"
    ] = Helper.get_review_date_with_time_slab(this.state.selectedDate, this.state.timeSlab);
    console.log("Request: ",local_completeProdDetails)

    Helper.cart_json_maker(local_completeProdDetails, "product_slug_api").then(
      (cart_product) => {
        if (user == "" || user === null || user === undefined) {
          Helper.localstorage___addToCart(cart_product);
          Helper.assign_cart_item_modify(local_product_quantity);
          if (purpose != "no_nevigation") {
            this.nevigate("cart");
          } else {
            Helper.alert("Item Successfully added to Cart");
          }
        }
        if (user != "" && user !== null && user !== undefined) {
          console.log(cart_product);
          Helper.add_directly_to_database_on_login(cart_product).then(
            (status) => {
              console.log(status);
              if (purpose != "no_nevigation") {
                this.nevigate("cart");
              } else {
                Helper.alert("Item Successfully added to Cart");
              }
            }
          );
        }
      }
    );
  };
  manage_product_delivery_time = () => {
    var tomorrow_delivery = new Date();
    tomorrow_delivery.setDate(new Date().getDate() + 1);
    tomorrow_delivery.setHours("10");
    tomorrow_delivery.setMinutes("00");
    tomorrow_delivery.setSeconds("00");

    let local_minimum_delivery_time = tomorrow_delivery;
    this.setState({
      backup_delivery_time: local_minimum_delivery_time,
      delivery_time: local_minimum_delivery_time,
      minimum_delivery_time: local_minimum_delivery_time,
    });
  };
  componentDidMount = () => {
    window.scrollTo(0, 0);
    Helper.loadScript();
    if (!this.props.completeProdDetails.wishlist) {
      this.setState({ wishlist: 0 });
    } else {
      this.setState({ wishlist: 1 });
    }
    //this.manage_product_delivery_time();
    this.checkDayDiff(this.state.selectedDate);
  };

  add_to_wishlist = (completeProdDetails) => {
    let user = window.localStorage.getItem("LOGGEDUSER");
    if (user == "" || user === null || user === undefined) {
      document.getElementById("loginss").click();
    }
    if (user != "" && user !== null && user !== undefined) {
      let api = Url.add_to_wishlist;
      Api.add_to_wishlist_slug(
        api,
        completeProdDetails,
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
  delivery_pincode(e) {
    if (e.target.value.length > 6) {
      return false;
    }
    this.setState({ delivery_pincode: e.target.value });
  }

  product_quantity_input(e) {
    if (e.target.value.length < 4) {
      this.setState({ product_quantity_input: e.target.value });
    }
  }

  delivery_time = (e) => {
    this.setState({ delivery_time: e });
  };
  selectDate = () => {
    this.setState({ maximum_delivery_time: new Date("2099-01-01") });
    this.manage_product_delivery_time();
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

  selectTime = () => {
    let dt = this.state.delivery_time;
    let local_start_delivery_time;

    if (this.state.backup_delivery_time.getTime() == dt.getTime()) {
      local_start_delivery_time = this.state.backup_delivery_time;
    } else {
      local_start_delivery_time = new Date(
        dt.getFullYear(),
        dt.getMonth(),
        dt.getDate(),
        11,
        0,
        0
      );
    }
    let local_end_delivery_time = new Date(
      dt.getFullYear(),
      dt.getMonth(),
      dt.getDate(),
      18,
      0,
      0
    );
    this.setState({
      minimum_delivery_time: local_start_delivery_time,
      maximum_delivery_time: local_end_delivery_time,
    });
  };

  calculateMrp = (mrp) =>{
    if(mrp>0){
      return mrp*2;
    }else {
      return mrp;
    }
  }

  checkDayDiff =(date)=> {
    var now  = moment(new Date());
    var then = moment(date);
    var timeDifferenceInSeconds = now.diff(then, 'seconds');
    var timeDifferenceInHours = now.diff(then, 'hours');
    var timeDifferenceInDay = now.diff(then, 'days');
    console.log(timeDifferenceInHours, timeDifferenceInSeconds, timeDifferenceInDay);
    if (timeDifferenceInDay == 0){
      if (timeDifferenceInHours<0){
        this.getCurrentHour( true, date);
      }else {
        //same day
        console.log("-------------------------------------Same day")
        this.getCurrentHour( false, new Date());
      }
    }else {
      this.getCurrentHour( true, date);
    }
  }

  getCurrentHour = (isNotSameDay, date) => {
    //console.log("Current date"+date);
    const { selectedDate } = this.state
    let d = new Date(selectedDate);
    if (isNotSameDay){
      d = new Date(date);
      d.setHours(0,0,0,0);
    }
    let hour = d.getHours()
    console.log(d.getHours())
    console.log(d.getMinutes())
    console.log(d.getSeconds())
    

    if (hour>=0 && hour<10){
      this.state.optionsArray = [
        "10am-2pm",
        "2pm-6pm",
        "6pm-10pm"
      ]
      
      this.setState({
        // minimum_delivery_time: new Date(
        //   d.getFullYear(),
        //   d.getMonth(),
        //   d.getDate()
        // ),
        timeSlab: this.state.optionsArray[0]
      });
    }else if (hour>=10 && hour<14){
      this.state.optionsArray = [
        // "10am-2pm",
        "2pm-6pm",
        "6pm-10pm"
      ]
      
      this.setState({
        // minimum_delivery_time: new Date(
        //   d.getFullYear(),
        //   d.getMonth(),
        //   d.getDate()
        // ),
        timeSlab: this.state.optionsArray[0]
      });
    }else if (hour>=14 && hour<18){
      this.state.optionsArray = [
        // "2pm-6pm",
        "6pm-10pm"
      ]
      this.setState({
        // minimum_delivery_time: new Date(
        //   d.getFullYear(),
        //   d.getMonth(),
        //   d.getDate()
        // ),
        timeSlab: this.state.optionsArray[0]
      });
    }else if (hour>=18 && hour<24){
      this.setState({
        optionsArray: [
          "10am-2pm",
          "2pm-6pm",
          "6pm-10pm"
        ],
        timeSlab: this.state.optionsArray[0]
      })
      this.getNextDate();
    }

  };

  getNextDate = () => {
    const { selectedDate } = this.state

    const currentDayInMilli = new Date(selectedDate).getTime()
    const oneDay = 1000 * 60 *60 *6
    const nextDayInMilli = currentDayInMilli + oneDay
    const nextDate = new Date(nextDayInMilli)
    console.log("Next Date : "+nextDate)
    //this.setDate(nextDate)
    // const date = nextDate || new Date();
    this.setState({
      minimum_delivery_time:nextDate,
      selectedDate:nextDate,   
    });
  };

  handleTimeSlabOnChange = (e) => {
    let {name, value} = e.target;
    //let value = e;
    this.setState({
      timeSlab: value
    })
    console.log(name + this.state.timeSlab);
  };


  render() {
    console.log(this.props.completeProdDetails.reviews_count[0]);
    let total_reviews = 0;
    let rating = 0;
    let aggregate = 0;

    if (this.props.completeProdDetails.reviews_count[0] !== undefined) {
      aggregate = this.props.completeProdDetails.reviews_count[0].aggregate;
      total_reviews = this.props.completeProdDetails.reviews_count[0].aggregate;
      rating =
        this.props.completeProdDetails.reviews_count[0].ratingsum /
        total_reviews;
      rating = parseInt(rating);
      if (isNaN(rating)) {
        rating = 0;
      }
    }

    if(this.props.completeProdDetails.rating>0){
      rating = this.props.completeProdDetails.rating
    }

    if (this.props.completeProdDetails.rating != undefined){
      console.log('Detail Product rating: ', this.props.completeProdDetails.rating);
    }
    

    var ProductMultipleImage = this.props.completeProdDetails.images.map(
      function (img, index) {
        return (
          <Carousel.Item key={index}>
            <img
              src={img.image_path}
              alt="Cake"
              className="d-block w-100"
            ></img>
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
                  <li onClick={this.nevigate.bind(this, "product-list")}>
                    <Link to="#">Cake</Link>
                  </li>
                  <li>{this.props.completeProdDetails.name}</li>
                </ul>
              </div>
            </div>
          </div>

          <section id="productListWrapper" className="rowTopMarginProductDetails">
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
                        <Carousel interval={3000}>
                          {ProductMultipleImage}
                        </Carousel>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="products_name_detls_content">
                        <h2>{this.props.completeProdDetails.name}</h2>
                        <ul className="product_ratings">
                          <li>
                            {rating}
                            <span>
                              <i className="fas fa-star"></i>
                            </span>
                          </li>
                          <li className="division">|</li>
                          <li>{aggregate} Reviews</li>
                        </ul>
                        <ul>
                          <p className="custom_seller_name">
                            Seller: {this.props.completeProdDetails.vendor.name}
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
                              {this.props.clickedProductPrice}
                            </span>
                          </li>
                        </ul>
                        <p className="sub_detls">
                          {this.props.completeProdDetails.description}
                        </p>


                        <div className="selectSize_web_container">
                            <div className="select_size">
                              <p className="details-item-titles" style={{marginBottom:"6px", fontWeight:"500", color:"#777777"}}>
                                Select Weight
                              </p>
                              <div className="filterItemWrap customdropdown">
                                <div className="selectBox customSelectWrap customSelectWrapWeb">
                                    <i className="fas fa-sort-down"></i>
                                      <select
                                        className="customSelect"
                                        onChange={this.refreshCakeSize.bind(
                                          this,
                                          this.props.completeProdDetails
                                        )}
                                        value={this.props.clickedProductPrice}
                                        >
                                        {this.props.completeProdDetails.variations.map(
                                          (variation, index) => (
                                            <option 
                                              key={index} 
                                              value={variation.price}>
                                              Size: {variation.weight} {variation.unit}
                                            </option>
                                          )
                                        )}
                                      </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        {/* <div className="select_size">
                          <p>Select Weight</p>
                          <div className="filterItemWrap customdropdown">
                            <div className="selectBox customSelectWrap">
                              <i className="fas fa-sort-down"></i>
                              
                            </div>
                          </div>
                        </div> */}

                        <div className="customise_cake_detls margin_bottomcustomise_cake_detls">
                          <div className="form-group">
                            <label>Quantity :</label>
                            <input
                              type="number"
                              name="city"
                              list="quantity"
                              className="form-control"
                              placeholder="Enter Quantity"
                              onChange={this.product_quantity_input.bind(this)}
                              value={this.state.product_quantity_input}
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

                        {/* <div className="productDelivery">
                          <label className="set_Delivery_time">
                            Set Delivery time :
                          </label>
                          <DateTimePicker
                            min={this.state.minimum_delivery_time}
                            max={this.state.maximum_delivery_time}
                            onChange={this.delivery_time.bind(this)}
                            defaultValue={this.state.delivery_time}
                            value={this.state.delivery_time}
                          />
                          <Link
                            className="hidden"
                            to="#"
                            onClick={this.selectDate.bind(this)}
                            id="selectDate"
                          >
                            select date
                          </Link>

                          <Link
                            className="hidden"
                            to="#"
                            onClick={this.selectTime.bind(this)}
                            id="selectTime"
                          >
                            select Time
                          </Link>
                          
                        </div> */}

                        {/* <label className="container_label variation pro_lab">
                          {this.props.attribute_list}
                        </label> */}

                        <div className="productDelivery webTopMargin ">
                          <ul className="date_time_pickrsec">
                            <li className="input_margin">
                                <div className="date_picker_web date_picker">
                                    <div className="form-group " >
                                        <p className="set_Delivery_time" style={{marginBottom:"6px", fontWeight:"500", color:"#777777"}}>Set Delivery Time :</p>
                                        {/* <input type="number" class="form-control" placeholder="Enter Date" value="" style={{height:"54px",}}/> */}
                                        <DatePicker
                                            wrapperClassName="datepicker_input"
                                            selected={this.state.selectedDate}
                                            minDate={this.state.minimum_delivery_time}
                                            //maxDate={this.state.maximum_delivery_time}
                                            
                                            customInput={<ClickableInputWeb
                                              placeholder="Enter Date and Time"
                                              onClick={this.openDatepicker}
                                            />}
                                            dateFormat="dd/MM/yyyy"
                                            onChange={date=> this.setSelectedDate(date)}
                                            ref={(c) => this._calendar = c} />
                                        {/* <div className="icons_datepicker">
                                            <Link  className="calendar_date_web" onClick={this.openDatepicker}><i className="fas fa-calendar-alt"></i></Link>
                                        </div> */}
                                    </div>
                                
                                </div>
                            </li>
                            <li>
                                <div className="customise_cake_detls margin_bottomcustomise_cake_detls date_picker">
                                    <div className="form-group ">
                                    {/* <Select
                                        id={this.state.timeSlab}
                                        value={this.state[timeSlab]}
                                        onChange={this.onChangeValue(this.state.timeSlab)}
                                        options={options[this.state.timeSlab]} // unsure where options came from.
                                        placeholder="Please select..."
                                    /> */}
                                      <select
                                        onChange={this.handleTimeSlabOnChange}
                                        value={this.state.timeSlab}
                                        >

                                        {this.state.optionsArray.map(
                                          (value, index) => (
                                            <option key={index} value={value}>
                                              {value}
                                            </option>
                                            )
                                        )}
                                      </select>

                                      {/* <div className="icons_datepicker">
                                          <a  className="clock_date"><i className="fas fa-clock"></i></a>
                                      </div> */}

                                        
                                    </div>
                            
                                </div>
                            </li>
                          </ul>
                          <div style={{marginTop: "-22px"}}>
                            <p>{this.state.selectedTime}</p>
                          </div>
                        </div>

                        <div className="customise_cake_detls">
                          <div className="form-group">
                            <label>Cake Message</label>
                            <input
                              value={this.state.cake_message}
                              onChange={this.cake_message.bind(this)}
                              placeholder="Enter your message"
                              type="text"
                              className="form-control"
                            />
                            <span>Max 50 characters</span>
                          </div>
                        </div>

                        <div className="customise_cake_detls_new addmarg">
                          <div className="form-group check_form">
                            <label>Check Availability</label>
                            <input
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
                            className="check_btn"
                          >
                            <span>Check Availability</span>
                          </div>
                        </div>

                        <ul className="btn_cart">
                          <li
                            onClick={this.addToCart.bind(
                              this,
                              this.props.completeProdDetails,
                              "no_nevigation"
                            )}
                            className="add_to_cart"
                          >
                            <Link to="#">Add to cart</Link>
                          </li>
                        </ul>

                        <ul className="btn_cart">
                          {this.state.wishlist == 0 && (
                            <li className="add_to_wishlist">
                              <Link
                                to="#"
                                onClick={this.add_to_wishlist.bind(
                                  this,
                                  this.props.completeProdDetails
                                )}
                              >
                                <i className="far fa-heart heart_space"></i>
                                Move to Wishlist
                              </Link>
                            </li>
                          )}
                        </ul>
                        <ul className="btn_cart new_buy_nowbtn">
                          <li
                            onClick={this.addToCart.bind(
                              this,
                              this.props.completeProdDetails
                            )}
                            className="add_to_cart buy_now"
                          >
                            <Link to="#">Buy Now</Link>
                          </li>
                        </ul>
                        <div className="customizeBtnWrap">
                          <label>Want to customize?</label>
                          <Link
                            onClick={this.customised_nevigate.bind(
                              this,
                              "customize-cake"
                            )}
                            to="#"
                            className="customizeBtn"
                          >
                            Customize
                          </Link>
                        </div>
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

                        {/* This below section Write Review is commented for temporary testing purpose */}

                          {/* <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#tabs-2"
                              role="tab"
                            >
                              Rating & Reviews ({aggregate})
                            </a>
                          </li> */}
                        </ul>

                        <div className="tab-content">
                          <div
                            className="tab-pane active"
                            id="tabs-1"
                            role="tabpanel"
                          >
                            <p>
                              {/* {this.props.completeProdDetails.addintional_info} */}

                              <ul >
                                <li className="descriptionBullet">
                                The products will be delivered by our delivery partner within the agreed timeframe.
                                </li>
                                <li className="descriptionBullet">
                                The accessories shown in the photo is for representational purposes only.
                                </li>
                                <li className="descriptionBullet">
                                The delivery will be attempted only once. Any change of address and/or time might incur additional cost or result in non-delivery of the product. 
                                </li>
                                <li className="descriptionBullet">
                                The delivery will be attempted only once. Any change of address and/or time might incur additional cost or result in non-delivery of the product. 
                                </li>
                                <li className="descriptionBullet">
                                We recommend the cakes and bakery items to be consumed within 24 hours of delivery. 
                                </li>
                                <li className="descriptionBullet">
                                Cakes and other bakery items should be kept refrigerated unless otherwise stated. Fondant cakes should be kept in air-conditioned room.
                                </li>
                                <li className="descriptionBullet">
                                Please make sure that the cake and other bakery items are brought to room temperature before consumption.
                                </li>
                                <li className="descriptionBullet">
                                The final product design might vary from the photo shown to accommodate design and weight parameters.
                                </li>
                              </ul>

                            </p>
                          </div>
                          <div className="tab-pane" id="tabs-2" role="tabpanel">
                            <RatingAndReviews
                              completeProdDetails={
                                this.props.completeProdDetails
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                          {/* <section id="newProducts" className="rowTopMargin topmarginsec">
                            <div className="container">
                                <div className="section-header">
                                    <h2>You may also like</h2>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="newProductWrapper" id="NewProduct">
                                            <ul className="productCarouselWrap newProductCarousel owl-carousel clearfix owl-loaded owl-drag">
                                              <div className="owl-stage-outer">
                                                <div className="owl-stage" > 
                                                  <div className="owl-item cloned" style={{width: "266.25px", marginRight:"15px"}}>*
                                                <div class="row productListInner">
                                                    <InfiniteScroll
                                                      dataLength={this.props.you_may_also_likes.length}
                                                      // next={this.getMoreProducts}
                                                      hasMore={false}>
                                                      {this.props.you_may_also_likes.map((prod, index) => (
                                                        <SingleProduct
                                                          whom="list"
                                                          key={index}
                                                          productInDetails={prod}
                                                          history={this.props.history}
                                                        />  
                                                      ))}
                                                    </InfiniteScroll>
                                                  </div>
                                                </div>  
                                              </div>
                                            </ul>
                                          </div>
                                      </div>
                                    </div> 
                                  </div> 
                          </section>      */}
                                   
                          {/* <RecommendedWebsiteSection
                            you_may_also_likes={this.props.you_may_also_likes}
                            addToCart={this.addToCart.bind(this)}
                          /> */}
                              
                          {/* 9593013086 */}


                  </div>
                </div>
              </div>
            </React.Fragment>
            <React.Fragment
              key={
                "-------------------------MOBILE_PRODUCT_DETAILS------------------"
              }
            >
              <div className="mobile_product_details marginTopProductDetailsMobile" >
                <div className="container">
                  <div className="row">
                    <div className="mycart_details mobilepadding_off mobile_product_sectn">
                      <div className="cake_details_img_content product_details_slide product_details_slide_add">
                        <Carousel interval={3000}>
                          {ProductMultipleImage}
                        </Carousel>
                      </div>
                      <div className="product_info_details_mob">
                        <div className="productTitleAndRatings">
                        <p>{this.props.completeProdDetails.name}</p>
                          {/* <p id="custom_seller_name">
                            Seller: {this.props.completeProdDetails.vendor.name}
                          </p> */}
                          <ul className="rating_mobileproducts">
                            <li className="ratngstar_mobile">
                              {rating}
                              <span>
                                <i className="fas fa-star"></i>
                              </span>
                            </li>
                            <li className="ratings_mobile">
                              {aggregate} Reviews
                            </li>
                          </ul>
                        </div>
                        
                        {/* <ul className="mobile_pricelust_product">
                          <li className="realprice_mob_product">
                            Rs {this.props.clickedProductPrice}
                          </li>
                        </ul> */}
                        <ul className="mobile_pricelust_product">
                            <li className="realprice_mob_product">
                                <img
                                  src={require("../assets/img/inrCurrency_b.png")}
                                  alt="INR" className="rupss_img"></img>{" "}{this.props.clickedProductPrice}
                            </li>
                            <li className="strike_mob">
                                {/* <img
                                      src={require("../assets/img/inrCurrency_b.png")}
                                      alt="INR" className="small_rupee_img"/> {this.calculateMrp(this.props.clickedProductPrice)} */}
                                      {/* alt="INR" className="rupss_img small_rupee_img"/> {this.calculateMrp(this.props.clickedProductPrice)} */}
                            </li>
                            {/* <li className="offlist_mobile">
                                {Global.discountPercentage}% off
                            </li> */}
                        </ul>
                        
                        <ul>
                          
                        <div className="product_info_details_mob_desc">                                    
                            <span class="colr_diffmob_prodct">
                              {this.props.completeProdDetails.description}
                            </span>
                        </div>
                          {/* <span className="colr_diffmob_prodct">
                            {this.props.completeProdDetails.description}
                          </span> */}
                        </ul>
                      </div>
                    </div>

                    <div className="mycart_details padding_sec_mob">
                      <div className="select_size">
                        <p>Select Weight</p>
                        <div className="filterItemWrap customdropdown">
                          <div className="selectBox customSelectWrap">
                            <i className="fas fa-sort-down"></i>
                            <select
                              className="customSelect"
                              onChange={this.refreshCakeSize.bind(
                                this,
                                this.props.completeProdDetails
                              )}
                              value={this.props.clickedProductPrice}
                            >
                              {this.props.completeProdDetails.variations.map(
                                (variation, index) => (
                                  <option key={index} value={variation.price}>
                                    Size: {variation.weight} {variation.unit}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* <div className="customise_cake_detls margin_bottomcustomise_cake_detls">
                        <div className="form-group">
                          <label>Quantity</label>
                          <input
                            type="number"
                            name="city"
                            list="quantity"
                            className="form-control"
                            placeholder="Enter Quantity"
                            onChange={this.product_quantity_input.bind(this)}
                            value={this.state.product_quantity_input}
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
                      </div> */}
                      <div className="customise_cake_detls margin_bottomcustomise_cake_detls">
                        <div className="form-group">
                          <p className="details-item-titles">Quantity</p>
                          <input type="number" 
                          name="city" list="quantity" 
                          className="form-control" 
                          placeholder="Enter Quantity" 
                          onChange={this.product_quantity_input.bind(this)}
                          value={this.state.product_quantity_input}/>

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


                      
                        {/* <DateTimePicker
                          min={this.state.minimum_delivery_time}
                          max={this.state.maximum_delivery_time}
                          onChange={this.delivery_time.bind(this)}
                          value={this.state.delivery_time}
                        /> */}

                          <div className="customise_cake_detls margin_bottomcustomise_cake_detls ">
                            <ul className="date_time_pickrsec">
                              <li className="input_margin">
                                  <div className="customise_cake_detls margin_bottomcustomise_cake_detls date_picker">
                                      <div className="form-group " >
                                          <p className="details-item-titles">Set Delivery Time</p>
                                          {/* <input type="number" class="form-control" placeholder="Enter Date" value="" style={{height:"54px",}}/> */}
                                          <DatePicker
                                              wrapperClassName="datepicker_input"
                                              selected={this.state.selectedDate}
                                              minDate={this.state.minimum_delivery_time}
                                              //maxDate={this.state.maximum_delivery_time}
                                              
                                              customInput={<ClickableInput
                                                placeholder="Enter Date and Time"
                                                onClick={this.openDatepicker}
                                              />}
                                              dateFormat="dd/MM/yyyy"
                                              onChange={date=> this.setSelectedDate(date)}
                                              ref={(c) => this._calendar = c} />
                                          <div className="icons_datepicker">
                                              <Link  className="calendar_date" onClick={this.openDatepicker}><i className="fas fa-calendar-alt"></i></Link>
                                          </div>
                                      </div>
                                  
                                  </div>
                              </li>
                              <li>
                                  <div className="customise_cake_detls margin_bottomcustomise_cake_detls date_picker">
                                      <div className="form-group ">
                                        <select
                                          onChange={this.handleTimeSlabOnChange}
                                          value={this.state.timeSlab}>

                                          {this.state.optionsArray.map(
                                            (value, index) => (
                                              <option key={index} value={value}>
                                                {value}
                                              </option>
                                              )
                                          )}
                                        </select>

                                        <div className="icons_datepicker">
                                            <a  className="clock_date"><i className="fas fa-clock"></i></a>
                                        </div>

                                          
                                      </div>
                              
                                  </div>
                              </li>
                            </ul>
                            <div style={{marginTop: "-22px"}}>
                              <p>{this.state.selectedTime}</p>
                            </div>
                          </div>
                      {/* <label className="container_label variation pro_lab">
                        {this.props.attribute_list}
                      </label> */}

                      <div className="form-group mob_producttextarea">
                        <label>Cake Message</label>

                        <textarea
                          rows="4"
                          value={this.state.cake_message}
                          onChange={this.cake_message.bind(this)}
                          placeholder="Message on cake...."
                        ></textarea>
                      </div>

                      {/* <div className="customise_cake_detls margin_bottomcustomise_cake_detls">
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

                      <div className="add_to_cart_mobile">
                        <Link
                          onClick={this.check_delivery_pincode_validation.bind(
                            this
                          )}
                          to="#"
                        >
                          Check Availability
                        </Link>
                      </div> */}

                      <div class="customise_cake_detls margin_bottomcustomise_cake_detls">
                            <div class="form-group customize_mobile_input">
                                <p class="details-item-titles">Check Availability</p>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter your Pincode"
                                    value={this.state.delivery_pincode}
                                    onChange={this.delivery_pincode.bind(this)}
                                  />
                            </div>
                            <a class="mob-check-avail-btn">
                              <Link
                                onClick={this.check_delivery_pincode_validation.bind(
                                  this
                                )}
                                to="#"
                                >
                                Check
                              </Link>
                              
                            </a>
                      </div>

                      <ul className="btn_cart btn_cart_m customize_btn" >
                        <li className="add_to_wishlist mobile_add">
                          {this.state.wishlist == 0 && (
                            <Link
                              to="#"
                              onClick={this.add_to_wishlist.bind(
                                this,
                                this.props.completeProdDetails
                              )}
                            >
                              <i className="far fa-heart heart_space"></i>
                              Move to Wishlist
                            </Link>
                          )}
                        </li>

                        {/* <div
                          className={`customizeBtnWrap ${
                            this.state.wishlist == 1 ? "custoYop" : ""
                          }`}
                        >
                          <label>Want to customize?</label>
                          <Link
                            onClick={this.customised_nevigate.bind(
                              this,
                              "customize-cake"
                            )}
                            to="#"
                            className="customizeBtn"
                          >
                            Customize
                          </Link>
                        </div> */}

                        
                            <div
                              className={`customizeBtnWrap ${
                                this.state.wishlist == 1 ? "custoYop" : ""
                              }`}>
                              <label>Want to customize?</label>
                              <Link
                                  onClick={this.customised_nevigate.bind(
                                    this,
                                    "customize-cake"
                                  )}
                                  to="#"
                                  className="customizeBtn"
                                >
                                Customize
                              </Link>
                            </div>
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
                              {/* {this.props.completeProdDetails.addintional_info} */}
                              <ul >
                                <li className="descriptionBullet">
                                The products will be delivered by our delivery partner within the agreed timeframe.
                                </li>
                                <li className="descriptionBullet">
                                The accessories shown in the photo is for representational purposes only.
                                </li>
                                <li className="descriptionBullet">
                                The delivery will be attempted only once. Any change of address and/or time might incur additional cost or result in non-delivery of the product. 
                                </li>
                                <li className="descriptionBullet">
                                The delivery will be attempted only once. Any change of address and/or time might incur additional cost or result in non-delivery of the product. 
                                </li>
                                <li className="descriptionBullet">
                                We recommend the cakes and bakery items to be consumed within 24 hours of delivery. 
                                </li>
                                <li className="descriptionBullet">
                                Cakes and other bakery items should be kept refrigerated unless otherwise stated. Fondant cakes should be kept in air-conditioned room.
                                </li>
                                <li className="descriptionBullet">
                                Please make sure that the cake and other bakery items are brought to room temperature before consumption.
                                </li>
                                <li className="descriptionBullet">
                                The final product design might vary from the photo shown to accommodate design and weight parameters.
                                </li>
                              </ul>
                              
                            </div>
                          </div>
                        </div>

                      {/* This below section Write Review is commented for temporary testing purpose */}


                        {/* <div className="card">
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
                                  this.props.completeProdDetails
                                }
                              />
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  
                    <div className="row">
                          <div className="recommendations">
                              You may also like
                          </div>
                          <div className="recommendations_lists">
                              <ul className="recommndationslist_content">
                              {/* <InfiniteScroll
                                dataLength={this.props.you_may_also_likes.length}
                                // next={this.getMoreProducts}
                                hasMore={false}> */}
                                {this.props.you_may_also_likes.map((prod, index) => (
                                  <RecommendedSection
                                    prod={prod}
                                    onNavigate={this.nevigate.bind(this)}
                                  />
                                ))}
                                {/* </InfiniteScroll> */}
                               
                              </ul>
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
                    this.props.completeProdDetails,
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
                    this.props.completeProdDetails
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
export default ProductDetailsComponent;
