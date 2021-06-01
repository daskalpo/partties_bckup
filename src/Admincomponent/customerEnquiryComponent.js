import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Helper, Url, Global, Api } from "../config";
import { CustomerEnquiryCake, CustomerEnquiryParty } from "../Admincomponent";

class CustomerEnquiryComponent extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    Helper.loadScript("admin");
  };

  loader = (status) => {
    this.props.loader(status);
  };

  render() {
    return (
      <React.Fragment>
        {this.props.active_tab == "custom_Cake" &&
          this.props.custom_cake_list != "" && (
            <CustomerEnquiryCake
              loader={this.loader.bind(this)}
              history={this.props.history}
              custom_cake_list={this.props.custom_cake_list}
            />
          )}
        {this.props.active_tab == "party_enquiry" &&
          this.props.party_enquiry_list != "" && (
          <CustomerEnquiryParty
            loader={this.loader.bind(this)}
            history={this.props.history}
            party_enquiry_list={this.props.party_enquiry_list}
          />
        )}
      </React.Fragment>
    );
  }
}

export default CustomerEnquiryComponent;
