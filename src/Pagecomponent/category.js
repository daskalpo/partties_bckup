import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {Api, Url, Helper, Global} from '../config';
import $ from 'jquery';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active_tab: '',
        }
    }

    nevigation = (nav) => {

        if(nav == "product-list"){
            if(Global.search_values_obj.type.length>0){
                Global.search_values_obj.type ="";
                //alert('Value is: '+Global.search_values_obj.type)//alert(this.props.headerTitle)
                this.props.refreshProductList()
            }
            this.setState({cake_tab:true});
        }
        Global.search_values_obj.type ="";

        if(nav == "gifts"){
            this.setState({gift_tab:true});
        }

        if(nav == "party-items"){
            this.setState({party_item_tab:true});
        }
        if(nav == "party-enquiry"){
            this.setState({enquiry_tab:true});
        }

        Global.header_search_text_val = '';
        Helper.clear_global_search_values_onNavigation();
        $('body').removeClass('sidebar-open');
        let user = window
            .localStorage
            .getItem("LOGGEDUSER");
        if (nav == "my-profile" || nav == "customize-cake" || nav == "order-history") {
            if (user == '' || user === null || user === undefined) {
                document
                    .getElementById("loginss")
                    .click();
                return false;
            }
        }
        this
            .props
            .history
            .push('/' + nav);
    }

    logout = (nav) => {

        Helper.logout();
        if (this.props.headerTitle != "Home" && this.props.headerTitle != "Cart" && this.props.headerTitle != "ProductLists" && this.props.headerTitle != "ProductDetails") {
            this
                .props
                .history
                .push('/home');
        }
        window
            .location
            .reload();
    }

    login = () => {
        document
            .getElementById("loginss")
            .click();
    }

    render() {
        console.log(this.props.User);
        return (
            <React.Fragment>
                <React.Fragment>
                    <aside className="main-sidebar">
                        <div className="sidebar">
                            <div className="sidebar-user-wrap">
                                <div className="sidebar-user">
                                    <img src={require("../assets/img/user_circle.png")}/>
                                    <div className="sidebar-user-details">
                                        <span>Welcome</span>
                                        {this.props.User != '' && <p>{this.props.User}</p>}
                                        {(this.props.User == '' || this.props.User == null) && <p>User</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="sidebar-menu-wrap">
                                <ul className="sidebar-menu">
                                    <li >
                                        <Link
                                            to="#"
                                            onClick={this
                                            .nevigation
                                            .bind(this, "home")}><img src={require("../assets/img/home.png")} alt="Home Icon"/>
                                            <span>Home</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            onClick={this
                                            .nevigation
                                            .bind(this, "my-profile")}
                                            to="#"><img src={require("../assets/img/profile.png")} alt="Home Icon"/>
                                            <span>My Profile</span>
                                        </Link>
                                    </li>
                                    <li >
                                        <Link
                                       
                                            to="#"
                                            onClick={this
                                            .nevigation
                                            .bind(this, "product-list")}><img src={require("../assets/img/recent-search.png")} alt="Home Icon"/>
                                            <span>Cake</span>
                                        </Link>
                                    </li>
                                    {/* <li>
                                        <Link
                                            to="#"
                                            onClick={this
                                            .nevigation
                                            .bind(this, "gifts")}><img src={require("../assets/img/recent-search.png")} alt="Home Icon"/>
                                            <span>Gifts</span>
                                        </Link>
                                    </li> */}
                                    {/* <li>
                                        <Link
                                            to="#"
                                            onClick={this
                                            .nevigation
                                            .bind(this, "party-items")}><img src={require("../assets/img/recent-search.png")} alt="Home Icon"/>
                                            <span>Party Items</span>
                                        </Link>
                                    </li> */}
                                    <li>
                                        <Link
                                            to="#"
                                            onClick={this
                                            .nevigation
                                            .bind(this, "cart")}><img src={require("../assets/img/shopping-cart.png")} alt="Home Icon"/>
                                            <span>View Cart</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            onClick={this
                                            .nevigation
                                            .bind(this, "party-enquiry")}
                                            to="#"><img src={require("../assets/img/party-enquiry.png")} alt="Home Icon"/>
                                            <span>Party Enquiry</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            onClick={this
                                            .nevigation
                                            .bind(this, "customize-cake")}
                                            to="#"><img src={require("../assets/img/custom-cake.png")} alt="Home Icon"/>
                                            <span>Designer Custom Cake</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            onClick={this
                                            .nevigation
                                            .bind(this, "order-history")}
                                            to="#"><img src={require("../assets/img/order-history.png")} alt="Home Icon"/>
                                            <span>Order Status/History</span>
                                        </Link>
                                    </li>
                                    {(this.props.User != '' && this.props.User != null) &&    <li>
                                        <Link   onClick={this
                                            .nevigation
                                            .bind(this, "recommendations")} to="#"><img src={require("../assets/img/recomendation.png")} alt="Home Icon"/>
                                            <span>Recommendations</span>
                                        </Link>
                                    </li>}
                                    {(this.props.User != '' && this.props.User != null) &&    <li>
                                        <Link   onClick={this
                                            .nevigation
                                            .bind(this, "recently-viewed-items")} to="#"><img src={require("../assets/img/recent-search.png")} alt="Home Icon"/>
                                            <span>Recently Viewed items</span>
                                        </Link>
                                    </li>}
                                    {/* <li>
                                        <Link to="#"><img src={require("../assets/img/headset-icon.png")} alt="Home Icon"/>
                                            <span>Contact Us</span>
                                        </Link>
                                    </li> */}
                                    <li>
                                        {this.props.User && <Link
                                            onClick={this
                                            .logout
                                            .bind(this, "home")}
                                            to="#"><img src={require("../assets/img/sign-out.png")} alt="Home Icon"/>
                                            <span>Logout</span>
                                        </Link>}

                                        {(this.props.User == null || this.props.User == '') && <Link
                                            onClick={this
                                            .login
                                            .bind(this)}
                                            to="#"><img src={require("../assets/img/sign-out.png")} alt="Home Icon"/>
                                            <span>Login</span>
                                        </Link>}
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </aside>

                </React.Fragment>    
                <React.Fragment>
                    <div
                        className={`topCategoryWrapper ${this.props.headerTitle == "Home"
                        ? "mobileHomeCategory"
                        : ""}`}>
                        <ul className="categoryWrap ">
                            
                            <li
                                onClick={this
                                .nevigation
                                .bind(this, "product-list")}>
                                <Link to="#" 
                                className={`cateogryItem ${this.props.headerTitle == "ProductLists"
                                    ? "category_highlight"
                                    : ""}`}
                                 >
                                    <img src={require("../assets/img/cakeIcon.png")} className="cake Icon"></img>
                                    <span>Cake</span>
                                </Link>
                                {this.props.headerTitle == "Home" && <span>Cake</span>}
                            </li>
                            {/* <li onClick={this
                                .nevigation
                                .bind(this, "gifts")}>
                                <Link to="#" 
                                className={`cateogryItem ${this.props.headerTitle == "GiftLists"
                                    ? "category_highlight"
                                    : ""}`}
                                 >
                                    <img src={require("../assets/img/giftIcon.png")} className="cake Icon"></img>
                                    <span>Gifts</span>
                                </Link>
                                {this.props.headerTitle == "Home" && <span>Gift</span>}

                            </li> */}
                            {/* <li onClick={this
                                .nevigation
                                .bind(this, "party-items")}>
                                <Link to="#" 
                                className={`cateogryItem ${this.props.headerTitle == "PartyItem"
                                    ? "category_highlight"
                                    : ""}`}
                                 >
                                    <img src={require("../assets/img/partyIcon.png")} className="cake Icon"></img>
                                    <span>Party Items</span>
                                </Link>
                                {this.props.headerTitle == "Home" && <span>Party Item</span>}
                            </li> */}
                            <li onClick={this
                                    .nevigation
                                    .bind(this, "party-enquiry")}>
                            <Link to="#" 
                                className={`cateogryItem ${this.props.headerTitle == "PartyEnquiry"
                                    ? "category_highlight"
                                    : ""}`}
                                 >
                                    <img src={require("../assets/img/enquiryIcon.png")} className="cake Icon"></img>
                                    <span>Enquiry</span>
                                </Link>
                                {this.props.headerTitle == "Home" && <span>Enquiry</span>}
                            </li>

                        </ul>
                    </div>
                </React.Fragment>

            </React.Fragment>
        );

    }
}

export default Category;
