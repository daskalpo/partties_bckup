import React from "react";
import { Api, Url, Helper, Global } from "../config";
import { Link, NavLink } from "react-router-dom";

class OrderDetailsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contact_name: "",
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
      errorTextcontact_name: false,

      state_list: "",
      city_list: "",
      country: 101, //india
      state: 41, //west bengal
      city: 5583, //kolkata
    };
  }

  contact_name(e) {
    this.setState({ contact_name: e.target.value });
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
  save_changed_shipping_address = () => {
    let user_address = {
      address: this.state.address,
      address_type: this.state.address_type,
      phone: this.state.phone,
      city: this.state.city,
      state: this.state.state,
      pincode: this.state.pincode,
      contact_name: this.state.contact_name,
    };

    let errorObj = Helper.user_shipping_Validation(user_address);
    console.log(errorObj);

    this.setState({
      errorTextaddress: errorObj.address,
      errorTextaddress_type: errorObj.address_type,
      errorTextphone: errorObj.phone,
      errorTextcity: errorObj.city,
      errorTextstate: errorObj.state,
      errorTextpincode: errorObj.pincode,
      errorTextcontact_name: errorObj.contact_name,
    });

    if (errorObj.continue) {
      let api =
        Url.shipping_address + "/" + this.props.order_details[0].address.id;
      Api.save_shipping_address(api, user_address).then((res) => {
        let data = JSON.parse(res);
        console.log(data);
        if (data.status == "OK") {
          this.props.refresh_order_details();
          document.querySelector("#shippingAddressClose").click();
        }
        if (data.status == "FAIL") {
          this.setState({
            errorTextaddress: data.data.address,
            errorTextaddress_type: data.data.address_type,
            errorTextphone: data.data.phone,
            errorTextcity: data.data.city,
            errorTextstate: data.data.state,
            errorTextpincode: data.data.pincode,
            errorTextcontact_name: data.data.contact_name,
          });
        }
      });
    }
  };
  componentDidMount = () => {
    window.scrollTo(0, 0);
    this.get_state_list();
 //   this.load_shipping_address();
  };
  load_shipping_address = () => {
    let api =
      Url.shipping_address + "/" + this.props.order_details[0].order.address.id;
    Api.fetch_shipping_address(api).then((res) => {
      let resp = JSON.parse(res);
      let data = resp.response;
      console.log(data);
      if (data.status == 200) {
        console.log(data.address);
        this.setState({
          address: data.users.address,
          address_type: data.users.address_type,
          phone: data.users.phone,
          city: data.users.city_id,
          state: data.users.state_id,
          pincode: data.users.postal_code,
          contact_name: data.users.contact_name,
        });
      }
    });
  };
  render() {
    console.log(this.props.order_details[0].order.items);
    return (
      <React.Fragment>
        <React.Fragment>
          <div className="modal fade" id="shippingAddressEdit" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content loginSignupContentWrap address_paymntmodal">
                <div className="modal-header">
                  <button
                    type="button"
                    id="shippingAddressClose"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span id="closeAddress" aria-hidden="true">
                      ×
                    </span>
                  </button>
                  <h5 className="modal-title">Edit Shipping Address</h5>
                </div>
                <div className="modal-body">
                  <div className="loginWrap defaultFormWrap defaultFormWrap_modify address_paymnt">
                    <div className="loginFormWrap">
                      <div className="col-md-12">
                        <div className="fieldItem paymnt_add_addressfield">
                          <label>Contact Name</label>
                          <input
                            type="text"
                            placeholder="Enter your address type"
                            className={`formField addrssfield ${
                              this.state.errorTextcontact_name ? "errorval" : ""
                            }`}
                            onChange={this.contact_name.bind(this)}
                            value={this.state.contact_name}
                          />{" "}
                          {this.state.errorTextcontact_name && (
                            <span className="errorText">
                              {this.state.errorTextcontact_name}
                            </span>
                          )}
                        </div>
                      </div>

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
                            onClick={this.save_changed_shipping_address.bind(
                              this
                            )}
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
                  <div className="mycart_details">
                    <div className="mycart_header">
                      <div className="col-md-12">
                        <p>Order Details</p>
                      </div>
                    </div>

                    <div className="cart_details_padding">
                      <span className="orderid_payment ord_mar ">
                        Order Id : #{this.props.order_details[0].order_id}
                      </span>
                      {this.props.order_details[0].order.items.map(
                        (order_detail, index) => (
                          <ul
                            className={`order_detls_contnt order_hstrydetls ${
                              index != 0 ? "border_top_orderdetls" : ""
                            }`}
                          >
                            <li>
                              <div className="ordr_namedetls">
                                <p className="price_cart margintop_ordrdetls font_size_ordrdetls first_order_history_p">
                                  {order_detail.product.name}
                                </p>
                                <p className="price_cart marginoff_ordrdetls font_size_ordrdetls">
                                  Rs {order_detail.u_price}
                                </p>
                                <p className="cart_seller marginoff_ordrdetls font_size_ordrdetls">
                                  Seller : {order_detail.product.vendor.name}
                                </p>
                              </div>
                            </li>

                            <li className="orderplcd_ordrdetls">
                              <p className="price_cart font_size_ordrdetls">
                                <i className="fas fa-circle green_orderdetls"></i>
                                Order placed successfully
                                <br></br>
                                <span className="item_ordrdetls">
                                  Your item has been placed for order
                                </span>
                                <span className="item_ordrdetls date_delvry_ordrpg">
                                  Status :{" "}
                                  {this.props.order_details[0].order.delivery_status
                                    .charAt(0)
                                    .toUpperCase() +
                                    this.props.order_details[0].order.delivery_status.slice(
                                      1
                                    )}
                                </span>
                                <span className="item_ordrdetls date_delvry_ordrpg">
                                  Delivery : {order_detail.delivery_time}
                                </span>
                              </p>
                            </li>

                            <li>
                              <div className="cake_img_cart order_detlscake">
                                <img
                                  src={order_detail.product.image[0].image_path}
                                />
                              </div>
                            </li>
                          </ul>
                        )
                      )}
                    </div>
                  </div>
                  <div className="mycart_details">
                    <div className="shippngaddrss_ordrpg">
                      <div className="col-md-12">
                        <p>
                          Shipping Address{" "}
                          <Link
                            to="#"
                            data-toggle="modal"
                            data-target="#shippingAddressEdit"
                            onClick={this.load_shipping_address.bind(this)}
                          >
                            {this.props.order_details[0].order
                              .delivery_status == "preparing" && (
                              <i class="fas fa-pencil-alt shippingaddressedit"></i>
                            )}
                          </Link>{" "}
                        </p>
                      </div>
                    </div>

                    <div className="cart_details_padding address_sec_orderpg">
                      <div className="address_orderpg">
                        <p className="usernm_ordrpg">
                          {
                            this.props.order_details[0].order.address
                              .contact_name
                          }{" "}
                          (
                          {
                            this.props.order_details[0].order.address
                              .address_type
                          }
                          )
                        </p>
                        <p className="address_usernm_ordrpg">
                          {this.props.order_details[0].order.address.address}
                          <br></br>
                          {this.props.order_details[0].order.address.city.name},
                          {this.props.order_details[0].order.address.state.name}
                          -{" "}
                          {
                            this.props.order_details[0].order.address
                              .postal_code
                          }
                          <br></br>
                          Phone Number -{" "}
                          {this.props.order_details[0].order.address.phone}
                        </p>
                      </div>
                    </div>
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
export default OrderDetailsComponent;
