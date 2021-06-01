import React, { Component } from 'react'


export class ProductList extends React.Component{


    render(){
        return(
            <section id="productListWrapper" class="rowTopMargin">
                <div className="container mob_view">
                    <div className="row productListInner productListInner_mob">
                        <div className="col-md-3 col-sm-6 mobview_content">
                            <div className="productItemList productmob_view">

                                <div className="productImageWrap productImageWrap_mob">
                                    <img src={require("../assets/img/cake_new.png")} alt="Cake"/>
                                </div>
                                    <img src={require("../assets/img/newTag.png")} alt="New Tag" class="prodcutTag"/>
                                <div className="productListInnerContentWrap productListInnerContentWrap_mob">
                                    <p class="productName productName_mob"><strong>Designer Cake this is test name</strong></p>
                                    <p class="sametxt_mob">Same-Day Delivery: <span class="mob_status">Eligible</span></p>
                                <div className="starWrap"> 
                                    <img src={require("../assets/img/ratings-star.png")} alt="Star" class="ratingStar" /> <span>4.0</span>
                                    <span class="totalReviews">(325 Reviews)</span>
                                </div>
                                    <p class="productPrice productPrice_mob">
                                    <img src={require("../assets/img/inrCurrency_b.png")} alt="INR" class="rupss_img"/> 350
                                    <a href="#" class="wishlistIcon wishlistIcon_mob"><i class="far fa-heart"></i> <i class="fas fa-heart"></i></a>
                                    </p>
                                        
                                </div>
                        
                                <div className="productImageWrap productImageWrap_mob">
                                    <img src={require("../assets/img/cake_new.png")} alt="Cake"/>
                                </div>
                                    <img src={require("../assets/img/newTag.png")} alt="New Tag" class="prodcutTag"/>
                                <div className="productListInnerContentWrap productListInnerContentWrap_mob">
                                    <p class="productName productName_mob"><strong>Designer Cake this is test name</strong></p>
                                    <p class="sametxt_mob">Same-Day Delivery: <span class="mob_status">Eligible</span></p>
                                <div className="starWrap"> 
                                    <img src={require("../assets/img/ratings-star.png")} alt="Star" class="ratingStar" /> <span>4.0</span>
                                    <span class="totalReviews">(325 Reviews)</span>
                                </div>
                                    <p class="productPrice productPrice_mob">
                                    <img src={require("../assets/img/inrCurrency_b.png")} alt="INR" class="rupss_img"/> 350
                                    <a href="#" class="wishlistIcon wishlistIcon_mob"><i class="far fa-heart"></i> <i class="fas fa-heart"></i></a>
                                    </p>
                                        
                                </div>

                            </div>    
                        
                        </div>    
                    </div>
                </div>        

            
                        {/* <!--Web view--> */}
            
                <div className="container web_view">
                    <div className="row productListInner">
                        
                        <div className="col-md-3 col-sm-6">
                            <div className="productItemList">
                                <div className="productImageWrap">
                                    <img src={require("../assets/img/cake1.png")} alt="Cake"/>
                                </div>
                                    <img src={require("../assets/img/newTag.png")} alt="New Tag" class="prodcutTag"/>
                                    <div className="productListInnerContentWrap">
                                        <p class="productName"><strong>Designer Cake this is test name</strong></p>
                                        <div className="starWrap">
                                        <img src={require("../assets/img/ratings-star.png")} alt="Star" class="ratingStar"/> <span>4.0</span>
                                            <span class="totalReviews">(325 Reviews)</span>
                                        </div>
                                        <p class="productPrice"><img src={require("../assets/img/inrCurrency.png")} alt="INR"/> 350
                                            <a href="#" class="wishlistIcon"><i class="far fa-heart"></i> <i class="fas fa-heart"></i></a>
                                        </p>
                                    
                                    </div>
                                <div className="productCartBtn">
                                    <a href="#">
                                        <i class="fas fa-shopping-cart"></i> <span>Add to cart</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 col-sm-6">
                            <div className="productItemList">
                                <div className="productImageWrap">
                                    <img src={require("../assets/img/cake1.png")} alt="Cake"/>
                                </div>
                                    <img src={require("../assets/img/newTag.png")} alt="New Tag" class="prodcutTag"/>
                                    <div className="productListInnerContentWrap">
                                        <p class="productName"><strong>Designer Cake this is test name</strong></p>
                                        <div className="starWrap">
                                        <img src={require("../assets/img/ratings-star.png")} alt="Star" class="ratingStar"/> <span>4.0</span>
                                            <span class="totalReviews">(325 Reviews)</span>
                                        </div>
                                        <p class="productPrice"><img src={require("../assets/img/inrCurrency.png")} alt="INR"/> 350
                                            <a href="#" class="wishlistIcon"><i class="far fa-heart"></i> <i class="fas fa-heart"></i></a>
                                        </p>
                                    
                                    </div>
                                <div className="productCartBtn">
                                    <a href="#">
                                        <i class="fas fa-shopping-cart"></i> <span>Add to cart</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                    
            </section>

        )
    }

}