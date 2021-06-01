import React, { Component } from "react";
import {
  Header,
  OffersAndUpdates,
  Footer,
  VendorListComponent,
  LoginSignUpModal,
} from "../Pagecomponent";
import { Api, Url, Helper, Global } from "../config";

class VendorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vendorList: [],
      searchBarValue: "",
      logged_in_user: "",
      loaderStatus: false,
      hide: 1,
      wish_list_total_count: window.localStorage.getItem("WISHLIST_VALUE"),
      cart_total_items_count:
        window.localStorage.getItem("cart_total_items") == null
          ? 0
          : window.localStorage.getItem("cart_total_items"),
    };
  }

  assignCommonVariables = () => {
    this.setState({
      header_search_text_val: Global.header_search_text_val,
      searchObjectListing: [],
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
    this.fetchVendorList(0);
  };
  __refreshProductList = () => {
    this.fetchVendorList();
  };

  fetchVendorList = () => {
    let api = Url.vendor_list;
    this.setState({ loaderStatus: true });
    Api.vendor_list(api).then((res) => {
      let data = JSON.parse(res);

      if (data.status == "OK") {
        this.setState({ loaderStatus: false });
        this.setState({
          vendorList: data.data,
        });
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <LoginSignUpModal
          Title="VendorList"
          history={this.props.history}
          user={this.__user.bind(this)}
        />
        <Header
          wish_list_total_count={this.state.wish_list_total_count}
          cart_total_items_count={this.state.cart_total_items_count}
          User={this.state.logged_in_user}
          headerTitle="VendorList"
          history={this.props.history}
          header_search_text_val={this.state.header_search_text_val}
          refreshProductList={this.__refreshProductList.bind(this)}
          header={this.__header.bind(this)}
        />
        <main id="main" className="defaultPageWrapper">
          {this.state.loaderStatus && (
            <div className="loader tops additional_tops">Loading ...</div>
          )}
          {this.state.vendorList != "" && (
            <VendorListComponent
              loaderStatus={this.state.loaderStatus}
              history={this.props.history}
              vendorList={this.state.vendorList}
            />
          )}
          {this.state.loaderStatus && this.state.vendorList.length > 12 && (
            <div className="loader tops">Loading ...</div>
          )}

          <OffersAndUpdates history={this.props.history} />
        </main>
        <Footer  history={this.props.history}/>
      </React.Fragment>
    );
  }
}

export default VendorList;
