import React, { Component } from "react";
import {
  Header,
  OffersAndUpdates,
  Footer,
  ListComponent,
  Search,
  LoginSignUpModal,
  MobileSearch,
  EmptyCartComponent,
  MenuBarList
} from "../Pagecomponent";
import { Api, Url, Helper, Global } from "../config";
import { ProductList } from "../Pagecomponent/productListWrapper";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newProductsList: [],
      searchBarValue: "",
      logged_in_user: "",
      pageValue: 0,
      product_attributes: "",
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
    this.fetchProductList(0);
  };
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
  __fetchMoreProduct = () => {
    this.setState({
      pageValue: this.state.pageValue + 1,
    });
    this.fetchProductList(this.state.pageValue);
  };

  onHandleMenuEvent = (type) => {
    //alert(`type in LIST is: ${type}`)
      if(type!=null){
        // if(Global.search_values_obj.type.length>0){
        //   console.log(`type is: ${type}`)
        //   Global.search_values_obj.type ="";
        //   Global.search_values_obj.type =type;
        //   alert('refreshing')
        //   this.__refreshProductList();
        // }else {
        //   alert('not refreshing')
        // }
        Global.search_values_obj.type ="";
        Global.search_values_obj.type =type;
        this.__refreshProductList();
    }
  }

  render() {
    return (
      <React.Fragment>
        <LoginSignUpModal
          Title="ProductLists"
          history={this.props.history}
          user={this.__user.bind(this)}
        />
        <Header
          wish_list_total_count={this.state.wish_list_total_count}
          cart_total_items_count={this.state.cart_total_items_count}
          User={this.state.logged_in_user}
          headerTitle="ProductLists"
          history={this.props.history}
          header_search_text_val={this.state.header_search_text_val}
          refreshProductList={this.__refreshProductList.bind(this)}
          header={this.__header.bind(this)}
        />
        <MobileSearch
          wish_list_total_count={this.state.wish_list_total_count}
          cart_total_items_count={this.state.cart_total_items_count}
          User={this.state.logged_in_user}
          headerTitle="ProductLists"
          history={this.props.history}
          refreshProductList={this.__refreshProductList.bind(this)}
        />

        {/* <ProductList/> */}

        <main id="main" className="defaultPageWrapper">
        <section id="productListWrapper" className="mobile marginMobileTest">
        {/* <MenuBarList
          headerTitle="ProductLists"
          history={this.props.history}
          onHandleEvent={this.onHandleMenuEvent.bind(this)}
        /> */}
          <Search
            headerTitle="ProductLists"
            history={this.props.history}
            refreshProductList={this.__refreshProductList.bind(this)}
          />
          {this.state.newProductsList == "" &&
            this.state.loaderStatus === false && (
              <EmptyCartComponent
                emptyTitle="My Products"
                emptyImage="no_product.png"
                emptyContent="No Product Found!"
                emptyText=""
              />
            )}
          {this.state.loaderStatus && (
            //<div className="loader tops">Loading ...</div>
            <div className="loader additional_tops">Loading ...</div>
          )}
          {this.state.newProductsList != "" && (
            <ListComponent
              loaderStatus={this.state.loaderStatus}
              fetchMoreProduct={this.__fetchMoreProduct.bind(this)}
              history={this.props.history}
              newProductsList={this.state.newProductsList}
              refreshProductList={this.__refreshProductList.bind(this)}
              headerTitle="ProductLists"
            />
          )}
          {this.state.loaderStatus &&
            this.state.newProductsList.length > 12 && (
              // <div className="loader tops ">Loading ...</div>
              <div className="loader additional_tops ">Loading ...</div>
            )}
          <OffersAndUpdates history={this.props.history} />

          </section>
        </main>

        <Footer history={this.props.history} />
      </React.Fragment>
    );
  }
}

export default List;
