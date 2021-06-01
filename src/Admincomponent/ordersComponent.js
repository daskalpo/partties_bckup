import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Helper, Url, Global, Api } from "../config";
import { CustomersTable } from "../Admincomponent";

class OrdersComponent extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    Helper.loadScript("admin");
  };
  order_details = (order) => {
    this.props.load_order_full_details(order);
  };
  select_box_change_order_status(e, v) {
    let type = "";
    if (v.target.value == "preparing") {
      type = 1;
    }
    if (v.target.value == "out for delivery") {
      type = 2;
    }
    if (v.target.value == "delivered") {
      type = 3;
    }
    console.log(v.target.value);
    this.change_order_status(e, type);
  }
  change_order_status = (order, type) => {
    console.log(order);
    console.log(type);
    let api = Url.admin_order_change_status + "/" + order.order_id + "/" + type;
    Api.admin_order_change_status(api).then((res) => {
      let response = JSON.parse(res);
      let data = response.response;
      console.log(data);
      if (data.status === 200) {
        this.props.fetch_order_list();
      }
    });
  };
  render() {
    return (
      <React.Fragment>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2"></div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Orders List</h3>
                  </div>

                  <div className="card-body">
                    <table
                      id="customer"
                      className="table table-bordered table-striped"
                    >
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Customer</th>
                          <th>Order Id</th>
                          <th>Status</th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.order_list.map((order, index) => (
                          <tr key={++index}>
                            <td className="td_particular">{++index}</td>
                            <td className="td_particular">{order.user.name}</td>
                            <td className="td_particular">{order.order_id}</td>

                            <td className="td_particular">
                              {order.delivery_status == "preparing" && (
                                <span className="badge badge-warning">
                                  {order.delivery_status}
                                </span>
                              )}

                              {order.delivery_status == "out for delivery" && (
                                <span className="badge badge-info">
                                  {order.delivery_status}
                                </span>
                              )}

                              {order.delivery_status == "delivered" && (
                                <span className="badge badge-success">
                                  {order.delivery_status}
                                </span>
                              )}
                            </td>

                            <td className="td_particular">
                              <select
                                className="form-control pro_fon sandy"
                                onChange={this.select_box_change_order_status.bind(
                                  this,
                                  order
                                )}
                                value={order.delivery_status}
                              >
                                <option className="others" value="preparing">
                                  Preparing
                                </option>
                                <option
                                  className="others"
                                  value="out for delivery"
                                >
                                  Out For Delivery
                                </option>
                                <option className="others" value="delivered">
                                  Delivered
                                </option>
                              </select>
                            </td>
                            <td className="td_particular">
                              <Link
                                className="btn btn-primary btn-sm"
                                onClick={this.order_details.bind(this, order)}
                                to="#"
                              >
                                <i className="fas fa-folder"></i>
                                Details
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default OrdersComponent;
