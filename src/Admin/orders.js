import React, { Component } from "react";
import { Helper, Url, Global, Api } from "../config";
import {
  AdminHeader,
  SideBar,
  AdminFooter,
  OrdersComponent,
  OrderDetailsComponent,
} from "../Admincomponent";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin_user_name: "",
      order_list: "",
      show_orders_details: false,
      order_full_details: "",
      loader:false
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
    this.fetch_order_list();
    this.setState({ show_orders_details: false });
  };

  fetch_order_list = () => {
    let api = Url.order_list;
    this.setState({loader:true});
    Api.fetch_order_list(api).then((res) => {
        this.setState({loader:false})
      let response = JSON.parse(res);
      let data = response.response;
      console.log(data);
      if (data.status === 200) {
        this.setState({ order_list: data.orders });
      }
    });
  };

  __load_order_full_details = (order) => {
    let api = Url.admin_order_details + "/" + order.order_id;
    this.setState({loader:true});
    Api.complete_order_details(api).then((res) => {
        this.setState({loader:false});
      let response = JSON.parse(res);
      let data = response.response;
      if (data.status == 200) {
        this.setState({
          show_orders_details: true,
          order_full_details: data.order,
        });
      }
    });
  };
  __open_order_details = () => {
    this.setState({ show_orders_details: false });
  };

  render() {
    return (
      <React.Fragment>
        <div className="hold-transition sidebar-mini layout-fixed">
          <div className="wrapper">
            <AdminHeader history={this.props.history} />
            <SideBar
              headerTitle="orders"
              history={this.props.history}
              admin_user_name={this.state.admin_user_name}
            />
            <div className="content-wrapper">
              {this.state.show_orders_details == true && (
                <OrderDetailsComponent
                  open_order_details={this.__open_order_details.bind(this)}
                  order_full_details={this.state.order_full_details}
                />
              )}
              {this.state.order_list != "" &&
                this.state.show_orders_details == false && (
                  <OrdersComponent
                    fetch_order_list={this.fetch_order_list.bind(this)}
                    load_order_full_details={this.__load_order_full_details.bind(
                      this
                    )}
                    history={this.props.history}
                    order_list={this.state.order_list}
                  />
                )}
              {this.state.loader  && <div id="loader"></div>}
            </div>
            <AdminFooter history={this.props.history} />
            <aside className="control-sidebar control-sidebar-dark"></aside>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Orders;
