import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';

class HeaderTopBar extends Component {

    render() {

        return (
            <div className="headerTopBar">
                <div className="container text-right">
                    <span className="order">
                        {/* Currently we are not accepting any orders */}
                    </span >
                    <Link to="#">
                        <span>Call Us Now:</span>
                        <i className="fas fa-headphones"></i>
                        +91 9123786579</Link>
                        {/* 7596075003 */}
                    <Link to="#">
                        <i className="fas fa-map-marker-alt"></i>
                        Kolkata</Link>
                </div>
            </div>
        );

    }
}

export default HeaderTopBar;
