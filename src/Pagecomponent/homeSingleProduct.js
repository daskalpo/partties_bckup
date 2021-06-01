import React, { Component } from "react";
import { Api, Url, Helper } from "../config";
import { Link, NavLink } from "react-router-dom";

class HomeSingleProduct extends Component {
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
    if (completeProdDetails.type == "gift") {
      this.props.history.push(
        "/gift-detail/" + this.props.productInDetails.slug + ""
      );
    } else {
      this.props.history.push(
        "/product-detail/" + this.props.productInDetails.slug + ""
      );
    }
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
          this.setState({ wishlist: 0 });
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
          });
        }
      }
    );
  };

  validatePrice=(price)=>{
    if(price!=null){
      return price;
    }else {
      alert('null')
      return 0;
    }
  }


  render() {
    var img = this.props.productInDetails.image.map(function (img, index) {
      if (img.feature == 1) {
        return <img className="custwid" key={index} src={img.image_path} alt="Cake"></img>;
      }
    });
    return (
      <li key={this.props.productInDetails.id}>
        <div key={Helper.key} className="productItemList">
          <div
            onClick={this.nevigate.bind(this, this.props.productInDetails)}
            className="productImageWrap additionHome"
          >
            {img}
          </div>
          <div className="home_pro">
            <div className="productListInnerContentWrap">
              <p
                onClick={this.nevigate.bind(this, this.props.productInDetails)}
                className="productName"
              >
                <Link
                  onClick={this.nevigate.bind(
                    this,
                    this.props.productInDetails
                  )}
                >
                  {this.props.productInDetails.name}
                </Link>
              </p>

              <p className="productPrice">
                <img
                  className="rupees"
                  key={Helper.key}
                  src={require("../assets/img/inrCurrency.png")}
                  alt="INR"
                ></img>
                <strong className="card_rs_font">
                  {this.validatePrice(this.props.productInDetails.variation.price)}
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
      </li>
    );
  }
}

export default HomeSingleProduct;
