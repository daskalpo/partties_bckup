import React, {Component} from 'react'
import {Api, Url, Helper, Global} from '../config';
import { Link, NavLink } from "react-router-dom";


export default class RecommendedSection extends React.Component{

    constructor(props){
        super(props)
        
    }

    onNavigate = (nav) => {
        console.log(nav);
        let path = "product-detail/"+nav
        this.props.onNavigate(path);
        window.location.reload();
    };


    render(){

        let rating = 0;
        let starName = '0';

        if (this.props.prod.rating>0){
            rating = this.props.prod.rating
            //rating = parseInt(rating);
            if (rating > 4.9){
                starName = '5';
            }else if (rating>4.4 && rating<5){
              starName = '4_5';
            }else if (rating>3 && rating<4.3){
                starName = '4';
            }else if (rating>2 && rating<4){
              starName = '3';
            }else if (rating>1 && rating<3){
              starName = '2';
            }else if (rating>0 && rating<2){
              starName = '1';
            }else {
              starName = '0';
            }
        }

        return(
            <Link onClick={this.onNavigate.bind(this, this.props.prod.slug)} to="#">
                <li style={{height:"200px", width:"250px"}}>
                    <div className="recmmndtn_sec" >
                        <div className="recommndtn_img">
                            <img src={this.props.prod.image[0].image_path}/>
                        </div>
                        
                        <div className="description">
                            <div className="recommndatn_tittle" >
                                {this.props.prod.name}
                            </div> 
                            <div className="recommndatn_price">
                                <span><img src={require("../assets/img/inrCurrency_b.png")}/></span>
                                {this.props.prod.variation.price}
                            </div>
                            
                            <div className="starWrap">
                            <img src={require("../assets/img/" + starName + "star.png")} alt="Star" className="ratingStar"/> 
                            <span>{this.props.prod.rating}</span> 
                            <span className="totalReviews">({this.props.prod.reviews_count.length} Reviews)</span>
                            </div>
                        </div>       
                            
                    </div>
                </li>
            </Link>
        );
    }
}