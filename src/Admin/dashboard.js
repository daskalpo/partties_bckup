import React, { Component } from "react";
import { DashboardComponent } from "../Admincomponent";
import { Helper, Url, Global, Api } from "../config";
import { AdminHeader, SideBar, AdminFooter } from "../Admincomponent";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboard_details: "",
      loader: "",
      admin_user_name: window.localStorage.getItem("ADMIN_LOGGED_USER"),
    };
  }
  componentDidMount = () => {
    Helper.project_script_css_manager("admin");
    this.get_dashboard_content();
  };
  get_dashboard_content = () => {
    this.setState({ loader: true });
    let api = Url.dashboard_details;
    Api.dashboard_details(api).then((res) => {
      this.setState({ loader: false });
      let response = JSON.parse(res);
      let data = response.response;
      if (data.status == 200) {
        this.setState({
          dashboard_details: data.data,
        });
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
              history={this.props.history}
              headerTitle="dashboard"
              admin_user_name={this.state.admin_user_name}
            />
            <DashboardComponent
              dashboard_details={this.state.dashboard_details}
              history={this.props.history}
              headerTitle="dashboard"
            />
            {this.state.loader && <div id="loader"></div>}
            <AdminFooter history={this.props.history} />
            <aside className="control-sidebar control-sidebar-dark"></aside>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
