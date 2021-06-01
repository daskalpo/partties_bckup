import React, { Component } from "react";
import { Header, Footer, LoginSignUpModal } from "../Pagecomponent";
import { Link, NavLink } from "react-router-dom";
import { Helper, Url, Global, Api } from "../config";

class Career extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header_search_text_val: "",
      logged_in_user: "",
      wish_list_total_count: window.localStorage.getItem("WISHLIST_VALUE"),
      cart_total_items_count:
        window.localStorage.getItem("cart_total_items") == null
          ? 0
          : window.localStorage.getItem("cart_total_items"),
    };
  }
  assignCommonVariables = () => {
    this.setState({
      header_search_text_val: "",
      logged_in_user: window.localStorage.getItem("LOGGEDUSER"),
    });
    Helper.hide_show_cart_bubble_inzero();
    Helper.hide_show_cart_wishlist_inzero();
    Helper.global_function_for_adding_localcart_to_database_and_counts_manager();
  };

  __header = (searchText) => {
    Global.header_search_text_val = searchText;
    this.setState({ header_search_text_val: searchText });
  };
  __user = (user) => {
    this.setState({ logged_in_user: user });
  };
  componentDidMount = () => {
    window.scrollTo(0, 0);
    this.assignCommonVariables();
  };
  nevigate = (nav) => {
    Helper.clear_global_search_values_onNavigation();
    this.props.history.push("/" + nav);
  };
  render() {
    return (
      <React.Fragment>
        <LoginSignUpModal
          Title="AboutUs"
          history={this.props.history}
          user={this.__user.bind(this)}
        />
        <Header
          wish_list_total_count={this.state.wish_list_total_count}
          cart_total_items_count={this.state.cart_total_items_count}
          User={this.state.logged_in_user}
          headerTitle="AboutUs"
          user={this.__user.bind(this)}
          history={this.props.history}
          header_search_text_val={this.state.header_search_text_val}
          header={this.__header.bind(this)}
        />

        <main id="main" className="defaultPageWrapper">
          <div class="container filterContainer">
            <div class="row">
              <div class="col-md-12 breadcrumbWrapper">
                <ul class="breadcrumb">
                  <li>
                    <Link onClick={this.nevigate.bind(this, "home")}>Home</Link>
                  </li>
                  <li>Career</li>
                </ul>
              </div>
            </div>
          </div>
          <section id="productListWrapper" className="rowTopMargin">
            <div className="web_content_about_us">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div>
                      <div className="mycart_details">
                        <div className="mycart_header header_prflpage">
                          <div className="col-md-12">
                            <p>Career</p>
                          </div>
                        </div>
                        <div className="tabcontent_profile">
                          <p className="company_infotxt">
                          Comming Soon
                          <br></br>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mobile_content_about_us">
              <div className="container">
                <div className="row">
                  <div className="col-md-12 mobilepadding_off">
                    <div className="mycart_details">
                      <div className="company_heading_moble">
                        <p>Career</p>
                      </div>
                      <div className="cart_details_padding moble_contnt_padding">
                        <p className="company_infotxt">
                        Comming Soon
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer  history={this.props.history}/>
      </React.Fragment>
    );
  }
}

export default Career;
