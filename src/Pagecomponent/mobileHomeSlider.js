import React from 'react';
import {Link, NavLink} from 'react-router-dom'

class MobileHomeSlider extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);
    }
    render() {

        return (
            <React.Fragment>
                <div className="appFeaturesSlideWrapper">
                    <div className="appFeaturesSlideInner">
                        <div className="appFeatureSlider owl-carousel owl-theme">
                            <div className="appFeatureSlideItem">
                                <Link to="#"><img src={require("../assets/img/topDealsSlide1.png")} alt="Image"/></Link>
                            </div>
                            <div className="appFeatureSlideItem">
                                <Link to="#"><img src={require("../assets/img/deliverdTodaySlide2.png")} alt="Image"/></Link>
                            </div>
                            <div className="appFeatureSlideItem">
                                <Link to="#"><img src={require("../assets/img/designerCakeSlide3.png")} alt="Image"/></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default MobileHomeSlider
