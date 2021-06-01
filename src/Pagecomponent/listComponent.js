import React from "react";
import { Helper, Global } from "../config";
import { SingleProduct, SingleProductMobile } from "../Pagecomponent";
import InfiniteScroll from "react-infinite-scroll-component";

class ListComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  getMoreProducts = () => {
    this.props.fetchMoreProduct();
  };
  componentDidMount = () => {
    window.scrollTo(0, 0);
  };


  refreshPage() {
    //window.location.reload(false);
    this
        .props
        .refreshProductList();
  }

  onHandleMenuEvent = (type) => {
      //alert('List Componenet: '+type)
      this.props.onHandleEvent(type)
  }

  render() {
    console.log(this.props.newProductsList);
    return (
      
        <InfiniteScroll
          dataLength={this.props.newProductsList.length}
          next={this.getMoreProducts}
          hasMore={true}
        >
          <div className="container mob_view">
            <div className="row productListInner productListInner_mob listComponent_mob">
              {this.props.newProductsList.map((prod, index) => (
                <SingleProductMobile
                  whom="list"
                  key={index}
                  productInDetails={prod}
                  history={this.props.history}
                />
              ))}
            </div>
          </div>

          <div className="container web_view webview_margin">
            <div className="row productListInner">
              {this.props.newProductsList.map((prod, index) => (
                <SingleProduct
                  whom="list"
                  key={index}
                  productInDetails={prod}
                  history={this.props.history}
                />
              ))}
            </div>
          </div>
        </InfiniteScroll>
    );
  }
}
export default ListComponent;
