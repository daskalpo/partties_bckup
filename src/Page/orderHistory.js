import React, {Component} from 'react';
import {
    Header,
    OffersAndUpdates,
    Footer,
    LoginSignUpModal,
    OrderHistoryComponent,
    EmptyCartComponent
} from '../Pagecomponent';
import {Api, Url, Helper, Global} from '../config';

class OrderHistory extends Component {
    constructor(props) {

        super(props);
        this.state = {
            header_search_text_val: '',
            logged_in_user: '',
            order_history: '',
            loaderStatus: false,
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
        };
    }
    assignCommonVariables = () => {
        this.setState({
            header_search_text_val: '',
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
        this.fetch_order_history_details();
    }

    fetch_order_history_details = () => {
        let api = Url.order_history;
        this.setState({loaderStatus: true});
        Api
            .order_history_details(api)
            .then(res => {

                let response = JSON.parse(res);
                let data = response.response;
                if (data.status === 200) {
                    this.setState({loaderStatus: false});
                    this.setState({order_history: data.transactions})
                }
            });
    }

    render() {

        return (
            <React.Fragment>

                <Header
                    wish_list_total_count={this.state.wish_list_total_count}
                    cart_total_items_count={this.state.cart_total_items_count}
                    User={this.state.logged_in_user}
                    headerTitle="OrderHistory"
                    user={this
                    .__user
                    .bind(this)}
                    history={this.props.history}
                    header_search_text_val={this.state.header_search_text_val}
                    header={this
                    .__header
                    .bind(this)}/>

                <LoginSignUpModal
                    Title="OrderHistory"
                    history={this.props.history}
                    user={this
                    .__user
                    .bind(this)}/>
                <main id="main" className="defaultPageWrapper">
                    {this.state.loaderStatus && <div className="loader tops">Loading ...</div>}
                    {(this.state.order_history == '' && this.state.loaderStatus == false) && <EmptyCartComponent
                        emptyTitle="My Order History"
                        emptyImage="no_orderhistory.png"
                        emptyContent="Your Order History is empty!"
                        emptyText="Start ordering now."/>}
                    {this.state.order_history != '' && <OrderHistoryComponent
                        history={this.props.history}
                        order_history={this.state.order_history}/>}
                    <OffersAndUpdates history={this.props.history}/>
                </main>
                <Footer  history={this.props.history}/>
            </React.Fragment>

        );

    }
}

export default OrderHistory;
