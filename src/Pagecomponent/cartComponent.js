import React from "react";
import { Helper, Api, Url } from "../config";
import { Link, NavLink } from "react-router-dom";

class CartComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      variations: [],
      textarea_message: "",
      selectbox_value: "",
      clicked_product: [],
      product_quantity_input: "",
      product_type: "",
      quantity_error: false,
    };
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
  };

  product_quantity_input(e) {
    if (e.target.value.length < 4) {
      this.setState({ product_quantity_input: e.target.value });
    }
  }

  palceOrder = () => {
    let user = window.localStorage.getItem("LOGGEDUSER");
    if (user == "" || user === null || user === undefined) {
      document.getElementById("loginss").click();
    } else {
      this.props.history.push("/payment");
    }
  };

  cart_quantity = (cart_Product, e) => {
    this.props.cart_values_manager(
      cart_Product,
      e.target.value,
      "quantity_option"
    );
  };

  cart_quantity_remove_ok = () => {
    this.props.cart_values_manager(
      this.state.clicked_product,
      "",
      "remove_option"
    );
    document.getElementById("alertCloseremove").click();
  };

  cart_quantity_remove = (cart_Product) => {
    this.setState({ clicked_product: cart_Product });
    document.getElementById("alertOpenremove").click();
  };
  select_box_assigner = (cart_Product) => {
    this.setState({ product_quantity_input: cart_Product.quantity });
    this.setState({ product_type: cart_Product.type });
  };
  cart_item_modify = (cart_Product) => {
    this.select_box_assigner(cart_Product);

    let cart_prod = cart_Product;
    this.setState({
      clicked_product: cart_prod,
      textarea_message: cart_prod.message,
      selectbox_value: cart_prod.product_variation_id,
    });
    let api = Url.Productvariations + "/" + cart_prod.product_id;
    Api.product_size(api).then((res) => {
      let response = JSON.parse(res);
      let data = response.response;
      if (data.status === true) {
        window.sessionStorage.setItem(
          "VARIATION",
          JSON.stringify(data.data.variations)
        );
        this.setState({ variations: data.data.variations });
      }
    });
  };
  change_textarea_message = (e) => {
    if (e.target.value.length > 50) {
      return false;
    }
    this.setState({ textarea_message: e.target.value });
  };
  selectbox_value_change = (e) => {
    this.setState({ selectbox_value: e.target.value });
  };
  add_to_wishlist = (completeProdDetails) => {
    let user = window.localStorage.getItem("LOGGEDUSER");

    if (user == "" || user === null || user === undefined) {
      document.getElementById("loginss").click();
    } else {
      let local_Add_to_wishlist = {
        product_id: completeProdDetails.product_id,
        product_variation_id: completeProdDetails.product_variation_id,
      };

      console.log(local_Add_to_wishlist);
      let api = Url.add_to_wishlist;
      Api.add_to_wishlist_cart(api, local_Add_to_wishlist).then((res) => {
        let response = JSON.parse(res);
        let data = response;
        if (data.code == 200) {
          Helper.add_to_wishlist_value(data.count);
          this.props.cart_values_manager(
            completeProdDetails,
            "",
            "remove_option"
          );
          // Helper.alert("Item successfully added in your wishlists");
        }
      });
    }
  };
  save_custome_parameters = () => {
    let local_product_quantity = this.state.product_quantity_input;
    if (local_product_quantity < 0 || local_product_quantity == '') {
      this.setState({ quantity_error: true });
      return false;
    }

    this.setState({ quantity_error: false });

    let user = window.localStorage.getItem("LOGGEDUSER");
    let local_variation = JSON.parse(
      window.sessionStorage.getItem("VARIATION")
    );
    let price = "";
    let weight = "";
    let id = this.state.selectbox_value;
    local_variation.map(function (val) {
      if (val.id == id) {
        price = val.price;
        weight = val.weight;
      }
    });

    let local_clicked_product = this.state.clicked_product;
    local_clicked_product.quantity = local_product_quantity;
    this.setState({ clicked_product: local_clicked_product });

    console.log(this.state.clicked_product);
    if (user == "" || user === null || user === undefined) {
      this.props.cart_values_manager(
        this.state.clicked_product,
        this.state.clicked_product.quantity,
        "quantity_option"
      );
      Helper.localStorage___update_cartItem_by_customMessage(
        this.state.clicked_product,
        this.state.textarea_message,
        this.state.selectbox_value,
        price,
        weight
      ).then((cart_product) => {
        this.props.cart_values_manager();
      });
    }
    if (user != "" && user !== null && user !== undefined) {
      let dataObj = {
        product_id: this.state.clicked_product.product_id,
        product_variation_id: parseInt(this.state.selectbox_value),
        quantity: this.state.clicked_product.quantity,
        message: this.state.textarea_message,
        cart_item_id: this.state.clicked_product.cart_item_id,
      };
      console.log(dataObj);
      let api = Url.cart_modify_online;
      Api.cart_modify_online(dataObj, api).then((res) => {
        let response = JSON.parse(res);
        let data = response.response;
        if (data.status === true) {
          this.props.common_cart_tax(data);
        }
      });
    }
    document.getElementById("closeCustomModal").click();
  };

  close_modal_only = () => {
    document.querySelector("#alertCloseremove").click();
  };

  close_modal_remove = () => {
    document.querySelector("#alertCloseremove").click();

    let user = window.localStorage.getItem("LOGGEDUSER");

    if (user == "" || user === null || user === undefined) {
      this.props.cart_values_manager(
        this.state.clicked_product,
        "",
        "remove_option"
      );
    }
    if (user != "" && user !== null && user !== undefined) {
      this.add_to_wishlist(this.state.clicked_product);
    }
  };

  history_go_back = () => {
    window.history.go(-1);
  };
  render() {
    console.log(this.props.cart_products);
    let options = this.state.variations.map((data) => (
      <option key={data.id} value={data.id}>
        {data.weight} {data.unit}
      </option>
    ));

    return (
      <React.Fragment>
        <React.Fragment key={"---------MOBILE_HEADER---------"}>
          <header id="header_mobile">
            <Link to="#" onClick={this.history_go_back.bind(this)}>
              <img
                src={"../assets/img/arrow_left.png"}
                className="arr_header"
              />
            </Link>
            <div className="header_txt_mble">
              <p>My Cart</p>
            </div>
          </header>
        </React.Fragment>
        <React.Fragment key={"---------BOTH_CONFIRMATION_MODAL---------"}>
          <div className="modal" id="myModalremove" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content backgroundcolor_wrap alert_wrap">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    id="alertCloseremove"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body toper">
                  <div className="loginWrap defaultFormWrap alert_modalwrap wisth_per">
                    <div className="loginFormWrap">
                      <p id="text">
                        Are you sure you want to remove this item ?
                      </p>

                      <ul className="btn_alert">
                        <li>
                          <div className="alert_cancelbtn maxw">
                            <Link
                              to="#"
                              onClick={this.close_modal_only.bind(this)}
                            >
                              Cancel
                            </Link>
                          </div>
                        </li>

                        <li>
                          <div className="alert_okbtn alert_ok">
                            <Link
                              to="#"
                              onClick={this.close_modal_remove.bind(this)}
                            >
                              Remove
                            </Link>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section id="productListWrapper" className="rowTopMargin hidden">
            <div className="container">
              <div className="row">
                <Link // className="hidden"
                  to="#"
                  data-toggle="modal"
                  id="alertOpenremove"
                  data-target="#myModalremove"
                >
                  Open to click
                </Link>
              </div>
            </div>
          </section>
        </React.Fragment>
        <React.Fragment key={"---------BOTH_MODIFY_MODAL----------"}>
          <div className="modal fade" id="myModal_modify" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content loginSignupContentWrap backgroundcolor_wrap">
                <div className="modal-header modal_header_web">
                  <button
                    type="button"
                    id="closeCustomModal"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                  <h5 className="modal-title">Modify</h5>
                </div>

                <div className="modal-header backgroundcolor_wrapmoble">
                  <button
                    type="button"
                    className="close close_moble"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                  <h5 className="modal-title">Modify</h5>
                </div>
                <div className="modal-body">
                  <div className="loginWrap defaultFormWrap defaultFormWrap_modify">
                    <div className="loginFormWrap">
                      {this.state.product_type == "cake" && (
                        <div className="col-md-12">
                          <span className="modify_customizesize">
                            Customize size
                          </span>
                          <div className="filterItemWrap filterItemmodify_cart" style={{backgroundColor:"#ffffff"}}>
                            <div className="selectBox customSelectWrap customSelectWrap_cart" style={{width:"86px"}}>
                              <i className="fas fa-sort-down" ></i>
                              <select
                                className="customSelect color_select_cart"
                                value={this.state.selectbox_value}
                                onChange={this.selectbox_value_change.bind(
                                  this
                                )}
                              >
                                {options}
                              </select>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="col-md-12 topy">
                        <span className="modify_customizesize">Quantity :</span>
                        <div className="filterItemWrap filterItemmodify_cart">
                          <input
                            max={100}
                            type="number"
                            className="form-control modal_modfycart"
                            list="quantity"
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
                      {this.state.quantity_error && (
                        <span className="mysupercust">
                          Invalid quantity selected
                        </span>
                      )}

                      {this.state.product_type == "cake" && (
                        <div className="col-md-12">
                          <div className="fieldItem modify_message_sectn">
                            <textarea
                              rows="4"
                              cols=""
                              placeholder="Message...."
                              className="formField"
                              onChange={this.change_textarea_message.bind(this)}
                              rows="4"
                              cols=""
                              placeholder="Message...."
                              className="formField"
                              value={this.state.textarea_message}
                            ></textarea>
                            <span className="characters_modify">
                              Max 50 characters
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="col-md-12">
                        <div
                          onClick={this.save_custome_parameters.bind(this)}
                          className="save_btn_modify"
                        >
                          <Link to="#">Save</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
        <React.Fragment key={"---------BOTH_CONTENT----------"}>
          <section id="productListWrapper" className="rowTopMargin">
            <div className="container">
              <div className="row">
                <div className="col-md-7 mobilepadding_off">
                  <div className="mycart_header headr_displyoff">
                    <div className="col-md-12">
                      <p>My Cart</p>
                    </div>
                  </div>

                  {this.props.cart_products.map((cart_product, index) => (
                    <div key={index} className="mycart_details rowTopCart">
                      <div className="col-md-12 cart_details_padding cart_details_padding_Remove_bottom">
                        <div className="cart_details_content">
                          <p className="heading_cakename">
                            {cart_product.name}
                          </p>
                          {cart_product.type == "cake" && (
                            <p className="cart_seller size_cart">
                              <span>Size: {cart_product.weight} LB</span>
                            </p>
                          )}

                          <p className="cart_seller size_cart">
                            <span>Quantity : {cart_product.quantity}</span>
                          </p>

                          <span className="cart_seller">
                            Seller : {cart_product.vendor}
                          </span>
                          <ul className="price_details_cart">
                            <li>
                              <span className="price_cart price_cart_blue">
                                Rs {cart_product.price}
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="cake_img_cart_select_custom">
                          <div className="cake_img_cart cartImage">
                            <img src={cart_product.image} />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12 paddingoffbtncart removetop">
                        <ul className="cart_btn">
                          <li>
                            <Link
                              to="#"
                              onClick={this.add_to_wishlist.bind(
                                this,
                                cart_product
                              )}
                            >
                              <i className="fas fa-heart"></i>
                              Move to wishlist
                            </Link>
                          </li>

                          <li>
                            <Link
                              to="#"
                              onClick={this.cart_quantity_remove.bind(
                                this,
                                cart_product
                              )}
                            >
                              <i className="fas fa-trash"></i>
                              Remove
                            </Link>
                          </li>

                          <li>
                            <Link
                              to="#"
                              data-toggle="modal"
                              data-target="#myModal_modify"
                              onClick={this.cart_item_modify.bind(
                                this,
                                cart_product
                              )}
                            >
                              <i className="fas fa-edit"></i>
                              Modify
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="col-md-5 mobilepadding_off">
                  <div className="mycart_details">
                    <div className="mycart_header headr_displyoff">
                      <div className="col-md-12">
                        <p>Price details</p>
                      </div>
                    </div>
                    <div className="headr_bordrmycart">
                      <div className="headr_displymobile">
                        <p>Price details</p>
                      </div>
                    </div>

                    <div className="amt_details_cart padding_crt_sec">
                      <div className="col-md-12 mycart_prc_sectn">
                        <span className="prce_txt_crt">
                          Price ({this.props.cart_products.length} items)
                        </span>
                        <span className="prce_txt_crt prce_amt_crt">
                          Rs {this.props.total_amout}
                        </span>
                      </div>
                      <div className="col-md-12 mycart_prc_sectn">
                        <span className="prce_txt_crt">GST</span>
                        <span className="prce_txt_crt prce_amt_crt">
                          Rs {this.props.gst}
                        </span>
                      </div>
                      <div className="col-md-12 delivry_sectn_cart">
                        <span className="prce_txt_crt">Delivery Fee</span>
                        <span className="prce_amt_crt greenfreesectn">
                          Free
                        </span>
                      </div>
                      <div className="col-md-12 delivry_sectn_cart totlamt_sectn_mycart">
                        <span className="prce_txt_crt bold_txt_cart price_cart_blue">
                          Total Amount
                        </span>
                        <span className="prce_amt_crt bold_txt_cart price_cart_blue">
                          Rs{" "}
                          {Helper.total_cart_price(
                            this.props.total_amout,
                            this.props.gst
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <Link to="#" onClick={this.palceOrder.bind(this)}>
                      <div className="place_ordr_btn">Place order</div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      </React.Fragment>
    );
  }
}
export default CartComponent;
