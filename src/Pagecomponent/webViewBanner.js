import React, {Component} from 'react';
import {Helper, Url, Global, Api} from '../config';


class WebViewBanner extends React.Component{

    componentDidMount = () => {
        Helper.loadScript();
        //this.assign_global_values_to_Search_field();
    }

    render(){
        return (
            <section id="bannerWrapper">
                <div className="bannerWrapperInner wow fadeIn">
                    <div className="bannerSlide mainProductBanner owl-carousel">
                        <div className="bannerSlideInner">
                            <div className="bannerTextwrap">
                                <p>Flat 30% Off</p>
                                <h2>Designer Cake</h2>
                                <span>Lorem ipsum dolor sit amet, consetetur sadipscing<br/>elitr, sed diam nonumy eirmod tempor</span>
                                <a href="#">Shop Now</a>
                            </div>
                            <div className="bannerImageWrap"><img src={require("../assets/img/cakeBanner.png")}  alt="Cake"/></div>
                        </div>
                        <div className="bannerSlideInner">
                            <div className="bannerTextwrap">
                                <p>Flat 30% Off</p>
                                <h2>Designer Cake</h2>
                                <span>Lorem ipsum dolor sit amet, consetetur sadipscing<br/>elitr, sed diam nonumy eirmod tempor</span>
                                <a href="#">Shop Now</a>
                            </div>
                            <div className="bannerImageWrap"><img src={require("../assets/img/cakeBanner.png")}  alt="Cake"/></div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default WebViewBanner