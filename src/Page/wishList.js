import React, {Component} from 'react';
import {
    Header,
    OffersAndUpdates,
    Footer,
    WishListComponent,
    LoginSignUpModal,
    EmptyCartComponent
} from '../Pagecomponent';
import {Api, Url, Helper, Global} from '../config';

class WishList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wish_list: [],
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
        this.fetch_wish_list(0);

    }
    __refresh_wish_list = () => {
        this.setState({pageValue: 0});
        this.fetch_wish_list(0);
    }

    fetch_wish_list = (localPage) => {
        let api = Url.wishlist;
        this.setState({loaderStatus: true});
        Api
            .WishlistApi(api, localPage)
            .then(res => {
                let response = JSON.parse(res);
                let data = response.response;
                console.log(data);

                if (data.status === true) {
                    Helper.add_to_wishlist_value(data.count);
                    this.setState({loaderStatus: false});
                    localPage != 0
                        ? this.setState({
                            wish_list: this
                                .state
                                .wish_list
                                .concat(Helper.convert_object_to_array(data.data))
                        })
                        : this.setState({
                            wish_list: Helper.convert_object_to_array(data.data)
                        });
                }
            });
    }
    __fetch_more_wishlist = () => {

        this.setState({
            pageValue: this.state.pageValue + 1
        });
        this.fetch_wish_list(this.state.pageValue)

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
                    cart_total_items_count={this.state.cart_total_items_count}
                    User={this.state.logged_in_user}
                    headerTitle="Wishlist"
                    history={this.props.history}
                    header_search_text_val={this.state.header_search_text_val}
                    header={this
                    .__header
                    .bind(this)}/>

                <main id="main" className="defaultPageWrapper defaultPageWrapper_mob">
                    {(this.state.wish_list == '' && this.state.loaderStatus === false) && <EmptyCartComponent
                        emptyTitle="My Wishlist"
                        emptyImage="no_wishlist.png"
                        emptyContent="Your Wishlist is empty!"
                        emptyText=""/>}
                    {this.state.loaderStatus && <div className="loader tops tops_additional">Loading ...</div>}
                    {this.state.wish_list != '' && <WishListComponent
                        loaderStatus={this.state.loaderStatus}
                        refresh_wish_list={this
                        .__refresh_wish_list
                        .bind(this)}
                        fetch_more_wishlist={this
                        .__fetch_more_wishlist
                        .bind(this)}
                        history={this.props.history}
                        wish_list={this.state.wish_list}/>}
                    {(this.state.loaderStatus && this.state.wish_list.length > 12) && <div className="loader tops">Loading ...</div>}

                    <OffersAndUpdates history={this.props.history}/>
                </main>
                <Footer  history={this.props.history}/>
            </React.Fragment>
        );
    }
}

export default WishList;
