import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom'
import {Helper, Url, Global, Api} from '../config';
import {CustomersTable} from '../Admincomponent';

class VendorsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_header: "Add Vendor",
            vendor_id: "",
            vendor_name: '',
            vendor_email: '',
            vendor_phone: '',
            error_text_vendor_name: false,
            error_text_vendor_email: false,
            error_text_vendor_phone: false,
            continue: false
        }
    }
    componentDidMount = () => {
        Helper.loadScript("admin");
    }
    vendor_name(e) {
        this.setState({vendor_name: e.target.value});
    }
    vendor_email(e) {
        this.setState({vendor_email: e.target.value});
    }
    vendor_phone(e) {
        this.setState({vendor_phone: e.target.value});
    }

    clear_vendor_modal = () => {
        this.setState({
            modal_header: "Add Vendor",
            vendor_id: "",
            vendor_name: '',
            vendor_email: '',
            vendor_phone: '',
            error_text_vendor_name: false,
            error_text_vendor_email: false,
            error_text_vendor_phone: false,
            continue: false
        });
    }

    add_vendor = () => {
        document
            .querySelector('#admin_add_product_attribute')
            .click();
        this.setState({modal_header: "Add Vendor"})
        this.clear_vendor_modal();
    }
    edit_vendor = (vendor) => {
        this.clear_vendor_modal();
        this.setState({vendor_id: vendor.id, vendor_name: vendor.name, vendor_email: vendor.email, vendor_phone: vendor.phone, modal_header: "Edit Vendor"});
        document
            .querySelector('#admin_add_product_attribute')
            .click();
    }

    add_edit_product_attribute = () => {
        let vendor = {
            vendor_id: this.state.vendor_id,
            vendor_name: this.state.vendor_name,
            vendor_email: this.state.vendor_email,
            vendor_phone: this.state.vendor_phone
        };
        let errorObj = Helper.vendor_validation(vendor);
        this.setState({error_text_vendor_name: errorObj.vendor_name, error_text_vendor_email: errorObj.vendor_email, error_text_vendor_phone: errorObj.vendor_phone});
        if (errorObj.continue) {

            document
                .querySelector('#product_attribute_close')
                .click();
            let api = Url.admin_product_variation_add;
            Api
                .admin_vendor_add_edit(api, vendor)
                .then(res => {
                    let data = JSON.parse(res);
                    if (data.status == "OK" && data.code == 200) {
                        this
                            .props
                            .load_particular_tab(data.data, "product_attributes")
                    }
                });
        }
    }

    delete_vendor = (vendor) => {
        let api = Url.admin_product_variation_delete;
        Api
            .admin_product_variation_delete(api, vendor)
            .then(res => {
                let data = JSON.parse(res);
                if (data.status == "OK" && data.code == 200) {
                    this
                        .props
                        .load_particular_tab(data.data, "product_attributes")
                }
            });
    }

    render() {

        return (
            <React.Fragment>
                <React.Fragment key={"---------------ADD_EDIT_ATTRIBUTE_MODAL--------------"}>
                    <div className="modal fade" id="modal-default">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div id="section" className="modal-header modal_header_back">
                                    <div className="col-4"></div>
                                    <div className="col-7">
                                        <h5 className="modal-title modal_hea">{this.state.modal_header}</h5>
                                    </div>
                                    <div className="col-1">
                                        <button
                                            id="product_attribute_close"
                                            type="button"
                                            className="close"
                                            data-dismiss="modal"
                                            aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">Name</label>
                                        <input
                                            type="text"
                                            id="exampleInputEmail1"
                                            placeholder="Enter Name "
                                            className={`form-control pro_fon ${this.state.error_text_vendor_name
                                            ? "errorval"
                                            : ""}`}
                                            onChange={this
                                            .vendor_name
                                            .bind(this)}
                                            value={this.state.vendor_name}/> {this.state.error_text_vendor_name && <span className="errorText">
                                            {this.state.error_text_vendor_name}
                                        </span>}
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">Email</label>
                                        <input
                                            type="text"
                                            id="exampleInputEmail1"
                                            placeholder="Enter email "
                                            className={`form-control pro_fon ${this.state.error_text_vendor_email
                                            ? "errorval"
                                            : ""}`}
                                            onChange={this
                                            .vendor_email
                                            .bind(this)}
                                            value={this.state.vendor_email}/> {this.state.error_text_vendor_email && <span className="errorText">
                                            {this.state.error_text_vendor_email}
                                        </span>}
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">Phone</label>
                                        <input
                                            type="text"
                                            id="exampleInputEmail1"
                                            placeholder="Enter Phone "
                                            className={`form-control pro_fon ${this.state.error_text_vendor_phone
                                            ? "errorval"
                                            : ""}`}
                                            onChange={this
                                            .vendor_phone
                                            .bind(this)}
                                            value={this.state.vendor_phone}/> {this.state.error_text_vendor_phone && <span className="errorText">
                                            {this.state.error_text_vendor_phone}
                                        </span>}
                                    </div>
                                </div>
                                <div className="modal-footer modal_header_back">
                                    <button
                                        onClick={this
                                        .add_edit_product_attribute
                                        .bind(this)}
                                        type="button"
                                        className="btn btn-success btn-sm">Save</button>
                                    <button type="button" className="btn btn-danger btn-sm" data-dismiss="modal">Close</button>

                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        id="admin_add_product_attribute"
                        type="button"
                        className="btn btn-default hidden"
                        data-toggle="modal"
                        data-target="#modal-default">
                        Launch Default Modal
                    </button>
                </React.Fragment>
                <React.Fragment key={"---------------ATTRIBUTE_CONTENT-----------------"}>
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
                                            <h3 className="card-title">Vendors List</h3>
                                            <Link
                                                to="#"
                                                onClick={this
                                                .add_vendor
                                                .bind(this)}
                                                className="btn btn-success btn-sm rightyadmin">
                                                <i className="fas fa-plus"></i>Add</Link>
                                        </div>

                                        <div className="card-body">
                                            <table id="vendor" className="table table-bordered table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Phone</th>
                                                        <th>Created on</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this
                                                        .props
                                                        .vendor_list
                                                        .map((vendor, index) => (
                                                            <tr key={index}>
                                                                <td className="td_particular">{++index}</td>
                                                                <td><img src={vendor.vendor.profile_picture} className="rounded-circle cutomerPic"/>{" "} {vendor.vendor.name}</td>
                                                                <td className="td_particular">{vendor.vendor.email}</td>
                                                                <td className="td_particular">{vendor.vendor.phone}</td>
                                                                <td className="td_particular">{vendor.vendor.created_at}</td>

                                                                <td className="td_particular">
                                                                    <div className="hu">
                                                                        <div
                                                                            className="inner"
                                                                            onClick={this
                                                                            .edit_vendor
                                                                            .bind(this, vendor.vendor)}>
                                                                            <div className="inner">
                                                                                <Link className="btn btn-info btn-sm" to="#">
                                                                                    <i className="fas fa-pencil-alt"></i>
                                                                                    Edit
                                                                                </Link>
                                                                            </div>
                                                                        </div>

                                                                        <div
                                                                            className="inner"
                                                                            onClick={this
                                                                            .delete_vendor
                                                                            .bind(this, vendor.vendor)}>
                                                                            <Link className="btn btn-danger btn-sm" to="#">
                                                                                <i className="fas fa-trash"></i>
                                                                                Delete
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                </td>

                                                            </tr>
                                                        ))}</tbody>
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

export default VendorsComponent;
