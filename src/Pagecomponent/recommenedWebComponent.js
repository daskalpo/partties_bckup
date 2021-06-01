import React, {Component} from 'react'
import {Api, Url, Helper, Global} from '../config';
import { Link, NavLink } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";


export default class RecommendedWebsiteSection extends React.Component{

    constructor(props){
        super(props)
        
    }

    render(){

        // let rating = 0;
        // let starName = '0';

        // if (this.props.prod.rating>0){
        //     rating = this.props.prod.rating
        //     //rating = parseInt(rating);
        //     if (rating > 4.9){
        //         starName = '5';
        //     }else if (rating>4.4 && rating<5){
        //       starName = '4_5';
        //     }else if (rating>3 && rating<4.3){
        //         starName = '4';
        //     }else if (rating>2 && rating<4){
        //       starName = '3';
        //     }else if (rating>1 && rating<3){
        //       starName = '2';
        //     }else if (rating>0 && rating<2){
        //       starName = '1';
        //     }else {
        //       starName = '0';
        //     }
        // }

        return(
            <section id="newProducts" class="rowTopMargin topmarginsec">
                <div class="container">
                    <div class="section-header">
                        <h2>You may also like</h2>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="newProductWrapper" id="NewProduct">
                                <ul class="productCarouselWrap newProductCarousel owl-carousel clearfix">
                                <InfiniteScroll
                                    dataLength={this.props.you_may_also_likes.length}
                                    // next={this.getMoreProducts}
                                    hasMore={false}>
                                    {this.props.you_may_also_likes.map((prod, index) => (
                                        //console.log(prod)
                                        <li>
                                            <div class="productItemList">
                                                <div class="productImageWrap">
                                                    <img src={prod.image[0].image_path}/>
                                                </div>
                                                {/* <img src="img/newTag.png" alt="New Tag" class="prodcutTag"/> */}
                                                <p class="productName"><strong>{prod.variation.name}</strong></p>
                                                <ul class="review"></ul>
                                                <p class="productPrice"><img src={require("../assets/img/inrCurrency_b.png")}/><strong>{prod.variation.price}</strong></p>
                                                <div class="productCartBtn">
                                                    <a onClick={this.props.addToCart.bind(this,
                                                            prod,
                                                            "no_nevigation")}>
                                                        <i class="fas fa-shopping-cart"></i> <span>Add to cart</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </InfiniteScroll>
                                    
                                </ul>
                            </div>
                        </div> 
                    </div>
                </div>
            </section>                       
        );

    }



}