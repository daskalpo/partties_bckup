import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Helper, Url, Global, Api } from "../config";
import { CustomersTable } from "../Admincomponent";

class CustomerEnquiryCake extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addintional_info: "",
      created_at: "",
      description: "",
      image: "",
      vendor: "",
      customer: "",
    };
  }
  componentDidMount = () => {
    Helper.loadScript("admin");
  };

  custom_cake_details = (customCake) => {
    let api = Url.admin_custom_cake_details + "/" + customCake.id;
    this.props.loader(true);
    Api.fetch_custom_cake_details(api).then((res) => {
      let data = JSON.parse(res);
      console.log(data);
      this.props.loader(false);
      document.querySelector("#admin_custom_cake_details").click();
      if (data.code == "200") {
        this.setState({
          addintional_info: data.data.addintional_info,
          created_at: data.data.created_at,
          description: data.data.description,
          image: data.data.image,
          customer: data.data.user.name,
          email: data.data.user.email,
          phone: data.data.user.phone,
          vendor: data.data.vendor.name,
        });
      }
    });
    console.log(customCake);
  };
  render() {
    return (
      <React.Fragment>
        <React.Fragment
          key={
            "----------------------CUSTGOM CAKE DETAILS MODAL-----------------"
          }
        >
          <div className="modal fade" id="modal-default">
            <div className="modal-dialog">
              <div className="modal-content">
                <div id="section" className="modal-header modal_header_back">
                  <div className="col-2"></div>
                  <div className="col-7">
                    <h5 className="modal-title modal_hea">
                      Custom Cake Details
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
                    <label for="exampleInputEmail1">Custom Cake Image</label>
                  </div>

                  <img
                    alt="Geeks Image"
                    className="product_upload_image_custom"
                    src={this.state.image}
                  />
                  <div className="form-group">
                    <label for="exampleInputEmail1">Description</label>
                    <textarea
                      type="text"
                      placeholder="Custom Cake Description "
                      className="form-control pro_fon "
                      value={this.state.description}
                    />
                  </div>

                  <div className="form-group">
                    <label for="exampleInputEmail1">Created at</label>
                    <input
                      type="text"
                      placeholder="Created At"
                      className="form-control pro_fon"
                      value={this.state.created_at}
                    />
                  </div>

                  <div className="form-group">
                    <label for="exampleInputEmail1">Seller name</label>
                    <input
                      type="text"
                      placeholder="Customer Name"
                      className="form-control pro_fon"
                      value={this.state.vendor}
                    />
                  </div>

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
            id="admin_custom_cake_details"
            type="button"
            className="btn btn-default hidden"
            data-toggle="modal"
            data-target="#modal-default"
          >
            Launch Default Modal
          </button>
        </React.Fragment>
        <React.Fragment
          key={"----------------------CUSTGOM CAKE LIST-----------------"}
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
                      <h3 className="card-title">Custom Cake Enquiry List</h3>
                    </div>

                    <div className="card-body">
                      <table
                        id="productCategory"
                        className="table table-bordered table-striped"
                      >
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Cake Picture</th>
                            <th>Customer</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.custom_cake_list.map(
                            (customCake, index) => (
                              <tr key={index}>
                                <td className="td_particular">{++index}</td>
                                <td>
                                  <img
                                    src={customCake.image}
                                    className="rounded-circle cutomerPic"
                                  />{" "}
                                </td>
                                <td className="td_particular">
                                  {customCake.user.name}
                                </td>
                                <td className="td_particular">
                                  {customCake.user.email}
                                </td>
                                <td className="td_particular">
                                  {customCake.user.phone}
                                </td>
                                <td className="td_particular">
                                  <div className="inner">
                                    <Link
                                      onClick={this.custom_cake_details.bind(
                                        this,
                                        customCake
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

export default CustomerEnquiryCake;
