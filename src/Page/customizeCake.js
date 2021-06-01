import React, { Component } from "react";
import {
  Header,
  CustomizeCakeComponent,
  OffersAndUpdates,
  Footer,
  LoginSignUpModal,
} from "../Pagecomponent";
import { Api, Url, Helper, Global } from "../config";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header_search_text_val: "",
      logged_in_user: "",
      custom_image: "",
      base_image: "",
      customised_on_product: "",
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
  };

  __header = (searchText) => {
    Global.header_search_text_val = searchText;
    this.setState({ header_search_text_val: searchText });
  };
  __user = (user) => {
    this.setState({ logged_in_user: user });
  };

  __get_product_slug_details = () => {
    let api = Url.ProductDetails + "/" + this.props.match.params.slug;

    Api.ProductDetails(api).then((res) => {
      let response = JSON.parse(res);
      let data = response.response;
      if (data.status === true) {
        console.log(data.data);
        this.setState({
          customised_on_product: data.data,
          custom_image: data.data.images[0].image_path,
          base_image: data.data.images[0].image_path,
        });
      }
    });
  };
  componentDidMount = () => {
    window.scrollTo(0, 0);
    this.assignCommonVariables();
    if (this.props.match.params.slug !== undefined) {
      this.__get_product_slug_details();
    }
  };

  __update_user_custom_image = (image_base64) => {
    this.setState({ custom_image: image_base64 });
  };

  render() {
    return (
      <React.Fragment>
        <LoginSignUpModal
          Title="CustomisedCake"
          history={this.props.history}
          user={this.__user.bind(this)}
        />
        <Header
          wish_list_total_count={this.state.wish_list_total_count}
          cart_total_items_count={this.state.cart_total_items_count}
          User={this.state.logged_in_user}
          headerTitle="CustomisedCake"
          history={this.props.history}
          header_search_text_val={this.state.header_search_text_val}
          header={this.__header.bind(this)}
        />

        <main id="main" className="defaultPageWrapper">
          <CustomizeCakeComponent
            base_image={this.state.base_image}
            update_user_custom_image={this.__update_user_custom_image.bind(
              this
            )}
            custom_image={this.state.custom_image}
            customised_on_product={this.state.customised_on_product}
            history={this.props.history}
          />
          <OffersAndUpdates history={this.props.history} />
        </main>
        <Footer history={this.props.history} />
      </React.Fragment>
    );
  }
}

export default Home;
