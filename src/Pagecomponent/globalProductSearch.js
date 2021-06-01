import React from 'react';
import {Link, NavLink} from 'react-router-dom'
import {Helper, Url, Global, Api} from '../config';
import {MenuBarList, OptionComponent} from '../Pagecomponent';

class GlobalProductSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            price: '',
            order: '',
            price_show: '',
        };

    }

    componentDidMount = () => {
        Helper.loadScript();
        this.assign_global_values_to_Search_field();
    }

   
    assign_global_values_to_Search_field = () => {
        let price = '';
        let local_price = Global
            .global_product_search_values_obj
            .price
            .split(',');
        if (local_price == '') {
            price = "Select price";
        } else {
            price = local_price[0] + " to " + local_price[1]
        }
        this.setState({price_show: price, order: Global.global_product_search_values_obj.order})

    }

    nevigate = (nav) => {
        Helper.clear_global_search_values_onNavigation();
        this
            .props
            .history
            .push('/' + nav)
    }

    allFieldSearch = () => {
                this.props
                .refreshGlobalProductList();
    }

    price(e) {

        let local_price = parseInt(document.getElementsByClassName('irs-from')[1].innerHTML.replace(" ", "")) + ',' + parseInt(document.getElementsByClassName('irs-to')[1].innerHTML.replace(" ", ""));
        this.setState({
            price_show: parseInt(document.getElementsByClassName('irs-from')[1].innerHTML.replace(" ", "")) + ' to ' + parseInt(document.getElementsByClassName('irs-to')[1].innerHTML.replace(" ", ""))
        })
        Global.global_product_search_values_obj.price = local_price;
        this.setState({price: local_price});
        this.allFieldSearch();
    }

    order(e) {
        Global.global_product_search_values_obj.order = e.target.value;
        this.setState({order: e.target.value});
        this.allFieldSearch();

    }

    __store_checked_attributes = (data, checkedstatus) => {
        this.allFieldSearch();
    }

    onHandleEvent = (type) => {
        Global.global_product_search_values_obj.price="";
        Global.global_product_search_values_obj.type="";
        Global.global_product_search_values_obj.order="";
        Global.header_search_text_val="";
        Global.search_values_obj.type ="";
        Global.search_values_obj.type ="";
        Global.search_values_obj.type =type;
        this
            .props
            .history
            .push('/' + "product-list")
        
    }

    render() {
        const divStyle = {
            display: 'none'
        };
        
        return (

            <React.Fragment>
                <div className="container filterContainer">
                    <div className="row">
                        <div className="col-md-12 breadcrumbWrapper">
                            <ul className="breadcrumb">
                                <li
                                    onClick={this
                                    .nevigate
                                    .bind(this, "home")}>
                                    <Link to="#">Home</Link>
                                </li>
                                <li> Products</li>
                            </ul>
                        </div>

                        <div className="col-md-12" id="stickyFilterWrap">
                            <div className="filterWrapper">
                                <div className="filterItemWrap">
                                    <label>Price :</label>
                                    <div className="selectBox">
                                        <div className="rangeSliderWrap">
                                            <Link to="#" className="rangeFilter">
                                                <span className="varia">{this.state.price_show}</span>
                                                <i className="fa fa-chevron-down"></i>
                                            </Link>
                                            <div id="rangeBoxWrap" className="rangeBoxWrap custowrap custybosy">

                                                <div className="range-slider">
                                                    <input type="range" className="js-range-slider"/>
                                                </div>
                                                <div className="filterapplyBtnWrap" style={divStyle}>
                                                    <Link
                                                        to="#"
                                                        id="price"
                                                        onClick={this
                                                        .price
                                                        .bind(this)}>Apply</Link>
                                                    <Link to="#" id="price_close" className="filterApplyBtn">Apply</Link>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="filterItemWrap rightItem">
                                    <label>Sort by :</label>
                                    <div className="selectBox customSelectWrap1">
                                        <i className="fa fa-chevron-down rig"></i>
                                        <select
                                            className="customSelect variass"
                                            onChange={this
                                            .order
                                            .bind(this)}
                                            value={this.state.order}>
                                            <option value="0">Select Order</option>
                                            <option value="low-high">Low to High Price</option>
                                            <option value="high-low">High to Low Price</option>
                                            <option value="popular">
                                                Popularity</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mobileSubHeaderWrap">
                    <p className="listSubHeadibg">Products</p>
                    <div className="filterActionBtn">
                        <Link to="#" className="sortbyModalButton">
                            <i className="fas fa-sort-amount-up"></i>
                        </Link>
                        <Link to="#" className="filterModalButton">
                            <i className="fas fa-filter"></i>
                        </Link>
                    </div>
                </div>

                {/* <MenuBarList
                    headerTitle="ProductLists"
                    history={this.props.history}
                    onHandleEvent = {this.onHandleEvent.bind(this)}
                /> */}

            </React.Fragment>

        );
    }
}
export default GlobalProductSearch

