import React from 'react';
import {Link, NavLink} from 'react-router-dom'
import {Global} from '../config';

class StarComponent extends React.Component {

    constructor(props) {
        super(props);

    }
    get_star_val = (star_pos) => {
        this
            .props
            .change_clicked_star(star_pos);
    }

    render() {

        return (
            <React.Fragment>
                <Link
                    to="#"
                    className="rateStar"
                    onClick={this
                    .get_star_val
                    .bind(this, this.props.checked)}>
                    {this.props.checked < this.props.clicked_star && <i className="fa fa-star checked"></i>}
                    {this.props.checked >= this.props.clicked_star &&< i className = "fa fa-star" > </i>}
                    {/* <p>{this.props.star_text}</p> */}
                </Link>
            </React.Fragment>
        );
    }
}
export default StarComponent
