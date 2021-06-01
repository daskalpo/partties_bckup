import React, {Component} from 'react';
import {
    Header,
    OffersAndUpdates,
    Footer,
    Search,
    ProductDetailsComponent,
    ListComponent,
    Blank,
    LoginSignUpModal,
    ReviewAddModelComponent,
    MenuBarList

} from '../Pagecomponent';
import {Api, Url, Helper, Global} from '../config';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickedProductPrice: '',
            attribute_list:'',
            completeProdDetails: [],
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
                    .getItem("cart_total_items"),
            you_may_also_likes: [],        
        };
    }

    __get_product_slug_details = () => {
        console.log(this.props);
        let api = Url.ProductDetails + '/' + this.props.match.params.type;

        Api
            .ProductDetails(api)
            .then(res => {
                let response = JSON.parse(res);
                let data = response.response;
                if (data.status === true) {
                    console.log(data);
                    if (data.data.attribuites != undefined || data.data.attribuites!=null){
                        console.log(data.data.attribuites)
                        this.__get_you_may_also_like(data.data.attribuites[0].name)
                    }

                    this.__refreshCake(data.data.variations[0].price, data.data);
                }
            });
    }

    __get_you_may_also_like = (type) => {
        Global.search_values_obj.type = type
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
            page: 0,
          };
          console.log(searchDataObj);
          let api = Url.Products;
          //this.setState({ loaderStatus: true });
          Api.SearchProductsApi(api, searchDataObj).then((res) => {
            let response = JSON.parse(res);
            let data = response.response;
            console.log("search", data);
            if (data.status){
                this.setState({
                    you_may_also_likes: data.data
                })
            }

            //   This is for you may like category

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
        this.__get_product_slug_details();
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
    __refreshCake = (price, completeProdDetails) => {

       let local_attribute_list='';
        completeProdDetails
        .attribuites
        .forEach(attr => {
            local_attribute_list=local_attribute_list+','+attr.name
            
        });

        completeProdDetails
            .variations
            .forEach(element => {

                if (element.price == price) {
                    this.setState({cakeAttribute: element.attribuites});
                    this.setState({active_variation_id: element.id});
                    this.setState({active_weight: element.weight})
                }
            });

        this.setState({completeProdDetails: completeProdDetails});
        this.setState({clickedProductPrice: price,attribute_list:local_attribute_list.substring(1)});

    }

    onHandleEvent = (type) => {
          if(type!=null){
            //alert(`Product details type is: ${type}`)
            // if(Global.search_values_obj.type.length>0){
            //   console.log(`type is: ${type}`)
              
            // }else {
            //     alert(`Product details type is: Not Refreshing`)
            // }
                Global.search_values_obj.type ="";
                Global.search_values_obj.type =type;
                //Global.header_search_text_val = "Birthday Cake";
                // console.log(this.props)
                this
                .props
                .history
                .push('/product-list');
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

    render() {

        return (
            <React.Fragment>
                <LoginSignUpModal
                    Title="ProductDetails"
                    history={this.props.history}
                    user={this
                    .__user
                    .bind(this)}/>

                <Header
                    wish_list_total_count={this.state.wish_list_total_count}
                    cart_total_items_count={this.state.cart_total_items_count}
                    User={this.state.logged_in_user}
                    headerTitle="ProductDetails"
                    history={this.props.history}
                    header_search_text_val={this.state.header_search_text_val}
                    refreshProductList={this.onHandleEvent.bind()}
                    header={this
                    .__header
                    .bind(this)}/>

                {/* <MenuBarList
                    headerTitle="ProductLists"
                    history={this.props.history}
                    onHandleEvent={this.onHandleEvent.bind()}
                />         */}
                    
                <main id="main" className="defaultPageWrapper">
                    {this.state.completeProdDetails == '' && <div className="loader tops">Loading ...</div>} 
                    {(this.state.clickedProductPrice && this.state.completeProdDetails) && <ProductDetailsComponent
                attribute_list={this.state.attribute_list}
                        get_product_slug_details={this
                        .__get_product_slug_details
                        .bind(this)}
                        cakeAttribute={this.state.cakeAttribute}
                        clickedProductPrice={this.state.clickedProductPrice}
                        completeProdDetails={this.state.completeProdDetails}
                        active_variation_id={this.state.active_variation_id}
                        cart_total_items_count={this.state.cart_total_items_count}
                        active_weight={this.state.active_weight}
                        refreshCake={this
                        .__refreshCake
                        .bind(this)}
                        history={this.props.history}
                        you_may_also_likes = {this.state.you_may_also_likes}/>}
                    <OffersAndUpdates history={this.props.history}/>
                </main>
                <Footer  history={this.props.history}/>
                <ReviewAddModelComponent
                 Title="ProductDetails"
                    get_product_slug_details={this
                    .__get_product_slug_details
                    .bind(this)}
                    completeProdDetails={this.state.completeProdDetails}/>
            </React.Fragment>
        );

    }
}

export default ProductDetail;
