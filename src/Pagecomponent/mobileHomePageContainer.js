import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {Api, Url, Helper, Global} from '../config';
import { widget_list } from '../config/url';
import Carousel from 'react-bootstrap/Carousel';


class MobileHomePageContainer extends React.Component{

    constructor(props){
        super(props)
        this.state={
            hasChanged: false
        }
    }

    componentDidMount = () => {
        console.log("Mobile-> "+this.props.home_widget_list);   
    }

    nevigation = (nav) => {
        if(nav == "product-list"){
            //this.setState({cake_tab:true});
            this
            .props
            .history
            .push('/cart');
            
        }

    }

    onHandleEvent = (type) => {
        //alert(`type is: ${type}`)
        console.log(`type is: ${type}`)
        //this.props.onClickEvent(type)
        if(type!=null){
            console.log(`type is: ${type}`)
            Global.header_search_text_val = ""
            Global.search_values_obj.type =type;
            //Global.header_search_text_val = "Birthday Cake";
            // console.log(this.props)
            this
            .props
            .history
            .push('/product-list');
        }
    }

    onSearchProductEvent = (type) => {
        Global.search_values_obj.type = ""
        Global.header_search_text_val = type
        this
            .props
            .history
            .push('/product-list');

            // this.props.history.push(
            //     "/product-detail/" + this.props.productInDetails.slug + ""
            // );

    }


    navigateToProductDetails = (product_slug) => {
        this.props.history.push(
            "/product-detail/"+product_slug+""
        );
    }


    render(){

        // var widget_list = this.props.home_widget_list.map((item, index)=> {
        //     console.log(item);  
        // })
        

        return (

            <main id="main">
            <div class="container">
            
                <div class="row">   
                    <div class="col-sm-12">
                        <div className="mobilebannerSearchWrapper mobilebannerSearchWrapper_mob">
                    
                            <div className="mobilebannerInner">
                                <Carousel autoPlay={true} pause={false} interval={3000} indicators={false} >
                                {this.props.mobile_banner_list.map((item, index)=> {
                                    console.log("Banner Item:",item)
                                    return(
                                        <Carousel.Item key={index} onClick={this.onHandleEvent.bind(this, item.attribuite.name)}>
                                            <img
                                                className="d-block w-100 bannerWidget"
                                                src={item.image}/>
                                        </Carousel.Item>
                                    )
                                })}
                            </Carousel>
                            </div>
                        
                        </div>
                    </div>
                </div>
            
            <div className="mobileHomePage">
            <div className="content_Homepage">

            <div className="mobile_homemaincontent">
            {this.props.home_widget_list.map((item, index)=> {
                //alert(item.name)
                return (
                <div >
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="tille">
                                <p>{item.name}</p>
                            </div>
                        </div>
                    

                        <div className="col-sm-12 mobileHomeHorizontalPadding">
                            <div id="carouselExampleIndicators" className="title_carousel carousel slide" data-ride="carousel">
                                <div className="carousel-inner">
                                <Carousel autoPlay={true} pause={false} interval={3000} >
                                    {item.sliderboxs.map((boxes, index)=> {
                                        return(
                                        // <div className="carousel-item active">
                                        //     <a onClick={this.onHandleEvent.bind(this, boxes.attribuite.name)}>
                                        //         <img src={boxes.image} />
                                        //     </a>
                                        // </div>
                                            <Carousel.Item key={index} onClick={this.onHandleEvent.bind(this, boxes.attribuite.name)}>
                                                <img
                                                    className="d-block w-100 bannerWidget"
                                                    src={boxes.image}/>
                                            </Carousel.Item>
                                        )
                                    })
                                    }
                                </Carousel>
                                </div>
                            </div>
                        </div>

                    </div>


                    {/* </div><div className="row productListInner productListInner_mob"> */}
                    <div className="row productListInner productListInner_mob homepage_row">
                        
                    {item.attrboxs.map((boxes, index)=> {
                        if(index == 0){
                            return(
                            <div className="col-md-3 col-sm-6 mobview_content homeview_content">
                                <Link className="color_chng" >
                                    <div className="productItemList productmob_view home_productlist"
                                        onClick={this.onHandleEvent.bind(this, boxes.attribuite.name)}>
                                        <div className="productImageWrap productImageWrap_mob home_productImageWrap_mob"> 
                                            <img src={boxes.image} alt="Cake"/> 
                                        </div>
                                        
                                        <div className="productListInnerContentWrap productListInnerContentWrap_mob home_listing_sec">
                                            <p className="productName productName_mob productName_mob_home"><strong>{boxes.name}</strong></p>
                                            
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            )
                        }else if (index == 1){
                            return(
                            <div className="col-md-3 col-sm-6 mobview_content homeview_content">
                                <Link className="color_chng">
                                    <div className="productItemList productmob_view home_productlist" onClick={this.onHandleEvent.bind(this, boxes.attribuite.name)}>
                                        <div className="productImageWrap productImageWrap_mob home_productImageWrap_mob">
                                            <img src={boxes.image} alt="Cake"/> 
                                        </div>
                                        
                                        <div className="productListInnerContentWrap productListInnerContentWrap_mob home_listing_sec">
                                            <p className="productName productName_mob productName_mob_home"><strong>{boxes.name}</strong></p>
                                            
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            )
                        }else if (index == 2){
                            return(
                            <div className="col-md-3 col-sm-6 mobview_content homeview_content marginHomelist">
                                <Link className="color_chng" >
                                    <div class="productItemList productmob_view home_productlist" onClick={this.onHandleEvent.bind(this, boxes.attribuite.name)}>
                                        <div className="productImageWrap productImageWrap_mob home_productImageWrap_mob">
                                            <img src={boxes.image} alt="Cake"/> 
                                        </div>
                                        
                                        <div className="productListInnerContentWrap productListInnerContentWrap_mob home_listing_sec">
                                            <p className="productName productName_mob productName_mob_home"><strong>{boxes.name}</strong></p>
                                            
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            )
                        }else if (index == 3){
                            return(
                            <div className="col-md-3 col-sm-6 mobview_content homeview_content marginHomelist">
                                <Link className="color_chng" >
                                    <div className="productItemList productmob_view home_productlist" onClick={this.onHandleEvent.bind(this, boxes.attribuite.name)}>
                                        <div className="productImageWrap productImageWrap_mob home_productImageWrap_mob">
                                            <img src={boxes.image} alt="Cake"/> 
                                        </div>
                                        
                                        <div className="productListInnerContentWrap productListInnerContentWrap_mob home_listing_sec">
                                            <p className="productName productName_mob
                                                    productName_mob_home"><strong>{boxes.name}</strong></p>
                                            
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            )
                        }
                    })
                    }    

                    </div>

                    {item.proboxs.length>0 && 
                    <div className="row mobileHomeHorizontalPadding">

                    <div className="col-sm-12">
                        <div className="heading_bestsellr">
                                <h4>New Arrivals</h4>
                        </div>
                    </div>

                        {item.proboxs.map((boxes, index)=> {
                            if(index == 0){
                                return(
                                    <div className="col-sm-12 bg_bestseller">
                                        
                                        <div className="content_bestseller">
                                            <Link>
                                                <div className="bestseller_content"  onClick={this.navigateToProductDetails.bind(this, boxes.product.slug)}>
                                                    <img src={boxes.image}/> 
                                                    <p>{boxes.name}</p>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            }else if (index == 1){
                                return(
                                    <div className="col-sm-12 bg_bestseller margin_bg_bestseller">
                                    
                                        <div className="content_bestseller">
                                            <Link>
                                                <div className="bestseller_content" onClick={this.navigateToProductDetails.bind(this, boxes.product.slug)}>
                                                <img src={boxes.image}/> 
                                                    <p>{boxes.name}</p>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            }else if (index == 2){
                                return(
                                    <div className="col-sm-12 bg_bestseller margin_bg_bestseller">
                                        <div className="content_bestseller">
                                            <Link>
                                                <div className="bestseller_content" onClick={this.navigateToProductDetails.bind(this, boxes.product.slug)}>
                                                    <img src={boxes.image}/> 
                                                    <p>{boxes.name}</p>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            }else if (index == 3){
                                return(
                                    <div className="col-sm-12 bg_bestseller margin_bg_bestseller">
                                        <div className="content_bestseller">
                                            <Link>
                                                <div className="bestseller_content" onClick={this.navigateToProductDetails.bind(this, boxes.product.slug)}>
                                                <img src={boxes.image}/> 
                                                    <p>{boxes.name}</p>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            }
                        })
                        }

                    </div>
                    }

                    
                   
                    


                    </div>
                    )
                })
            }
                    <div className="row">
                        {/* <div className="col-md-12 demo_txt_section">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div> */}
                    
                        <div className="col-md-12">
                            <p className="abt_tittle">ABOUT US</p>
                            <p className="abt_txt_sectn">In the visibly customer-centric world, we aim to create the moments of your life unique and
                                unforgettable with our innovative platform. Partties.com aims to offer a unique e-commerce
                                app in which you can find solutions to all your needs required for your celebrations. We help
                                our customers to plan the special events like birthdays, anniversaries etc. We provide the best
                                customer service and excellent product quality unmatched in the industry. You can order
                                birthday cake, chocolate cake, pineapple cake, kids cake, anniversary cakes, customized cakes,
                                designer cakes and many other trending cakes from us. We also provide customized cakes for
                                corporate and social events. Be it your regular party or celebration for valentine’s day, baby
                                shower, holi, Diwali, new year Christmas and all other occasions you can rely on us for providing
                                the best-in-class products.</p>
                        </div>

                        <div className="col-md-12">
                            <p className="abt_tittle">Delivery</p>
                            <p className="abt_txt_sectn">We, at Partties.com are always there so that you can keep all your worries related to
                                celebrations at rest. With our intricate delivery planning system, we aim to deliver you 100%
                                fresh cakes, flowers and attractive gifts at your doorstep with complete ease and care.
                                We know that the way through your heart goes through our deliveries. Knowing that,
                                Partties.com treats its delivery services as its backbone. And honoring your time commitments,
                                we ensure that our deliveries are fast, safe and secure so that your order reaches to your
                                doorstep on time. We understand how eagerly you wait for your order to reach your home.
                                Knowing that we have kept our deliveries trackable so that you can track your order and know
                                its delivery status. Also, you can make your loved one feel special with our midnight delivery
                                system.</p>
                        </div>
                    </div>
            </div>
            </div>
            </div>

            </div>
            </main>
        )
    }
}

export default MobileHomePageContainer