import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Helper, Url, Global, Api } from "../config";
import { CustomersTable } from "../Admincomponent";

class CustomersComponent extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    Helper.loadScript("admin");
  };

  customer_details = (customer) => {
    this.props.load_cutomer_full_details(customer);
  };
  customer_activation = (customer, activation) => {
    this.props.customer_activation(customer, activation);
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
                    <h3 className="card-title">Customers List</h3>
                  </div>

                  <div className="card-body">
                    <table
                      id="customer"
                      className="table table-bordered table-striped"
                    >
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Phone</th>
                          <th>Email</th>
                          <th>Status</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.customer_list.map((customer, index) => (
                          <tr key={index}>
                            <td className="td_particular">{++index}</td>
                            <td>{customer.name}</td>
                            <td className="td_particular">{customer.phone}</td>
                            <td className="td_particular">{customer.email}</td>
                            <td className="td_particular">
                              {customer.status == 1 && (
                                <span className="badge badge-success">
                                  Active
                                </span>
                              )}
                              {customer.status == 0 && (
                                <span className="badge badge-danger">
                                  Deactive
                                </span>
                              )}
                            </td>

                            <td className="td_particular">
                              <div className="hu">
                                {customer.status == 1 && (
                                  <div className="inner">
                                    <button
                                      onClick={this.customer_activation.bind(
                                        this,
                                        customer,
                                        0
                                      )}
                                      type="button"
                                      className="btn btn-block btn-danger btn-sm"
                                    >
                                      <i className="fas fa-times"></i>Deactive
                                    </button>
                                  </div>
                                )}
                                {customer.status == 0 && (
                                  <div className="inner">
                                    <button
                                      onClick={this.customer_activation.bind(
                                        this,
                                        customer,
                                        1
                                      )}
                                      type="button"
                                      className="btn btn-block btn-success btn-sm"
                                    >
                                      <i className="fas fa-check"></i>Active
                                    </button>
                                  </div>
                                )}

                                <div className="inner">
                                  <Link
                                    className="btn btn-primary btn-sm"
                                    onClick={this.customer_details.bind(
                                      this,
                                      customer
                                    )}
                                    to="#"
                                  >
                                    <i className="fas fa-user"></i>
                                    Details
                                  </Link>
                                </div>
                              </div>
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

export default CustomersComponent;
