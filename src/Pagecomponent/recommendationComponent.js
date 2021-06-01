import React from "react";
import { Helper } from "../config";
import {
  SingleProduct,
  SinglePartyItemComponent,
  SingleGiftComponent,
  SinglePartyItemMobileComponent,
  SingleGiftMobileComponent,
  SingleProductMobile,
} from "../Pagecomponent";
import InfiniteScroll from "react-infinite-scroll-component";

class RecommendationComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  get_more_recommendation = () => {};
  componentDidMount = () => {
    window.scrollTo(0, 0);
  };

  render() {
    console.log(this.props.recommendation);
    return (
      <section id="productListWrapper" className="rowTopMargin ">
        <InfiniteScroll
          dataLength={this.props.recommendation.length}
          next={this.get_more_recommendation}
          hasMore={true}
        >
          <div className="container mob_view">
            <div className="row productListInner productListInner_mob recommendList_mob">
              {this.props.recommendation.map((prod, index) =>
                prod.type == "cake" ? (
                  <SingleProductMobile
                    whom="list"
                    key={index}
                    productInDetails={prod}
                    history={this.props.history}
                  />
                ) : prod.type == "gift" ? (
                  <SingleGiftMobileComponent
                    whom="wishlist"
                    giftInDetails={prod}
                    history={this.props.history}
                  />
                ) : (
                  <SinglePartyItemMobileComponent
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
              {this.props.recommendation.map((prod, index) =>
                prod.type == "cake" ? (
                  <SingleProduct
                    whom="list"
                    key={index}
                    productInDetails={prod}
                    history={this.props.history}
                  />
                ) : prod.type == "gift" ? (
                  <SingleGiftComponent
                    whom="wishlist"
                    giftInDetails={prod}
                    history={this.props.history}
                  />
                ) : (
                  <SinglePartyItemComponent
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
export default RecommendationComponent;
