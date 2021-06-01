import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom'
import {Helper, Url, Global, Api} from '../config';
import {withSwalInstance} from 'sweetalert2-react';
import swal from 'sweetalert2';

class AdminHeader extends Component {
    componentDidMount = () => {
        Helper.loadScript("admin");
    }

    toast = (message) => {
        const Toast = swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 6000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', swal.stopTimer)
                toast.addEventListener('mouseleave', swal.resumeTimer)
            }
        })
        Toast.fire({type: 'success', title: message});
    }

    admin_logout = () => {
        localStorage.clear();
        this.toast("Logged out successfully");
        this
            .props
            .history
            .push('/admin-panel');

    }
    render() {
        return (
            <React.Fragment>
                <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="#" className="nav-link" data-widget="pushmenu" href="#" role="button">
                                <i className="fas fa-bars"></i>
                            </Link>
                        </li>

                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link
                                className="btn btn-info btn-sm"
                                onClick={this
                                .admin_logout
                                .bind(this)}
                                to="#">
                                <i className="fas fa-sign-out-alt"></i>
                                Logout
                            </Link>
                        </li>

                    </ul>

                </nav>
            </React.Fragment>
        );
    }
}

export default AdminHeader;
