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
    CartComponent,
    EmptyCartComponent
} from '../Pagecomponent';
import {Api, Url, Helper, Global} from '../config';

class Cart extends Component {
    constructor(props) {

        super(props);
        this.state = {
            header_search_text_val: '',
            logged_in_user: '',
            cart_products: '',
            total_cart_amount: '',
            gst: 0,
            cart_empty: false,
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
        Helper
            .global_function_for_adding_localcart_to_database_and_counts_manager()
            .then(res => {
                this.__cart_values_manager();
            });
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
    common_tax_assignmwnt = (data) => {

        this.setState({
            gst: parseInt(Math.round(data.tax))
        });
    }

    commom_cart_item_parameters_assignment = (data) => {
        let local_total_amout = 0;
        let local_cart_total_items_count = 0;

        data.length < 1
            ? this.setState({cart_empty: true})
            : this.setState({cart_empty: false});

        data.map(prod => {
            local_total_amout = local_total_amout + (prod.price * prod.quantity)
            local_cart_total_items_count += prod.quantity
        });
        this.setState({cart_products: data, cart_total_items_count: local_cart_total_items_count, total_amout: local_total_amout});

        Helper.cart_item_assign(local_cart_total_items_count);
        Helper.hide_show_cart_bubble_inzero();
    }

    online_user_base_flow = () => {
        let api = Url.cart_details_for_user;
        Api
            .cart_details_for_user(api)
            .then(res => {
                let response = JSON.parse(res);
                let data = response.response;

                if (data.status === true) {
                    Helper.cart_item_assign_after_login(data.cart.item_qty)
                    Helper.add_to_wishlist_value(data.wishlist);
                    this.__common_cart_tax(data);
                }

                if (data.status === false) {
                    this.setState({cart_empty: true});
                }
            });
    }

    __common_cart_tax = (data) => {
        this.commom_cart_item_parameters_assignment(data.cartitem);
        this.common_tax_assignmwnt(data.cart);
    }

    __cart_values_manager = (cart_product, value, option) => {

        let user = window
            .localStorage
            .getItem("LOGGEDUSER");
        let local_gst = 0;

        if (user == '' || user === null || user === undefined) {
            if (option === "quantity_option") {
                Helper.localStorage___update_cartItem_by_quantity(cart_product, value);
            }

            if (option === "remove_option") {
                Helper.localStorage___update_cartItem_by_remove(cart_product);
            }

            let local_total_amout = 0;
            let local_car_products = JSON.parse(window.localStorage.getItem('CART')) === null
                ? []
                : JSON.parse(window.localStorage.getItem('CART'));

            if (local_car_products.length < 1) {
                this.setState({cart_empty: true});
            } else {
                this.setState({cart_empty: false});
            }

            this.setState({cart_products: local_car_products});
            local_car_products.map(prod => {
                console.log(prod);
                if (prod.tax != 0) {
                    let each_tax = (prod.price * prod.quantity) * (prod.tax / 100);
                    local_gst = parseFloat(local_gst) + parseFloat(each_tax);
                }
                local_total_amout = local_total_amout + (prod.price * prod.quantity);
            });

            this.setState({
                gst: local_gst == ''
                    ? 0
                    : parseInt(Math.round(local_gst))
            });
            this.setState({total_amout: parseInt(local_total_amout)});
            Helper.hide_show_cart_bubble_inzero();
            Helper.hide_show_cart_wishlist_inzero();
        }

        if (user != '' && user !== null && user !== undefined) {

            if (option === "quantity_option") {

                let dataObj = {
                    "product_id": cart_product.product_id,
                    "product_variation_id": cart_product.product_variation_id,
                    "quantity": parseInt(value),
                    "message": cart_product.message,
                    "cart_item_id": cart_product.cart_item_id
                }

                let api = Url.cart_modify_online;
                Api
                    .cart_modify_online(dataObj, api)
                    .then(res => {
                        let response = JSON.parse(res);
                        let data = response.response;
                        if (data.status === true) {
                            this.__common_cart_tax(data);
                        }
                    });
            }

            if (option === "remove_option") {

                let api = Url.cart_remove_online;
                Api
                    .online___remove_cart(cart_product, api)
                    .then(res => {
                        let response = JSON.parse(res);
                        let data = response.response;
                        if (data.status === true) {
                            this.__common_cart_tax(data);
                        }
                    });
            }

            if (option != "remove_option" && option != "quantity_option") {
                this.online_user_base_flow();
            }

        }

    }
    render() {
        return (
            <React.Fragment>
                 <LoginSignUpModal
                    Title="Cart"
                    history={this.props.historyt}
                    cart_values_manager={this
                    .__cart_values_manager
                    .bind(this)}
                    user={this
                    .__user
                    .bind(this)}/>
                <Header
                    wish_list_total_count={this.state.wish_list_total_count}
                    cart_total_items_count={this.state.cart_total_items_count}
                    User={this.state.logged_in_user}
                    headerTitle="Cart"
                    history={this.props.history}
                    header_search_text_val={this.state.header_search_text_val}
                    header={this
                    .__header
                    .bind(this)}/>
                <main id="main" className="defaultPageWrapper">
                    {(this.state.cart_products == '' && this.state.cart_empty === false) && <div className="loader tops">Loading ...</div>}
                    {this.state.cart_products != '' && <CartComponent
                        common_cart_tax={this
                        .__common_cart_tax
                        .bind(this)}
                        cart_values_manager={this
                        .__cart_values_manager
                        .bind(this)}
                        gst={this.state.gst}
                        cart_products={this.state.cart_products}
                        total_amout={this.state.total_amout}
                        history={this.props.history}/>}
                    {this.state.cart_empty && <EmptyCartComponent
                        emptyTitle="My Cart"
                        emptyImage="empty-cart.png"
                        emptyContent="Your cart is empty!"
                        emptyText="Start ordering now."/>}

                    <OffersAndUpdates history={this.props.history}/>
                    <Footer  history={this.props.history}/>
                </main>
            </React.Fragment>

        );

    }
}

export default Cart;
