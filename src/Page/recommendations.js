import React, { Component } from "react";
import {
  Header,
  OffersAndUpdates,
  Footer,
  RecommendationComponent,
  LoginSignUpModal,
  EmptyCartComponent,
  MenuBarList,
} from "../Pagecomponent";
import { Api, Url, Helper, Global } from "../config";

class Recommendations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendation: [],
      searchBarValue: "",
      logged_in_user: "",
      pageValue: 0,
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
    this.fetch_recommendation(0);
  };
  __refresh_recommendation = () => {
    this.setState({ pageValue: 0 });
    this.fetch_recommendation(0);
  };

  fetch_recommendation = (localPage) => {
    let api = Url.recommendation;
    this.setState({ loaderStatus: true });
    Api.RecommendationApi(api, localPage).then((res) => {
      let response = JSON.parse(res);
      let data = response.response;
      console.log(data);

      if (data.status === true) {
        this.setState({ loaderStatus: false });
        console.log('Catch Recommendation: ', data.data)
        localPage != 0
          ? this.setState({
              recommendation: this.state.recommendation.concat(
                Helper.convert_object_to_array(data.data)
              ),
            })
          : this.setState({
              recommendation: Helper.convert_object_to_array(data.data),
            });
      }
    });
  };
  __fetch_more_recommendation = () => {
    this.setState({
      pageValue: this.state.pageValue + 1,
    });
    this.fetch_recommendation(this.state.pageValue);
  };

  onHandleEvent = (type) => {
    if(type!=null){
        //alert(`type is: ${type}`)
        if(!Global.search_values_obj.type && Global.search_values_obj.type.length>0){
            this.refreshPage()
            
        }
        Global.search_values_obj.type =type;
        Global.header_search_text_val = "";
        this
          .props
          .history
          .push('/product-list');
    }
  }

  __refreshProductList = () => {
    this.setState({ pageValue: 0 });
    this.fetchProductList(0);
  };

  fetchProductList = (localPage) => {
    let searchDataObj = {
      search: Global.header_search_text_val,
      price: Global.search_values_obj.price,
      type:
        Global.search_values_obj.type == "0"
          ? ""
          : Global.search_values_obj.type,
      order:
        Global.search_values_obj.order == "0"
          ? ""
          : Global.search_values_obj.order,
      page: localPage,
    };
    console.log(searchDataObj);

    let api = Url.Products;
    this.setState({ loaderStatus: true });
    Api.SearchProductsApi(api, searchDataObj).then((res) => {
      let response = JSON.parse(res);
      let data = response.response;
      console.log(data);
      if (data.status === true) {
        this.setState({ loaderStatus: false });
        localPage != 0
          ? this.setState({
              newProductsList: this.state.newProductsList.concat(
                Helper.convert_object_to_array(data.data)
              ),
            })
          : this.setState({
              newProductsList: Helper.convert_object_to_array(data.data),
            });
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <LoginSignUpModal
          Title="Recommendation"
          history={this.props.history}
          user={this.__user.bind(this)}
        />
        <Header
          recommendation_total_count={this.state.recommendation_total_count}
          wish_list_total_count={this.state.wish_list_total_count}
          cart_total_items_count={this.state.cart_total_items_count}
          User={this.state.logged_in_user}
          headerTitle="Recommendation"
          history={this.props.history}
          header_search_text_val={this.state.header_search_text_val}
          header={this.__header.bind(this)}
          refreshProductList={this.__refreshProductList.bind(this)}
        />

        {/* <MenuBarList
            headerTitle="Recommendation"
            history={this.props.history}
            onHandleEvent={this.onHandleEvent.bind(this)}
        />   */}

        <main id="main" className="defaultPageWrapper defaultPageWrapper_mob">
          {this.state.recommendation == "" &&
            this.state.loaderStatus === false && (
              <EmptyCartComponent
                emptyTitle="My Recommendation"
                emptyImage="no_product.png"
                emptyContent="Your Recommendation is empty!"
                emptyText=""
              />
            )}
          {this.state.loaderStatus && (
            <div className="loader tops tops_additional">Loading ...</div>
          )}
          {this.state.recommendation != "" && (
            <RecommendationComponent
              loaderStatus={this.state.loaderStatus}
              refresh_recommendation={this.__refresh_recommendation.bind(this)}
              fetch_more_recommendation={this.__fetch_more_recommendation.bind(
                this
              )}
              history={this.props.history}
              recommendation={this.state.recommendation}
            />
          )}
          {this.state.loaderStatus && this.state.recommendation.length > 12 && (
            <div className="loader tops">Loading ...</div>
          )}
          <OffersAndUpdates history={this.props.history} />
        </main>
        <Footer history={this.props.history} />
      </React.Fragment>
    );
  }
}

export default Recommendations;
