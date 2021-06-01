import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom'
import {Helper, Url, Global, Api} from '../config';

class AdminFooter extends Component {
    componentDidMount = () => {
        Helper.loadScript("admin");
    }
    nevigate = () => {
        this
            .props
            .history
            .push('/home');
    }
    render() {
        return (
            <React.Fragment>
                <footer className="main-footer">
                    <strong>Copyright &copy;
                        <Link
                            onClick={this
                            .nevigate
                            .bind(this)}
                            to="#">Celebration App</Link>.</strong>
                    All rights reserved.
                    <div className="float-right d-none d-sm-inline-block">
                        <b>Version</b>{" "}
                        1
                    </div>
                </footer>
            </React.Fragment>
        );
    }
}

export default AdminFooter;
