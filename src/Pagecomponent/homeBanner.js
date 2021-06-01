import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

class HomeBanner extends React.Component {

    render() {
        return (

            <section id="bannerWrapper">
                <div className="bannerWrapperInner  wow fadeIn">
                    <div className="bannerSlide">

                        <Carousel autoPlay={true} pause={false} interval={10000} indicators={false} >
                            {this.props.web_banner_list.map((item, index)=> {
                                return(
                                <Carousel.Item >
                                    <Carousel.Caption>
                                        <div className="bannerTextwrap">
                                            <p>{item.banner_offer_title}</p>
                                            <h2>{item.name}</h2>
                                            <span>{item.banner_details}</span>
                                            <a href="#">Shop Now</a>
                                        </div>
                                    </Carousel.Caption>
                                    
                                    <div className="bannerImageWrap" 
                                        style={{float:"right"}}
                                    >
                                        <img
                                            className="banImage bannerImage d-block w-100"
                                            src={item.image}
                                            alt="Cake"
                                            //style={{height:'100%', maxWidth:"100%", maxHeight:"100%"}}
                                            style={{float:'right'}}
                                            ></img>
                                    </div>
                                </Carousel.Item>
                                )
                            })}
                            {/* <Carousel.Item >
                                <div className="bannerTextwrap">
                                    <p>Flat 30% Off</p>
                                    <h2>Designer Cake</h2>
                                    <span>Lorem ipsum dolor sit amet, consetetur sadipscing<br></br>elitr, sed diam nonumy eirmod tempor</span>
                                    <a href="#">Shop Now</a>
                                </div>
                                <div className="bannerImageWrap">
                                    <img
                                        className="banImage bannerImage"
                                        src={require("../assets/img/cakeBanner.png")}
                                        alt="Cake"></img>
                                </div>
                            </Carousel.Item>

                            <Carousel.Item >
                                <div className="bannerTextwrap">
                                    <p>Flat 30% Off</p>
                                    <h2>Designer Cake</h2>
                                    <span>Lorem ipsum dolor sit amet, consetetur sadipscing<br></br>elitr, sed diam nonumy eirmod tempor</span>
                                    <a href="#">Shop Now</a>
                                </div>
                                <div className="bannerImageWrap">
                                    <img
                                        className="banImage bannerImage"
                                        src={require("../assets/img/cakeBanner.png")}
                                        alt="Cake"></img>
                                </div>
                            </Carousel.Item> */}
                            
                        </Carousel>
                    </div>
                </div>

            </section>
        );
    }
}
export default HomeBanner
