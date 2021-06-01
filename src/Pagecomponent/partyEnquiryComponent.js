import React from "react";
import { Link, NavLink } from "react-router-dom";
import DatePicker from "react-datepicker";
import { Helper, Url, Global, Api } from "../config";

class PartyEnquiryComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      number_invities: "",
      party_date: "",
      venue: "",
      occasion: "",
      services: "",
      additional_notes: "",
      error_text_number_invities: false,
      error_text_party_date: false,
      error_text_venue: false,
      error_text_occasion: false,
      error_text_services: false,
      error_text_additional_notes: false,
      continue: false,
    };
  }

  enterPressed(type_pressed, event) {
    let user = window.localStorage.getItem("LOGGEDUSER");
    if (user == "" || user === null || user === undefined) {
      document.getElementById("loginss").click();
      this.setState({
        number_invities: "",
        party_date: "",
        venue: "",
        occasion: "",
        services: "",
        additional_notes: "",
      });
      return false;
    }
  }

  number_invities(e) {
    this.setState({ number_invities: e.target.value });
  }
  party_date(e) {
    this.setState({ party_date: e });
  }
  venue(e) {
    this.setState({ venue: e.target.value });
  }
  occasion(e) {
    this.setState({ occasion: e.target.value });
  }
  services(e) {
    this.setState({ services: e.target.value });
  }
  additional_notes(e) {
    this.setState({ additional_notes: e.target.value });
  }
  clear_party_enquiry_values = () => {
    this.setState({
      number_invities: "",
      party_date: "",
      venue: "",
      occasion: "",
      services: "",
      additional_notes: "",
      error_text_number_invities: false,
      error_text_party_date: false,
      error_text_venue: false,
      error_text_occasion: false,
      error_text_services: false,
      error_text_additional_notes: false,
      continue: false,
    });
  };

  party_request = () => {
    let user = window.localStorage.getItem("LOGGEDUSER");
    if (user == "" || user === null || user === undefined) {
      document.getElementById("loginss").click();
      return false;
    }

    let party_enquiry = {
      number_invities: this.state.number_invities,
      party_date: this.state.party_date
        ? Helper.convert_YMD(this.state.party_date)
        : " ",
      venue: this.state.venue,
      occasion: this.state.occasion,
      services: this.state.services,
      additional_notes: this.state.additional_notes,
    };

    let errorObj = Helper.party_enquiry_validation(party_enquiry);

    this.setState({
      error_text_number_invities: errorObj.number_invities,
      error_text_party_date: errorObj.party_date,
      error_text_venue: errorObj.venue,
      error_text_occasion: errorObj.occasion,
      error_text_services: errorObj.services,
      error_text_additional_notes: errorObj.additional_notes,
    });
    if (errorObj.continue) {
      let api = Url.party_enquiry;
      Api.party_enquiry(api, party_enquiry).then((res) => {
        let data = JSON.parse(res);
        console.log(data);
        if (data.status == "OK" && data.code == "200") {
          Helper.alert(data.message);
          this.clear_party_enquiry_values();
        }
      });
    }
  };
  history_go_back = () => {
    window.history.go(-1);
  };

  render() {
    return (
      <React.Fragment>
        <React.Fragment>
          <section id="productListWrapper" className="rowTopMargin">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="mycart_details">
                    <div className="mycart_header">
                      <div className="col-md-12">
                        <p>Party Enquiry</p>
                      </div>
                    </div>
                    <div className="cart_details_padding partyenqury_content">
                      <div className="form-group party_enquiry_detls input_man">
                        <label>Number of Invitees</label>
                        <span>
                          <input
                            onKeyPress={this.enterPressed.bind(this)}
                            type="number"
                            min="1"
                            max="100"
                            placeholder="Enter number of Invities"
                            className={`${
                              this.state.error_text_number_invities
                                ? "errorval"
                                : ""
                            }`}
                            onChange={this.number_invities.bind(this)}
                            value={this.state.number_invities}
                          />{" "}
                          {this.state.error_text_number_invities && (
                            <span className="errorText">
                              {this.state.error_text_number_invities}
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="form-group party_enquiry_detls input_man">
                        <label>Date</label>
                        <DatePicker
                          onKeyPress={this.enterPressed.bind(this)}
                          placeholder=" Enter Date of party"
                          className={`${
                            this.state.error_text_party_date ? "errorval" : ""
                          }`}
                          selected={this.state.party_date}
                          onChange={this.party_date.bind(this)}
                        />{" "}
                        {this.state.error_text_party_date && (
                          <span className="errorText">
                            {this.state.error_text_party_date}
                          </span>
                        )}
                      </div>

                      <div className="form-group party_enquiry_detls input_man">
                        <label>Venue</label>
                        <input
                          onKeyPress={this.enterPressed.bind(this, "login")}
                          type="text"
                          placeholder="Enter your location"
                          className={`${
                            this.state.error_text_venue ? "errorval" : ""
                          }`}
                          onChange={this.venue.bind(this)}
                          value={this.state.venue}
                        />{" "}
                        {this.state.error_text_venue && (
                          <span className="errorText">
                            {this.state.error_text_venue}
                          </span>
                        )}
                      </div>

                      <div className="form-group party_enquiry_detls input_man">
                        <label>Occasion</label>
                        <input
                          onKeyPress={this.enterPressed.bind(this, "login")}
                          type="text"
                          placeholder="For eg- Birthday party"
                          className={`${
                            this.state.error_text_occasion ? "errorval" : ""
                          }`}
                          onChange={this.occasion.bind(this)}
                          value={this.state.occasion}
                        />{" "}
                        {this.state.error_text_occasion && (
                          <span className="errorText">
                            {this.state.error_text_occasion}
                          </span>
                        )}
                      </div>
                      <div className="form-group party_enquiry_detls input_man">
                        <label>Services</label>
                        <input
                          onKeyPress={this.enterPressed.bind(this, "login")}
                          type="text"
                          placeholder="Write the services you want"
                          className={`${
                            this.state.error_text_services ? "errorval" : ""
                          }`}
                          onChange={this.services.bind(this)}
                          value={this.state.services}
                        />{" "}
                        {this.state.error_text_services && (
                          <span className="errorText">
                            {this.state.error_text_services}
                          </span>
                        )}
                      </div>
                      <div className="form-group party_enquiry_detls input_man">
                        <label>Additional notes</label>
                        <textarea
                          onKeyPress={this.enterPressed.bind(this, "login")}
                          cols="50"
                          rows="4"
                          placeholder="Write some additional notes for description......."
                          className={`${
                            this.state.error_text_additional_notes
                              ? "errorval"
                              : ""
                          }`}
                          onChange={this.additional_notes.bind(this)}
                          value={this.state.additional_notes}
                        />{" "}
                        {this.state.error_text_additional_notes && (
                          <span className="errorText">
                            {this.state.error_text_additional_notes}
                          </span>
                        )}
                      </div>
                      <div className="send_requst">
                        <Link onClick={this.party_request.bind(this)} to="#">
                          <div className="place_ordr_btn send_requst_btn">
                            Send request
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      </React.Fragment>
    );
  }
}
export default PartyEnquiryComponent;
