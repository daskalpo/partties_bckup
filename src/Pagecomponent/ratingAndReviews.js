import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import {Api, Url, Helper} from '../config';

class RatingAndReviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            star: [true, true, true, true, true]
        }

    }

    __change_clicked_star = (star_val) => {
        this.setState({
            clicked_star: star_val + 1
        })
    }

    write_review = () => {
        let user = window
            .localStorage
            .getItem("LOGGEDUSER");
        if (user == '' || user === null || user === undefined) {
            document
                .getElementById("loginss")
                .click();
        } else {
            document
                .getElementById("write_review_button")
                .click();
        }
    }
    render() {
        const divStyle = {
            clear: "both"
        };

        let review=0;
        let rating=0;

        if(this.props.completeProdDetails.reviews_count[0] !== undefined){
             review = this.props.completeProdDetails.reviews_count[0].aggregate;
             rating = this.props.completeProdDetails.reviews_count[0].ratingsum / review;
        }


       
        rating = parseInt(rating);

        var star = this
            .state
            .star
            .map(function (star, index) {
                if (index < rating) {
                    return <span key={index} className="fa fa-star checked"></span>
                } else {
                    return <span key={index} className="fa fa-star"></span>
                }
            });

        return (

            <React.Fragment>
                <div className="reviewWrap">
                    <div className="totalRatingWrap">
                        <button
                            className="hidden"
                            id="write_review_button"
                            data-toggle="modal"
                            data-target="#writeReview"/>
                        <Link
                            to="#"
                            onClick={this
                            .write_review
                            .bind(this)}
                            className="place_ordr_btn writeReviewBtn">Write a review</Link>
                            {/* <span className="heading">User Rating</span>
                            {star}
                            <p>{rating}.0{" "}
                                average based on {review}{" "}
                                reviews.</p>
                            <hr className="rating_Style"></hr> */}
                    </div>
                    <div className="reviewListWrap">
                        {/* <div className="reviews">
                            <h2>Reviews</h2>
                        </div> */}
                        {this
                            .props
                            .completeProdDetails
                            .reviews
                            .map((rev, index) => (

                                <div key={index} className="comment-part">
                                    <div className="user-img-part">
                                        <div className="user-img">
                                            <img src={require("../assets/img/review_user.png")}/>
                                        </div>
                                        <div className="user-text">
                                            <p>{rev.user.name}</p>
                                        </div>
                                        <div style={divStyle}></div>
                                    </div>
                                    <div className="comment">
                                        <div className="comment_rating">
                                            <img
                                                src={require("../assets/img/" + rev.rating + "star.png")}
                                                alt="Star"
                                                className="ratingStar"></img>

                                            <span>{Helper.get_review_date(rev.created_at)}{" "}
                                            </span>
                                        </div>
                                        <p>{rev.description}</p>
                                    </div>
                                    <div style={divStyle}></div>
                                </div>

                            ))}

                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default RatingAndReviews
