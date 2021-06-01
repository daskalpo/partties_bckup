import React from 'react';
import {Helper} from '../config';
import {SingleProduct,SinglePartyItemComponent,SingleGiftComponent} from '../Pagecomponent';
import InfiniteScroll from "react-infinite-scroll-component";
import SingleProductMobile from './singleProductMobile';

class GlobalListComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    getMoreGlobalProducts = () => {
        this
            .props
            .fetchMoreGlobalProduct();
    };
    componentDidMount = () => {
        window.scrollTo(0, 0);
    }

    render() {
        console.log(this.props.newGlobalProductsList);
        return (

            //<section id="productListWrapper" className="rowTopMargin mobiletop">
            <section id="productListWrapper" className="rowTopMargin globalMobileList">


                <InfiniteScroll
                    dataLength={this.props.newGlobalProductsList.length}
                    next={this.getMoreGlobalProducts}
                    hasMore={true}>
                    <div className="container mob_view">
                        <div className="row productListInner productListInner_mob">
                            {this
                                .props
                                .newGlobalProductsList
                                .map(prod => prod.type == "cake" ? (
                                    <SingleProductMobile
                                    whom="wishlist"
                                    productInDetails={prod}
                                    history={this.props.history}/> ) :prod.type == "gift" ?<SingleGiftComponent 
                                        whom="wishlist"
                                        giftInDetails={prod}
                                        history={this.props.history}/>:<SinglePartyItemComponent  
                                            whom="wishlist"
                                            partyItemInDetails={prod}
                                            history={this.props.history}/>
                                            )}
                        </div>
                    </div>

                    <div className="container web_view">
                        <div className="row productListInner">
                        {this
                            .props
                            .newGlobalProductsList
                            .map(prod => prod.type == "cake" ? (
                                <SingleProduct
                                    whom="wishlist"
                                    productInDetails={prod}
                                    history={this.props.history}/> ) :prod.type == "gift" ?<SingleGiftComponent 
                                    whom="wishlist"
                                    giftInDetails={prod}
                                    history={this.props.history}/>:<SinglePartyItemComponent  
                                        whom="wishlist"
                                        partyItemInDetails={prod}
                                        history={this.props.history}/>
                                        )}
                        </div>
                    </div>
                </InfiniteScroll>
            </section>
        );
    }
}
export default GlobalListComponent
