import React from "react";
import { Helper, Global } from "../config";
import {
  SingleProductMobile,
  SinglePartyItemComponent,
  SingleGiftComponent,
  SingleProduct,
  SinglePartyItemMobileComponent,
  SingleGiftMobileComponent,
  MenuBarList
} from "../Pagecomponent";
import InfiniteScroll from "react-infinite-scroll-component";

class WishListComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  __refresh_wishlist_on_remove = (completeProdDetails) => {
    this.props.refresh_wish_list();
  };
  get_more_wishlist = () => {
    this.props.fetch_more_wishlist();
  };
  componentDidMount = () => {
    window.scrollTo(0, 0);
  };

  onHandleMenuEvent = (type) => {
    //alert(`type in LIST is: ${type}`)
      if(type!=null){
        // if(Global.search_values_obj.type.length>0){
        //   console.log(`type is: ${type}`)
        //   Global.search_values_obj.type ="";
        //   Global.search_values_obj.type =type;
        //   alert('refreshing')
        //   this.__refreshProductList();
        // }else {
        //   alert('not refreshing')
        // }
        Global.search_values_obj.type ="";
        Global.search_values_obj.type =type;
        this
            .props
            .history
            .push('/product-list');
    }
  }

  render() {
    return (
      // <section id="productListWrapper" className="rowTopMargin mobiletop">
      <section id="productListWrapper" className="rowTopMargin mobileTopWishlist">
        {/* <MenuBarList
          headerTitle="ProductLists"
          history={this.props.history}
          onHandleEvent={this.onHandleMenuEvent.bind(this)}
        /> */}

        <InfiniteScroll
          dataLength={this.props.wish_list.length}
          next={this.get_more_wishlist}
          hasMore={true}
        >
          <div className="container mob_view">
            <div className="row productListInner productListInner_mob">

              {this.props.wish_list.map((prod, index) =>
                prod.type == "cake" ? (
                  <SingleProductMobile
                    whom="list"
                    key={index}
                    productInDetails={prod}
                    history={this.props.history}
                  />
                ) : prod.type == "gift" ? (
                  <SingleGiftMobileComponent
                    refresh_wishlist_on_remove={this.__refresh_wishlist_on_remove.bind(
                      this
                    )}
                    whom="wishlist"
                    giftInDetails={prod}
                    history={this.props.history}
                  />
                ) : (
                  <SinglePartyItemMobileComponent
                    refresh_wishlist_on_remove={this.__refresh_wishlist_on_remove.bind(
                      this
                    )}
                    whom="wishlist"
                    partyItemInDetails={prod}
                    history={this.props.history}
                  />
                )
              )}
            </div>
          </div>

          <div className="container web_view">
            <div className="row productListInner">
              {this.props.wish_list.map((prod, index) =>
                prod.type == "cake" ? (
                  <SingleProduct
                    whom="list"
                    key={index}
                    productInDetails={prod}
                    history={this.props.history}
                  />
                ) : prod.type == "gift" ? (
                  <SingleGiftComponent
                    refresh_wishlist_on_remove={this.__refresh_wishlist_on_remove.bind(
                      this
                    )}
                    whom="wishlist"
                    giftInDetails={prod}
                    history={this.props.history}
                  />
                ) : (
                  <SinglePartyItemComponent
                    refresh_wishlist_on_remove={this.__refresh_wishlist_on_remove.bind(
                      this
                    )}
                    whom="wishlist"
                    partyItemInDetails={prod}
                    history={this.props.history}
                  />
                )
              )}
            </div>
          </div>
        </InfiniteScroll>
      </section>
    );
  }
}
export default WishListComponent;
