import React, {Component} from 'react';
import {
    WebViewBanner,
    LoginSignUpModal,

} from '.'
import {Helper, Url, Global, Api} from '../config';


class  WebHomePageContainer extends React.Component{
    
    componentDidMount = () => {
        Helper.loadScript();
        //this.assign_global_values_to_Search_field();
    }

    render(){
        return (
            <div className="web_sectionHomePage">
                <div className="appFeaturesSlideWrapper">
                    <div className="appFeaturesSlideInner">
                        <div className="appFeatureSlider owl-carousel owl-theme">
                            <div className="appFeatureSlideItem"><a href="#"><img src={require("../assets/img/topDealsSlide1.png")}  alt="Image"/></a></div>
                            <div className="appFeatureSlideItem"><a href="#"><img src={require("../assets/img/deliverdTodaySlide2.png")}  alt="Image"/></a></div>
                            <div className="appFeatureSlideItem"><a href="#"><img src={require("../assets/img/designerCakeSlide3.png")}  alt="Image"/></a></div>
                        </div>
                    </div>
                </div>

                <LoginSignUpModal/>


                <WebViewBanner/>
                    <div className="topOfferWrapper rowTopMargin">
                        <div className="container">
                            <ul className="offerListWrap clearfix">
                                <li><a href="#"><img src={require("../assets/img/offerAdItem1.png")}  alt="Ad"/></a></li>
                                <li><a href="#"><img src={require("../assets/img/offerAdItem2.png")}  alt="Ad"/></a></li>
                                <li><a href="#"><img src={require("../assets/img/offerAdItem3.png")}  alt="Ad"/></a></li>
                            </ul>
                        </div>
                    </div>

                    <section id="newProducts" className="rowTopMargin">
                        <div className="container">
                            <div className="section-header">
                                <h2>New Products</h2>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="newProductWrapper" id="NewProduct">
                                        <ul className="productCarouselWrap newProductCarousel owl-carousel clearfix">
                                            <li>
                                                <div className="productItemList">
                                                    <div className="productImageWrap">
                                                        <img src={require("../assets/img/cake1.png")}  alt="Cake"/>
                                                    </div>
                                                    <img src={require("../assets/img/newTag.png")}  alt="New Tag" className="prodcutTag"/>
                                                    <p className="productName"><strong>Designer Cake</strong></p>
                                                    <p className="productPrice"><img src={require("../assets/img/inrCurrency.png")}  alt="INR"/><strong>350</strong></p>
                                                    <div className="productCartBtn">
                                                        <a href="#">
                                                            <i className="fas fa-shopping-cart"></i> <span>Add to cart</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                            
                                            <li>
                                                <div className="productItemList">
                                                    <div className="productImageWrap">
                                                        <img src={require("../assets/img/cake1.png")}  alt="Cake"/>
                                                    </div>
                                                    <img src={require("../assets/img/newTag.png")}  alt="New Tag" className="prodcutTag"/>
                                                    <p className="productName"><strong>Designer Cake</strong></p>
                                                    <p className="productPrice"><img src={require("../assets/img/inrCurrency.png")}  alt="INR"/><strong>350</strong></p>
                                                    <div className="productCartBtn">
                                                        <a href="#">
                                                            <i className="fas fa-shopping-cart"></i> <span>Add to cart</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="productItemList">
                                                    <div className="productImageWrap">
                                                        <img src={require("../assets/img/cake1.png")}  alt="Cake"/>
                                                    </div>
                                                    <img src={require("../assets/img/newTag.png")}  alt="New Tag" className="prodcutTag"/>
                                                    <p className="productName"><strong>Designer Cake</strong></p>
                                                    <p className="productPrice"><img src={require("../assets/img/inrCurrency.png")}  alt="INR"/><strong>350</strong></p>
                                                    <div className="productCartBtn">
                                                        <a href="#">
                                                            <i className="fas fa-shopping-cart"></i> <span>Add to cart</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="topGift" className="rowTopMargin">
                        <div className="container">
                            <div className="section-header">
                                <h2>Top Gift Items</h2>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="newProductWrapper" id="NewProduct">
                                        <ul className="productCarouselWrap topGiftItemsCarousel owl-carousel clearfix">
                                            <li>
                                                <div className="productItemList">
                                                    <div className="productImageWrap">
                                                        <img src={require("../assets/img/giftImg1.png")}  alt="Cake"/>
                                                    </div>
                                                    <img src={require("../assets/img/newTag.png")}  alt="New Tag" className="prodcutTag"/>
                                                    <p className="productName"><strong>Designer Cake</strong></p>
                                                    <p className="productPrice"><img src={require("../assets/img/inrCurrency.png")}  alt="INR"/> <strong>350</strong></p>
                                                    <div className="productCartBtn">
                                                        <a href="#">
                                                            <i className="fas fa-shopping-cart"></i> <span>Add to cart</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                            
                                            
                                            <li>
                                                <div className="productItemList">
                                                    <div className="productImageWrap">
                                                        <img src={require("../assets/img/giftImg1.png")}  alt="Cake"/>
                                                    </div>
                                                    <img src={require("../assets/img/newTag.png")}  alt="New Tag" className="prodcutTag"/>
                                                    <p className="productName"><strong>Designer Cake</strong></p>
                                                    <p className="productPrice"><img src={require("../assets/img/inrCurrency.png")}  alt="INR"/> <strong>350</strong></p>
                                                    <div className="productCartBtn">
                                                        <a href="#">
                                                            <i className="fas fa-shopping-cart"></i> <span>Add to cart</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                            
                                            <li>
                                                <div className="productItemList">
                                                    <div className="productImageWrap">
                                                        <img src={require("../assets/img/giftImg1.png")}  alt="Cake"/>
                                                    </div>
                                                    <img src={require("../assets/img/newTag.png")}  alt="New Tag" className="prodcutTag"/>
                                                    <p className="productName"><strong>Designer Cake</strong></p>
                                                    <p className="productPrice"><img src={require("../assets/img/inrCurrency.png")}  alt="INR"/> <strong>350</strong></p>
                                                    <div className="productCartBtn">
                                                        <a href="#">
                                                            <i className="fas fa-shopping-cart"></i> <span>Add to cart</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="productItemList">
                                                    <div className="productImageWrap">
                                                        <img src={require("../assets/img/giftImg1.png")}  alt="Cake"/>
                                                    </div>
                                                    <img src={require("../assets/img/newTag.png")}  alt="New Tag" className="prodcutTag"/>
                                                    <p className="productName"><strong>Designer Cake</strong></p>
                                                    <p className="productPrice"><img src={require("../assets/img/inrCurrency.png")}  alt="INR"/> <strong>350</strong></p>
                                                    <div className="productCartBtn">
                                                        <a href="#">
                                                            <i className="fas fa-shopping-cart"></i> <span>Add to cart</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    <section id="subscribe" className="rowTopMargin">
                        <div className="container wow fadeInUp">
                            <div className="row">
                                <div className="col-md-8">
                                    <h2 className="subsTitle">Signup for Email<br/>Offers &amp; Updates</h2>
                                        <div className="subsFieldWrap">
                                            <form method="POST" action="#">
                                                <div className="subs-form-row">
                                                    <input type="text" className="form-control" placeholder="Enter your Email"/>
                                                    <button type="submit">Subscribe</button>
                                                </div>
                                            </form>
                                        </div>
                                </div>
                                <div className="col-md-4 tallNoWrap">
                                    {/* <img src={require("../assets/img/custServiceIcon.png")}  alt="Customer Service"/> */}
                                    {/* <p>Call Tollfree No: 1800987654</p> */}
                                </div>
                            </div>
                        </div>
                    </section>

            </div>

        )
    }
}

export default WebHomePageContainer