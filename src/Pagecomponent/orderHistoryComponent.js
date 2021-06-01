import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Helper, Url, Global, Api } from "../config";

class OrderHistoryComponent extends React.Component {
  nevigate = (order, tag) => {
    Helper.clear_global_search_values_onNavigation();

    if (order.status == "success") {
      this.props.history.push("/order-details/" + order.order_id);
    }
  };

  reOrder = (order) => {
    console.log(order);
    let reorder_obj = {
      product_id: order.product_id,
      product_variation_id: order.product_variation_id,
      name: order.product.name,
      price: order.u_price,
      vendor: order.product.vendor.name,
      quantity: order.qty,
      image: order.product.image[0].image_path,
      message: order.item_message,
    };
    console.log(reorder_obj);
    Helper.add_directly_to_database_on_login(reorder_obj).then((res) => {
      this.props.history.push("/payment");
    });
  };

  render() {
    console.log(this.props.order_history);
    return (
      <React.Fragment>
        <section id="productListWrapper" className="rowTopMargin">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="mycart_header">
                  <div className="col-md-12">
                    <p>Order History</p>
                  </div>
                </div>
                {this.props.order_history.map((order, index) => (
                  <div
                    key={index}
                    className="mycart_details order_confirm_padding order_history"
                  >
                    <ul className="uppr_buttons">
                      <li>
                        <span className="orderid_payment ord_mar">
                          Order Id : #{order.order_id}
                        </span>
                      </li>

                      <li
                        onClick={this.nevigate.bind(
                          this,
                          order,
                          "orderdetails"
                        )}
                        className="details_btn"
                      >
                        <Link to="#">Order Details</Link>
                      </li>
                    </ul>

                    <div className="cart_details_padding">
                      {order.order != null &&
                        order.order.items.map((odr, key) => (
                          <ul
                            key={key}
                            className={`order_detls_contnt ${
                              key != 0 ? "border_top_orderdetls" : ""
                            }`}
                          >
                            <li>
                              <div className="ordr_namedetls">
                                <p className="price_cart margintop_ordrdetls font_size_ordrdetls font_size_ordrdetls first_order_history_p">
                                  {odr.product.name}
                                </p>
                                <p className="price_cart marginoff_ordrdetls font_size_ordrdetls">
                                  Rs {odr.t_price}
                                </p>
                                <label className="cart_seller marginoff_ordrdetls font_size_ordrdetls">
                                  Seller : {odr.product.vendor.name}
                                </label>
                              </div>
                            </li>
                            <li>
                              <p className="price_cart font_size_ordrdetls">
                                Quantity : {odr.qty}
                              </p>
                            </li>
                            <li className="orderplcd_ordrdetls">
                              <p className="price_cart font_size_ordrdetls">
                                {order.status == "success" && (
                                  <i className="fas fa-circle green_orderdetls order_confirm_right"></i>
                                )}
                                {order.status == "success" &&
                                  "Order placed successfully"}
                                {order.status == "success" && (
                                  <span className="item_ordrdetls">
                                    Your item has been placed for order
                                  </span>
                                )}
                                {order.status == "success" && (
                                  <span className="item_ordrdetls date_delvry_ordrpg">
                                   Delivery : {odr.delivery_time}
                                  </span>
                                )}

                                {order.status == "failed" && (
                                  <i className="fas fa-circle green_orderdetls red_orderdetls order_confirm_right"></i>
                                )}
                                {order.status == "failed" && "Order Cancelled"}
                                {order.status == "failed" && (
                                  <span className="item_ordrdetls">
                                    As per your request, your order has been
                                    cancelled
                                  </span>
                                )}
                                <br></br>
                                {odr.item_message != "" && (
                                  <span className="item_ordrdetls">
                                    Message : {odr.item_message}
                                  </span>
                                )}
                              </p>
                            </li>
                            <li>
                              <Link
                                onClick={this.reOrder.bind(this, odr)}
                                to="#"
                              >
                                <div className="reorder_ordrdetls">
                                  <img
                                    src={require("../assets/img/repeal_all.png")}
                                  />
                                  Reorder
                                </div>
                              </Link>
                            </li>
                            <li>
                              <div className="cake_img_cart order_detlscake">
                                <img src={odr.product.image[0].image_path} />
                              </div>
                            </li>
                          </ul>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export default OrderHistoryComponent;
