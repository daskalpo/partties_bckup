import React from "react";
import { Helper } from "../config";
import {
  SingleProduct,
  SinglePartyItemComponent,
  SingleGiftComponent,
  SingleProductMobile,
  SinglePartyItemMobileComponent,
  SingleGiftMobileComponent
} from "../Pagecomponent";
import InfiniteScroll from "react-infinite-scroll-component";

class RecentlyViewedItemsComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  get_more_recentlyViewedItem = () => {};
  componentDidMount = () => {
    window.scrollTo(0, 0);
  };

  render() {
    return (
      <section id="productListWrapper" className="rowTopMargin rowTopMarginRecentlyViewed">
        <InfiniteScroll
          dataLength={this.props.recentlyViewedItem.length}
          next={this.get_more_recentlyViewedItem}
          hasMore={true}
        >
          <div className="container mob_view">
            <div className="row productListInner productListInner_mob">
              {this.props.recentlyViewedItem.map((prod) =>
                prod.type == "cake" ? (
                  <SingleProductMobile
                    whom="recentlyViewed"
                    productInDetails={prod}
                    history={this.props.history}
                  />
                ) : prod.type == "gift" ? (
                  <SingleGiftMobileComponent
                    whom="recentlyViewed"
                    giftInDetails={prod}
                    history={this.props.history}
                  />
                ) : (
                  <SinglePartyItemMobileComponent
                    whom="recentlyViewed"
                    partyItemInDetails={prod}
                    history={this.props.history}
                  />
                )
              )}
            </div>
          </div>
          <div className="container web_view">
            <div className="row productListInner">
              {this.props.recentlyViewedItem.map((prod) =>
                prod.type == "cake" ? (
                  <SingleProduct
                    whom="recentlyViewed"
                    productInDetails={prod}
                    history={this.props.history}
                  />
                ) : prod.type == "gift" ? (
                  <SingleGiftComponent
                    whom="recentlyViewed"
                    giftInDetails={prod}
                    history={this.props.history}
                  />
                ) : (
                  <SinglePartyItemComponent
                    whom="recentlyViewed"
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
export default RecentlyViewedItemsComponent;
