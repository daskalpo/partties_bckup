import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Helper, Url, Global, Api } from "../config";
import { assign_cart_item_modify } from "../config/helper";

class OrderDetailsComponent extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    Helper.loadScript("admin");
  };
  open_order_list = () => {
    this.props.open_order_details();
  };
  render() {
    let order_details = this.props.order_full_details[0];
    console.log(order_details);

    return (
      <React.Fragment>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div
                onClick={this.open_order_list.bind(this)}
                className="col-sm-6"
              >
                <img src={"../assets/img/black_back.png"} />
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li
                    onClick={this.open_order_list.bind(this)}
                    className="breadcrumb-item"
                  >
                    <Link to="#">Order</Link>
                  </li>
                  <li className="breadcrumb-item active">Details</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="invoice p-3 mb-3">
                  <div className="row invoice-info">
                    <div className="col-sm-4 invoice-col">
                      <address>
                        <b className="pro_fon">Customer :</b>
                        <span className="pro_fon">
                          {" "}
                          {order_details.user.name}
                        </span>
                        <br></br>
                        <b className="pro_fon">Order Id :</b>
                        <span className="pro_fon">
                          {" "}
                          {order_details.order_id}
                        </span>
                        <br></br>
                        <b className="pro_fon">Order Status :</b>
                        <span className="pro_fon">
                          {" "}
                          {order_details.delivery_status}
                        </span>

                        <br></br>
                      </address>
                    </div>
                    <div class="col-sm-4 invoice-col"></div>
                    <div class="col-sm-4 invoice-col">
                      <address className="pro_fon">
                        <strong>{order_details.address.address_type}</strong>
                        <br></br>
                        {order_details.address.address}
                        <br></br>
                        {order_details.address.city.name}
                        {""},{""} {order_details.address.state.name}
                        <br></br>
                        Pin : {order_details.address.postal_code}
                        <br></br>
                        Phone : {order_details.user.phone}
                      </address>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Message</th>
                            <th>Weight</th>
                            <th>Attributes</th>
                            <th>Vendor</th>
                            <th>Qty * Price</th>
                            <th>Delivery</th>
                            <th>Sub-total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order_details.items.map((item, index) => (
                            <tr key={index}>
                              <td className="td_particular">{++index}</td>
                              <td className="td_particular">
                                <img
                                  src={item.product.image[0].image_path}
                                  className="rounded-circle cutomerPic"
                                />{" "}
                                {item.product.name}
                              </td>
                              <td className="td_particular">
                                {item.item_message}
                              </td>
                              <td className="td_particular">
                                {item.variation.weight} {item.variation.unit}
                              </td>
                              <td className="td_particular">
                                {Helper.get_attributes(
                                  item.product.attribuites
                                )}
                              </td>
                              <td className="td_particular">
                                {item.product.vendor.name}
                              </td>

                              <td className="td_particular">
                                {item.qty} * {item.u_price}
                              </td>
                              <td className="td_particular">  {item.delivery_time}</td>
                              <td className="td_particular">
                                Rs {item.t_price}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-8"></div>
                    <div className="col-4">
                      <div className="table-responsive">
                        <table className="table">
                          <tbody>
                            <tr>
                              <th className="pro_fon">Sub total :</th>
                              <td className="pro_fon">
                                Rs {order_details.t_price}
                              </td>
                            </tr>
                            <tr>
                              <th className="pro_fon">Tax :</th>
                              <td className="pro_fon">
                                Rs {order_details.tax}
                              </td>
                            </tr>
                            <tr>
                              <th className="pro_fon">Delivery :</th>
                              <td className="pro_fon">Free</td>
                            </tr>
                            <tr>
                              <th className="pro_fon">Total :</th>
                              <td className="pro_fon">
                                Rs{" "}
                                {Helper.total_cart_price(
                                  order_details.t_price,
                                  order_details.tax
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default OrderDetailsComponent;
