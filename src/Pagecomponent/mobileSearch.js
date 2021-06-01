import React from 'react';
import {Link, NavLink} from 'react-router-dom'
import {Helper, Url, Global, Api} from '../config';
import $ from 'jquery';
import {Category, HeaderTopBar, OptionComponent} from '.';

class MobileSearch extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            price: '',
            type: '',
            order: '',
            price_show: '',
            product_attribute: []
        };

    }

    componentDidMount = () => {
        let price = '';
        let local_price = Global
            .search_values_obj
            .price
            .split(',');
        if (local_price == '') {
            price = "Select price";
        } else {
            price = local_price[0] + " to " + local_price[1]
        }

        this.setState({price_show: price, type: Global.search_values_obj.type, order: Global.search_values_obj.order})
        this.get_products_attributes();
    }

    get_products_attributes = () => {

        let api = Url.product_attributes;
        Api
            .get_product_attributes(api)
            .then(res => {
                let response = JSON.parse(res);
                this.inject_isChecked_into_productAttribute(response.data);
            });
    }

    inject_isChecked_into_productAttribute = (dataObj) => {

        let local_product_attribute = [];
        dataObj.map(attribute => {
            let single_attribute_object = {
                "id": attribute.id,
                "name": attribute.name,
                "isChecked": false
            }
            local_product_attribute.push(single_attribute_object);
        });
        console.log(local_product_attribute);
        window
            .localStorage
            .setItem("PRODUCT_ATTRIBUTES", JSON.stringify(local_product_attribute));
        window
            .localStorage
            .setItem("RESET_PRODUCT_ATTRIBUTES", JSON.stringify(local_product_attribute));
        this.setState({product_attribute: local_product_attribute});

    }

    allFieldSearch = () => {
            this
                .props
                .refreshProductList();
    }

    price(e) {

        document
            .querySelector('#clickit')
            .click();
        console.log(document.getElementsByClassName('irs-from')[0].innerHTML.replace(" ", ""));
        let local_price = parseInt(document.getElementsByClassName('irs-from')[0].innerHTML.replace(" ", "")) + ',' + parseInt(document.getElementsByClassName('irs-to')[0].innerHTML.replace(" ", ""));

        this.setState({
            price_show: parseInt(document.getElementsByClassName('irs-from')[0].innerHTML.replace(" ", "")) + ' to ' + parseInt(document.getElementsByClassName('irs-to')[0].innerHTML.replace(" ", ""))
        })
        Global.search_values_obj.price = local_price;
        this.setState({price: local_price});
        this.allFieldSearch();
    }

    __refresh = () => {
        if (this.props.headerTitle == "ProductLists") {
            this.setState({price: "0", order: "0", type: "0"});
            Helper.clear_global_search_values_onNavigation();
            this
                .props
                .refreshProductList();
        }
    }

    __store_checked_attributes = (data, checkedstatus) => {
        let local_product_attribute = JSON.parse(window.localStorage.getItem("PRODUCT_ATTRIBUTES"));
        let temp_local_product_attribute = [];
        local_product_attribute.map(attribute => {
            if (attribute.id == data.id) {
                attribute.isChecked = checkedstatus;
            }
            checkedstatus
            temp_local_product_attribute.push(attribute);
        });
        this.setState({product_attribute: temp_local_product_attribute});
        window
            .localStorage
            .setItem("PRODUCT_ATTRIBUTES", JSON.stringify(temp_local_product_attribute))
        Global.search_values_obj.type = Helper.filter_checked_attribute(temp_local_product_attribute);

    }

    order = (e) => {

        Global.search_values_obj.order = e;
        this.setState({order: e});

    }

    clear_all_searchParameters = () => {
        let local_product_attribute = JSON.parse(window.localStorage.getItem("RESET_PRODUCT_ATTRIBUTES"));
        window
            .localStorage
            .setItem("PRODUCT_ATTRIBUTES", window.localStorage.getItem("RESET_PRODUCT_ATTRIBUTES"));
        this.setState({product_attribute: local_product_attribute});
        $('input[type="radio"]').each(function () {
            $(this).prop('checked', false);
        });
        Global.header_search_text_val="";
        Global.search_values_obj.price="";
        Global.search_values_obj.order="";
        Global.search_values_obj.type="";
        this.allFieldSearch();

    }

    render() {
        const divStyle = {
            display: 'none'
        };
        const listItems = this
            .state
            .product_attribute
            .map((prod, index) => <OptionComponent
                key={index}
                store_checked_attributes={this
                .__store_checked_attributes
                .bind(this)}
                prod={prod}
                title="search"
                history={this.props.history}/>);

        return (

            <React.Fragment key={"------------MOBILE_SEARCH_FILTER-------------------"}>
                <div id="filterOverlay" className="filterOverlay" style={divStyle}></div>
                <div id="filterMobileWrapper" className="filterMobileWrapper" style={divStyle}>
                    <div className="filterTabWrap clearfix">
                        <Link to="#" className="filterTab filterBoxTab activeFilterTab">Filter</Link>
                        <Link to="#" className="sortTab filterBoxTab">Sort By</Link>
                    </div>
                    <div className="filterBoxContentWrap">
                        <div className="filterBoxfilterContainer" id="filterBoxWrapper">
                            <div className="filterCatWrap">
                                <label className="search_bolder">Type :
                                </label>
                                <div className="typeBoxFilterListWrap">
                                    {listItems}
                                </div>
                            </div>
                            <div className="filterCatWrap">
                                <label className="search_bolder">Price</label>
                                <div className="typeBoxPriceListWrap">

                                    <div className="range-slider">
                                        <input type="range" className="js-range-slider"/>
                                    </div>
                                    <div className="filterapplyBtnWrap"></div>

                                </div>
                            </div>

                        </div>
                        <div className="filterBoxSortContainer" id="sortbyBoxWrapper">
                            <div className="filterCatWrap">
                                <label className="search_bolder">Sort by :</label>
                                <div className="typeBoxFilterListWrap">
                                    <div className="typeList">

                                        <div className="typeList">

                                            <label>
                                                <span className="container_label marginoff_paymnt">
                                                    <input
                                                        name="gender"
                                                        onClick={this
                                                        .order
                                                        .bind(this, "low-high")}
                                                        type="radio"
                                                        value=""/>
                                                    <span className="checkmark"></span>
                                                </span>
                                                <span className="seacrh_inte_text">Price: Low to High</span>
                                            </label>

                                        </div>
                                        <div className="typeList">

                                            <label>
                                                <span className="container_label marginoff_paymnt"><input
                                                    name="gender"
                                                    onClick={this
                .order
                .bind(this, "high-low")}
                                                    type="radio"
                                                    value=""/>
                                                    <span className="checkmark"></span>
                                                </span>
                                                <span className="seacrh_inte_text">Prie: High to Low</span>
                                            </label>

                                        </div>

                                        <label>
                                            <span className="container_label marginoff_paymnt"><input
                                                name="gender"
                                                onClick={this
                .order
                .bind(this, "popular")}
                                                type="radio"
                                                value=""/>
                                                <span className="checkmark"></span>
                                            </span>
                                            <span className="seacrh_inte_text">Popularity</span>
                                        </label>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="filterBoxBtnWrap">
                        <Link
                            to="#"
                            onClick={this
                            .clear_all_searchParameters
                            .bind(this)}
                            className="filterBoxActionBtn filterBoxApply">Clear All</Link>
                        <Link
                            to="#"
                            id="clickit"
                            onClick={this
                            .price
                            .bind(this)}
                            className="filterBoxActionBtn filterBoxApply">Apply Now</Link>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default MobileSearch
