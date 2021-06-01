import React, {Component} from 'react';
import {
    Header,
    OffersAndUpdates,
    Footer,
    HomeComponent,
    LoginSignUpModal,
    Alert,
    PartyEnquiryComponent
} from '../Pagecomponent';
import {Api, Url, Helper, Global} from '../config';

class PartyEnquiry extends Component {
    constructor(props) {

        super(props);
        this.state = {
            header_search_text_val: '',
            logged_in_user: '',
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
    }

    render() {

        return (
            <React.Fragment>
              
              <LoginSignUpModal
                    Title="PartyEnquiry"
                    history={this.props.history}
                    user={this
                    .__user
                    .bind(this)}/>
                <Header
                    wish_list_total_count={this.state.wish_list_total_count}
                    cart_total_items_count={this.state.cart_total_items_count}
                    User={this.state.logged_in_user}
                    headerTitle="PartyEnquiry"
                    user={this
                    .__user
                    .bind(this)}
                    history={this.props.history}
                    header_search_text_val={this.state.header_search_text_val}
                    header={this
                    .__header
                    .bind(this)}/>


                <main id="main" className="defaultPageWrapper">
                    <PartyEnquiryComponent/>
                    <OffersAndUpdates history={this.props.history}/>
                </main>
                <Footer  history={this.props.history}/>
            </React.Fragment>
        );

    }
}

export default PartyEnquiry;
