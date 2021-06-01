import React, {Component} from 'react';
import {AdminLoginComponent, Toast} from '../Admincomponent';
import {Api, Url, Helper, Global} from '../config';

class AdminLogin extends Component {
    componentDidMount = () => {
        console.log(window.localStorage.getItem("ADMIN_REMEMBER"));
        if (window.localStorage.getItem("ADMIN_REMEMBER") == 1) {
            this
                .props
                .history
                .push('/admin-panel/dashboard')
        }
    }
    render() {
        return (
            <React.Fragment>
                <Toast/>
                <AdminLoginComponent history={this.props.history}/>
            </React.Fragment>

        );
    }
}

export default AdminLogin;
