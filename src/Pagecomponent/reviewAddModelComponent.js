import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import {StarComponent} from '../Pagecomponent';
import {Api, Url, Helper} from '../config';

class ReviewAddModelComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_review_giving_star: [
                "Horrible", "Bad", "Average", "Good", "Excellent"
            ],
            clicked_star: 5,
            review_title: '',
            review_content: '',
            error_review_content: false,
            error_review_title: false

        }

    }

    __change_clicked_star = (star_val) => {
        this.setState({
            clicked_star: star_val + 1
        })
    }

    review_submit = () => {

        let review = {
            review_title: this.state.review_title,
            review_content: this.state.review_content
        };

        let errorObj = Helper.user_review_Validation(review);
        console.log(errorObj);
        this.setState({error_review_title: errorObj.review_title, error_review_content: errorObj.review_content});

        if (errorObj.continue) {

            document
                .querySelector('#review_close')
                .click();
            let dataObj = {
                "title": this.state.review_title,
                "description": this.state.review_content,
                "rating": this.state.clicked_star,
                "product_id": this.props.completeProdDetails.variations[0].product_id
            }

            let api = Url.customer_review;
            Api
                .add_customer_review(api, dataObj)
                .then(res => {
                    let data = JSON.parse(res);
                    console.log(data);
                    if (data.code == "200") {
                        this
                            .props
                            .get_product_slug_details();
                    }
                });
        }

    }

    review_title(e) {
        this.setState({review_title: e.target.value});
    }
    review_content(e) {
        this.setState({review_content: e.target.value});
    }

    clear_reviews_content = () => {
        this.setState({clicked_star: 5, review_title: '', review_content: '', error_review_title: false, error_review_content: false});

    }

    render() {

        return (

            <React.Fragment>
                <div className="modal fade" id="writeReview" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content loginSignupContentWrap backgroundcolor_wrap">
                            <div className="modal-header">
                                <button
                                    onClick={this
                                    .clear_reviews_content
                                    .bind(this)}
                                    type="button"
                                    id="review_close"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                                <h5 className="modal-title">Review Product</h5>
                            </div>
                            <div className="modal-body">

                                <div className="loginWrap defaultFormWrap defaultFormWrap_modify review_max">
                                    <div className="loginFormWrap">
                                        <div className="col-md-12 text-center">
                                            <span className="modify_customizesize">Rate the product</span>
                                            <div className="giveRatingWrap">

                                                {this
                                                    .state
                                                    .user_review_giving_star
                                                    .map((star, index) => (<StarComponent
                                                        key={index}
                                                        change_clicked_star={this
                                                        .__change_clicked_star
                                                        .bind(this)}
                                                        clicked_star={this.state.clicked_star}
                                                        checked={index}
                                                        star_text={star}/>))}

                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="fieldItem paymnt_add_addressfield">

                                                <input
                                                    type="text"
                                                    placeholder="Enter Title"
                                                    className={`formField addrssfield ${this.state.error_review_title
                                                    ? "errorval"
                                                    : ""}`}
                                                    onChange={this
                                                    .review_title
                                                    .bind(this)}
                                                    value={this.state.review_title}/> {this.state.error_review_title && <span className="errorText">
                                                    {this.state.error_review_title}
                                                </span>}
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="fieldItem modify_message_sectn review_martin_top1">
                                                <textarea
                                                    onChange={this
                                                    .review_content
                                                    .bind(this)}
                                                    value={this.state.review_content}
                                                    rows="4"
                                                    cols=""
                                                    placeholder="Write reviews..."
                                                    className={`formField addrssfield ${this.state.error_review_content
                                                    ? "errorval"
                                                    : ""}`}/> {this.state.error_review_content && <span className="errorText">
                                                    {this.state.error_review_content}
                                                </span>}
                                                <span className="characters_modify">Max 50 characters</span>
                                            </div>
                                        </div>

                                        <div
                                            onClick={this
                                            .review_submit
                                            .bind(this)}
                                            className="col-md-12">
                                            <div className="save_btn_modify">
                                                <Link to="#">Save</Link>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>

        );
    }
}
export default ReviewAddModelComponent
