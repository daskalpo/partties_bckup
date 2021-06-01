import React, { Component } from "react";
import { Helper, Url, Global, Api } from "../config";
import {
  AdminHeader,
  SideBar,
  AdminFooter,
  CustomerEnquiryComponent,
} from "../Admincomponent";

class CustomerEnquiry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin_user_name: "",
      active_tab: "custom_Cake",
      custom_cake_list: "",
      party_enquiry_list:"",
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
    this.fetch_cake_enquiry();
  };
  __toggle_internal_tabs = (internal_tab_name) => {
    this.setState({ active_tab: internal_tab_name });
    if(internal_tab_name == "party_enquiry"){
      this.fetch_party_enquiry();
    }
  };
  fetch_cake_enquiry = () => {
    let api = Url.admin_cake_enquiry_list;
    this.setState({ loader: true });
    Api.fetch_custom_cake_list(api).then((res) => {
      let data = JSON.parse(res);
      this.setState({ loader: false });
      if (data.code == 200) {
        this.setState({ custom_cake_list: data.data });
      }
    });
  };
  fetch_party_enquiry = () => {
    let api = Url.admin_party_enquiry_list;
    this.setState({ loader: true });
    Api.fetch_custom_party_enquiry_list(api).then((res) => {
      let data = JSON.parse(res);
      console.log(data);
      this.setState({ loader: false });
      if (data.code == 200) {
        this.setState({ party_enquiry_list: data.data });
      }
    });
  };

  loader = (status) =>{
    this.setState({ loader: status });
  }
  render() {
    return (
      <React.Fragment>
        <div className="hold-transition sidebar-mini layout-fixed">
          <div className="wrapper">
            <AdminHeader history={this.props.history} />
            <SideBar
              toggle_internal_tabs={this.__toggle_internal_tabs.bind(this)}
              headerTitle="customerEnquiry"
              history={this.props.history}
              admin_user_name={this.state.admin_user_name}
            />
            <div className="content-wrapper">
              <CustomerEnquiryComponent
              loader={this
                .loader
                .bind(this)}
                active_tab={this.state.active_tab}
                history={this.props.history}
                custom_cake_list={this.state.custom_cake_list}
                party_enquiry_list={this.state.party_enquiry_list}
              />
              {this.state.loader && <div id="loader"></div>}
            </div>
            <AdminFooter history={this.props.history} />
            <aside className="control-sidebar control-sidebar-dark"></aside>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CustomerEnquiry;
