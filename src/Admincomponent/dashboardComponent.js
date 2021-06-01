import React, { Component } from "react";
import { Helper, Url, Global, Api } from "../config";
import { Link, NavLink } from "react-router-dom";

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    Helper.loadScript("admin");
  };

  nevigate = (nav) => {
    this.props.history.push("/" + nav);
  };

  render() {
    return (
      <React.Fragment>
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2"></div>
            </div>
          </section>
          <section className="content">
            <div class="container-fluid">
              <div class="row">
                <div class="col-lg-4 col-6">
                  <div class="small-box bg-danger">
                    <div class="inner">
                      <h3>{this.props.dashboard_details.customer}</h3>

                      <p>Customer Registrations</p>
                    </div>
                    <div class="icon">
                      <i class="ion ion-person-add"></i>
                    </div>
                    <Link
                      to="#"
                      onClick={this.nevigate.bind(
                        this,
                        "/admin-panel/customers"
                      )}
                      class="small-box-footer"
                    >
                      More info <i class="fas fa-arrow-circle-right"></i>
                    </Link>
                  </div>
                </div>
                <div class="col-lg-4 col-6">
                  <div class="small-box bg-success">
                    <div class="inner">
                      <h3>
                        <h3>{this.props.dashboard_details.product}</h3>
                      </h3>

                      <p>Products</p>
                    </div>
                    <div class="icon">
                      <i class="ion ion-stats-bars"></i>
                    </div>
                    <Link
                      to="#"
                      onClick={this.nevigate.bind(
                        this,
                        "/admin-panel/products"
                      )}
                      class="small-box-footer"
                    >
                      More info <i class="fas fa-arrow-circle-right"></i>
                    </Link>
                  </div>
                </div>

                <div class="col-lg-4 col-6">
                  <div class="small-box bg-info">
                    <div class="inner">
                      <h3>
                        {" "}
                        <h3>{this.props.dashboard_details.order}</h3>
                      </h3>

                      <p>Orders</p>
                    </div>
                    <div class="icon">
                      <i class="ion ion-bag"></i>
                    </div>
                    <Link
                      to="#"
                      onClick={this.nevigate.bind(this, "/admin-panel/orders")}
                      class="small-box-footer"
                    >
                      More info <i class="fas fa-arrow-circle-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
