import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {Api, Url, Helper} from '../config';

class UserAddressComponent extends Component {

    address = (address, address_operation) => {
        if (address_operation == "Edit Address") {
            document
                .getElementById("user_address_modal_trigger")
                .click();
        }
        this
            .props
            .edit_user_single_address(address, address_operation);

    }

    delete_address = (address) => {
        this
            .props
            .delete_user_single_address(address);

    }
    render() {

        return (
            <React.Fragment>
                <div id="address" className="tabcontent profilepage_sec">
                    <div className="mycart_details">
                        <div className="mycart_header header_prflpage">
                            <div className="col-md-12">
                                <p>Address Book</p>
                                <Link
                                    id="user_address_modal_trigger"
                                    to="#"
                                    onClick={this
                                    .address
                                    .bind(this, " ", "Add Address")}
                                    data-toggle="modal"
                                    data-target="#myModal_addressprfl">
                                    <i className="fas fa-plus"></i>
                                    <span className="add_addrsspro">Add Address</span>
                                </Link>
                            </div>
                        </div>
                        <div className="tabcontent_profile address_prfl_cnty">

                            {this
                                .props
                                .user_profile_data
                                .address
                                .map((address, index) => (
                                    <div key={index} className="addrss_contnt_1">
                                        <div className="addrss_contnt_1_pr">
                                            <ul className="address_prsec">
                                                <li>{address.address_type}</li>
                                                <li className="pr_rghticon">
                                                    <Link
                                                        onClick={this
                                                        .delete_address
                                                        .bind(this, address)}
                                                        to="#">
                                                        <i className="fas fa-trash"></i>
                                                    </Link>
                                                </li>
                                                <li className="pr_rghticon">
                                                    <Link
                                                        onClick={this
                                                        .address
                                                        .bind(this, address, "Edit Address")}
                                                        to="#">
                                                        <i className="fas fa-edit"></i>
                                                    </Link>
                                                </li>

                                            </ul>
                                            <p className="addrssfull_pro">{address.address}
                                                <br></br>Phone :{" "}{address.phone}
                                                <br></br>{address.city.name},{address.state.name}
                                                <br></br>Pincode{" "}-{" "}{address.postal_code}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        {this.props.user_profile_data.address.length <= 0 && <div class="no_address">
                            <div class="img_address">
                                <img src={require("../assets/img/no_address.png")}/>
                            </div>
                            <p>No address available</p>
                        </div>}
                    </div>
                </div>
            </React.Fragment>
        );

    }
}

export default UserAddressComponent;
