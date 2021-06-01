import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Helper, Url, Global, Api } from "../config";

class CustomerDetailsComponent extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    Helper.loadScript("admin");
  };
  open_customer_list = () => {
    this.props.open_customer_list();
  };
  render() {
    console.log(this.props.customer_full_details);
    let customer_Details = this.props.customer_full_details;
    let customer_addresses = Helper.convert_object_to_array(
      customer_Details.addresses
    );
    let coustomer_orders = Helper.convert_object_to_array(
      customer_Details.orders
    );
    console.log();

    return (
      <React.Fragment>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <Link to="#" onClick={this.open_customer_list.bind(this)}>
                  <img src={"../assets/img/black_back.png"} />
                </Link>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link onClick={this.open_customer_list.bind(this)} to="#">
                      Customers
                    </Link>
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
              <div className="col-md-3">
                <div className="card">
                  <div className="card-body box-profile">
                    <div className="text-center">
                      {/* <img
                                                className="profile-user-img img-fluid img-circle"
                                                src="https://www.partties.com/server/public/profile/images/blank-profile-picture.png"
                                                alt="User profile picture"/> */}
                    </div>
                    <h3 className="profile-username text-center pro_fo">
                      {customer_Details.name}
                    </h3>

                    <ul className="list-group list-group-unbordered mb-3">
                      <li className="list-group-item">
                        <b>Status</b>
                        <a className="float-right">
                          <span className="badge badge-success pro_fon">
                            Active
                          </span>
                        </a>
                      </li>
                      <li className="list-group-item">
                        <b>Created on</b>
                        <a className="float-right pro_fon">
                          {Helper.convert_YMD(customer_Details.created_at)}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className="card">
                  <div className="card-header p-2">
                    <ul className="nav nav-pills">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          href="#basic"
                          data-toggle="tab"
                        >
                          Basic Information
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="#address"
                          data-toggle="tab"
                        >
                          Address List
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="#orders"
                          data-toggle="tab"
                        >
                          Orders List
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body">
                    <div className="tab-content">
                      <div className="active tab-pane" id="basic">
                        <div className="card-body">
                          <strong>Phone</strong>
                          <p className="text-muted pro_fon">
                            {customer_Details.phone} (
                            {customer_Details.phone_type})
                          </p>
                          <hr></hr>
                          <strong>Email</strong>
                          <p className="text-muted pro_fon">
                            {customer_Details.email}
                          </p>
                          <hr></hr>
                          <strong>DOB</strong>
                          <p className="text-muted pro_fon">
                            {customer_Details.dob}
                          </p>
                          <hr></hr>
                          <strong>Marriage Anniversary</strong>
                          <p className="text-muted pro_fon">
                            {customer_Details.marriage_anniversary}
                          </p>
                          <hr></hr>
                        </div>
                      </div>
                      <div className="tab-pane" id="address">
                        {customer_addresses != "" &&
                          customer_addresses.map((address, index) => (
                            <div key={index} className="post clearfix">
                              <span className="username">
                                <Link to="#">{address.address_type}</Link>
                              </span>
                              <p className="pro_fon">{address.address}</p>
                            </div>
                          ))}
                        {customer_addresses == "" && <p>No Address Found</p>}
                      </div>
                      <div className="tab-pane" id="orders">
                        <div className="card-body p-0">
                          <table className="table table-striped projects">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Order Id</th>

                                <th>Amount (Rs)</th>
                                <th>Order Date</th>
                                <th>Delivery Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {coustomer_orders.map((order, index) => (
                                <tr key={index}>
                                  <td>{++index}</td>
                                  <td className="td_particular">
                                    {order.order_id}
                                  </td>
                                  <td className="td_particular">
                                    {Helper.total_cart_price(
                                      order.t_price,
                                      order.tax
                                    )}
                                  </td>
                                  <td className="td_particular">
                                    {Helper.convert_YMD(order.created_at)}
                                  </td>
                                  <td className="project-state">
                                    {order.delivery_status == "delivered" && (
                                      <span className="badge badge-success">
                                        {order.delivery_status}
                                      </span>
                                    )}

                                    {order.delivery_status ==
                                      "out for delivery" && (
                                      <span className="badge badge-info">
                                        {order.delivery_status}
                                      </span>
                                    )}

                                    {order.delivery_status == "preparing" && (
                                      <span className="badge badge-warning">
                                        {order.delivery_status}
                                      </span>
                                    )}
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
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default CustomerDetailsComponent;
