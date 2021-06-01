import React, {Component} from 'react';
import {
    Header,
    OffersAndUpdates,
    Footer,
    HomeComponent,
    LoginSignUpModal,
    OrderDetailsComponent,
    Alert,
    Search,
    HomeBanner,
    MobileHeaderSearchAndBannersComponent
} from '../Pagecomponent';
import {Api, Url, Helper, Global} from '../config';

class OrderHistoryDetails extends Component {
    constructor(props) {

        super(props);
        this.state = {
            header_search_text_val: '',
            logged_in_user: '',
            order_details: '',
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
        this.fetch_order_details();
    }

    fetch_order_details = () => {
        let api = Url.order_details + "/" + this.props.match.params.orderId;
        this.setState({loaderStatus: true});
        Api
            .order_details(api)
            .then(res => {
                let response = JSON.parse(res);
                console.log(response)
                let data = response.response;
                this.setState({loaderStatus: false});
                if (data.status === 200) {
                    this.setState({order_details: data.transaction})
                }
            });
    }
    __refresh_order_details = () =>{
        this.fetch_order_details();
    }
    render() {

        return (
            <React.Fragment>
             <LoginSignUpModal
                    Title="OrderHistoryDetails"
                    history={this.props.history}
                    user={this
                    .__user
                    .bind(this)}/>
                <Header
                    wish_list_total_count={this.state.wish_list_total_count}
                    cart_total_items_count={this.state.cart_total_items_count}
                    User={this.state.logged_in_user}
                    headerTitle="OrderHistoryDetails"
                    user={this
                    .__user
                    .bind(this)}
                    history={this.props.history}
                    header_search_text_val={this.state.header_search_text_val}
                    header={this
                    .__header
                    .bind(this)}/>

               
                <main id="main" className="defaultPageWrapper">
                    {this.state.loaderStatus && <div className="loader tops">Loading ...</div>}
                    {this.state.order_details != '' && <OrderDetailsComponent
                     refresh_order_details={this
                        .__refresh_order_details
                        .bind(this)}
                        order_details={this.state.order_details}
                        history={this.props.history}/>}
                    < OffersAndUpdates history={this.props.history}/>
                </main>
                <Footer  history={this.props.history}/>

            </React.Fragment>
        );
    }
}

export default OrderHistoryDetails;
