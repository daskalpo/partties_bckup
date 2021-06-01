import React, {Component} from 'react';
import {Helper, Url, Global, Api} from '../config';
import {AdminHeader, SideBar, AdminFooter, VendorsComponent} from '../Admincomponent';

class Vendors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin_user_name: '',
            vendor_list: '',
            vendor_full_details: '',
            show_vendor_details: true,
            loader: false
        }

    }
    admin_assign_common_variables = () => {
        this.setState({
            admin_user_name: window
                .localStorage
                .getItem("ADMIN_LOGGED_USER")
        });
    }
    componentDidMount = () => {
        this.admin_assign_common_variables();
        Helper.project_script_css_manager("admin");
        this.fetch_vendor_list()
        this.setState({show_vendor_details: false});
    }

    fetch_vendor_list = () => {
        this.setState({loader: true})
        let api = Url.admin_vendor_list;
        Api
            .fetch_vendor_list(api)
            .then(res => {
                this.setState({loader: false})
                let response = JSON.parse(res);
                let data = response.response;
                console.log(data);
                if (data.status === true) {
                    this.setState({vendor_list: data.data})
                }
            });
    }

    __load_vendor_full_details = (customer) => {
        this.setState({loader: true})
        let api = Url.customer_details + '/' + customer.id;
        Api
            .customer_details(api)
            .then(res => {
                this.setState({loader: false})
                let response = JSON.parse(res);
                let data = response.response
                if (data.status == 200) {
                    this.setState({show_vendor_details: true, vendor_full_details: data.users});
                }
            });
    }
    __open_customer_list = () => {
        this.setState({show_vendor_details: false});
    }

    render() {
        return (
            <React.Fragment>
                <div className="hold-transition sidebar-mini layout-fixed">
                    <div className="wrapper">
                        <AdminHeader history={this.props.history}/>
                        <SideBar
                            headerTitle="vendors"
                            history={this.props.history}
                            admin_user_name={this.state.admin_user_name}/>
                        <div className="content-wrapper">
                            {(this.state.vendor_list != '' && this.state.show_vendor_details == false) && <VendorsComponent
                                load_cutomer_full_details={this
                                .__load_vendor_full_details
                                .bind(this)}
                                history={this.props.history}
                                vendor_list={this.state.vendor_list}/>}
                        </div>
                        {this.state.loader && <div id="loader"></div>}
                        <AdminFooter history={this.props.history}/>
                        <aside className="control-sidebar control-sidebar-dark"></aside>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Vendors;
