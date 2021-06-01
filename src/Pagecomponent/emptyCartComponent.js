import React from 'react';
import {Link, NavLink} from 'react-router-dom';

class EmptyCartComponent extends React.Component {

    history_go_back = () => {
        window
            .history
            .go(-1);
    }
    render() {

        return (
            <React.Fragment>

                <React.Fragment key={"---------MOBILE_HEADER---------"}>
                    <header id="header_mobile">
                        <Link
                            to="#"
                            onClick={this
                            .history_go_back
                            .bind(this)}>
                            <img src={"../assets/img/arrow_left.png"} className="arr_header"/>
                        </Link>
                        <div className="header_txt_mble">
                            <p>{this.props.emptyTitle}</p>
                        </div>

                    </header>
                </React.Fragment>
                <React.Fragment>

                    <section id="productListWrapper" className="rowTopMargin">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="empty_produnt_bar_marginTop">
                                    <div className="mycart_details ">
                                        <div className="mycart_header">
                                            <div className="col-md-12">
                                                <p>{this.props.emptyTitle}</p>
                                            </div>
                                        </div>
                                        <div className="emptycart_detls">
                                            <div className="emptycart_img">
                                                <img src={require("../assets/img/" + this.props.emptyImage)}/>
                                            </div>
                                            <p className="cartempty_txt">{this.props.emptyContent}</p>
                                            <p className="start_ordering">{this.props.emptyText}</p>
                                        </div>
                                    </div>
                                    </div>
                                    
                                </div>

                            </div>
                        </div>
                    </section>

                </React.Fragment>
            </React.Fragment>
        );
    }
}
export default EmptyCartComponent
