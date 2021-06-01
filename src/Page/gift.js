import React, { Component } from "react";
import {
  Header,
  OffersAndUpdates,
  Footer,
  GiftComponent,
  GiftSearch,
  LoginSignUpModal,
  MobileSearch,
  EmptyCartComponent,
  MobileGiftSearch,
} from "../Pagecomponent";
import { Api, Url, Helper, Global } from "../config";

class Gift extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newGIftList: [],
      searchBarValue: "",
      logged_in_user: "",
      pageValue: 0,
      gift_attributes: "",
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
    this.setState({ pageValue: 0 });
    this.fetchGiftList(0);
  };
  __refreshGiftList = () => {
    this.setState({ pageValue: 0 });
    this.fetchGiftList(0);
  };

  fetchGiftList = (localPage) => {
    let searchDataObj = {
      search: Global.header_search_text_val,
      price: Global.gift_search_values_obj.price,
      type:
        Global.gift_search_values_obj.type == "0"
          ? ""
          : Global.gift_search_values_obj.type,
      order:
        Global.gift_search_values_obj.order == "0"
          ? ""
          : Global.gift_search_values_obj.order,
      page: localPage,
    };
    console.log(searchDataObj);

    let api = Url.gifts;
    console.log(api);
    this.setState({ loaderStatus: true });
    Api.SearchGiftssApi(api, searchDataObj).then((res) => {
      let response = JSON.parse(res);
      let data = response.response;
      console.log("----------------------------------------");
      console.log(data);
      if (data.status === true) {
        this.setState({ loaderStatus: false });
        localPage != 0
          ? this.setState({
              newGIftList: this.state.newGIftList.concat(
                Helper.convert_object_to_array(data.data)
              ),
            })
          : this.setState({
              newGIftList: Helper.convert_object_to_array(data.data),
            });
      }
    });
  };
  __fetchMoreGift = () => {
    this.setState({
      pageValue: this.state.pageValue + 1,
    });
    this.fetchGiftList(this.state.pageValue);
  };

  render() {
    return (
      <React.Fragment>
        <LoginSignUpModal
          Title="GiftLists"
          history={this.props.history}
          user={this.__user.bind(this)}
        />
        <Header
          wish_list_total_count={this.state.wish_list_total_count}
          cart_total_items_count={this.state.cart_total_items_count}
          User={this.state.logged_in_user}
          headerTitle="GiftLists"
          history={this.props.history}
          header_search_text_val={this.state.header_search_text_val}
          refreshGiftList={this.__refreshGiftList.bind(this)}
          header={this.__header.bind(this)}
        />
        <MobileGiftSearch
          wish_list_total_count={this.state.wish_list_total_count}
          cart_total_items_count={this.state.cart_total_items_count}
          User={this.state.logged_in_user}
          headerTitle="GiftLists"
          history={this.props.history}
          refreshGiftList={this.__refreshGiftList.bind(this)}
        />

        <main id="main" className="defaultPageWrapper defaultPageWrapper_mob">
          <GiftSearch
            headerTitle="GiftLists"
            history={this.props.history}
            refreshGiftList={this.__refreshGiftList.bind(this)}
          />{" "}
          {this.state.newGIftList == "" &&
            this.state.loaderStatus === false && (
              <EmptyCartComponent
                emptyTitle="My Gifts"
                emptyImage="no_product.png"
                emptyContent="No GIft Found!"
                emptyText=""
              />
            )}
          {this.state.loaderStatus && (
            <div className="loader tops additional_tops">Loading ...</div>
          )}
          {this.state.newGIftList != "" && (
            <GiftComponent
              loaderStatus={this.state.loaderStatus}
              fetchMoreGift={this.__fetchMoreGift.bind(this)}
              history={this.props.history}
              newGIftList={this.state.newGIftList}
            />
          )}
          {this.state.loaderStatus && this.state.newGIftList.length > 12 && (
            <div className="loader tops">Loading ...</div>
          )}
          <OffersAndUpdates history={this.props.history} />
        </main>
        <Footer history={this.props.history} />
      </React.Fragment>
    );
  }
}

export default Gift;
