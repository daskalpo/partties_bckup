import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Helper, Url, Global, Api } from "../config";
import {
  Category,
  HeaderTopBar,
  OptionComponent,
  MobileHomeBanner,
  MobileHomeSlider,
  Alert,
  MobileBanner,
  MenuBarList

} from "../Pagecomponent";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    Helper.loadScript();
  };
  nevigate = (nav) => {
    if (nav == "wish-list") {
      let user = window.localStorage.getItem("LOGGEDUSER");
      if (user == "" || user === null || user === undefined) {
        document.getElementById("loginss").click();
        return false;
      }
    }

    Helper.clear_global_search_values_onNavigation();
    this.props.history.push("/" + nav);
  };

  logout = (nav) => {
    Helper.logout();

    if (
      this.props.headerTitle != "Home" &&
      this.props.headerTitle != "Cart" &&
      this.props.headerTitle != "ProductLists" &&
      this.props.headerTitle != "ProductDetails"
    ) {
      this.props.history.push("/home");
    }

    window.location.reload();
  };

  searchBar = () => {
    this.props.history.push("/global-products");
    if (this.props.headerTitle == "GlobalProductLists") {
      this.props.refreshGlobalProductList();
    }
  };

  change_headerSearchTextVal(e) {
    this.props.header(e.target.value);
  }

  __change_mobile_headerSearchTextVal(e) {
    this.props.header(e);
  }

  enterPressed(event) {
    var code = event.keyCode || event.which;
    if (code === 13) {
      this.searchBar();
    }
  }
  loginSignup = (val) => {
    Helper.toggle_login_signup(val);
  };


  __refreshProductList=() => {
    //alert('here at header')
    this.props.refreshProductList()
  }

  onHandleEvent = (type) => {
    if(type!=null){
        //alert(`type is: ${type}`)
        console.log(`type is: ${type}`)
        if(!Global.search_values_obj.type && Global.search_values_obj.type.length>0){
            //this.refreshPage()
            //window.location.reload(false);
        }
        Global.search_values_obj.type =type;
        //Global.header_search_text_val = "Birthday Cake";
        // console.log(this.props)
        if (this.props.headerTitle == "Home"){
          this
            .props
            .history
            .push('/product-list');
      }else if (this.props.headerTitle == "GlobalProductLists"){
        this.props.refreshGlobalProductList();
      }else if (this.props.headerTitle == "ProductDetails"){
        this.props.refreshProductList(type);
      }else {
          this.__refreshProductList();
      }
    }
  }

  render() {
    return (
      <React.Fragment
        key={"---------------main header portion -----------------"}
      >
        <Alert />
        <header id="header">
          <HeaderTopBar />
          <div className="container">
            <div className="headerInner clearfix">
              <Link to="#" className="humburgIcon">
                <span></span>
              </Link>
              <div id="logo" className="pull-left">
                <Link
                  to="#"
                  onClick={this.nevigate.bind(this, "home")}
                  className="scrollto"
                >
                  <img
                    src={require("../assets/img/logo.png")}
                    alt=""
                    title=""
                  ></img>
                </Link>
              </div>
              <div className="searchLink">
                {/* {this.props.headerTitle != "Home" && (
                  
                )} */}
                <div id="sb-search" className="sb-search">
                    <input
                      className="sb-search-input searchMobile search_input_home"
                      placeholder="Search"
                      type="search"
                      value=""
                      onKeyPress={this.enterPressed.bind(this)}
                      name="search"
                      id="search"
                      onChange={this.change_headerSearchTextVal.bind(this)}
                      value={this.props.header_search_text_val}
                      autoComplete="off"
                    />
                    <button
                      className="sb-search-submit"
                      type="button"
                      onClick={this.searchBar.bind(this)}
                    >
                      <i className="fas fa-search"></i>
                    </button>
                    <span className="sb-icon-search">
                      <i className="fas fa-search"></i>
                    </span>
                  </div>
              </div>

              <nav id="nav-menu-container">
                <ul className="nav-menu">
                  <li className="userLink">
                    <i className="fas fa-user web_user_arrow_down"></i>
                    {this.props.User && (
                      <Link
                        to="#"
                        className="header_custom web_user_arrow_down"
                      >
                        {this.props.User}
                      </Link>
                    )}
                    {this.props.User && (
                      <i className="fas fa-chevron-down downarr_user web_user_arrow_down"></i>
                    )}
                    <span id="user_Web_menu" className="hidden">
                      {this.props.User && (
                        <div id="userDropdownWrap" className="userDropdownWrap">
                          <div className="userActionMenu">
                            <Link
                              onClick={this.nevigate.bind(this, "my-profile")}
                              to="#"
                            >
                              <img
                                src={require("../assets/img/user-profile.png")}
                                alt="Icon"
                              />
                              <span>My Profile</span>
                            </Link>

                            <Link
                              onClick={this.nevigate.bind(
                                this,
                                "customize-cake"
                              )}
                              to="#"
                            >
                              <img
                                src={require("../assets/img/custom-cake.png")}
                                alt="Icon"
                              />
                              <span>Customise Cake</span>
                            </Link>

                            <Link
                              onClick={this.nevigate.bind(
                                this,
                                "order-history"
                              )}
                              to="#"
                            >
                              <img
                                src={require("../assets/img/order-history.png")}
                                alt="Icon"
                              />
                              <span>Order History</span>
                            </Link>

                            <Link
                              onClick={this.nevigate.bind(
                                this,
                                "recommendations"
                              )}
                              to="#"
                            >
                              <img
                                src={require("../assets/img/custom-cake.png")}
                                alt="Icon"
                              />
                              <span>Recommendations</span>
                            </Link>

                            <Link
                              onClick={this.nevigate.bind(
                                this,
                                "recently-viewed-items"
                              )}
                              to="#"
                            >
                              <img
                                src={require("../assets/img/custom-cake.png")}
                                alt="Icon"
                              />
                              <span>Recent Viewed Items</span>
                            </Link>

                            <Link
                              onClick={this.logout.bind(this, "home")}
                              to="#"
                            >
                              <img
                                src={require("../assets/img/sign-out.png")}
                                alt="Icon"
                              />
                              <span>Logout</span>
                            </Link>
                          </div>
                        </div>
                      )}
                    </span>
                    {!this.props.User && (
                      <NavLink
                        to="#"
                        id="loginSignup"
                        data-toggle="modal"
                        data-target="#loginSignupModal"
                        data-backdrop="static"
                        data-keyboard="false"
                        onClick={this.loginSignup.bind(this, "login")}
                        id="loginss"
                      >
                        Login or
                      </NavLink>
                    )}

                    {!this.props.User && (
                      <NavLink
                        to="#"
                        id="loginSignup"
                        data-toggle="modal"
                        data-target="#loginSignupModal"
                        data-backdrop="static"
                        data-keyboard="false"
                        onClick={this.loginSignup.bind(this, "signup")}
                        id="signupss"
                      >
                        Sign Up
                      </NavLink>
                    )}
                  </li>
                  <li>
                    <Link to="#" onClick={this.nevigate.bind(this, "cart")}>
                      <span id="catrt_total_items" className="cart_noitems">
                        {this.props.cart_total_items_count}
                      </span>
                      <i className="fas fa-shopping-cart"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      onClick={this.nevigate.bind(this, "wish-list")}
                      className="wishlist_icon"
                    >
                      <i className="fas fa-heart"></i>
                      <span id="web_add_to_wishlist" className="cart_noitems">
                        {this.props.wish_list_total_count}
                      </span>
                    </Link>
                  </li>
                </ul>
              </nav>

              <div className="mainSearchWrap">
                <div className="mainSearchInner">
                  <input
                    type="text"
                    name="search"
                    placeholder="Search Cake, Gifts etc."
                    className="mainSearchField"
                    onKeyPress={this.enterPressed.bind(this)}
                    onChange={this.change_headerSearchTextVal.bind(this)}
                    value={this.props.header_search_text_val}
                    autoComplete="off"
                  />
                  <button
                    className="mainSearchButton"
                    onClick={this.searchBar.bind(this)}
                  >
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        
          <MenuBarList
            headerTitle={this.props.headerTitle}
            history={this.props.history}
            onHandleEvent={this.onHandleEvent.bind(this)}
          /> 
        </header>



        {/* {this.props.headerTitle == "Home" && (
          <MobileHomeBanner
            searchBar={this.searchBar.bind(this)}
            header_search_text_val={this.props.header_search_text_val}
            change_mobile_headerSearchTextVal={this.__change_mobile_headerSearchTextVal.bind(
              this
            )}
          />
        )} */}
        <Category
          headerTitle={this.props.headerTitle}
          User={this.props.User}
          history={this.props.history}
          refreshProductList={this.__refreshProductList.bind(this)}
        />{" "}
        {/* {this.props.headerTitle == "Home" && <MobileHomeSlider />} */}
      </React.Fragment>
    );
  }
}
export default Header;
