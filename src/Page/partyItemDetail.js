import React, {Component} from 'react';
import {
    Header,
    OffersAndUpdates,
    Footer,
    Search,
    PartyItemDetailsComponent,
    ListComponent,
    Blank,
    LoginSignUpModal,
    ReviewAddModelComponent

} from '../Pagecomponent';
import {Api, Url, Helper, Global} from '../config';

class PartyItemDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickedPartyItemPrice: '',
            completePartyItemDetails: [],
            header_search_text_val: '',
            logged_in_user: '',
            cakeAttribute: [],
            active_variation_id: '',
            active_weignt: '',
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

    __get_partyitem_slug_details = () => {
        console.log(this.props);
        let api = Url.ProductDetails + '/' + this.props.match.params.type;

        Api
            .ProductDetails(api)
            .then(res => {
                let response = JSON.parse(res);
                let data = response.response;
                if (data.status === true) {
                    console.log(data);
                    this.__refreshCake(data.data.variations[0].price, data.data);
                }
            });
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
        this.__get_partyitem_slug_details();
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
    __refreshCake = (price, completePartyItemDetails) => {

        completePartyItemDetails
            .variations
            .forEach(element => {
                    this.setState({cakeAttribute: completePartyItemDetails.variations[0].attribuites});
                    this.setState({active_variation_id: completePartyItemDetails.variations[0].id});
                    this.setState({active_weight: completePartyItemDetails.variations[0].weight})
            });
            console.log(completePartyItemDetails);
        this.setState({completePartyItemDetails: completePartyItemDetails});
        this.setState({clickedPartyItemPrice: completePartyItemDetails.variations[0].price});
        console.log(this.state.completePartyItemDetails);
    }

    render() {

        return (
            <React.Fragment>
                <LoginSignUpModal
                    Title="PartyItemDetails"
                    history={this.props.history}
                    user={this
                    .__user
                    .bind(this)}/>

                <Header
                    wish_list_total_count={this.state.wish_list_total_count}
                    cart_total_items_count={this.state.cart_total_items_count}
                    User={this.state.logged_in_user}
                    headerTitle="PartyItemDetails"
                    history={this.props.history}
                    header_search_text_val={this.state.header_search_text_val}
                    header={this
                    .__header
                    .bind(this)}/>
                <main id="main" className="defaultPageWrapper">{this.state.completePartyItemDetails == '' && <div className="loader tops">Loading ...</div>} {(this.state.clickedPartyItemPrice && this.state.completePartyItemDetails) && <PartyItemDetailsComponent
                        get_product_slug_details={this
                        .__get_partyitem_slug_details
                        .bind(this)}
                        cakeAttribute={this.state.cakeAttribute}
                        clickedPartyItemPrice={this.state.clickedPartyItemPrice}
                        completePartyItemDetails={this.state.completePartyItemDetails}
                        active_variation_id={this.state.active_variation_id}
                        cart_total_items_count={this.state.cart_total_items_count}
                        active_weight={this.state.active_weight}
                        refreshCake={this
                        .__refreshCake
                        .bind(this)}
                        history={this.props.history}/>}
                    <OffersAndUpdates history={this.props.history}/>
                </main>
                <Footer  history={this.props.history}/>
                <ReviewAddModelComponent
                Title="PartyItemDetails"
                    get_product_slug_details={this
                    .__get_partyitem_slug_details
                    .bind(this)}
                    completeProdDetails={this.state.completePartyItemDetails}/>
            </React.Fragment>
        );

    }
}

export default PartyItemDetail;
