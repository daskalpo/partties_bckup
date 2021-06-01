import React from "react";
import { Helper } from "../config";
import {
  SinglePartyItemComponent,
  SinglePartyItemMobileComponent,
} from "../Pagecomponent";
import InfiniteScroll from "react-infinite-scroll-component";

class PartyItemComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  getMoreProducts = () => {
    this.props.fetchMorePartyItem();
  };
  componentDidMount = () => {
    window.scrollTo(0, 0);
  };

  render() {
    console.log(this.props.newPartyItemList);
    return (
      <section id="productListWrapper" className="rowTopMargin mobiletop">
        <InfiniteScroll
          dataLength={this.props.newPartyItemList.length}
          next={this.getMoreProducts}
          hasMore={true}
        >
          <div className="container mob_view">
            <div className="row productListInner productListInner_mob">
              {this.props.newPartyItemList.map((prod, index) => (
                <SinglePartyItemMobileComponent
                  whom="partyItem"
                  key={index}
                  partyItemInDetails={prod}
                  history={this.props.history}
                />
              ))}
            </div>
          </div>

          <div className="container web_view">
            <div className="row productListInner">
              {this.props.newPartyItemList.map((prod, index) => (
                <SinglePartyItemComponent
                  whom="partyItem"
                  key={index}
                  partyItemInDetails={prod}
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
export default PartyItemComponent;
