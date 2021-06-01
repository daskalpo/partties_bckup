import React, {Component} from 'react';
import {
    Header,
    OffersAndUpdates,
    Footer,
    PartyItemComponent,
    PartyItemSearch,
    LoginSignUpModal,
    MobilePartyItemSearch,
    EmptyCartComponent
} from '../Pagecomponent';
import {Api, Url, Helper, Global} from '../config';

class PartyItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPartyItemList: [],
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
        this.fetchPartyItemList(0);

    }
    __refreshPartyItemList = () => {
        this.setState({pageValue: 0});
        this.fetchPartyItemList(0);
    }

    fetchPartyItemList = (localPage) => {

        let searchDataObj = {
            "search": Global.header_search_text_val,
            "price": Global.partyitem_search_values_obj.price,
            "type": Global.partyitem_search_values_obj.type == "0"
                ? ""
                : Global.partyitem_search_values_obj.type,
            "order": Global.partyitem_search_values_obj.order == "0"
                ? ""
                : Global.partyitem_search_values_obj.order,
            "page": localPage
        }
        console.log(searchDataObj);

        let api = Url.party_item;
        this.setState({loaderStatus: true});
        Api
            .SearchPartItemApi(api, searchDataObj)
            .then(res => {
                let response = JSON.parse(res);
                let data = response.response;
                console.log(data);
                if (data.status === true) {
                    this.setState({loaderStatus: false});
                    localPage != 0
                        ? this.setState({
                            newPartyItemList: this
                                .state
                                .newPartyItemList
                                .concat(Helper.convert_object_to_array(data.data))
                        })
                        : this.setState({
                            newPartyItemList: Helper.convert_object_to_array(data.data)
                        });
                }
            });
    }
    __fetchMorePartItem = () => {

        this.setState({
            pageValue: this.state.pageValue + 1
        });
        this.fetchPartyItemList(this.state.pageValue)

    }

    render() {
        return (
            <React.Fragment>

                <LoginSignUpModal
                    Title="PartyItem"
                    history={this.props.history}
                    user={this
                    .__user
                    .bind(this)}/>
                <Header
                    wish_list_total_count={this.state.wish_list_total_count}
                    cart_total_items_count={this.state.cart_total_items_count}
                    User={this.state.logged_in_user}
                    headerTitle="PartyItem"
                    history={this.props.history}
                    header_search_text_val={this.state.header_search_text_val}
                    refreshPartyItemList={this
                    .__refreshPartyItemList
                    .bind(this)}
                    header={this
                    .__header
                    .bind(this)}/>
                <MobilePartyItemSearch
                    wish_list_total_count={this.state.wish_list_total_count}
                    cart_total_items_count={this.state.cart_total_items_count}
                    User={this.state.logged_in_user}
                    headerTitle="PartyItem"
                    history={this.props.history}
                    refreshPartyItemList={this
                    .__refreshPartyItemList
                    .bind(this)}/>

                <main id="main" className="defaultPageWrapper defaultPageWrapper_mob">
                    <PartyItemSearch
                        headerTitle="PartyItem"
                        history={this.props.history}
                        refreshPartyItemList={this
                        .__refreshPartyItemList
                        .bind(this)}/> 
                        {(this.state.newPartyItemList == '' && this.state.loaderStatus === false) && <EmptyCartComponent
                        emptyTitle="My Party Item"
                        emptyImage="no_product.png"
                        emptyContent="No Party Item Found!"
                        emptyText=""/>}
                    {this.state.loaderStatus && <div className="loader tops additional_tops">Loading ...</div>}
                    {this.state.newPartyItemList != '' && <PartyItemComponent
                        loaderStatus={this.state.loaderStatus}
                        fetchMorePartyItem={this
                        .__fetchMorePartItem
                        .bind(this)}
                        history={this.props.history}
                        newPartyItemList={this.state.newPartyItemList}/>}
                    {(this.state.loaderStatus && this.state.newPartyItemList.length > 12) && <div className="loader tops">Loading ...</div>}

                    <OffersAndUpdates history={this.props.history}/>
                </main>
                <Footer  history={this.props.history}/>
            </React.Fragment>
        );
    }
}

export default PartyItems;
