import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Helper, Url, Global, Api } from "../config";

class PincodeComponent extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    Helper.loadScript("admin");
  };

  render() {
    console.log(this.props.pincode_list);
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
                    <h3 className="card-title">Pin Code List</h3>
                    <Link to="#" className="btn btn-success btn-sm rightyadmin">
                      <i className="fas fa-plus"></i>Add
                    </Link>
                  </div>

                  <div className="card-body">
                    <table
                      id="customer"
                      className="table table-bordered table-striped"
                    >
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Pin Code</th>
                          <th>Status</th>
                          <th className="custoW"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.pincode_list.map((pincode, index) => (
                          <tr key={index}>
                            <td className="td_particular">{++index}</td>
                            <td className="td_particular">{pincode.pincode}</td>
                            <td className="td_particular">
                              {pincode.status == 1 && (
                                <span className="badge badge-success">
                                  Active
                                </span>
                              )}
                              {pincode.status == 0 && (
                                <span className="badge badge-danger">
                                  Deactive
                                </span>
                              )}
                            </td>
                            <td className="td_particular">
                              <div className="hu">
                                {pincode.status == 1 && (
                                  <div className="inner">
                                    <button
                                      type="button"
                                      className="btn btn-block btn-danger btn-sm"
                                    >
                                      <i className="fas fa-times"></i>Deactive
                                    </button>
                                  </div>
                                )}
                                {pincode.status == 0 && (
                                  <div className="inner">
                                    <button
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
                                    to="#"
                                  >
                                    <i className="fas fa-pencil-alt"></i>
                                    Edit
                                  </Link>
                                </div>
                                <div className="inner">
                                  <Link
                                    className="btn btn-danger btn-sm"
                                    to="#"
                                  >
                                    <i className="fas fa-trash"></i>
                                    Delete
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

export default PincodeComponent;
