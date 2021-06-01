import React from "react";
import { HomeCorouselProduct } from "../Pagecomponent";
import { Link, NavLink } from "react-router-dom";
import { Api, Url, Helper, Global } from "../config";

class PaymentComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address: "",
      address_type: "",
      phone: "",
      city: "",
      state: "",
      pincode: "",
      selected_user_adress_db_id: "",

      errorTextaddress: false,
      errorTextaddress_type: false,
      errorTextphone: false,
      errorTextcity: false,
      errorTextstate: false,
      errorTextpincode: false,

      state_list: "",
      city_list: "",
      country: 101, //india
      state: 41, //west bengal
      city: 5583, //kolkata
    };
  }

  address(e) {
    this.setState({ address: e.target.value });
  }
  address_type(e) {
    this.setState({ address_type: e.target.value });
  }
  phone(e) {
    if (e.target.value.length < 11) {
      this.setState({ phone: e.target.value });
    }
  }
  state_list(e) {
    this.setState({ state: e.target.value });
    this.get_city_list(e.target.value);
  }
  city(e) {
    this.setState({ city: e.target.value });
  }
  pincode(e) {
    if (e.target.value.length < 7) {
      this.setState({ pincode: e.target.value });
    }
  }
  get_city_list = (state_id) => {
    let url = Url.get_city_list + "/" + state_id;
    Api.fetch_city(url).then((res) => {
      let response = JSON.parse(res);
      let data = response.response;
      if (data.status === true) {
        this.setState({ city_list: data.data });
      }
    });
  };

  get_state_list = () => {
    let url = Url.get_state_list + "/" + this.state.country;

    Api.fetch_state(url).then((res) => {
      let response = JSON.parse(res);
      let data = response.response;
      if (data.status === true) {
        this.setState({ state_list: data.data });
        this.get_city_list(this.state.state);
      }
    });
  };
  clear_address_values = () => {
    this.setState({
      address: "",
      address_type: "",
      phone: "",
      pincode: "",

      errorTextaddress: false,
      errorTextaddress_type: false,
      errorTextphone: false,
      errorTextcity: false,
      errorTextstate: false,
      errorTextpincode: false,
    });
  };
  save_user_address = () => {
    let user_address = {
      address: this.state.address,
      address_type: this.state.address_type,
      phone: this.state.phone,
      city: this.state.city,
      state: this.state.state,
      pincode: this.state.pincode,
    };

    let errorObj = Helper.user_address_Validation(user_address);
    console.log(errorObj);

    this.setState({
      errorTextaddress: errorObj.address,
      errorTextaddress_type: errorObj.address_type,
      errorTextphone: errorObj.phone,
      errorTextcity: errorObj.city,
      errorTextstate: errorObj.state,
      errorTextpincode: errorObj.pincode,
    });

    if (errorObj.continue) {
      let api = Url.add_user_address;
      Api.user_add_address(api, user_address).then((res) => {
        let data = JSON.parse(res);
        console.log(data);
        if (data.status == "OK" && data.code == 200) {
          this.props.get_user_address();
          document.querySelector("#closeAddress").click();
          this.clear_address_values();
        } else {
        }
      });
    }
  };
  componentDidMount = () => {
    this.get_state_list();
  };
  selected_user_address_id = (address) => {
    this.props.get_default_address(address, "address_id_pass");
  };

  process_payment = () => {
    let status = false;

    if (this.props.default_address == "") {
      Helper.alert("Please add an Delivery Address");
      return false;
    }
    Global.pincode.map((pincode) => {
      if (pincode == this.props.user_full_address.postal_code) {
        status = true;
      }
    });
    if (status == false) {
      Helper.alert("We do not deliver to this location");
      return false;
    }
    window.location.replace(
      Url.payment +
        "/" +
        this.props.user_cart_id +
        "/" +
        this.props.default_address +
        "/" +
        this.props.user_id
    );
  };
  render() {
    return (
      <React.Fragment>
        <React.Fragment>
          <div className="modal fade" id="myModal_address" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content loginSignupContentWrap backgroundcolor_wrap address_paymntmodal">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span id="closeAddress" aria-hidden="true">
                      ×
                    </span>
                  </button>
                  <h5 className="modal-title">Add address</h5>
                </div>
                <div className="modal-body">
                  <div className="loginWrap defaultFormWrap defaultFormWrap_modify address_paymnt">
                    <div className="loginFormWrap">
                      <div className="col-md-12">
                        <div className="fieldItem modify_message_sectn boxshadowfield">
                          <label>Address</label>
                          <textarea
                            rows="4"
                            cols=""
                            placeholder="Enter address"
                            className={`formField addrssfield ${
                              this.state.errorTextaddress ? "errorval" : ""
                            }`}
                            onChange={this.address.bind(this)}
                            value={this.state.address}
                          />{" "}
                          {this.state.errorTextaddress && (
                            <span className="errorText">
                              {this.state.errorTextaddress}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="fieldItem paymnt_add_addressfield">
                          <label>Address type</label>
                          <input
                            type="text"
                            placeholder="Enter your address type"
                            className={`formField addrssfield ${
                              this.state.errorTextaddress_type ? "errorval" : ""
                            }`}
                            onChange={this.address_type.bind(this)}
                            value={this.state.address_type}
                          />{" "}
                          {this.state.errorTextaddress_type && (
                            <span className="errorText">
                              {this.state.errorTextaddress_type}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="fieldItem paymnt_add_addressfield">
                          <label>Phone</label>
                          <input
                            type="number"
                            placeholder="Enter your phone number"
                            className={`formField addrssfield ${
                              this.state.errorTextphone ? "errorval" : ""
                            }`}
                            onChange={this.phone.bind(this)}
                            value={this.state.phone}
                          />{" "}
                          {this.state.errorTextphone && (
                            <span className="errorText">
                              {this.state.errorTextphone}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="fieldItem paymnt_add_addressfield">
                          <label>State</label>
                          <select
                            className="select_optnpaymnt"
                            value={this.state.state}
                            onChange={this.state_list.bind(this)}
                          >
                            {this.state.state_list != "" &&
                              this.state.state_list.map((state, index) => (
                                <option key={index} value={state.id}>
                                  {state.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="fieldItem paymnt_add_addressfield">
                          <label>City</label>

                          <select
                            className="select_optnpaymnt"
                            value={this.state.city}
                            onChange={this.city.bind(this)}
                          >
                            {this.state.city_list != "" &&
                              this.state.city_list.map((city, index) => (
                                <option key={index} value={city.id}>
                                  {city.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="fieldItem paymnt_add_addressfield">
                          <label>Pincode</label>
                          <input
                            type="number"
                            placeholder="Enter Pincode"
                            className={`formField addrssfield ${
                              this.state.errorTextpincode ? "errorval" : ""
                            }`}
                            onChange={this.pincode.bind(this)}
                            value={this.state.pincode}
                          />{" "}
                          {this.state.errorTextpincode && (
                            <span className="errorText">
                              {this.state.errorTextpincode}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="save_btn_modify address_paymntbtn">
                          <Link
                            to="#"
                            onClick={this.save_user_address.bind(this)}
                          >
                            Save address
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
        <React.Fragment>
          <section id="productListWrapper" className="rowTopMargin">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="mycart_header">
                    <div className="col-md-12">
                      <p>Order Summary</p>
                    </div>
                  </div>

                  {this.props.order_summary.map((order_item, index) => (
                    <div
                      key={index}
                      className="mycart_details mycart_details_fullwidth"
                    >
                      <div className="cart_details_padding padding_off_payment">
                        <div className="cart_details_payment payment_uppr_padding bottomzero topers">
                          <div className="col-md-12">
                            <div className="payment_upperdetls mini">
                              <p className="cake_name_paymnt">
                                {order_item.name}
                              </p>
                              <p>
                                <img
                                  src={require("../assets/img/money_small.png")}
                                  className="money_small"
                                />
                                <span className="paymnt_price_no">
                                  {order_item.price}
                                </span>
                                &nbsp;<span className="paymnt_save"></span>
                              </p>
                              <ul className="paymnt_wght_qty_detls">
                                {order_item.type == "cake" && (
                                  <li>
                                    Weight :{" "}
                                    <span>
                                      {order_item.weight} {order_item.unit}
                                    </span>
                                  </li>
                                )}
                                <li>
                                  Quantity : <span>{order_item.quantity}</span>
                                </li>
                              </ul>

                              {/* {order_item.attribuites != "" &&
                                order_item.type == "cake" &&
                                order_item.attribuites.map(
                                  (attribuites, index) => (
                                    <span
                                      key={index}
                                      className="container_label marginoff_paymnt"
                                    >
                                      {attribuites.name}
                                      <input type="checkbox" checked disabled />
                                      <span className="checkmark"></span>
                                    </span>
                                  )
                                )} */}
                              <p className="message_payment">
                                {order_item.type == "cake" &&
                                  "Message on cake :"}
                              </p>
                              <div className="message_dtls_paymnt msgealign">
                                {order_item.type == "cake" &&
                                  order_item.message}
                              </div>
                            </div>
                            <img
                              className="img_payment_upperdetls maxwidthy"
                              src={order_item.image}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="mycart_details">
                    <div className="mycart_header">
                      <div className="col-md-12">
                        <p>Delivery Address</p>
                      </div>
                    </div>

                    {this.props.user_address != "" &&
                      this.props.user_address.map((user_address, index) => (
                        <div
                          key={index}
                          className="select_portn"
                          onClick={this.selected_user_address_id.bind(
                            this,
                            user_address
                          )}
                        >
                          <label className="container_payment label_cls">
                            {this.props.User.charAt(0).toUpperCase() +
                              this.props.User.slice(1)}

                            <span className="paymnt_home_optn">
                              {user_address.address_type}
                            </span>
                            {this.props.default_address == user_address.id && (
                              <input type="radio" name="radio" defaultChecked />
                            )}
                            {this.props.default_address != user_address.id && (
                              <input type="radio" name="radio" />
                            )}
                            <span className="checkmark_address"></span>
                            <div className="payment_address_detls">
                              <p>
                                {user_address.address} {user_address.phone}{" "}
                                {user_address.city.name}{" "}
                                {user_address.state.name}{" "}
                                {user_address.country.name}{" "}
                                {user_address.postal_code}{" "}
                              </p>
                            </div>
                          </label>
                        </div>
                      ))}
                  </div>

                  <div
                    onClick={this.clear_address_values.bind(this)}
                    className="mycart_details border_sectn_paymnt"
                  >
                    <Link
                      to="#"
                      data-toggle="modal"
                      data-target="#myModal_address"
                      className=""
                    >
                      <div className="add_addrss_paymnt">
                        <i className="fas fa-plus"></i>Add Address
                      </div>
                    </Link>
                  </div>

                  <Link to="#" onClick={this.process_payment.bind(this)}>
                    <div className="place_ordr_btn proceed_paypaymnt">
                      Checkout
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      </React.Fragment>
    );
  }
}
export default PaymentComponent;

