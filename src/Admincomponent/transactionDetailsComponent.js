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
    this.props.open_transaction_details();
  };
  render() {
    let transaction_full_details = this.props.transaction_full_details[0];
    console.log(transaction_full_details);
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
                    <Link to="#">Transaction</Link>
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
                          {transaction_full_details.user.name}
                        </span>
                        <br></br>
                        <b className="pro_fon">Order Id :</b>
                        <span className="pro_fon">
                          {" "}
                          {transaction_full_details.order_id}
                        </span>
                        <br></br>

                        <span className="pro_fon">
                          {" "}
                          {transaction_full_details.delivery_status}
                        </span>
                        <br></br>
                        <b className="pro_fon">Date :</b>
                        <span className="pro_fon">
                          {" "}
                          {Helper.get_review_date(
                            transaction_full_details.order.delivery_datetime
                          )}
                        </span>
                        <br></br>
                      </address>
                    </div>
                    <div class="col-sm-4 invoice-col"></div>
                    <div class="col-sm-4 invoice-col">
                      <address className="pro_fon">
                        <strong>
                          {transaction_full_details.address.address_type}
                        </strong>
                        <br></br>
                        {transaction_full_details.address.address}
                        <br></br>
                        {transaction_full_details.address.city.name}
                        {""},{""} {transaction_full_details.address.state.name}
                        <br></br>
                        Pin : {transaction_full_details.address.postal_code}
                        <br></br>
                        Phone: {transaction_full_details.user.phone}
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
                            <th>Slug</th>
                            <th>Vendor</th>
                            <th>Qty * Price</th>
                            <th>Sub-total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transaction_full_details.order.items.map(
                            (item, index) => (
                              <tr key={index}>
                                <td className="td_particular">{++index}</td>
                                <td>
                                  <img
                                    src={item.product.image[0].image_path}
                                    className="rounded-circle cutomerPic"
                                  />{" "}
                                  {item.product.name}
                                </td>
                                <td className="td_particular">
                                  {item.product.slug}
                                </td>
                                <td className="td_particular">
                                  {item.product.vendor.name}
                                </td>
                                <td className="td_particular">
                                  {item.qty} * {item.u_price}
                                </td>
                                <td className="td_particular">
                                  Rs {item.t_price}
                                </td>
                              </tr>
                            )
                          )}
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
                                Rs {transaction_full_details.order.t_price}
                              </td>
                            </tr>
                            <tr>
                              <th className="pro_fon">Tax :</th>
                              <td className="pro_fon">
                                Rs {transaction_full_details.order.tax}
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
                                  transaction_full_details.order.t_price,
                                  transaction_full_details.order.tax
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
