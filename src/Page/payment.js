import React, {Component} from 'react';
import {
    Header,
    OffersAndUpdates,
    Footer,
    HomeComponent,
    LoginSignUpModal,
    ListComponent,
    Search,
    Blank,
    HomeBanner,
    PaymentComponent
} from '../Pagecomponent';
import {Api, Url, Helper, Global} from '../config';

class Payment extends Component {
    constructor(props) {

        super(props);
        this.state = {
            header_search_text_val: '',
            logged_in_user: '',
            order_summary: '',
            user_cart_id: '',
            user_address: '',
            default_address: '',
            user_id: '',
            user_full_address:'',
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
        this.__order_summary_manager();
        this.__get_user_address();
    }

    order_summary_base_flow = () => {
        let api = Url.cart_details_for_user;
        Api
            .cart_details_for_user(api)
            .then(res => {
                let response = JSON.parse(res);
                let data = response.response;
                if (data.status === true) {
                    this.setState({order_summary: data.cartitem, user_cart_id: data.cart.id, user_id: data.cart.user_id});
                }
            });
    }

    __order_summary_manager = () => {
        this.order_summary_base_flow();
    }
    __get_default_address = (address, situation) => {
        if (situation == "address_id_pass") {
            this.setState({user_full_address:address})
            this.setState({default_address: address.id});
        } else {
            address.map(addr => {
                if (addr.is_default == 1) {
                    this.setState({user_full_address:addr})
                    this.setState({default_address: addr.id});
                }
            });
        }
    }
    __get_user_address = () => {
        let api = Url.get_user_address;
        Api
            .get_user_address(api)
            .then(res => {
                let response = JSON.parse(res);
                let data = response.response;
                console.log(data);
                if (data.status === true) {
                    this.setState({user_address: data.data});
                    if (data.data.length > 0) {
                        
                        this.__get_default_address(data.data);
                    }
                }
            });
    }

    render() {

        return (
            <React.Fragment>
                <LoginSignUpModal
                    Title="Payment"
                    history={this.props.history}
                    user={this
                    .__user
                    .bind(this)}/>
                <Header
                    wish_list_total_count={this.state.wish_list_total_count}
                    cart_total_items_count={this.state.cart_total_items_count}
                    User={this.state.logged_in_user}
                    headerTitle="Payment"
                    history={this.props.history}
                    header_search_text_val={this.state.header_search_text_val}
                    header={this
                    .__header
                    .bind(this)}/>

                
                <main id="main" className="defaultPageWrapper">
                    {this.state.order_summary == '' && <div className="loader tops">
                        Loading ...</div>}
                    {this.state.order_summary && <PaymentComponent
                    user_full_address={this.state.user_full_address}
                        get_default_address={this
                        .__get_default_address
                        .bind(this)}
                        default_address={this.state.default_address}
                        user_id={this.state.user_id}
                        user_cart_id={this.state.user_cart_id}
                        get_user_address={this
                        .__get_user_address
                        .bind(this)}
                        User={this.state.logged_in_user}
                        order_summary={this.state.order_summary}
                        user_address={this.state.user_address}
                        history={this.props.history}/>}

                    <OffersAndUpdates history={this.props.history}/>
                </main>
                <Footer  history={this.props.history}/>
            </React.Fragment>
        );

    }
}

export default Payment;
