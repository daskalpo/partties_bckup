import React, { Component } from "react";
import { Helper, Url, Global, Api } from "../config";
import {
  AdminHeader,
  SideBar,
  AdminFooter,
  CustomersComponent,
  CustomerDetailsComponent,
} from "../Admincomponent";

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin_user_name: "",
      customer_list: "",
      customer_full_details: "",
      show_customer_details: true,
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
    this.fetch_customer_list();
    this.setState({ show_customer_details: false });
  };

  fetch_customer_list = () => {
    this.setState({ loader: true });
    let api = Url.customer_list;
    Api.fetch_customer_list(api).then((res) => {
      this.setState({ loader: false });
      let response = JSON.parse(res);
      let data = response.response;
      console.log(data);
      if (data.status === 200) {
        this.setState({ customer_list: data.users });
      }
    });
  };

  __customer_activation = (customer, activation) => {

    let api = Url.customer_activation + "/" + customer.id + "/" + activation;
    console.log(api);
    Api.customer_activation(api).then((res) => {

      let response = JSON.parse(res);
      let data = response.response;
      console.log(data);
      if (data.status == 200) {
        this.fetch_customer_list();
      }
    });
  };
  __load_cutomer_full_details = (customer) => {
    this.setState({ loader: true });
    let api = Url.customer_details + "/" + customer.id;
    Api.customer_details(api).then((res) => {
      this.setState({ loader: false });
      let response = JSON.parse(res);
      let data = response.response;
      if (data.status == 200) {
        this.setState({
          show_customer_details: true,
          customer_full_details: data.users,
        });
      }
    });
  };
  __open_customer_list = () => {
    this.setState({ show_customer_details: false });
  };

  render() {
    return (
      <React.Fragment>
        <div className="hold-transition sidebar-mini layout-fixed">
          <div className="wrapper">
            <AdminHeader history={this.props.history} />
            <SideBar
              headerTitle="customers"
              history={this.props.history}
              admin_user_name={this.state.admin_user_name}
            />
            <div className="content-wrapper">
              {this.state.show_customer_details == true && (
                <CustomerDetailsComponent
                  open_customer_list={this.__open_customer_list.bind(this)}
                  customer_full_details={this.state.customer_full_details}
                />
              )}
              {this.state.customer_list != "" &&
                this.state.show_customer_details == false && (
                  <CustomersComponent
                    customer_activation={this.__customer_activation.bind(this)}
                    load_cutomer_full_details={this.__load_cutomer_full_details.bind(
                      this
                    )}
                    history={this.props.history}
                    customer_list={this.state.customer_list}
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

export default Customers;
