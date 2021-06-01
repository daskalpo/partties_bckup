import React, {Component} from 'react';
import {
    Header,
    OffersAndUpdates,
    Footer,
    GlobalListComponent,
    LoginSignUpModal,
    GlobalProductMobileSearch,
    EmptyCartComponent,
    GlobalProductSearch,
    Search,
    MenuBarList
} from '../Pagecomponent';
import {Api, Url, Helper, Global} from '../config';

class GlobalProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newGlobalProductsList: [],
            searchBarValue: '',
            logged_in_user: '',
            pageValue: 0,
            product_attributes: '',
            loaderStatus: false,
            hide: 1,
            wish_list_total_count: window
                .localStorage
                .getItem("WISHLIST_VALUE"),
            cart_total_items_count: window
                .localStorage
                .getItem("cart_total_items") == null
                ? 0
                : window
                    .localStorage
                    .getItem("cart_total_items")
        }
    }

    assignCommonVariables = () => {

        this.setState({
            header_search_text_val: Global.header_search_text_val,
            searchObjectListing: [],
            logged_in_user: window
                .localStorage
                .getItem('LOGGEDUSER')
        })

        Helper.hide_show_cart_bubble_inzero();
        Helper.hide_show_cart_wishlist_inzero();
        Helper.global_function_for_adding_localcart_to_database_and_counts_manager();
    }

    __header = (searchText) => {
        Global.header_search_text_val = searchText;
        this.setState({header_search_text_val: searchText})

    }
    __user = (user) => {
        this.setState({logged_in_user: user})
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);
        this.assignCommonVariables();
        this.setState({pageValue: 0});
        this.fetchGlobalProductList(0);

    }
    __refreshGlobalProductList = () => {
        this.setState({pageValue: 0});
        this.fetchGlobalProductList(0);
    }

    fetchGlobalProductList = (localPage) => {

        let searchDataObj = {
            "search": Global.header_search_text_val,
            "price": Global.global_product_search_values_obj.price,
            "type": "",
            "order": Global.global_product_search_values_obj.order == "0"
                ? ""
                : Global.global_product_search_values_obj.order,
            "page": localPage
        }
        console.log(searchDataObj);

        let api = Url.global_Products;
        this.setState({loaderStatus: true});
        Api
            .SearchProductsApi(api, searchDataObj)
            .then(res => {
                let response = JSON.parse(res);
                let data = response.response;
                console.log(data);
                if (data.status === true) {
                    this.setState({loaderStatus: false});
                    localPage != 0
                        ? this.setState({
                            newGlobalProductsList: this
                                .state
                                .newGlobalProductsList
                                .concat(Helper.convert_object_to_array(data.data))
                        })
                        : this.setState({
                            newGlobalProductsList: Helper.convert_object_to_array(data.data)
                        });
                }
            });
    }
    __fetchMoreGlobalProduct = () => {

        this.setState({
            pageValue: this.state.pageValue + 1
        });
        this.fetchGlobalProductList(this.state.pageValue)

    }

    __refreshProductList = () => {
        this.setState({ pageValue: 0 });
        this.fetchProductList(0);
    };

    onHandleEvent = (type) => {
        Global.global_product_search_values_obj.price="";
        Global.global_product_search_values_obj.type="";
        Global.global_product_search_values_obj.order="";
        Global.header_search_text_val="";
        Global.search_values_obj.type ="";
        Global.search_values_obj.type ="";
        Global.search_values_obj.type =type;
        this
            .props
            .history
            .push('/' + "product-list")
        
    }

    render() {
        return (
            <React.Fragment>

                <LoginSignUpModal
                    Title="GlobalProductLists"
                    history={this.props.history}
                    user={this
                    .__user
                    .bind(this)}/>
                <Header
                    wish_list_total_count={this.state.wish_list_total_count}
                    cart_total_items_count={this.state.cart_total_items_count}
                    User={this.state.logged_in_user}
                    headerTitle="GlobalProductLists"
                    history={this.props.history}
                    header_search_text_val={this.state.header_search_text_val}
                    refreshGlobalProductList={this
                    .__refreshGlobalProductList
                    .bind(this)}
                    header={this
                    .__header
                    .bind(this)}/>

                
                {/* <GlobalProductMobileSearch
                    wish_list_total_count={this.state.wish_list_total_count}
                    cart_total_items_count={this.state.cart_total_items_count}
                    User={this.state.logged_in_user}
                    headerTitle="GlobalProductLists"
                    history={this.props.history}
                    refreshGlobalProductList={this
                    .__refreshGlobalProductList
                    .bind(this)}/> */}

                <main id="main" className="defaultPageWrapper">
                    {/* <GlobalProductSearch
                        headerTitle="GlobalProductLists"
                        history={this.props.history}
                        refreshGlobalProductList={this
                        .__refreshGlobalProductList
                        .bind(this)}/> 
                        {(this.state.newGlobalProductsList == '' && this.state.loaderStatus === false) && <EmptyCartComponent
                        emptyTitle="My Products"
                        emptyImage="no_product.png"
                        emptyContent="No Product Found!"
                        emptyText=""/>} */}
                    {/* {this.state.loaderStatus && <div className="loader tops additional_tops">Loading ...</div>} */}
                    {/* <MenuBarList
                        headerTitle="GlobalProductLists"
                        history={this.props.history}
                        onHandleEvent = {this.onHandleEvent.bind(this)}
                    /> */}
                    <Search
                        headerTitle="ProductLists"
                        history={this.props.history}
                        refreshProductList={this.__refreshProductList.bind(this)}
                    />

                    {this.state.loaderStatus && <div className="loader tops golbal_product_loading_top">Loading ...</div>}
                    {this.state.newGlobalProductsList != '' && <GlobalListComponent
                        loaderStatus={this.state.loaderStatus}
                        fetchMoreGlobalProduct={this
                        .__fetchMoreGlobalProduct
                        .bind(this)}
                        history={this.props.history}
                        newGlobalProductsList={this.state.newGlobalProductsList}/>}
                    {(this.state.loaderStatus && this.state.newGlobalProductsList.length > 12) && <div className="loader tops">Loading ...</div>}

                    <OffersAndUpdates history={this.props.history}/>
                </main>
                <Footer  history={this.props.history}/>
            </React.Fragment>
        );
    }
}

export default GlobalProduct;
