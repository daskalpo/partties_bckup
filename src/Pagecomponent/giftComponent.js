import React from "react";
import { Helper } from "../config";
import {
  SingleGiftComponent,
  SingleGiftMobileComponent,
} from "../Pagecomponent";
import InfiniteScroll from "react-infinite-scroll-component";

class GiftComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  getMoreProducts = () => {
    this.props.fetchMoreGift();
  };
  componentDidMount = () => {
    window.scrollTo(0, 0);
  };

  render() {
    console.log(this.props.newGIftList);
    return (
      <section id="productListWrapper" className="rowTopMargin mobiletop">
        <InfiniteScroll
          dataLength={this.props.newGIftList.length}
          next={this.getMoreProducts}
          hasMore={true}
        >
          <div className="container mob_view">
            <div className="row productListInner productListInner_mob">
              {this.props.newGIftList.map((prod, index) => (
                <SingleGiftMobileComponent
                  whom="gift"
                  key={index}
                  giftInDetails={prod}
                  history={this.props.history}
                />
              ))}
            </div>
          </div>

          <div className="container web_view">
            <div className="row productListInner">
              {this.props.newGIftList.map((prod, index) => (
                <SingleGiftComponent
                  whom="gift"
                  key={index}
                  giftInDetails={prod}
                  history={this.props.history}
                />
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </section>
    );
  }
}
export default GiftComponent;
