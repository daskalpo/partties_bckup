import React from 'react';
import {HomeCorouselProduct} from '../Pagecomponent';
import {Api, Url, Helper} from '../config';
import { Link } from 'react-router-dom';

class HomeComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            giftImages: [
                'offerAdItem1.png', 'offerAdItem2.png', 'offerAdItem3.png'
            ]
         
        };
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);
        console.log("->>>"+this.props.home_widget_list);
    }


    navigate = (nav) => {
        this
            .props
            .history
            .push('/' + nav);
    }

    render() {

        var giftCard = this
            .state
            .giftImages
            .map(function (img) {
                return <li key={img}>
                    <a >
                        <img key={img} src={require("../assets/img/" + img)} alt="Ad"/>
                    </a>
                </li>;
            })

        return (
            <React.Fragment>

                            <div className="offerSections">
                            <div className="topCategoryWrapper mobileHomeCategory">
                                <ul className="categoryWrap">
                                    <li 
                                        onClick={this
                                            .navigate
                                            .bind(this, "product-list")}>
                                        <a className="cateogryItem" >
                                        <img src={require("../assets/img/cakeIcon.png")} className="cake Icon"/>
                                        <span>Cake</span></a><span>Cake</span>
                                    </li>
                                    {/* <li><a href="#" className="cateogryItem">
                                        <img src={require("../assets/img/giftIcon.png")} className="cake Icon"/> 
                                        <span>Gifts</span></a> <span>Gifts</span>
                                    </li> */}
                                    {/* <li><a href="#" className="cateogryItem">
                                        <img src={require("../assets/img/partyIcon.png")} className="cake Icon"/> 
                                         <span>Party Items</span></a><span>Party Items</span>
                                    </li> */}
                                    
                                    <li onClick={this
                                            .navigate
                                            .bind(this, "party-enquiry")}><a  className="cateogryItem">
                                        <img src={require("../assets/img/enquiryIcon.png")} className="cake Icon"/> 
                                        <span>Enquiry</span></a><span>Enquiry</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="topOfferWrapper rowTopMargin">
                                <div className="container">
                                    <ul className="offerListWrap clearfix">
                                        <li><a href="#"><img src={require("../assets/img/offerAdItem1.png")} alt="Ad"/></a></li>
                                        <li><a href="#"><img src={require("../assets/img/offerAdItem2.png")} alt="Ad"/></a></li>
                                        <li><a href="#"><img src={require("../assets/img/offerAdItem3.png")} alt="Ad"/></a></li>
                                    </ul>
                                </div>
                            </div>
                            

                            {this.props.home_product_list && <HomeCorouselProduct
                                title="New Products"
                                nav={"product-detail"}
                                val={this.props.home_product_list}
                                history={this.props.history}/>}
                            
                            
                            
                            </div>


                {/* <div className="topOfferWrapper rowTopMargin">
                    <div className="container">
                        <ul className="offerListWrap clearfix">
                            {giftCard}
                        </ul>
                    </div>
                </div>

                {this.props.home_product_list && <HomeCorouselProduct
                    title="New Products"
                    nav={"product-detail"}
                    val={this.props.home_product_list}
                    history={this.props.history}/>} */}

                 {/* {this.props.home_gift_list && <HomeCorouselProduct
                    title="Top GIfts"
                    nav={"gift-detail"}
                    val={this.props.home_gift_list}
                    history={this.props.history}/>} */}

            </React.Fragment>
        );
    }
}
export default HomeComponent
