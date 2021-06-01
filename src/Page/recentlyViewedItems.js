import React, {Component} from 'react';
import {
    Header,
    OffersAndUpdates,
    Footer,
    RecentlyViewedItemsComponent,
    LoginSignUpModal,
    EmptyCartComponent
} from '../Pagecomponent';
import {Api, Url, Helper, Global} from '../config';

class RecentlyViewedItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recentlyViewedItem: [],
            searchBarValue: '',
            logged_in_user: '',
            pageValue: 0,
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
        this.fetch_recentlyViewedItem(0);

    }
    __refresh_recentlyViewedItem = () => {
        this.setState({pageValue: 0});
        this.fetch_recentlyViewedItem(0);
    }

    fetch_recentlyViewedItem = (localPage) => {
        let api = Url.recentlyViewedItem;
        this.setState({loaderStatus: true});
        Api
            .recentlyViewedItemApi(api, localPage)
            .then(res => {
                let response = JSON.parse(res);
                let data = response.response;
                console.log(data);

                if (data.status === true) {
                    this.setState({loaderStatus: false});
                    localPage != 0
                        ? this.setState({
                            recentlyViewedItem: this
                                .state
                                .recentlyViewedItem
                                .concat(Helper.convert_object_to_array(data.data))
                        })
                        : this.setState({
                            recentlyViewedItem: Helper.convert_object_to_array(data.data)
                        });
                }
            });
    }
    __fetch_more_recentlyViewedItem = () => {

        this.setState({
            pageValue: this.state.pageValue + 1
        });
        this.fetch_recentlyViewedItem(this.state.pageValue)

    }

    render() {
        return (
            <React.Fragment>

                <LoginSignUpModal
                    Title="Wishlist"
                    history={this.props.history}
                    user={this
                    .__user
                    .bind(this)}/>
                <Header
                 wish_list_total_count={this.state.wish_list_total_count}
                    recentlyViewedItem_total_count={this.state.recentlyViewedItem_total_count}
                    cart_total_items_count={this.state.cart_total_items_count}
                    User={this.state.logged_in_user}
                    headerTitle="RecentlyViewedItems"
                    history={this.props.history}
                    header_search_text_val={this.state.header_search_text_val}
                    header={this
                    .__header
                    .bind(this)}/>

                <main id="main" className="defaultPageWrapper defaultPageWrapper_mob">
                    {(this.state.recentlyViewedItem == '' && this.state.loaderStatus === false) && <EmptyCartComponent
                        emptyTitle="Recently Viewed Items"
                        emptyImage="no_product.png"
                        emptyContent="Your Recently Viewed Items is empty!"
                        emptyText=""/>}
                    {this.state.loaderStatus && <div className="loader tops tops_additional">Loading ...</div>}
                    {this.state.recentlyViewedItem != '' && <RecentlyViewedItemsComponent
                        loaderStatus={this.state.loaderStatus}
                        refresh_recentlyViewedItem={this
                        .__refresh_recentlyViewedItem
                        .bind(this)}
                        fetch_more_recentlyViewedItem={this
                        .__fetch_more_recentlyViewedItem
                        .bind(this)}
                        history={this.props.history}
                        recentlyViewedItem={this.state.recentlyViewedItem}/>}
                    {(this.state.loaderStatus && this.state.recentlyViewedItem.length > 12) && <div className="loader tops ">Loading ...</div>}

                    <OffersAndUpdates history={this.props.history}/>
                </main>
                <Footer  history={this.props.history}/>
            </React.Fragment>
        );
    }
}

export default RecentlyViewedItems;
