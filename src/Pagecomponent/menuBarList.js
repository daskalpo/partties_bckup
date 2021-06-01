import React, {Component} from 'react'
import {Api, Url, Helper, Global} from '../config';
import InfiniteScroll from "react-infinite-scroll-component";
import { SingleProduct, SingleProductMobile } from "../Pagecomponent";
//import ReactRoundedImage from "react-rounded-image";


class MenuBarList extends React.Component {
    constructor(props){
        super(props)
        this.state={
            hasChanged: false,
            menuList: [],
        }
    }

    componentDidMount =()=> {
        //https://dev.partties.com/api/public/index.php/api/v1/top-menus-list
        let api = Url.topMenu;
        Api.fetch_top_menus(api).then((res) => {
            let response = JSON.parse(res);
            let data = response.response;
            //console.log("MenusList", data.data[0]);
            if (data.status){
                this.setState({menuList: data.data});
                console.log("MenusList", this.state.menuList);
            }
            //   This is for you may like category

          });
    }

    onHandleEvent = (type) => {
        this.props.onHandleEvent(type);
    }
    
    render(){
        return(

            <div className="menu_icons menu_icons_home">
            <div className="row">
            <InfiniteScroll
                dataLength={this.state.menuList.length}
                // next={this.getMoreProducts}
                hasMore={false}>
                            <ul className="menu_ul home_menu_ul">
                            {this.state.menuList.map((prod, index) => (
                                // <SingleProductMobile
                                //     whom="list"
                                //     key={index}
                                //     productInDetails={prod}
                                //     history={this.props.history}
                                // />
                                <li><div className="menu_content" 
                                        //style={{marginLeft:"10px", marginRight:"10px", paddingLeft:"10px", paddingRight:"10px"}}
                                        onClick={this.onHandleEvent.bind(this, prod.attribuite.name)}>
                                        <img src={prod.image} className="widget_circular_image_menu"/>
                                        {/* <ReactRoundedImage image={prod.image}
                                            imageWidth="70"
                                            imageHeight="70"
                                            roundedColor="#ffffff"
                                            roundedSize="0"                                  
                                            borderRadius="10"
                                        /> */}
                                        <p>{prod.name}</p>
                                    </div>
                                </li>

                            ))}
                                {/* <li><div className="menu_content" onClick={this.onHandleEvent.bind(this, "Cakes")}>
                                        <img src={require("../assets/img/cake_icon.png")} />
                                        <p>Cakes</p>
                                    </div>
                                </li>
                            
                                <li>
                                    <div className="menu_content" onClick={this.onHandleEvent.bind(this, "Cookies")}>
                                        <img src={require("../assets/img/cookies_icon.png")} />
                                        <p>Cookies</p>
                                    </div>
                                </li>
                            
                                <li><div className="menu_content" onClick={this.onHandleEvent.bind(this, "Chocolates")}>
                                    <img src={require("../assets/img/chocolates.png")} />
                                        <p>Chocolates</p>
                                    </div>
                                </li>
                            
                                <li><div className="menu_content" onClick={this.onHandleEvent.bind(this, "Premium")}>
                                    <img src={require("../assets/img/premium_icon.png")} />
                                        <p>Premium</p>
                                    </div>
                                </li> */}
                            
                                {/* <li><div class="menu_content" onClick={this.onHandleEvent.bind(this, "For Him")}>
                                    <img src={require("../assets/img/demo.png")} />
                                        <p>For Him</p>
                                    </div>
                                </li>
                            
                                <li><div class="menu_content" onClick={this.onHandleEvent.bind(this, "For Her")}>
                                    <img src={require("../assets/img/demo.png")} />
                                        <p>For Her</p>
                                    </div>
                                </li> */}
                            
                                {/* <li><div className="menu_content" onClick={this.onHandleEvent.bind(this, "Valentine")}>
                                    <img src={require("../assets/img/valentine_icon.png")} />
                                        <p>Valentines</p>
                                    </div>
                                </li>
                            
                                <li><div className="menu_content" onClick={this.onHandleEvent.bind(this, "Holi")}>
                                    <img src={require("../assets/img/holi_icon.png")} />
                                        <p>Holi</p>
                                    </div>
                                </li>
                                <li><div className="menu_content" onClick={this.onHandleEvent.bind(this, "New Arrivals")}>
                                    <img src={require("../assets/img/newarrivals_icon.png")} />
                                        <p>New Arrivals</p>
                                    </div>
                                </li>
                                <li><div className="menu_content" onClick={this.onHandleEvent.bind(this, "Flowers")}>
                                    <img src={require("../assets/img/flowers.png")} />
                                        <p>Flowers</p>
                                    </div>
                                </li> */}


                                {/* <li><div class="menu_content" onClick={this.onHandleEvent.bind(this, "Combos")}>
                                    <img src={require("../assets/img/demo.png")} />
                                        <p>Combos</p>
                                    </div>
                                </li> */}


                                {/* <li><div className="menu_content" onClick={this.onHandleEvent.bind(this, "Customized")}>
                                    <img src={require("../assets/img/cookies_icon.png")} />
                                        <p>Customized</p>
                                    </div>
                                </li>
                                <li><div className="menu_content" onClick={this.onHandleEvent.bind(this, "Deals")}>
                                    <img src={require("../assets/img/deals-special-offers.png")} />
                                        <p>Deals</p>
                                    </div>
                                </li>
                                <li><div className="menu_content" onClick={this.onHandleEvent.bind(this, "Trending")}>
                                    <img src={require("../assets/img/trending.png")} />
                                        <p>Trending</p>
                                    </div>
                                </li>
                                <li><div className="menu_content" onClick={this.onHandleEvent.bind(this, "Kids")}>
                                    <img src={require("../assets/img/kids.png")} />
                                        <p>Kids</p>
                                    </div>
                                </li>
                                <li><div className="menu_content" onClick={this.onHandleEvent.bind(this, "Birthdays")}>
                                    <img src={require("../assets/img/happy_birthdayicon.png")} />
                                        <p>Birthdays</p>
                                    </div>
                                </li>
                                <li><div className="menu_content" onClick={this.onHandleEvent.bind(this, "Anniversaries")}>
                                        <img src={require("../assets/img/anni_icon.png")} />
                                        <p>Anniversaries</p>
                                    </div>
                                </li> */}
                            </ul>
            </InfiniteScroll>

            </div>
            </div>
        
        )
    }
}

export default MenuBarList