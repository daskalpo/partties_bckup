import React, {Component} from 'react';
import {
    Header,
    OffersAndUpdates,
    Footer,
    HomeComponent,
    LoginSignUpModal,
    Alert,
    Search,
    HomeBanner,
    MobileHeaderSearchAndBannersComponent,
    MobileBanner,
    MobileHomePageContainer,
    WebViewBanner,
    MenuBarList,
    WebHomePageContainer
} from '../Pagecomponent';
import {Api, Url, Helper, Global} from '../config';
//import { HomeBody } from '../Pagecomponent/homeBodyNew';
import InfiniteScroll from "react-infinite-scroll-component";

class Home extends Component {
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
                    .getItem("cart_total_items"),
            widget_list: [],  
            mobile_banner_list: [],
            web_banner_list: [],      
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
        this.fetch_home_product_list();
        this.fetch_home_gift_list();
        this.fetch_widget_list();
        this.fetch_mobile_banners();
        this.fetch_web_banner();
    }

    fetch_home_product_list = () => {
        let api = Url.ProductsNew;
        Api
            .NewProductsApi(api)
            .then(res => {
                let response = JSON.parse(res);
                let data = response.response;
                if (data.status === true) {
                    console.log('Catch ', data.data)
                    let temp = []
                    let bodyDataArray = Helper.convert_object_to_array(data.data)
                    
                    bodyDataArray.map(prod => {
                        if(prod.variation != null){
                            temp.push(prod)
                            console.log(prod.variation)
                        }
                    });
                    this.setState({home_product_list:  Helper.convert_object_to_array(temp)});
                    Helper.loadScript();
                }
            });
    }



    fetch_home_gift_list = () => {
        let api = Url.GIftNew;
        Api
            .NewGiftssApi(api)
            .then(res => {
                let response = JSON.parse(res);
                let data = response.response;
                console.log(data)
                if (data.status === true) {
                    this.setState({home_gift_list: Helper.convert_object_to_array(data.data)});
                    Helper.loadScript();
                }
            });
    }

    fetch_widget_list = () => {
        let api = Url.widget_list;
        Api
            .get_widget_list(api)
            .then(res => {
                let response = JSON.parse(res);
                let data = response.response;
                console.log(data)
                if (data.status === true) {
                    // this.setState({home_gift_list: Helper.convert_object_to_array(data.data)});
                    // Helper.loadScript();
                    console.log("------> response "+JSON.stringify(data.data))
                    this.setState({widget_list: data.data});
                }
            });
    }
    fetch_mobile_banners = () => {
        let api = Url.mobile_banner;
        Api
            .get_mobile_banner_list(api)
            .then(res => {
                let response = JSON.parse(res);
                let data = response.response;
                console.log(data)
                if (data.status === true) {
                    console.log("------> mobile banner "+JSON.stringify(data.data))
                    this.setState({mobile_banner_list: data.data});
                }
            }); 
    }

    fetch_web_banner = () => {
        let api = Url.web_banner;
        Api
            .get_mobile_banner_list(api)
            .then(res => {
                let response = JSON.parse(res);
                let data = response.response;
                console.log(data)
                if (data.status === true) {
                    // this.setState({home_gift_list: Helper.convert_object_to_array(data.data)});
                    // Helper.loadScript();
                    console.log("------> web banner "+JSON.stringify(data.data))
                    this.setState({web_banner_list: data.data});
                }
            });   
    }

    nevigation = (nav) => {
        if(nav == "product-list"){
            //this.setState({cake_tab:true});
            
            
        }

    }


  __refreshProductList = () => {
    this.setState({ pageValue: 0 });
    this.fetchProductList(0);
  };

  fetchProductList = (localPage) => {
    let searchDataObj = {
      search: Global.header_search_text_val,
      price: Global.search_values_obj.price,
      type:
        Global.search_values_obj.type == "0"
          ? ""
          : Global.search_values_obj.type,
      order:
        Global.search_values_obj.order == "0"
          ? ""
          : Global.search_values_obj.order,
      page: localPage,
    };
    console.log(searchDataObj);

    let api = Url.Products;
    this.setState({ loaderStatus: true });
    Api.SearchProductsApi(api, searchDataObj).then((res) => {
      let response = JSON.parse(res);
      let data = response.response;
      console.log(data);
      if (data.status === true) {
        this.setState({ loaderStatus: false });
        localPage != 0
          ? this.setState({
              newProductsList: this.state.newProductsList.concat(
                Helper.convert_object_to_array(data.data)
              ),
            })
          : this.setState({
              newProductsList: Helper.convert_object_to_array(data.data),
            });
      }
    });
  };
    

    refreshPage() {
        window.location.reload(false);
    }
    
    onHandleEvent = (type) => {
        if(type!=null){
            //alert(`type is: ${type}`)
            console.log(`type is: ${type}`)
            if(!Global.search_values_obj.type && Global.search_values_obj.type.length>0){
                this.refreshPage()
                
            }
            Global.search_values_obj.type =type;
            //Global.header_search_text_val = "Birthday Cake";
            // console.log(this.props)
            this
            .props
            .history
            .push('/product-list');
        }
    }

    render() {

        console.log(this.props)
        return (
            <React.Fragment>

            console.log(this.props)
               <LoginSignUpModal
                    Title="Home"
                    history={this.props.history}
                    user={this
                    .__user
                    .bind(this)}/>
                <Header
                    wish_list_total_count={this.state.wish_list_total_count}
                    cart_total_items_count={this.state.cart_total_items_count}
                    User={this.state.logged_in_user}
                    headerTitle="Home"
                    user={this
                    .__user
                    .bind(this)}
                    history={this.props.history}
                    header_search_text_val={this.state.header_search_text_val}
                    refreshProductList={this.__refreshProductList.bind(this)}
                    header={this
                    .__header
                    .bind(this)}/>

                {/* <MenuBarList
                    headerTitle="Home"
                    history={this.props.history}
                    onHandleEvent={this.onHandleEvent.bind(this)}
                />  */}

                {/* <div id="main" class=""> */}

                  

                {/* <MobileBanner
                    headerTitle="Home"
                        history={this.props.history}
                    />   */}

                <MobileHomePageContainer
                    headerTitle="Home"
                    history={this.props.history}
                    mobile_banner_list={this.state.mobile_banner_list}
                    home_widget_list={this.state.widget_list}
                    // onClickEvent={this.handleItemClick}
                />


                <HomeBanner
                        web_banner_list={this.state.web_banner_list}/>


                    <HomeComponent
                        home_gift_list={this.state.home_gift_list}
                        home_product_list={this.state.home_product_list}
                        history={this.props.history}
                        web_banner_list={this.state.web_banner_list}/>
                    <OffersAndUpdates history={this.props.history}/>

                    {/* <WebHomePageContainer/> */}
                    



                <Footer  history={this.props.history}/>
            </React.Fragment>

        );

    }
}

export default Home;
