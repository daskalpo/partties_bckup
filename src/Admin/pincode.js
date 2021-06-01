import React, { Component } from "react";
import { Helper, Url, Global, Api } from "../config";
import {
  AdminHeader,
  SideBar,
  AdminFooter,
  CustomersComponent,
  PincodeComponent,
} from "../Admincomponent";

class Pincode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin_user_name: "",
      pincode_list: "",
      loader: false,
    };
  }
  admin_assign_common_variables = () => {
    this.setState({
      admin_user_name: window.localStorage.getItem("ADMIN_LOGGED_USER"),
    });
  };
  componentDidMount = () => {
    this.admin_assign_common_variables();
    Helper.project_script_css_manager("admin");
    this.fetch_pincode();
  };

  fetch_pincode = () => {
    this.setState({ loader: true });
    let api = Url.pincode_list;
    Api.fetch_pincode_list(api).then((res) => {
      this.setState({ loader: false });
      let response = JSON.parse(res);

      let data = response;

      if (data.status === "OK") {
        this.setState({ pincode_list: data.data });
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="hold-transition sidebar-mini layout-fixed">
          <div className="wrapper">
            <AdminHeader history={this.props.history} />
            <SideBar
              headerTitle="pincode"
              history={this.props.history}
              admin_user_name={this.state.admin_user_name}
            />
            <div className="content-wrapper">
              {this.state.pincode_list != "" && (
                <PincodeComponent
                  history={this.props.history}
                  pincode_list={this.state.pincode_list}
                />
              )}
            </div>
            {this.state.loader && <div id="loader"></div>}
            <AdminFooter history={this.props.history} />
            <aside className="control-sidebar control-sidebar-dark"></aside>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Pincode;
