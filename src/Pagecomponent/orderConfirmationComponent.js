import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {Helper, Url, Global, Api} from '../config';

class OrderConfirmationComponent extends React.Component {

    nevigate = (nav) => {
        Helper.clear_global_search_values_onNavigation();
        this
            .props
            .history
            .push('/' + nav)

    }

    render() {

        return (

            <React.Fragment>
                <section id="productListWrapper" className="rowTopMargin">
                    <div className="container">
                        <div className="row">

                            <div className="col-md-12">
                                <div className="mycart_details">
                                    <div className="mycart_header ">
                                        <div className="congratlatn_ordrconfrm">

                                            <div className="congratulations_confrm">
                                                {this.props.status == "success" && <img src={require("../assets/img/tick.png")}/>}
                                                {this.props.status == "failed" && <img src={require("../assets/img/payment_cross.png")}/>}
                                                {this.props.status == "pending" && <img src={require("../assets/img/payment_pending.png")}/>}
                                            </div>
                                            {this.props.status == "pending" && <p className="congratulation">Payment Pending</p>}
                                            {this.props.status == "success" && <p className="congratulation">Congratulations!</p>}
                                            {this.props.status == "failed" && <p className="congratulation">Payment Failed!</p>}
                                        </div>
                                    </div>
                                    <div className="amt_details_cart padding_crt_sec order_onfrmdetls">
                                        {this.props.status == "success" && <p className="ordr_confrmtn_txt">This is to confirm the receipt of payment for ORDER ID: #{this.props.order_id}{" "}
                                            for the<br></br>following :</p>}
                                        <div className="mycart_prc_sectn">
                                            <span className="prce_txt_crt">Price ({this.props.order_confirmation_total_item}{" "}items)</span>
                                            <span className="prce_txt_crt prce_amt_crt">Rs {this.props.order_confirmation_total_amount}</span>
                                        </div>
                                        <div className="delivry_sectn_cart ordr_confrm_delivry">
                                            <span className="prce_txt_crt">Delivery Fee</span>
                                            <span className="prce_amt_crt greenfreesectn">Free</span>
                                        </div>
                                        <div className="delivry_sectn_cart totlamt_sectn_mycart">
                                            <span className="prce_txt_crt bold_txt_cart">Total Amount</span>
                                            <span className="prce_amt_crt bold_txt_cart">Rs {this.props.order_confirmation_total_amount}</span>
                                            {/* <div className="order_confrm_delvrytme">
                                                <span className="prce_txt_crt bold_txt_cart">Delivery Time</span>
                                                <span className="prce_amt_crt bold_txt_cart">5th Feb, 2020</span>
                                            </div> */}
                                        </div>

                                        {this.props.status == "success" && <p className="ordr_confrmtn_txt marginoff_ordrconfrm order_confirm_padding">We will be sending notification via emails and sms to keep you update on<br></br>
                                            your order status</p>}

                                        {this.props.status == "success" && <Link
                                            onClick={this
                                            .nevigate
                                            .bind(this, "Home")}
                                            to="#">
                                            <div className="place_ordr_btn done_ordrconfrm">Done</div>
                                        </Link>}
                                    </div>

                                    {this.props.status == "failed" && <div className="amt_details_cart padding_crt_sec order_onfrmdetls">
                                        <Link
                                            onClick={this
                                            .nevigate
                                            .bind(this, "payment")}
                                            to="#">
                                            <div className="place_ordr_btn done_ordrconfrm">Pay Again</div>
                                        </Link>
                                    </div>}

                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </React.Fragment>
        );
    }
}
export default OrderConfirmationComponent
