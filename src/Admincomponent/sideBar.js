import React, { Component } from "react";
import { AdminLoginComponent, Toast } from "../Admincomponent";
import { Link, NavLink } from "react-router-dom";
import { Helper, Url, Global, Api } from "../config";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      internal_sidebar_navigation: "",
    };
  }
  componentDidMount = () => {
    if (this.props.headerTitle == "products") {
      this.setState({ internal_sidebar_navigation: "product_attributes" });
    }
    if (this.props.headerTitle == "customerEnquiry") {
      this.setState({ internal_sidebar_navigation: "custom_Cake" });
    }
    if (this.props.headerTitle == "widgets") {
      this.setState({ internal_sidebar_navigation: "top_menu" });
    }

    Helper.loadScript("admin");
  };

  sidebar_navigation = (sidebar) => {
    this.props.history.push("/admin-panel/" + sidebar);
  };

  internal_sidebar_navigation = (internal_sidebar) => {
    this.setState({ internal_sidebar_navigation: internal_sidebar });
    if (
      this.props.headerTitle == "products" ||
      this.props.headerTitle == "customerEnquiry" ||
      this.props.headerTitle == "widgets"
    ) {

      this.props.toggle_internal_tabs(internal_sidebar);
    }
  };

  render() {
    console.log(this.state.internal_sidebar_navigation);
    return (
      <React.Fragment>
        <Toast />
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          <Link to="#" className="brand-link">
            <img
              src={require("../assets/img/AdminLTELogo.png")}
              alt="AdminLTE Logo"
              className="brand-image img-circle elevation-3"
            />
            <span className="brand-text font-weight-light">Admin</span>
          </Link>

          <div className="sidebar">
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <img
                  src={require("../assets/img/user2-160x160.jpg")}
                  className="img-circle elevation-2"
                  alt="User Image"
                />
              </div>
              <div className="info">
                <Link to="#" className="d-block">
                  {this.props.admin_user_name}
                </Link>
              </div>
            </div>

            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li
                  onClick={this.sidebar_navigation.bind(this, "dashboard")}
                  className="nav-item"
                >
                  <Link
                    to="#"
                    className={`nav-link ${
                      this.props.headerTitle == "dashboard" ? "active" : ""
                    }`}
                  >
                    <i className="nav-icon fas fa-tachometer-alt"></i>
                    <p>Dashboard</p>
                  </Link>
                </li>

                <li
                  onClick={this.sidebar_navigation.bind(this, "customers")}
                  className="nav-item"
                >
                  <Link
                    to="#"
                    className={`nav-link ${
                      this.props.headerTitle == "customers" ? "active" : ""
                    }`}
                  >
                    <i className="nav-icon fas fa-users"></i>
                    <p>Customers</p>
                  </Link>
                </li>
                <li
                  className={`nav-item has-treeview ${
                    this.props.headerTitle == "customerEnquiry"
                      ? "menu-open"
                      : ""
                  }`}
                >
                  <Link
                    onClick={this.sidebar_navigation.bind(
                      this,
                      "customer-enquiry"
                    )}
                    to="#"
                    className={`nav-link ${
                      this.props.headerTitle == "customerEnquiry"
                        ? "active"
                        : ""
                    }`}
                  >
                    <i className="nav-icon fa fa-question-circle"></i>
                    <p>
                      Customer Enquiry
                      <i className="right fas fa-angle-left"></i>
                    </p>
                  </Link>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link
                        to="#"
                        onClick={this.internal_sidebar_navigation.bind(
                          this,
                          "custom_Cake"
                        )}
                        className={`nav-link ${
                          this.state.internal_sidebar_navigation ==
                          "custom_Cake"
                            ? "active"
                            : ""
                        }`}
                      >
                        <i className="far fa-circle nav-icon"></i>
                        <p>Custom Cake</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="#"
                        onClick={this.internal_sidebar_navigation.bind(
                          this,
                          "party_enquiry"
                        )}
                        className={`nav-link ${
                          this.state.internal_sidebar_navigation ==
                          "party_enquiry"
                            ? "active"
                            : ""
                        }`}
                      >
                        <i className="far fa-circle nav-icon"></i>
                        <p>Party Enquiry</p>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li
                  onClick={this.sidebar_navigation.bind(this, "orders")}
                  className="nav-item"
                >
                  <Link
                    to="#"
                    className={`nav-link ${
                      this.props.headerTitle == "orders" ? "active" : ""
                    }`}
                  >
                    <i className="nav-icon fas fa-shopping-cart"></i>
                    <p>Orders</p>
                  </Link>
                </li>
                {/* <li
                  onClick={this.sidebar_navigation.bind(this, "pincode")}
                  className="nav-item"
                >
                  <Link
                    to="#"
                    className={`nav-link ${
                      this.props.headerTitle == "pincode" ? "active" : ""
                    }`}
                  >
                    <i className="nav-icon fas fa-users"></i>
                    <p>Pincode</p>
                  </Link>
                </li> */}

              

                <li
                    onClick={this.sidebar_navigation.bind(this, "widgets")}
                    className={`nav-item has-treeview ${
                      this.props.headerTitle == "widgets" ? "menu-open" : ""
                    }`}>
                    <Link
                      to="#"
                      className={`nav-link ${
                        this.props.headerTitle == "widgets" ? "active" : ""
                      }`}
                    >
                      <i className="nav-icon fas fa-birthday-cake"></i>
                      <p>
                          Widgets
                        <i className="right fas fa-angle-left"></i>
                      </p>
                    </Link>
                      <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <Link
                          to="#"
                          onClick={this.internal_sidebar_navigation.bind(
                            this,
                            "top_menu"
                          )}
                          className={`nav-link ${
                            this.state.internal_sidebar_navigation ==
                            "top_menu"
                              ? "active"
                              : ""
                          }`}
                        >
                          <i className="far fa-circle nav-icon"></i>
                          <p>Top Menu</p>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="#"
                          onClick={this.internal_sidebar_navigation.bind(
                            this,
                            "banners"
                          )}
                          className={`nav-link ${
                            this.state.internal_sidebar_navigation ==
                            "banners"
                              ? "active"
                              : ""
                          }`}
                        >
                          <i className="far fa-circle nav-icon"></i>
                          <p>Banners</p>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="#"
                          onClick={this.internal_sidebar_navigation.bind(
                            this,
                            "tiles"
                          )}
                          className={`nav-link ${
                            this.state.internal_sidebar_navigation ==
                            "tiles"
                              ? "active"
                              : ""
                          }`}
                        >
                          <i className="far fa-circle nav-icon"></i>
                          <p>Tiles</p>
                        </Link>
                      </li>
                      
                    </ul>
                </li>

                <li
                  onClick={this.sidebar_navigation.bind(this, "products")}
                  className={`nav-item has-treeview ${
                    this.props.headerTitle == "products" ? "menu-open" : ""
                  }`}
                >
                  <Link
                    to="#"
                    className={`nav-link ${
                      this.props.headerTitle == "products" ? "active" : ""
                    }`}
                  >
                    <i className="nav-icon fas fa-birthday-cake"></i>
                    <p>
                      Products
                      <i className="right fas fa-angle-left"></i>
                    </p>
                  </Link>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link
                        to="#"
                        onClick={this.internal_sidebar_navigation.bind(
                          this,
                          "product_attributes"
                        )}
                        className={`nav-link ${
                          this.state.internal_sidebar_navigation ==
                          "product_attributes"
                            ? "active"
                            : ""
                        }`}
                      >
                        <i className="far fa-circle nav-icon"></i>
                        <p>Attributes</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="#"
                        onClick={this.internal_sidebar_navigation.bind(
                          this,
                          "product_category"
                        )}
                        className={`nav-link ${
                          this.state.internal_sidebar_navigation ==
                          "product_category"
                            ? "active"
                            : ""
                        }`}
                      >
                        <i className="far fa-circle nav-icon"></i>
                        <p>Categories</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="#"
                        onClick={this.internal_sidebar_navigation.bind(
                          this,
                          "product_list"
                        )}
                        className={`nav-link ${
                          this.state.internal_sidebar_navigation ==
                          "product_list"
                            ? "active"
                            : ""
                        }`}
                      >
                        <i className="far fa-circle nav-icon"></i>
                        <p>Products List</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="#"
                        onClick={this.internal_sidebar_navigation.bind(
                          this,
                          "product_variations"
                        )}
                        className={`nav-link ${
                          this.state.internal_sidebar_navigation ==
                          "product_variations"
                            ? "active"
                            : ""
                        }`}
                      >
                        <i className="far fa-circle nav-icon"></i>
                        <p>Variations</p>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li
                  onClick={this.sidebar_navigation.bind(this, "transactions")}
                  className="nav-item"
                >
                  <Link
                    to="#"
                    className={`nav-link ${
                      this.props.headerTitle == "transactions" ? "active" : ""
                    }`}
                  >
                    <i className="nav-icon fa fa-credit-card"></i>
                    <p>Transactions</p>
                  </Link>
                </li>

                <li
                  onClick={this.sidebar_navigation.bind(this, "csv-upload")}
                  className="nav-item"
                >
                  <Link
                    to="#"
                    className={`nav-link ${
                      this.props.headerTitle == "csvupload" ? "active" : ""
                    }`}
                  >
                    <i className="nav-icon fas fa-tachometer-alt"></i>
                    <p>Csv Upload</p>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      </React.Fragment>
    );
  }
}

export default Sidebar;
