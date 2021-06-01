import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Helper, Url, Global, Api } from "../config";

class TransactionsComponent extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    Helper.loadScript("admin");
  };
  transaction_details = (transaction) => {
    this.props.load_transaction_full_details(transaction);
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
                    <h3 className="card-title">Transactions List</h3>
                  </div>

                  <div className="card-body">
                    <table
                      id="transaction"
                      className="table table-bordered table-striped"
                    >
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>User</th>
                          <th>Transaction Id</th>
                          <th>Order Id</th>
                          <th>Status</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.transactions_list.map(
                          (transaction, index) => (
                            <tr key={index}>
                              <td className="td_particular">{++index}</td>
                              <td className="td_particular">
                                {transaction.user.name}
                              </td>
                              <td className="td_particular">
                                {transaction.tran_id}
                              </td>
                              <td className="td_particular">
                                {transaction.order_id}
                              </td>
                              <td className="td_particular td_particular_addon">
                                {transaction.status == "success" && (
                                  <span className="badge badge-success">
                                    {transaction.status}
                                  </span>
                                )}
                                {transaction.status == "processing" && (
                                  <span className="badge badge-warning">
                                    {transaction.status}
                                  </span>
                                )}
                              </td>

                              <td className="td_particular">
                                <Link
                                  className="btn btn-primary btn-sm"
                                  onClick={this.transaction_details.bind(
                                    this,
                                    transaction
                                  )}
                                  to="#"
                                >
                                  <i className="fas fa-folder"></i>
                                  Details
                                </Link>
                              </td>
                            </tr>
                          )
                        )}
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

export default TransactionsComponent;
