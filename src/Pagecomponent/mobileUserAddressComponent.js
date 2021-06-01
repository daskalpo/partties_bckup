import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {Api, Url, Helper} from '../config';

class MobileUserAddressComponent extends Component {

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
                <div className="addrssbk_nwpg">
                    <header id="header_mobile">
                        <a >
                            <img
                                src={require("../assets/img/arrow_left.png")}
                                className="arr_header backtoLogin"/>
                        </a>
                        <div className="header_txt_mble">
                            <p>Address Book</p>
                        </div>
                        <div className="delivrto_mycartmobile customcake_txt_custmpg">
                            <p>My Addresses</p>
                            <Link
                                onClick={this
                                .address
                                .bind(this, " ", "Add Address")}
                                to="#"
                                data-toggle="modal"
                                data-target="#myModal_addressprfl"
                                className="chng_btnmob add_addrss_prbk">
                                <i className="fas fa-plus"></i>Add Address</Link>
                        </div>

                    </header>
                    <section id="productListWrapper" className="rowTopMargin addrssbk_mobile_sec">
                        <div className="address_prfl_cnty">

                            {this
                                .props
                                .user_profile_data
                                .address
                                .map((address, index) => (

                                    <div key={index} className="addrss_contnt_1 addrss_contnt_mobl_1">
                                        <div className="addrss_contnt_1_pr">
                                            <p className="addrssbk_mobile">{address.address_type}</p>
                                            <p className="addrssfull_pro addrssbk_mobile_pro">{address.address}
                                                <br></br>Phone :{" "}{address.phone}
                                                <br></br>{address.city.name},{address.state.name}
                                                <br></br>Pincode{" "}-{" "}{address.postal_code}</p>
                                            <div className="addrssbk_btn">
                                                <Link
                                                    to="#"
                                                    onClick={this
                                                    .address
                                                    .bind(this, address, "Edit Address")}
                                                    className="">
                                                    <i className="fas fa-edit"></i>Edit</Link>
                                                <Link
                                                    to="#"
                                                    onClick={this
                                                    .delete_address
                                                    .bind(this, address)}
                                                    className="">
                                                    <i className="far fa-trash-alt"></i>Remove</Link>
                                            </div>
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

                    </section>
                </div>
            </React.Fragment>
        );

    }
}

export default MobileUserAddressComponent;
