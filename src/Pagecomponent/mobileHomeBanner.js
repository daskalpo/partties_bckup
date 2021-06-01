import React from 'react';
import {Link, NavLink} from 'react-router-dom'

class MobileHomeBanner extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);
    }
    change_mobile_headerSearchTextVal = (e) => {
        this
            .props
            .change_mobile_headerSearchTextVal(e.target.value);
    }
    mobile_allFieldSearch = () => {
        this
            .props
            .searchBar();
    }
    enterPressed(event) {
        var code = event.keyCode || event.which;
        if (code === 13) {
            this
            .props
            .searchBar();
        }
    }
    render() {

        return (
            <React.Fragment>
                <div id="main" class="">
                    <div class="container">
                        <div class="row">   
                            <div class="col-sm-12">
                                <div className="mobilebannerSearchWrapper mobilebannerSearchWrapper_mob">
                                    <div className="mobilebannerInner">
                                        <div className="mobileMainBanner owl-carousel owl-theme">
                                            <div className="mobileBannerItem">
                                                <Link to="#"><img src={require("../assets/img/bannerSlide1.png")} alt="banner"/></Link>
                                            </div>
                                            <div className="mobileBannerItem">
                                                <Link to="#"><img src={require("../assets/img/bannerSlide2.png")} alt="banner"/></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mobilemainSearchWrap">
                                        <div className="mobileMainSearchInner">
                                            <input
                                            onKeyPress={this
                                                .enterPressed
                                                .bind(this)}
                                                onChange={this
                                                .change_mobile_headerSearchTextVal
                                                .bind(this)}
                                                value={this.props.header_search_text_val}
                                                type="text"
                                                name="mobileMainSearch"
                                                className="mobileMainSearch"
                                                placeholder="Search cake, gifts etc..."/>
                                            <button
                                                onClick={this
                                                .mobile_allFieldSearch
                                                .bind(this)}
                                                className="mobileMainSearchSubmit"
                                                type="button"
                                                value="">
                                                <i className="fas fa-search"></i>
                                            </button>
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
export default MobileHomeBanner
