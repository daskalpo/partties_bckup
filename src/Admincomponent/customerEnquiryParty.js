import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Helper, Url, Global, Api } from "../config";
import { CustomersTable } from "../Admincomponent";

class CustomerEnquiryParty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addintional_note: "",
      created_at: "",
      number_invities: "",
      occasion: "",
      party_date: "",
      services: "",
      updated_at: "",
      customer: "",
      name: "",
      email: "",
      venue: "",
    };
  }
  componentDidMount = () => {
    Helper.loadScript("admin");
  };

  party_enquiry_details = (partyEnquiry) => {
    let api = Url.admin_party_enquiry_details + "/" + partyEnquiry.id;
    this.props.loader(true);
    Api.fetch_party_enquiry_details(api).then((res) => {
      let data = JSON.parse(res);
      console.log(data);
      this.props.loader(false);
      document.querySelector("#admin_party_enquiry_details").click();
      if (data.code == "200") {
        this.setState({
          addintional_note: data.data.additional_notes,
          created_at: data.data.created_at,
          number_invities: data.data.number_invities,
          occasion: data.data.occasion,
          party_date: data.data.party_date,
          services: data.data.services,
          customer: data.data.user.name,
          phone: data.data.user.phone,
          email: data.data.user.email,
          venue: data.data.venue,
        });
      }
    });
    //  console.log(customCake);
  };
  render() {
    console.log(this.props.party_enquiry_list);
    return (
      <React.Fragment>
        <React.Fragment
          key={
            "----------------------PARTY ENQUIRY DETAILS MODAL-----------------"
          }
        >
          <div className="modal fade" id="modal-default">
            <div className="modal-dialog">
              <div className="modal-content">
                <div id="section" className="modal-header modal_header_back">
                  <div className="col-2"></div>
                  <div className="col-7">
                    <h5 className="modal-title modal_hea">
                      Party Enquiry Details
                    </h5>
                  </div>
                  <div className="col-1">
                    <button
                      id="product_attribute_close"
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label for="exampleInputEmail1">Customer name</label>
                    <input
                      type="text"
                      placeholder="Customer Name"
                      className="form-control pro_fon"
                      value={this.state.customer}
                    />
                  </div>

                  <div className="form-group">
                    <label for="exampleInputEmail1">Customer email</label>
                    <input
                      type="email"
                      placeholder="Customer Email No."
                      className="form-control pro_fon"
                      value={this.state.email}
                    />
                  </div>

                  <div className="form-group">
                    <label for="exampleInputEmail1">Customer phone</label>
                    <input
                      type="number"
                      placeholder="Customer Phone No."
                      className="form-control pro_fon"
                      value={this.state.phone}
                    />
                  </div>

                  <div className="form-group">
                    <label for="exampleInputEmail1">Occasion</label>
                    <input
                      type="text"
                      placeholder="Occasion"
                      className="form-control pro_fon"
                      value={this.state.occasion}
                    />
                  </div>

                  <div className="form-group">
                    <label for="exampleInputEmail1">Party Date</label>
                    <input
                      type="text"
                      placeholder="Party Date"
                      className="form-control pro_fon"
                      value={this.state.party_date}
                    />
                  </div>

                  <div className="form-group">
                    <label for="exampleInputEmail1">No of Invities</label>
                    <input
                      type="text"
                      placeholder="No of Invities"
                      className="form-control pro_fon"
                      value={this.state.number_invities}
                    />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Venue</label>
                    <textarea
                      type="text"
                      placeholder="Venue"
                      className="form-control pro_fon "
                      value={this.state.venue}
                    />
                  </div>

                  <div className="form-group">
                    <label for="exampleInputEmail1">Services</label>
                    <input
                      type="text"
                      placeholder="Services"
                      className="form-control pro_fon"
                      value={this.state.services}
                    />
                  </div>

                  <div className="form-group">
                    <label for="exampleInputEmail1">Additional Notes</label>
                    <textarea
                      type="text"
                      placeholder="Additional N0tes"
                      className="form-control pro_fon "
                      value={this.state.addintional_note}
                    />
                  </div>
                </div>
                <div class="modal-footer modal_header_back">
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            id="admin_party_enquiry_details"
            type="button"
            className="btn btn-default hidden"
            data-toggle="modal"
            data-target="#modal-default"
          >
            Launch Default Modal
          </button>
        </React.Fragment>
        <React.Fragment
          key={"----------------------CUSTOM CAKE LIST-----------------"}
        >
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2"></div>
            </div>
          </section>
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Party Enquiry List</h3>
                    </div>

                    <div className="card-body">
                      <table
                        id="productCategory"
                        className="table table-bordered table-striped"
                      >
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Customer</th>
                            <th>Phone</th>
                            <th>Occasion</th>
                            <th>Party Date</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.party_enquiry_list.map(
                            (partyEnquiry, index) => (
                              <tr key={index}>
                                <td className="td_particular">{++index}</td>

                                <td className="td_particular">
                                  {partyEnquiry.user.name}
                                </td>
                                <td className="td_particular">
                                  {partyEnquiry.user.phone}
                                </td>
                                <td className="td_particular">
                                  {partyEnquiry.occasion}
                                </td>
                                <td className="td_particular">
                                  {partyEnquiry.party_date}
                                </td>

                                <td className="td_particular">
                                  <div className="inner">
                                    <Link
                                      onClick={this.party_enquiry_details.bind(
                                        this,
                                        partyEnquiry
                                      )}
                                      class="btn btn-primary btn-sm"
                                      to="#"
                                    >
                                      <i class="fas fa-folder"></i>Details
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
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

export default CustomerEnquiryParty;
