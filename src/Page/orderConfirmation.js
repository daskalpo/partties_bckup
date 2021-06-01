import React, { Component } from "react";
import {
  Header,
  OffersAndUpdates,
  Footer,
  HomeComponent,
  LoginSignUpModal,
  Alert,
  Search,
  HomeBanner,
  OrderConfirmationComponent,
} from "../Pagecomponent";
import { Api, Url, Helper, Global } from "../config";

class OrderConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header_search_text_val: "",
      logged_in_user: "",
      wish_list_total_count: window.localStorage.getItem("WISHLIST_VALUE"),
      cart_total_items_count: window.localStorage.getItem("cart_total_items"),
      status: "",
      order_confirmation_total_amount: "",
      order_confirmation_total_item: "",
      order_id: "",
    };
  }
  assignCommonVariables = () => {
    this.setState({
      header_search_text_val: "",
      logged_in_user: window.localStorage.getItem("LOGGEDUSER"),
    });

    Helper.hide_show_cart_bubble_inzero();
    Helper.hide_show_cart_wishlist_inzero();
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
    this.fetch_order_confirmation_details();
  };

  fetch_order_confirmation_details = () => {
    let api = Url.order_confirmation + "/" + this.props.match.params.orderId;
    console.log(api);
    this.setState({ loaderStatus: true });
    Api.order_confirmation_details(api).then((res) => {
      this.setState({ loaderStatus: false });
      let response = JSON.parse(res);
      let data = response.response;
      console.log(data);
      if (data.status === true || data.status === false) {
        if (data.transaction.status == "success") {
          window.localStorage.setItem("cart_total_items", 0);
          this.setState({ cart_total_items_count: 0 });
          Helper.hide_show_cart_bubble_inzero();
        }
        this.setState({
          status: data.transaction.status,
          order_confirmation_total_amount: data.transaction.amount,
          order_confirmation_total_item: data.item_count,
          order_id: data.transaction.order_id,
        });
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <LoginSignUpModal
          Title="OrderConfirmation"
          history={this.props.history}
          user={this.__user.bind(this)}
        />
        <Header
          wish_list_total_count={this.state.wish_list_total_count}
          cart_total_items_count={this.state.cart_total_items_count}
          User={this.state.logged_in_user}
          headerTitle="OrderConfirmation"
          history={this.props.history}
          header_search_text_val={this.state.header_search_text_val}
          header={this.__header.bind(this)}
        />

        <main id="main" className="defaultPageWrapper">
          {this.state.loaderStatus && (
            <div className="loader tops">Loading ...</div>
          )}
          {this.state.order_id != "" && (
            <OrderConfirmationComponent
              status={this.state.status}
              order_confirmation_total_amount={
                this.state.order_confirmation_total_amount
              }
              order_confirmation_total_item={
                this.state.order_confirmation_total_item
              }
              order_id={this.state.order_id}
              history={this.props.history}
            />
          )}

          <OffersAndUpdates history={this.props.history} />
          <Footer history={this.props.history} />
        </main>
      </React.Fragment>
    );
  }
}

export default OrderConfirmation;
